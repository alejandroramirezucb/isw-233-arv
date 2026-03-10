use std::net::TcpStream;
use crate::entrada::{leer_movimiento, parsear_movimiento};
use crate::tablero::{crear_tablero, Estado};
use crate::tcp::{enviar, recibir_movimiento, recibir_resultado};
use crate::visualizacion::visualizar_tablero;

#[derive(Debug)]
pub enum Resultado {
    Empty,
    Hit,
    Kill,
}

pub fn iniciar_juego(mut stream: TcpStream, semilla: u64, es_cliente: bool) {
    let mut matriz = crear_tablero(semilla);
    let mut turno_cliente = es_cliente;
    let mut kills = 0;

    while !ha_perdido(&mut matriz) && kills < 10 {
        if turno_cliente {
            println!("-------Cliente-------");

            visualizar_tablero(&matriz);
            let movimiento = leer_movimiento();
            enviar(&mut stream, movimiento.as_bytes());

            match recibir_resultado(&mut stream) {
                0 => {
                    println!("Agua");
                    turno_cliente = false;
                },
                1 => println!("Impacto!"),
                _ => {
                    println!("Hundido!");
                    kills += 1;
                }
            }
        }
        else {
            println!("-------Servidor-------");

            visualizar_tablero(&matriz);
            let movimiento = recibir_movimiento(&mut stream);
            let (x, y) = parsear_movimiento(&movimiento);
            let resultado = realizar_movimiento(&mut matriz, x, y);

            let byte = match resultado {
                Resultado::Empty => {
                    turno_cliente = true;
                    0
                },
                Resultado::Hit => 1,
                Resultado::Kill => 2
            };

            enviar(&mut stream, &[byte]);
        }
    }

    if kills == 10 {
        println!("Ganaste!");
    }
    else {
        println!("Perdiste :(");
    }
}

fn realizar_movimiento(matriz: &mut [[Estado; 8]; 8], x:i32, y:i32) -> Resultado {
    if matriz[x as usize][y as usize] == Estado::Agua{
        return Resultado::Empty;
    }

    matriz[x as usize][y as usize] = Estado::Impactado;

    if esta_hundido(matriz, x, y){
        Resultado::Kill
    }
    else {
        Resultado::Hit
    }
}

fn esta_hundido(matriz: &mut [[Estado; 8]; 8], x: i32, y: i32) -> bool {
    let mut i1 = x;
    while i1 > 0 && matriz[(i1-1) as usize][y as usize] != Estado::Agua {
        i1 -= 1;
    }

    let mut i2 = x;
    while i2 < 7 && matriz[(i2+1) as usize][y as usize] != Estado::Agua {
        i2 += 1;
    }

    let mut j1 = y;
    while j1 > 0 && matriz[x as usize][(j1-1) as usize] != Estado::Agua {
        j1 -= 1;
    }

    let mut j2 = y;
    while j2 < 7 && matriz[x as usize][(j2+1) as usize] != Estado::Agua {
        j2 += 1;
    }

    let mut hundido = true;

    for i in i1..=i2 {
        if matriz[i as usize][y as usize] == Estado::Intacto {
            hundido = false;
        }
    }

    for j in j1..=j2 {
        if matriz[x as usize][j as usize] == Estado::Intacto {
            hundido = false;
        }
    }

    if hundido {
        for i in i1..=i2 {
            matriz[i as usize][y as usize] = Estado::Hundido;
        }

        for j in j1..=j2 {
            matriz[x as usize][j as usize] = Estado::Hundido;
        }
    }

    hundido
}

pub fn ha_perdido(matriz: &mut [[Estado; 8]; 8]) -> bool {
    for i in 0..8{
        for j in 0..8{
            if matriz[i][j] == Estado::Intacto{
                return false;
            }
        }
    }

    true
}
