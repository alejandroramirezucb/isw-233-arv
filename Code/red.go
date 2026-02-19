package main

import (
	"errors"
	"fmt"
	"net"
	"strconv"
	"time"
)

func ObtenerConexion(direccion string) (*net.UDPConn, error) {
	direccionRed, err := net.ResolveUDPAddr("udp", direccion)

	if err != nil {
		return nil, errors.New("no se pudo resolver la dirección: " + err.Error())
	}

	conexion, err := net.DialUDP("udp", nil, direccionRed)

	if err != nil {
		return nil, errors.New("no se pudo conectar: " + err.Error())
	}

	return conexion, nil
}


func EnviarBuffer(conexion *net.UDPConn, direccion string, datos []byte) {
	if len(datos) == 0 {
		return
	}

	capacidadFrame := 1
	totalFrames := len(datos)
	bytesAEnviar := totalFrames * capacidadFrame

	if bytesAEnviar > 65000 {
		bytesAEnviar = 65000
	}

	if _, err := conexion.Write(datos[:bytesAEnviar]); err != nil {
		fmt.Println("error al enviar:", err)
	} else {
		fmt.Println("Enviados", bytesAEnviar, "bytes a", direccion)
	}
}

func EnviarComandoDetener(ip, puerto string) error {
	direccion := ip + ":" + puerto
	conexion, err := net.Dial("udp", direccion)

	if err != nil {
		return errors.New("no se pudo conectar: " + err.Error())
	}

	defer conexion.Close()

	if _, err := conexion.Write([]byte("CMD:STOP")); err != nil {
		return errors.New("error al enviar comando: " + err.Error())
	}

	fmt.Println("Comando 'CMD:STOP' enviado a", direccion)

	return nil
}

func VerificarComandoDetener(receptor *net.UDPConn) bool {
	buffer := make([]byte, 16)
	receptor.SetReadDeadline(time.Now().Add(50 * time.Millisecond))
	n, _, err := receptor.ReadFromUDP(buffer)
	receptor.SetReadDeadline(time.Time{})

	if err != nil {
		return false
	}

	return string(buffer[:n]) == "CMD:STOP"
}

func EnviarComandoDetenerAmbos(ipServidor, ipCliente, puerto string) error {
	puertoInt, err := strconv.Atoi(puerto)

	if err != nil {
		return errors.New("puerto inválido: " + err.Error())
	}

	puertoControlCliente := strconv.Itoa(puertoInt + 1)
	errServidor := EnviarComandoDetener(ipServidor, puerto)
	errCliente := EnviarComandoDetener(ipCliente, puertoControlCliente)

	if errServidor != nil && errCliente != nil {
		return errors.New("error al detener servidor: " + errServidor.Error() + "; error al detener cliente: " + errCliente.Error())
	}

	if errServidor != nil {
		return errors.New("error al detener servidor: " + errServidor.Error())
	}

	if errCliente != nil {
		return errors.New("error al detener cliente: " + errCliente.Error())
	}

	return nil
}
