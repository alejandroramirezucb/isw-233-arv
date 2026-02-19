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

	n := len(datos)

	if n > 65000 {
		n = 65000
	}
	if _, err := conexion.Write(datos[:n]); err != nil {
		fmt.Println("error al enviar:", err)
	} else {
		fmt.Println("Enviados", n, "bytes a", direccion)
	}
}

func EnviarComandoDetener(ip, puerto string) error {
	direccion := ip + ":" + puerto
	conn, err := net.Dial("udp", direccion)

	if err != nil {
		return errors.New("no se pudo conectar: " + err.Error())
	}

	defer conn.Close()

	if _, err := conn.Write([]byte("CMD:STOP")); err != nil {
		return errors.New("error al enviar comando: " + err.Error())
	}

	fmt.Println("Comando 'CMD:STOP' enviado a", direccion)

	return nil
}
