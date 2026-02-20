package main

import (
	"fmt"
	"net"
)

func EsperarParaGrabar(receptorControl *net.UDPConn) bool {
	if receptorControl != nil && VerificarComandoDetener(receptorControl) {
		fmt.Println("Comando 'CMD:STOP' recibido — deteniendo cliente")
		return false
	}
	
	return true
}

func SolicitarDireccionIP() string {
	var ip string
	fmt.Print("Ingrese la dirección IP del servidor: ")
	fmt.Scanln(&ip)

	return ip
}

func SolicitarDireccionIPCliente() string {
	var ip string
	fmt.Print("Ingrese la dirección IP del cliente: ")
	fmt.Scanln(&ip)

	return ip
}
