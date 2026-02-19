package main

import (
	"fmt"
	"net"
	"strconv"
	"time"
	"github.com/gen2brain/malgo"
)

func StartClient(puerto string) {
	configuracionAudio, err := InicializarAudio()

	if err != nil {
		fmt.Println("ERROR:", err)
		return
	}

	defer configuracionAudio.Uninit()

	puertoInt, err := strconv.Atoi(puerto)

	if err != nil {
		fmt.Println("ERROR: puerto inválido:", err)
		return
	}
	
	puertoControl := strconv.Itoa(puertoInt + 1)

	direccionControl, err := net.ResolveUDPAddr("udp", ":"+puertoControl)

	if err != nil {
		fmt.Println("ERROR al resolver dirección de control:", err)
		return
	}

	receptorControl, err := net.ListenUDP("udp", direccionControl)

	if err != nil {
		fmt.Println("ERROR al abrir socket de control (puerto ", puertoControl, "):", err)
		return
	}

	defer receptorControl.Close()

	configuracionDispositivo := ConfigurarDispositivoAudio()
	ejecutarMicrofono(configuracionAudio, configuracionDispositivo, puerto, receptorControl)
}

func ejecutarMicrofono(configuracionAudio *malgo.AllocatedContext, configuracionDispositivo malgo.DeviceConfig, puerto string, receptorControl *net.UDPConn) {
	servicio, err := malgo.InitDevice(configuracionAudio.Context, configuracionDispositivo, malgo.DeviceCallbacks{Data: RecibirAudio})

	if err != nil {
		fmt.Println("error al inicializar dispositivo: ", err)
		return
	}

	defer servicio.Uninit()

	for {
		if VerificarComandoDetener(receptorControl) {
			fmt.Println("Comando 'CMD:STOP' recibido — deteniendo cliente")
			return
		}

		if !EsperarParaGrabar(receptorControl) {
			return
		}

		ip := SolicitarDireccionIP()
		direccion := ip + ":" + puerto

		conexion, err := ObtenerConexion(direccion)

		if err != nil {
			fmt.Println("ERROR:", err)
			continue
		}

		ReiniciarBufferAudio()

		if err := IniciarServicioMicrofono(servicio.Start); err != nil {
			conexion.Close()
			fmt.Println(err)
			continue
		}

		completado := GrabarPorDuracion(1500 * time.Millisecond, receptorControl)

		if !completado {
			if err := DetenerServicioMicrofono(servicio.Stop); err != nil {
				fmt.Println(err)
			}
			
			conexion.Close()
			return
		}

		if err := DetenerServicioMicrofono(servicio.Stop); err != nil {
			fmt.Println(err)
		}

		fmt.Println("Fin de grabacion.")

		datos := ObtenerBufferAudio()
		EnviarBuffer(conexion, direccion, datos)
		conexion.Close()
	}
}
