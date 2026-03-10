use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};

pub struct Servidor {
    pub semilla: u64,
    pub puerto: u64,
}

pub struct Cliente {
    pub servidor: Servidor,
    pub ip: String,
}

pub enum Usuarios {
    Servidor(Servidor),
    Cliente(Cliente),
}

pub fn conectar_servidor(puerto: u64) -> TcpStream{
    let conexion = TcpListener::bind(format!("0.0.0.0:{puerto}")).unwrap();
    let (stream, _) = conexion.accept().unwrap();
    stream
}

pub fn conectar_cliente(ip : String, puerto: u64) -> TcpStream{
    TcpStream::connect(format!("{ip}:{puerto}")).unwrap()
}

pub fn enviar(stream: &mut TcpStream, datos: &[u8]) {
    stream.write_all(datos).unwrap();
}

pub fn recibir_resultado(stream: &mut TcpStream) -> u8 {
    let mut buf = [0; 1];
    stream.read_exact(&mut buf).unwrap();
    buf[0]
}

pub fn recibir_movimiento(stream: &mut TcpStream) -> String {
    let mut buf = [0; 2];
    stream.read_exact(&mut buf).unwrap();
    format!("{}{}", buf[0] as char, buf[1] as char)
}
