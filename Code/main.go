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
		fmt.Print("ERROR: usa go run main.go [server|client|stop] [puerto]\n")
	}
}
