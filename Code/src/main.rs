use crate::tablero::crear_tablero;
use crate::juego::realizar_movimiento;

mod tablero;
mod juego;

fn main (){
    iniciar_juego()
}

fn iniciar_juego(){
    let mut matriz_cliente = crear_tablero();
    let mut matriz_servidor = crear_tablero();
    let mut turno = 0;

    loop {
        if turno % 2 == 0 {
            realizar_movimiento(&mut matriz_cliente, 0, 0);
        } else {
            realizar_movimiento(&mut matriz_servidor, 0, 0);
        }

        turno += 1;
    }
}