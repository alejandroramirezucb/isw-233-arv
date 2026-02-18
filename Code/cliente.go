package main

import (
	"fmt"
	"net"
)

func StartClient(puerto string) {
	var ip string

	fmt.Print("Ingrese la direccion IP del servidor: ")
	fmt.Scanln(&ip)

	direccion := ip + ":" + puerto
	conexion := getConexion(direccion)

	defer conexion.Close()
}

func getConexion(direccion string) *net.UDPConn {
	direccionRed, err := net.ResolveUDPAddr("udp", direccion)

	if err != nil {
		fmt.Print("ERROR: no se pudo crear la direccion de red\n")
		return nil
	}

	conexion, err := net.DialUDP("udp", nil, direccionRed)

	if err != nil {
		fmt.Print("ERROR: no se pudo conectar al servidor\n")
		return nil
	}

	return conexion
}
