package main

import (
	"fmt"
	"net"
	"time"
)

func EsperarParaGrabar(receptorControl *net.UDPConn) bool {
	const cuentaSegundos = 3
	fmt.Println()
	for i := cuentaSegundos; i > 0; i-- {
		fmt.Println("Iniciando grabación en", i)
		time.Sleep(1 * time.Second)
		
		if VerificarComandoDetener(receptorControl) {
			fmt.Println("\nComando 'CMD:STOP' recibido — deteniendo cliente")
			return false
		}
	}

	fmt.Println()
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
