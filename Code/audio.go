package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
	"github.com/gen2brain/malgo"
)

var bufferAudio []byte
var bufferReproduccion []byte
var bloqueoReproduccion sync.Mutex

func InicializarAudio() (*malgo.AllocatedContext, error) {
	configuracionAudio, err := malgo.InitContext(nil, malgo.ContextConfig{}, nil)
	
	if err != nil {
		return nil, errors.New("error al inicializar audio: " + err.Error())
	}

	return configuracionAudio, nil
}

func ConfigurarDispositivoAudio() malgo.DeviceConfig {
	configuracionDispositivoAudio := malgo.DefaultDeviceConfig(malgo.Capture)
	configuracionDispositivoAudio.Capture.Format = malgo.FormatU8
	configuracionDispositivoAudio.Capture.Channels = 1
	configuracionDispositivoAudio.SampleRate = 44100
	configuracionDispositivoAudio.Alsa.NoMMap = 1
	return configuracionDispositivoAudio
}

func ConfigurarDispositivoReproduccion() malgo.DeviceConfig {
	configuracionDispositivoReproduccion := malgo.DefaultDeviceConfig(malgo.Playback)
	configuracionDispositivoReproduccion.Playback.Format = malgo.FormatU8
	configuracionDispositivoReproduccion.Playback.Channels = 1
	configuracionDispositivoReproduccion.SampleRate = 44100
	configuracionDispositivoReproduccion.Alsa.NoMMap = 1
	return configuracionDispositivoReproduccion
}

func RecibirAudio(bufferSalida, bufferEntrada []byte, numeroFrames uint32) {
	if len(bufferAudio) < 65000 {
		bufferAudio = append(bufferAudio, bufferEntrada...)
	}
}

func ReproducirAudio(bufferSalida, bufferEntrada []byte, numeroFrames uint32) {
	bloqueoReproduccion.Lock()
	n := copy(bufferSalida, bufferReproduccion)

	if n > 0 {
		if n < len(bufferReproduccion) {
			bufferReproduccion = bufferReproduccion[n:]
		} else {
			bufferReproduccion = bufferReproduccion[:0]
		}
	}

	bloqueoReproduccion.Unlock()

	if n < len(bufferSalida) {
		for i := n; i < len(bufferSalida); i++ {
			bufferSalida[i] = 0x80
		}
	}
}

func AgregarDatosParaReproduccion(datos []byte) {
	bloqueoReproduccion.Lock()
	const maxBuf = 200000

	if len(bufferReproduccion)+len(datos) > maxBuf {
		exceso := len(bufferReproduccion) + len(datos) - maxBuf
		bufferReproduccion = bufferReproduccion[exceso:]
	}

	bufferReproduccion = append(bufferReproduccion, datos...)
	bloqueoReproduccion.Unlock()
}

func ReiniciarBufferAudio() {
	bufferAudio = make([]byte, 0, 65000)
}

func IniciarServicioMicrofono(iniciar func() error) error {
	if err := iniciar(); err != nil {
		return fmt.Errorf("error al iniciar micrófono: %w", err)
	}

	return nil
}

func DetenerServicioMicrofono(detener func() error) error {
	if err := detener(); err != nil {
		return fmt.Errorf("error al detener micrófono: %w", err)
	}

	return nil
}

func GrabarPorDuracion(duracion time.Duration) {
	fmt.Print("Grabando... ")
	time.Sleep(duracion)
}

func ObtenerBufferAudio() []byte {
	return bufferAudio
}