package main

import (
	"errors"
	"fmt"
	"net"
)

func ObtenerConexion(direccion string) (*net.UDPConn, error) {
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

func EnviarBuffer(conexion *net.UDPConn, direccion string, datos []byte) {
	if len(datos) == 0 {
		return
	}

	capacidadFrame := 1
	totalFrames := len(datos)
	bytesAEnviar := totalFrames * capacidadFrame

	if bytesAEnviar > 65000 {
		bytesAEnviar = 65000
	}

	if _, err := conexion.Write(datos[:bytesAEnviar]); err != nil {
		fmt.Println("error al enviar:", err)
	} else {
		fmt.Println("Enviados", bytesAEnviar, "bytes a", direccion)
	}
}

func EnviarComandoDetener(ip, puerto string) error {
	direccion := ip + ":" + puerto
	conexion, err := net.Dial("udp", direccion)

	if err != nil {
		return errors.New("no se pudo conectar: " + err.Error())
	}

	defer conexion.Close()

	if _, err := conexion.Write([]byte("CMD:STOP")); err != nil {
		return errors.New("error al enviar comando: " + err.Error())
	}

	fmt.Println("Comando 'CMD:STOP' enviado a", direccion)

	return nil
}
