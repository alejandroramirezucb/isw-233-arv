package main

import (
	"fmt"
)

func StartClient(puerto string) {
	var ip string

	fmt.Print("Ingrese la direccion IP del servidor: ")
	fmt.Scanln(&ip)

	direccion := ip + ":" + puerto
	fmt.Print("Direccion del cliente: ", direccion, "\n")
}
