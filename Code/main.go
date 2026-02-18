package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Print("ERROR: usa go run main.go [servidor|cliente] [puerto]\n")
		return
	}

	modo := os.Args[1]
	puerto := os.Args[2]

	switch modo {
	case "servidor":
		IniciarServidor(puerto)
	case "cliente":
		IniciarCliente(puerto)
	default:
		fmt.Print("ERROR: usa go run main.go [servidor|cliente] [puerto]\n")
	}
}
