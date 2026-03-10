# TCP - Battleship

## Introducción

Programa que implementa el juego de **Battleship** usando **TCP**. El programa permite que dos jugadores (uno servidor y otro cliente) jueguen en tiempo real. Un jugador actúa como servidor escuchando conexiones entrantes, mientras que el otro se conecta como cliente. Cuando el cliente no acierta, se invierten los roles de los jugadores.

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Guía de Uso](#guía-de-uso)
4. [Prompts](#prompts)

---

## Estructura del Proyecto

```
Code/
├── src/
│   ├── main.rs
│   ├── entrada.rs
│   ├── juego.rs
│   ├── tablero.rs
│   ├── tcp.rs
│   └── visualizacion.rs
├── Cargo.toml
├── build.bat
└── README.md
```

## Guía de Uso

### Ejecutar el Servidor

```bash
isw_233_arv <semilla> <puerto>
```

**Ejemplo:**

```bash
isw_233_arv 42 8080
```

### Ejecutar el Cliente

```bash
isw_233_arv <semilla> <ip_servidor> <puerto>
```

**Ejemplo:**

```bash
isw_233_arv 42 127.0.0.1 8080
```

---

## Prompts

### Prompt 1

**Pregunta:** Explicame la tarea, no quiero codigo, quiero una explicacion de como hacerlo, y que librerias tengo que usar para programarlo en rust?

#### Respuesta

##### ¿Qué hay que hacer?

Implementar el juego de Batalla Naval donde **dos jugadores compiten a través de una conexión TCP**. Uno actúa como servidor y otro como cliente. El cliente siempre dispara primero.

##### El Tablero

Es una cuadrícula de **8×8**. Las columnas van de la **A a la H** y las filas del **1 al 8**. Cada celda puede estar en uno de estos estados:

- **UNKNOWN** — No sabes qué hay ahí (así ves el campo enemigo al inicio)
- **EMPTY** — Disparaste y fallaste
- **HIT** — Golpeaste una parte de un barco pero no lo hundiste
- **KILL** — Destruiste un barco completo
- **SHIP** — Parte de tu propio barco (solo visible en tu campo)

##### Los Barcos (10 en total)

| Tipo       | Tamaño   | Cantidad |
| ---------- | -------- | -------- |
| Acorazado  | 4 celdas | 1        |
| Crucero    | 3 celdas | 2        |
| Destructor | 2 celdas | 3        |
| Submarino  | 1 celda  | 4        |

##### Cómo Colocar los Barcos

La colocación es **aleatoria pero reproducible**, usando una **semilla (seed)** que recibes como argumento. Con la misma semilla, siempre obtienes la misma distribución, lo que permite depurar y testear.

Las reglas de colocación son:

- Los barcos **no pueden solaparse**
- Los barcos **no pueden tocarse** entre sí, ni horizontal, ni vertical, **ni diagonalmente** — debe haber al menos una celda de separación en todas las direcciones

Entonces al colocar cada barco debes verificar que ninguna celda adyacente (incluyendo diagonales) esté ocupada por otro barco.

##### Flujo del Juego

1. Cada jugador genera su campo con sus barcos usando la semilla
2. El cliente dispara primero
3. Un disparo se envía como **2 bytes de texto**, por ejemplo `C7` (columna C, fila 7)
4. El receptor procesa el disparo y responde con **1 byte**:
   - `0` = Fallo (el turno pasa al otro)
   - `1` = Impacto (el que disparó vuelve a disparar)
   - `2` = Hundido (el que disparó vuelve a disparar)
5. El juego termina cuando todos los barcos de un jugador están destruidos

##### Argumentos de Línea de Comandos

- **Servidor:** `programa semilla puerto`
- **Cliente:** `programa semilla ip_servidor puerto`

##### Lo que debes implementar en Rust

Básicamente dos grandes piezas:

**1. La lógica del tablero** — generar el campo con la semilla, procesar disparos entrantes, registrar resultados en el campo enemigo, saber si perdiste.

**2. El agente del juego** — el bucle principal que maneja los turnos, lee y envía movimientos por TCP, y decide cuándo el juego termina.

La parte más delicada es el **networking con TCP**, ya que es un protocolo de stream y puede que los datos lleguen fragmentados, así que debes asegurarte de leer exactamente los bytes que esperas.

---

### Prompt 2

**Pregunta:** ¿Como coloco los barcos aleatoriamente en rust?

#### Respuesta

Un generador de números pseudoaleatorios (PRNG) con la misma semilla **siempre produce la misma secuencia de números**. Eso es exactamente lo que necesitas.

En Rust, la librería estándar no incluye un PRNG, pero el crate más común es **`rand`**. Específicamente usarías `rand::SeedableRng` con algún generador como `rand_chacha::ChaCha8Rng` o el más simple `rand::rngs::SmallRng`.

##### El flujo lógico para colocar barcos

1. **Inicializar el generador con la semilla.** Recibes la semilla como argumento (un número entero). Con ese número inicializas el PRNG. A partir de ahí, cada número "aleatorio" que generes será siempre el mismo para esa semilla.
2. **Orden de colocación importa.** Debes colocar los barcos **en orden de mayor a menor** (primero el de 4, luego los de 3, etc.). Esto es importante porque si cambias el orden, los números aleatorios se consumen en distinto orden y el resultado cambia.
3. **Generar una posición candidata.** Para cada barco necesitas generar:
   - Una **columna** (0 a 7)
   - Una **fila** (0 a 7)
   - Una **orientación** (horizontal o vertical)
4. **Validar la posición.** Antes de colocar el barco, verificas que:
   - El barco **cabe** dentro del tablero (no se sale de los límites)
   - Ninguna celda que ocuparía está **ya ocupada**
   - Ninguna celda **adyacente** (incluyendo diagonales) está ocupada por otro barco
5. **Reintentar si no es válida.** Si la posición no es válida, **generas otra** con el PRNG y vuelves a validar. Repites hasta encontrar una posición válida.

##### La parte de las adyacencias (la más delicada)

Para verificar que un barco no toca a otro, por cada celda que va a ocupar el barco nuevo, revisas todas las 8 celdas alrededor (un cuadrado de 3×3 centrado en esa celda). Si cualquiera de esas celdas ya tiene un barco, la posición no es válida.

```
[ ][ ][ ]
[ ][X][ ]   ← todas estas celdas alrededor de X deben estar vacías
[ ][ ][ ]
```

Solo tienes que tener cuidado con los **bordes del tablero** — una celda en la columna 0 no tiene vecinos a la izquierda, así que debes hacer clamp o chequear que los índices no sean negativos (en Rust esto es importante porque los índices son `usize`).

##### Crates que necesitarías

En tu `Cargo.toml`:

```
rand = "0.8"
rand_chacha = "0.3"   ← recomendado porque es estable entre plataformas
```

`ChaCha8Rng` es mejor que `SmallRng` para este caso porque `SmallRng` **no garantiza** el mismo resultado en todas las plataformas, lo que rompería la reproducibilidad cuando el cliente y servidor corren en máquinas distintas.

##### Resumen del flujo

```
semilla → SeedableRng::seed_from_u64(semilla)
         ↓
para cada barco (de grande a pequeño):
    loop:
        col = rng.gen_range(0..8)
        fila = rng.gen_range(0..8)
        orientacion = rng.gen_range(0..2)

        si cabe en tablero Y no choca con nadie:
            colocar barco
            break
```

---

### Prompt 3

**Pregunta:** Todo funcionaba bien, pero desde que agregue `let mut rng = ChaCha8Rng::seed_from_u64(semilla)` ya no funciona, como lo arreglo?

#### Respuesta

Con ChaCha8Rng y semilla 42, la secuencia de números generados hace que algún barco nunca encuentre posición válida con tus restricciones de adyacencia, causando bucle infinito.
Con thread_rng era diferente cada vez, entonces siempre encontraba una posición eventual.

El problema es que la primera posición siempre es `x=0, y=0` hardcodeada. Con `thread_rng` eso no importaba porque era impredecible, pero con `ChaCha8Rng` esa posición fija puede bloquear el tablero.

Cambia solo estas dos líneas en `crear_tablero`:

```rust
// antes
let mut x = 0;
let mut y = 0;

// después
let mut x = rng.gen_range(0..8);
let mut y = rng.gen_range(0..8);
```

Así la primera posición también es aleatoria y no bloquea las posiciones siguientes.

---

### Prompt 4

**Pregunta:** Dime los requerimientos que necesito para usar TCP, no codigo directamente

#### Respuesta

Basándome en la tarea, los requerimientos son:

##### Argumentos

- **Servidor:** recibe `seed` y `puerto`
- **Cliente:** recibe `seed`, `ip` y `puerto`
- Detectas si eres cliente o servidor por la cantidad de argumentos (3 = servidor, 4 = cliente)

##### Conexión

- El servidor crea un socket, escucha en el puerto y espera que el cliente se conecte
- El cliente crea un socket y se conecta a la IP y puerto del servidor
- Una vez conectados ambos tienen un stream para comunicarse

##### Protocolo de comunicación

- **Disparo** → se envían **2 bytes** con el texto de las coordenadas, ej: `B6`
- **Respuesta** → se envía **1 byte** con el resultado: `0`=miss, `1`=hit, `2`=kill

##### Turno

- El **cliente siempre dispara primero**
- Si es miss → cambia el turno
- Si es hit o kill → el mismo jugador vuelve a disparar

##### Flujo por turno

- **Tu turno:** lees input del usuario → envías 2 bytes al oponente → recibes 1 byte de resultado → actualizas tu tablero enemigo
- **Turno enemigo:** recibes 2 bytes → procesas el disparo en tu tablero → envías 1 byte de resultado

##### Fin del juego

- El juego termina cuando todos los barcos de un jugador están hundidos (`ha_perdido` retorna true)
