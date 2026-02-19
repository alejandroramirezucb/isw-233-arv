package main

import "fmt"

func EsperarParaGrabar() {
	fmt.Println("\nPresiona ENTER para grabar (1.5s)...")
	var entrada string
	fmt.Scanln(&entrada)
}

func SolicitarDireccionIP() string {
	var ip string
	fmt.Print("Ingrese la dirección IP del servidor: ")
	fmt.Scanln(&ip)

	return ip
}
