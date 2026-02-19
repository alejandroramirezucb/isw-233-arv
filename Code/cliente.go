package main

import (
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

		fmt.Println("Fin de grabación.")

		datos := ObtenerBufferAudio()
		EnviarBuffer(conexion, direccion, datos)
	}
}
