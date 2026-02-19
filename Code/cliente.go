package main

import (
	"fmt"
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

	configuracionDispositivo := ConfigurarDispositivoAudio()
	ejecutarMicrofono(configuracionAudio, configuracionDispositivo, puerto)
}

func ejecutarMicrofono(configuracionAudio *malgo.AllocatedContext, configuracionDispositivo malgo.DeviceConfig, puerto string) {
	servicio, err := malgo.InitDevice(configuracionAudio.Context, configuracionDispositivo, malgo.DeviceCallbacks{Data: RecibirAudio})

	if err != nil {
		fmt.Println("error al inicializar dispositivo: ", err)
		return
	}

	defer servicio.Uninit()

	for {
		EsperarParaGrabar()

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

		GrabarPorDuracion(1500 * time.Millisecond)

		if err := DetenerServicioMicrofono(servicio.Stop); err != nil {
			fmt.Println(err)
		}

		fmt.Println("Fin de grabacion.")

		datos := ObtenerBufferAudio()
		EnviarBuffer(conexion, direccion, datos)
		conexion.Close()
	}
}
