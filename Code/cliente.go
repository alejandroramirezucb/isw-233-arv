package main

import (
	"errors"
	"fmt"
	"net"
	"time"

	"github.com/gen2brain/malgo"
)

var bufferAudio []byte

func IniciarCliente(puerto string) {
	var ip string
	fmt.Print("Ingrese la dirección IP del servidor: ")
	fmt.Scanln(&ip)

	direccion := ip + ":" + puerto
	conexion, err := getConexion(direccion)

	if err != nil {
		fmt.Println("ERROR:", err)
		return
	}

	defer conexion.Close()

	configuracionAudio, err := inicializarAudio()
	if err != nil {
		fmt.Println("ERROR:", err)
		return
	}

	defer configuracionAudio.Uninit()

	configuracionDispositivo := configurarDispositivoAudio()
	ejecutarMicrofono(configuracionAudio, configuracionDispositivo, conexion, direccion)
}

func getConexion(direccion string) (*net.UDPConn, error) {
	direccionRed, err := net.ResolveUDPAddr("udp", direccion)

	if err != nil {
		return nil, errors.New("no se pudo resolver la dirección: " + err.Error())
	}

	conexion, err := net.DialUDP("udp", nil, direccionRed)

	if err != nil {
		return nil, errors.New("no se pudo conectar: " + err.Error())
	}

	return conexion, nil
}

func inicializarAudio() (*malgo.AllocatedContext, error) {
	configuracionAudio, err := malgo.InitContext(nil, malgo.ContextConfig{}, nil)

	if err != nil {
		return nil, errors.New("error al inicializar audio: " + err.Error())
	}

	return configuracionAudio, nil
}

func configurarDispositivoAudio() malgo.DeviceConfig {
	configuracionDispositivo := malgo.DefaultDeviceConfig(malgo.Capture)
	configuracionDispositivo.Capture.Format = malgo.FormatU8
	configuracionDispositivo.Capture.Channels = 1
	configuracionDispositivo.SampleRate = 44100
	configuracionDispositivo.Alsa.NoMMap = 1

	return configuracionDispositivo
}

func recibirAudio(bufferSalida, bufferEntrada []byte, numeroFrames uint32) {
	if len(bufferAudio) < 65000 {
		bufferAudio = append(bufferAudio, bufferEntrada...)
	}
}

func ejecutarMicrofono(configuracionAudio *malgo.AllocatedContext, configuracionDispositivo malgo.DeviceConfig, conexion *net.UDPConn, direccion string) {
	servicio, err := malgo.InitDevice(configuracionAudio.Context, configuracionDispositivo, malgo.DeviceCallbacks{Data: recibirAudio})

	if err != nil {
		fmt.Println("error al inicializar dispositivo: ", err)
		return
	}

	defer servicio.Uninit()

	for {
		esperarParaGrabar()
		reiniciarBufferAudio()

		if err := iniciarServicioMicrofono(servicio.Start); err != nil {
			fmt.Println(err)
			continue
		}

		grabarPorDuracion(1500 * time.Millisecond)

		if err := detenerServicioMicrofono(servicio.Stop); err != nil {
			fmt.Println(err)
		}

		fmt.Println("Fin de grabación.")

		enviarBuffer(conexion, direccion)
	}
}

func esperarParaGrabar() {
	fmt.Println("\nPresiona ENTER para grabar (1.5s)...")
	var entrada string
	fmt.Scanln(&entrada)
}

func reiniciarBufferAudio() {
	bufferAudio = make([]byte, 0, 65000)
}

func iniciarServicioMicrofono(iniciar func() error) error {
	if err := iniciar(); err != nil {
		return fmt.Errorf("error al iniciar micrófono: %w", err)
	}

	return nil
}

func detenerServicioMicrofono(detener func() error) error {
	if err := detener(); err != nil {
		return fmt.Errorf("error al detener micrófono: %w", err)
	}

	return nil
}

func grabarPorDuracion(duracion time.Duration) {
	fmt.Print("Grabando... ")
	time.Sleep(duracion)
}

func enviarBuffer(conexion *net.UDPConn, direccion string) {
	if len(bufferAudio) == 0 {
		return
	}

	n := len(bufferAudio)

	if n > 65000 {
		n = 65000
	}
	if _, err := conexion.Write(bufferAudio[:n]); err != nil {
		fmt.Println("error al enviar:", err)
	} else {
		fmt.Printf("Enviados %d bytes a %s\n", n, direccion)
	}
}
