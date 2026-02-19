package main

import (
	"errors"
	"fmt"
	"github.com/gen2brain/malgo"
	"net"
	"time"
)

func IniciarCliente(puerto string) {
	ip := SolicitarDireccionIP()

	direccion := ip + ":" + puerto
	conexion, err := ObtenerConexion(direccion)

	if err != nil {
		fmt.Println("ERROR:", err)
		return
	}

	defer conexion.Close()

	configuracionAudio, err := InicializarAudio()

	if err != nil {
		fmt.Println("ERROR:", err)
		return
	}

	defer configuracionAudio.Uninit()

	configuracionDispositivo := ConfigurarDispositivoAudio()
	ejecutarMicrofono(configuracionAudio, configuracionDispositivo, conexion, direccion)
}

func ejecutarMicrofono(configuracionAudio *malgo.AllocatedContext, configuracionDispositivo malgo.DeviceConfig, conexion *net.UDPConn, direccion string) {
	servicio, err := malgo.InitDevice(configuracionAudio.Context, configuracionDispositivo, malgo.DeviceCallbacks{Data: RecibirAudio})

	if err != nil {
		fmt.Println("error al inicializar dispositivo: ", err)
		return
	}

	defer servicio.Uninit()

	for {
		if detener, err := ComprobarDetencion(conexion); err != nil {
			fmt.Println("error comprobando CMD:STOP:", err)
		} else if detener {
			fmt.Println("Deteniendo cliente...")
			return
		}

		EsperarParaGrabar()
		ReiniciarBufferAudio()

		if err := IniciarServicioMicrofono(servicio.Start); err != nil {
			fmt.Println(err)
			continue
		}

		GrabarPorDuracion(1500 * time.Millisecond)

		if err := DetenerServicioMicrofono(servicio.Stop); err != nil {
			fmt.Println(err)
		}

		fmt.Println("Fin de grabacion.")

		datos := ObtenerBufferAudio()
		EnviarBuffer(conexion, direccion, datos)

		if detener, err := ComprobarDetencion(conexion); err != nil {
			fmt.Println("error comprobando CMD:STOP:", err)
		} else if detener {
			fmt.Println("Deteniendo cliente...")
			return
		}
	}
}

func ComprobarDetencion(conexion *net.UDPConn) (bool, error) {
	buffer := make([]byte, 1024)

	if err := conexion.SetReadDeadline(time.Now().Add(10 * time.Millisecond)); err != nil {
		return false, err
	}

	n, err := conexion.Read(buffer)

	if err != nil {
		var errNet net.Error

		if errors.As(err, &errNet) && errNet.Timeout() {
			return false, nil
		}

		return false, err
	}

	if string(buffer[:n]) == "CMD:STOP" {
		return true, nil
	}

	return false, nil
}
