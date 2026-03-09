use crate::tablero::Estado;

pub fn visualizar_tablero(matriz : &[[Estado; 8]; 8]){
    println!("  A B C D E F G H");

    for i in 0..8{
        print!("{} ", i+1);

        for j in 0..8{
            match matriz[i][j]{
                Estado::Impactado => {
                    print!("# ")
                }
                Estado::Hundido => {
                    print!("x ")
                }
                Estado::Intacto | Estado::Agua => {
                    print!("~ ");
                }
            }
        }

        println!();
    }
}