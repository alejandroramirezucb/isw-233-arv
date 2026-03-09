use std::collections::HashMap;
use std::io;

pub fn leer_movimiento() -> (i32, i32) {
    let columna_a_posicion = HashMap::from([("A", 0), ("B", 1), ("C", 2), ("D", 3), ("E", 4), ("F", 5), ("G", 6), ("H", 7)]);
    let mut linea = String::new();

    io::stdin().read_line(&mut linea).expect("Error al leer la linea");

    let (columna, fila) = linea.trim().split_at(1);

    let y = columna_a_posicion[columna];
    let x: i32 = fila.parse::<i32>().expect("Error en la conversion") - 1;

    (x, y)
}