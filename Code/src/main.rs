mod tablero;

fn main (){
    let matriz_cliente = tablero::crear_tablero();
    let matriz_servidor = tablero::crear_tablero();

    println!("{matriz_cliente:#?}");
    println!("{matriz_servidor:#?}");
}
