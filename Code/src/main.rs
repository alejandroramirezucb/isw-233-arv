use crate::entrada::leer_entrada;
use crate::juego::iniciar_juego;
use crate::tcp::Usuarios;

mod tablero;
mod juego;
mod entrada;
mod visualizacion;
mod tcp;

fn main() {
    let usuario = match leer_entrada() {
        Ok(resultado) => resultado,
        Err(error) => {
            println!("{}", error);
            return;
        }
    };

    let mut semilla_servidor = 0;
    let mut semilla_cliente = 0;
    
    match usuario {
        Usuarios::Servidor(servidor) => {
            semilla_servidor = servidor.semilla;
            let puerto = servidor.puerto;
        },
        Usuarios::Cliente(cliente) => {
            semilla_cliente = cliente.servidor.semilla;
            let puerto = cliente.servidor.puerto;
            let ip = cliente.ip;
        },
    }
    
    iniciar_juego(semilla_cliente, semilla_servidor);
}
