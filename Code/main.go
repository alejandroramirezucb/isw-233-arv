package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Print("ERROR: usa go run main.go [server|client|stop] [puerto]\n")
		return
	}

	modo := os.Args[1]
	puerto := os.Args[2]

	switch modo {
	case "server":
		StartServer(puerto)
	case "client":
		StartClient(puerto)
	case "stop":
		var ipServidor, ipCliente string
		
		if len(os.Args) >= 5 {
			ipServidor = os.Args[3]
			ipCliente = os.Args[4]
		} else if len(os.Args) >= 4 {
			ipServidor = os.Args[3]
			ipCliente = ipServidor
		} else {
			ipServidor = SolicitarDireccionIP()
			ipCliente = ipServidor
		}

		if err := EnviarComandoDetenerAmbos(ipServidor, ipCliente, puerto); err != nil {
			fmt.Println("ERROR:", err)
		}
	default:
		fmt.Print("ERROR: usa go run main.go [server|client|stop] [puerto]\n")
	}
}
