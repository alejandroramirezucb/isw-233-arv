package main

import (
	"fmt"
	"net"
	"github.com/gen2brain/malgo"
)

func StartServer(puerto string) {
	direccionEscucha := ":" + puerto
	fmt.Println("Dirección del servidor:", direccionEscucha)

	direccionRed, err := net.ResolveUDPAddr("udp", direccionEscucha)

	if err != nil {
		fmt.Println("ERROR al resolver dirección:", err)
		return
	}

	conexion, err := net.ListenUDP("udp", direccionRed)

	if err != nil {
		fmt.Println("ERROR al escuchar:", err)
		return
	}

	defer conexion.Close()

	configuracionAudio, err := InicializarAudio()

	if err != nil {
		fmt.Println("ERROR al inicializar audio:", err)
		return
	}

	defer configuracionAudio.Uninit()

	configuracionReproductor := ConfigurarDispositivoReproduccion()
	dispositivo, err := malgo.InitDevice(configuracionAudio.Context, configuracionReproductor, malgo.DeviceCallbacks{Data: ReproducirAudio})

	if err != nil {
		fmt.Println("ERROR al inicializar dispositivo de reproducción:", err)
		return
	}

	defer dispositivo.Uninit()

	if err := dispositivo.Start(); err != nil {
		fmt.Println("ERROR al iniciar dispositivo de reproducción:", err)
	}

	escucharConexiones(conexion)
}

func escucharConexiones(conexion *net.UDPConn) {
	buffer := make([]byte, 65000)
	capacidadFrame := 1

	for {
		n, direccionRemota, err := conexion.ReadFromUDP(buffer)

		if err != nil {
			fmt.Println("ERROR al recibir:", err)
			continue
		}

		mensaje := string(buffer[:n])

		if mensaje == "CMD:STOP" {
			fmt.Println("Comando remoto 'CMD:STOP' recibido — deteniendo servidor")
			return
		}

		fmt.Println("Recibidos", n, "bytes de", direccionRemota.String())
		framesAReproducir := n / capacidadFrame
		AgregarDatosParaReproduccion(buffer[:framesAReproducir])
	}
}
