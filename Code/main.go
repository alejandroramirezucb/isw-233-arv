package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Print("ERROR: usa go run main.go [server|client] [port]\n")
		return
	}

	modo := os.Args[1]
	puerto := os.Args[2]

	switch modo {
	case "server":
		StartServer(puerto)
	case "client":
		StartClient(puerto)
	default:
		fmt.Print("ERROR: usa go run main.go [server|client] [port]\n")
	}
}
