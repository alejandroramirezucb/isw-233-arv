package main

import (
	"fmt"
)

func StartServer(puerto string) {
	direccion := ":" + puerto
	fmt.Print("Direccion del servidor: ", direccion, "\n")
}
