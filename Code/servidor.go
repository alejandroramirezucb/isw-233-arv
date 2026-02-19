package main

import (
	"fmt"
	"github.com/gen2brain/malgo"
	"net"
)

func IniciarServidor(puerto string) {
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

	reproductorCfg := ConfigurarDispositivoReproduccion()
	dispositivo, err := malgo.InitDevice(configuracionAudio.Context, reproductorCfg, malgo.DeviceCallbacks{Data: ReproducirAudio})

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

	for {
		n, direccionRemota, err := conexion.ReadFromUDP(buffer)

		if err != nil {
			fmt.Println("ERROR al recibir:", err)
			continue
		}

		if string(buffer[:n]) == "CMD:STOP" {
			fmt.Println("Comando remoto 'CMD:STOP' recibido — deteniendo servidor")
			return
		}

		fmt.Println("Recibidos", n, "bytes de", direccionRemota.String())
		AgregarDatosParaReproduccion(buffer[:n])
	}
}
