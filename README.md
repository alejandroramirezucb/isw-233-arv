# UDP Walkie-Talkie

El programa graba audio desde un micrófono, lo transmite mediante UDP y lo reproduce en un servidor.

## Tabla de contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Detalles técnicos](#detalles-técnicos)
- [Prompts y respuestas](#prompts-y-respuestas)
- [Cumplimiento](#cumplimiento)

## Instalación

Antes de compilar o ejecutar, es necesario instalar la dependencia de audio:

```bash
# instalar la dependencia de audio (malgo)
go get github.com/gen2brain/malgo
```

## Uso

- Iniciar el servidor: `go run Code/main.go server <puerto>`
- Iniciar el cliente: `go run Code/main.go client <puerto>` (se solicitará la IP antes de cada envío)
- Detener al cliente y servidor: `go run Code/main.go stop <puerto> [ip]`

## Prompts y respuestas

### Prompt 1:

"Explicame que estructura, tecnologias deberia usar para completar esta tarea"

#### Respuesta:

- **Modo de Operación:** El programa debe funcionar como **Cliente** o **Servidor** basándose en un argumento de línea de comandos.

- **Configuración de Puerto:** El usuario debe especificar el puerto de conexión a través de la línea de comandos.

- **Comportamiento del Cliente:**
- Debe solicitar al usuario la dirección IP del servidor para cada mensaje de audio.

- Grabar hasta 65,000 frames de audio mono de 8 bits (aprox. 1.5 segundos).

- Enviar los datos grabados como un único datagrama UDP.

- **Comportamiento del Servidor:**
- Escuchar datagramas entrantes y reproducir el audio inmediatamente.

- Solo recibe datos, no envía respuestas al cliente.

## Detalles técnicos

Para cumplir con la robustez solicitada, debes manejar los buffers cuidadosamente:

- **Formato de Audio:** Muestras mono de 8-bit.

- **Cálculo de Envío:** `Bytes a Enviar = Total Frames * Tamaño del Frame`.

- **Cálculo de Reproducción:** `Frames a Reproducir = Tamaño del Buffer Recibido / Tamaño del Frame`.

- _Nota:_ Aunque el tamaño del frame sea 1 byte, tu lógica debe ser agnóstica al tamaño para ser robusta.

### Tecnologías y librerías (Ecosistema Go)

Dado que Go no tiene grabación/reproducción de audio avanzada en su librería estándar, necesitarás una librería externa, además de los paquetes nativos de red.

- **Red (`net`):** Usarás el paquete estándar `net` de Go.
- Para el servidor: `net.ListenPacket("udp", ...)` para recibir datagramas.
- Para el cliente: `net.Dial("udp", ...)` o `net.ResolveUDPAddr` para enviar.

- **Argumentos (`os` o `flag`):** Para leer los flags `-mode` y `-port` desde la terminal.

- **Audio (Librería Externa):** El documento menciona un "recorder" que devuelve un buffer. En Go, las opciones más comunes para esto son:

- **Malgo (MiniAudio):** (`github.com/gen2brain/malgo`) Muy eficiente para manipular buffers de audio crudos y dispositivos.
- **PortAudio:** (`github.com/gordonklaus/portaudio`) Un clásico wrapper para I/O de audio.
- _Nota:_ Asegúrate de configurar la librería para capturar/reproducir en formato `Unsigned Int 8-bit` (mono) como pide la tarea.

## Estructura del proyecto

Para mantener el código organizado según las funciones principales sugeridas, te recomiendo esta estructura:

```text
/udp-walkie-talkie
│
├── go.mod              # Gestión de dependencias
├── main.go             # Entry point: Parsea argumentos (cli/srv y puerto)
│                       # y llama a StartClient o StartServer.
│
├── client.go           # Contiene la función StartClient(port).
│                       # Lógica: Loop de inputs, grabar audio, enviar UDP.
│
├── server.go           # Contiene la función StartServer(port).
│                       # Lógica: Loop infinito de escucha UDP, reproducir audio.
│
└── audio_utils.go      # (Opcional) Wrappers para tu librería de audio
                        # para inicializar dispositivos y manejar buffers.

```

## Pasos de implementación clave

1. **Validar Argumentos:** En `main.go`, verifica que se pasen "client" o "server" y el puerto.
2. **Lógica de Red:** Implementa el envío y recepción de paquetes UDP usando el paquete `net`.
3. **Integrar Audio:** Conecta la captura de micrófono al buffer de envío (Cliente) y el buffer de recepción a los altavoces (Servidor).

4. **Pruebas:** Recuerda probar primero en `localhost` y luego en máquinas diferentes, revisando la IP con `ipconfig` o `ifconfig` y verificando el firewall si falla.

### Prompt 2:

"Explica cómo enlazar la captura y reproducción de audio con la transmisión y recepción por UDP (buffers, formato y flujo de datos)."

#### Respuesta:

Para conectar el puerto de red con el audio, debes crear un puente de datos: el **Cliente** envía los bytes capturados por el micrófono al socket UDP, y el **Servidor** toma los bytes recibidos del socket y los envía a los altavoces.

Aquí te explico cómo estructurar esta conexión usando la lógica de buffers que pide tu tarea.

### 1. Preparación del Buffer de Audio

El documento especifica que debes capturar hasta **65,000 frames** de **8 bits mono**.

- Como cada frame de 8 bits ocupa **1 byte**, tu buffer de transmisión será de 65,000 bytes.

- En Go, esto se representa como un slice de bytes: `make([]byte, 65000)`.

### 2. Lógica del Cliente (Transmisión)

En la función `StartClient`, el flujo debe ser:

1.  **Grabar:** Usar la librería de audio para llenar un buffer con las muestras del micrófono.

2.  **Calcular:** Multiplicar los frames capturados por el tamaño del frame (1 byte) para saber cuántos bytes enviar.

3.  **Enviar:** Usar `conn.WriteToUDP` para mandar ese buffer a la IP y puerto especificados.

```go
// Fragmento conceptual para el Cliente
func StartClient(port string) {
    // ... (Lógica para obtener IP y conectar UDP) ...

    // 1. Capturar audio (simulado con la librería de audio)
    // El recorder devuelve el buffer y cuántos frames capturó
    audioBuffer, framesCaptured := recorder.Read()

    // 2. Calcular bytes a enviar
    bytesToSend := framesCaptured * 1 // 1 byte por frame (8-bit mono)

    // 3. Enviar por UDP
    connection.Write(audioBuffer[:bytesToSend])
}

```

### 3. Lógica del Servidor (Recepción y Playback)

En `StartServer`, el servidor debe estar en un bucle constante:

1.  **Recibir:** Escuchar el puerto y guardar los datos entrantes en un buffer.

2.  **Calcular:** Dividir el tamaño de lo recibido por el tamaño del frame para saber cuántos frames reproducir.

3.  **Reproducir:** Mandar esos frames al dispositivo de salida inmediatamente.

```go
// Fragmento conceptual para el Servidor
func StartServer(port string) {
    // ... (Lógica net.ListenPacket para abrir el puerto) ...

    buffer := make([]byte, 65000) // Buffer para recibir el datagrama

    for {
        // 1. Recibir datos por UDP
        n, _, _ := connection.ReadFrom(buffer)

        // 2. Calcular frames a reproducir
        framesToPlay := n / 1 // Tamaño recibido / tamaño de frame (1 byte)

        // 3. Reproducir inmediatamente
        player.Write(buffer[:n], framesToPlay)
    }
}

```

### 4. Consideraciones de Robustez

- **Tamaño del Frame:** Aunque hoy uses 1 byte (8-bit), el documento pide que tu lógica use variables para el tamaño del frame (`frameSize := 1`) para que el código sea robusto si el formato cambia a 16-bit en el futuro.

- **Sin Respuesta:** Recuerda que el servidor **no debe enviar nada de vuelta** al cliente; es una comunicación unidireccional.

¿Te gustaría que te ayude con el código específico para configurar **Malgo** (la librería de audio) y que coincida con estos buffers de 8 bits?

### Prompt 3:

"¿El código actual cumple todos los requisitos especificados en la Tarea 1.pdf?"

#### Respuesta:

Tras revisar el contenido de tu código y compararlo con los requerimientos de la **Tarea 1.pdf**, aquí tienes el análisis de cumplimiento:

### 1. Cumplimiento de Requerimientos Funcionales

- **Selección de Modo:** **CUMPLE.** Tu archivo `main.go` utiliza `os.Args[1]` para decidir entre "server" o "client".

- **Configuración de Puerto:** **CUMPLE.** Se captura mediante la línea de comandos en `os.Args[2]`.

- **Comportamiento del Cliente:**
- **Solicitar IP por mensaje:** **CUMPLE.** Dentro del bucle en `cliente.go`, llamas a `SolicitarDireccionIP()` antes de enviar cada ráfaga de audio.

- **Captura de 65,000 frames (1.5s):** **CUMPLE.** En `audio.go` limitas el `bufferAudio` a 65,000 y en `cliente.go` usas `GrabarPorDuracion(1500 * time.Millisecond)`.

- **Envío en un solo datagrama UDP:** **CUMPLE.** La función `EnviarBuffer` en `red.go` realiza un único `conexion.Write` con el buffer completo.

- **Comportamiento del Servidor:**
- **Escucha y reproducción inmediata:** **CUMPLE.** El servidor en `servidor.go` tiene un bucle que recibe datos y los agrega directamente al buffer de reproducción.

- **Sin respuesta al cliente:** **CUMPLE.** El servidor solo lee mediante `ReadFromUDP` y no tiene funciones de escritura hacia la dirección remota del cliente.

### 2. Detalles Técnicos y Robustez

- **Formato de Audio (8-bit mono):** **CUMPLE.** En `audio.go` utilizas `malgo.FormatU8` (8 bits sin signo) y `Channels: 1`.

- **Cálculo de Bytes y Frames:** **CUMPLE.** _ Para enviar: Utilizas `totalFrames _ capacidadFrame`.

- Para recibir: Calculas `n / capacidadFrame`.

- Aunque el tamaño es 1 byte, tu código usa la variable `capacidadFrame`, lo cual cumple con el requerimiento de hacer la lógica robusta ante cambios de formato.

En conclusión, **tu código cumple con todos los puntos técnicos y funcionales** especificados en la hoja de la tarea.
