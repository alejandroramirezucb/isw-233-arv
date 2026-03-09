pub struct Servidor {
    pub semilla: u64,
    pub puerto: u64,
}

pub struct Cliente {
    pub servidor: Servidor,
    pub ip: String,
}

pub enum Usuarios {
    Servidor(Servidor),
    Cliente(Cliente),
}