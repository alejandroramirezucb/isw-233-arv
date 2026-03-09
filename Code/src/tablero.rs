use std::cmp::PartialEq;
use rand::{Rng, SeedableRng};
use rand_chacha::ChaCha8Rng;

enum Orientacion {
    Horizontal,
    Vertical,
}

#[derive(Debug, PartialEq, Eq, Copy, Clone)]
pub enum Estado {
    Intacto,
    Impactado,
    Hundido,
    Agua,
}

pub fn crear_tablero(semilla: u64) -> [[Estado; 8]; 8] {
    let mut matriz = [[Estado::Agua; 8]; 8];
    let barcos = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    let mut rng = ChaCha8Rng::seed_from_u64(semilla);

    for barco in barcos {
        let mut x = rng.gen_range(0..8);
        let mut y = rng.gen_range(0..8);
        let mut orientacion = Orientacion::Horizontal;

        while !colocar_barcos(&mut matriz, barco, &orientacion, x, y) {
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

fn colocar_barcos(matriz: &mut [[Estado; 8]; 8], barco: i32, orientacion: &Orientacion, x: i32, y: i32) -> bool {
    match orientacion {
        Orientacion::Horizontal => {
            if y + barco > 8 {
                return false;
            }
            if y-1 >= 0 && matriz[x as usize][(y-1) as usize] == Estado::Intacto {
                return false;
            }
            if y+barco < 8 && matriz[x as usize][(y+barco) as usize] == Estado::Intacto {
                return false;
            }
            if x-1 >= 0 && y-1>=0 && matriz[(x-1) as usize][(y-1) as usize] == Estado::Intacto {
                return false;
            }
            if x+1 < 8 && y-1>=0 && matriz[(x+1) as usize][(y-1) as usize] == Estado::Intacto {
                return false;
            }
            if x-1 >= 0 && y+barco < 8 && matriz[(x-1) as usize][(y+barco) as usize] == Estado::Intacto {
                return false;
            }
            if x+1 < 8 && y+barco < 8 && matriz[(x+1) as usize][(y+barco) as usize] == Estado::Intacto {
                return false;
            }

            for i in 0..barco {
                if matriz[x as usize][(y + i) as usize] == Estado::Intacto {
                    return false;
                }
                if x-1 >= 0 && matriz[(x-1) as usize][(y + i) as usize] == Estado::Intacto {
                    return false;
                }
                if x+1 < 8 && matriz[(x+1) as usize][(y + i) as usize] == Estado::Intacto {
                    return false;
                }
            }

            for i in 0..barco {
                matriz[x as usize][(y + i) as usize] = Estado::Intacto;
            }

        }
        Orientacion::Vertical => {
            if x + barco > 8 {
                return false;
            }
            if x-1 >= 0 && matriz[(x-1) as usize][y as usize] == Estado::Intacto {
                return false;
            }
            if x+barco < 8 && matriz[(x+barco) as usize][y as usize] == Estado::Intacto {
                return false;
            }
            if x-1 >= 0 && y-1 >= 0 && matriz[(x-1) as usize][(y-1) as usize] == Estado::Intacto {
                return false;
            }
            if x-1 >= 0 && y+1 < 8 && matriz[(x-1) as usize][(y+1) as usize] == Estado::Intacto {
                return false;
            }
            if x+barco < 8 && y-1 >= 0 && matriz[(x+barco) as usize][(y-1) as usize] == Estado::Intacto {
                return false;
            }
            if x+barco < 8 && y+1 < 8 && matriz[(x+barco) as usize][(y+1) as usize] == Estado::Intacto {
                return false;
            }

            for i in 0..barco {
                if matriz[(x + i) as usize][y as usize] == Estado::Intacto{
                    return false;
                }
                if y-1 >= 0 && matriz[(x+i) as usize][(y-1) as usize] == Estado::Intacto {
                    return false;
                }
                if y+1 < 8 && matriz[(x+i) as usize][(y+1) as usize] == Estado::Intacto {
                    return false;
                }
            }

            for i in 0..barco {
                matriz[(x + i) as usize][y as usize] = Estado::Intacto;
            }
        }
    }

    true
}