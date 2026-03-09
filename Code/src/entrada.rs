use std::collections::HashMap;
use std::{env, io};
use crate::tcp::{Cliente, Servidor, Usuarios};

pub fn leer_movimiento() -> (i32, i32) {
    let columna_a_posicion = HashMap::from([("A", 0), ("B", 1), ("C", 2), ("D", 3), ("E", 4), ("F", 5), ("G", 6), ("H", 7)]);
    let mut linea = String::new();

    io::stdin().read_line(&mut linea).expect("Error al leer la linea");

    let (columna, fila) = linea.trim().split_at(1);

    let y = columna_a_posicion[columna];
    let x: i32 = fila.parse::<i32>().expect("Error en la conversion") - 1;

    (x, y)
}

pub fn leer_entrada() -> Result<Usuarios, String> {
    let args: Vec<String> = env::args().collect();

    if args.len() == 3 {
        let semilla = args[1].parse().unwrap();
        let puerto = args[2].parse().unwrap();

        Ok(Usuarios::Servidor(Servidor { semilla, puerto }))
    }
    else if args.len() == 4 {
        let semilla = args[1].parse().unwrap();
        let ip = args[2].clone();
        let puerto = args[3].parse().unwrap();

        Ok(Usuarios::Cliente(Cliente { servidor: Servidor { semilla, puerto }, ip }))
    }
    else {
        Err(String::from("Uso servidor: isw_233_arv semilla puerto\nUso cliente: isw_233_arv semilla ip puerto"))
    }
}