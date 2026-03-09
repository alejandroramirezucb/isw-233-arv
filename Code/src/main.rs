use crate::entrada::leer_semilla;
use crate::juego::iniciar_juego;

mod tablero;
mod juego;
mod entrada;
mod visualizacion;

fn main() {
    let (semilla_cliente, semilla_servidor) = match leer_semilla() {
        Ok(semillas) => semillas,
        Err(error) => {
            println!("{}", error);
            return;
        }
    };
    
    iniciar_juego(semilla_cliente, semilla_servidor);
}
