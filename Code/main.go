package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Print("ERROR: usa go run main.go [servidor|cliente|detener] [puerto]\n")
		return
	}

	modo := os.Args[1]
	puerto := os.Args[2]

	switch modo {
	case "servidor":
		IniciarServidor(puerto)
	case "cliente":
		IniciarCliente(puerto)
	case "detener":
		var ip string
		if len(os.Args) >= 4 {
			ip = os.Args[3]
		} else {
			ip = SolicitarDireccionIP()
		}
		if err := EnviarComandoDetener(ip, puerto); err != nil {
			fmt.Println("ERROR:", err)
		}
	default:
		fmt.Print("ERROR: usa go run main.go [servidor|cliente|detener] [puerto]\n")
	}
}
