use rand::{thread_rng, Rng};

enum Orientacion {
    Horizontal,
    Vertical,
}

pub fn crear_tablero() -> [[bool; 8]; 8] {
    let mut matriz = [[false; 8]; 8];
    let barcos = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    let mut rng = thread_rng();

    for barco in barcos {
        let mut x = 0;
        let mut y = 0;
        let mut orientacion = Orientacion::Horizontal;

        while !colocar_barco(&mut matriz, barco, &orientacion, x, y) {
            x = rng.gen_range(0..8);
            y = rng.gen_range(0..8);

            orientacion = if rng.gen_bool(0.5) {
                Orientacion::Horizontal
            } else {
                Orientacion::Vertical
            };
        }
    }

    matriz
}

fn colocar_barco(matriz: &mut [[bool; 8]; 8], barco: i32, orientacion: &Orientacion, x: i32, y: i32) -> bool {
    match orientacion {
        Orientacion::Horizontal => {
            if y + barco > 8 {
                return false;
            }

            for i in 0..barco {
                if matriz[x as usize][(y + i) as usize] {
                    return false;
                }
            }

            for i in 0..barco {
                matriz[x as usize][(y + i) as usize] = true;
            }
        }
        Orientacion::Vertical => {
            if x + barco > 8 {
                return false;
            }

            for i in 0..barco {
                if matriz[(x + i) as usize][y as usize] {
                    return false;
                }
            }

            for i in 0..barco {
                matriz[(x + i) as usize][y as usize] = true;
            }
        }
    }

    true
}