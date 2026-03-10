use crate::entrada::leer_conexion;
use crate::juego::iniciar_juego;
use crate::tcp::{conectar_cliente, conectar_servidor, Usuarios};

mod tablero;
mod juego;
mod entrada;
mod visualizacion;
mod tcp;

fn main() {
    let usuario = match leer_conexion() {
        Ok(resultado) => resultado,
        Err(error) => {
            println!("{}", error);
            return;
        }
    };

    match usuario {
        Usuarios::Servidor(servidor) => {
            println!("Esperando conexion en puerto {}...", servidor.puerto);
            let stream = conectar_servidor(servidor.puerto);
            iniciar_juego(stream, servidor.semilla, false);
        },
        Usuarios::Cliente(cliente) => {
            println!("Conectando a {}:{}...", cliente.ip, cliente.servidor.puerto);
            let stream = conectar_cliente(cliente.ip, cliente.servidor.puerto);
            iniciar_juego(stream, cliente.servidor.semilla, true);
        },
    }
}
