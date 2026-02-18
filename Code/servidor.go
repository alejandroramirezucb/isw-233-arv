package main

import (
	"fmt"
)

func IniciarServidor(puerto string) {
	direccionEscucha := ":" + puerto
	fmt.Println("Dirección del servidor:", direccionEscucha)
}
