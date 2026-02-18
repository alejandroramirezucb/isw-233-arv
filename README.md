# Portafolio Web

## Introducción

El siguiente portafolio tiene mi perfil, mi formación académica, mis hobbies, los proyectos en los que he trabajado, artículos, y una sección para contactarme.

## Estructura del Proyecto

```
Code/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
```

## ¿Qué se hace?

- **Introducción**: Tiene mi foto de perfil, una breve descripción de quién soy y enlaces a mis redes sociales.
- **Sobre mí**: En esta sección está mi formación académica, skills, experiencia y mis hobbies (programar, diseño UX/UI, viajar, leer).
- **Proyectos**: Aqui muestro mis proyectos más importantes, como el sistema de inventario "UCB Hold", el "Simulador de Arquitectura x86" y la aplicación de transporte "Pasa App".
- **Blog**: Aquí tengo los artículos de mi blog.
- **Contacto**: En esta sección esta el formulario de contacto y mis datos de contacto.

## ¿Cómo se hace?

### HTML

- **Navegación clara**: Use la etiqueta `<nav>` con una lista desordenada `<ul>` para el menú principal.
- **Jerarquía de contenido**: Organicé la web usando `<header>` para la cabecera, `<main>` para el contenido principal y `<footer>` para el pie de página, las secciones están delimitadas por `<section>`.
- **Contenido**: Para las tarjetas de mis proyectos, educación y mis artículos del blog, use la etiqueta `<article>` porque representan contenido que tiene sentido por sí mismo.
- **Manejo de imágenes**: En lugar de usar la etiqueta `<img>` sola, la puse dentro de la etiqueta `<figure>`, para que tenga un contenedor semántico adecuado para las fotos.
- **Fechas**: Use la etiqueta `<time>` (por ejemplo, `<time datetime="2025">2025</time>`) para que las fechas sean interpretables por el navegador de forma estándar.

### CSS

- **Metodología BEM (Block Element Modifier)**: Nombre las clases usando BEM (como `.navegacion__link` o `.proyectos__tarjeta`).
- **Variables CSS (Custom Properties)**: Definí mis colores principales y tipografías en `:root`.
- **Flexbox**: Use Flexbox para centrar el menú de navegación, organizar las tarjetas de proyectos en fila y estructurar el formulario de contacto.
- **Diseño Responsivo**: Use _Media Queries_ para adaptar la web a móviles.

## ¿Por qué se hace?

1.  **Practicar Frontend**: Este proyecto me permite practicar HTML y CSS.
2.  **No Aplazarme**: Si no hago este proyecto me voy a aplazar.

## Link al Figma

[Portafolio Figma](https://goo.su/R5Hc7)

---

# Prompts

**Fuentes:**

- ChatGPT-4o
- Gemini 3 Flash

## Pregunta 1: Corrige el HTML actual para que haga HTML semántico, explícame luego por qué

### Respuesta

Se implementaron las siguientes mejoras semánticas:

#### Etiqueta `<figure>` para imágenes

**Por qué**: Envuelve imágenes dándoles contexto semántico como contenido ilustrativo relacionado. En el código, la foto de perfil, iconos de educación y hobbies utilizan esta etiqueta.

#### Etiqueta `<time>` con atributo `datetime`

**Por qué**: Permite que las fechas sean legibles tanto para humanos como para máquinas (buscadores, calendarios). Ejemplos en el código:

```html
<time datetime="2024">2024</time> - <time datetime="2025">2025</time>
```

#### Implementación de `<nav>` y listas (`<ul>`)

**Por qué**: En lugar de simples `<a>` dentro de un div, usar `<nav>` indica explícitamente que es una sección de navegación. Agrupar los enlaces en una lista (`<ul>`) es una convención estándar que facilita la lectura a asistentes tecnológicos.

```html
<nav
  aria-label="navegacion"
  class="navegacion">
  <ul class="navegacion__lista">
    <li class="navegacion__elemento"><a href="#sobre-mi">Sobre mi</a></li>
    <li class="navegacion__elemento"><a href="#proyectos">Proyectos</a></li>
    <li class="navegacion__elemento"><a href="#blog">Blog</a></li>
    <li class="navegacion__elemento"><a href="#contacto">Contacto</a></li>
  </ul>
</nav>
```

#### Accesibilidad (ARIA)

**Por qué**: Se añadieron atributos como `aria-label` al `<nav>`, lo que ayuda a usuarios con discapacidad visual a identificar rápidamente el propósito de cada bloque de navegación.

#### Etiquetas `<header>`, `<main>`, `<footer>`

**Por qué**: Definen claramente la estructura principal del documento para motores de búsqueda y lectores de pantalla.

#### Etiqueta `<address>` para contacto

**Por qué**: Semánticamente correcta para información de contacto.

---

## Pregunta 2: Explícame qué hace la etiqueta `<time>`

### Respuesta

**¿Qué hace?**
Representa un punto específico en el tiempo o un rango temporal. El atributo `datetime` proporciona una representación legible por máquinas en formato ISO 8601.

**Ejemplo en el código**:

```html
<time datetime="2024">2024</time> - <time datetime="2025">2025</time>
```

**Representación visual para usuarios**: 2024 - 2025
**Representación semántica para máquinas**: Los motores de búsqueda, calendarios y aplicaciones de procesamiento de fechas entienden exactamente qué años se mencionan.

**¿Por qué es útil?**

- Mejora el SEO: Los buscadores indexan correctamente fechas y eventos
- Accesibilidad: Los lectores de pantalla anuncian las fechas de manera clara
- Interoperabilidad: Aplicaciones como Google Calendar pueden procesar estas fechas automáticamente

---

## Pregunta 3: Cómo pongo sombra paralela de Figma: posicion x: 0, posicion y: 4, desenfoque: 6, propagación: -1, color: #000000, opacidad: 10% en CSS

### Respuesta

Los valores de sombra de Figma se convierten a CSS de la siguiente manera:

**Parámetros de Figma:**

- Posición X: 0
- Posición Y: 4
- Desenfoque: 6
- Propagación: -1
- Color: #000000
- Opacidad: 10%

**Sintaxis CSS**:

```css
.sombra-figma {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

**Explicación**:

- `0`: offset X (posición horizontal)
- `4px`: offset Y (posición vertical)
- `6px`: blur (desenfoque)
- `-1px`: spread (propagación)
- `rgba(0, 0, 0, 0.10)`: color con opacidad (10% = 0.10)

**Implementación en el código**:
Esta sombra ya está aplicada en las tarjetas de proyectos y blog:

```css
.proyectos__tarjeta {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.blog__tarjeta {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

---

## Pregunta 4: Mejora el BEM y semántica HTML solamente de la sección educación

### Respuesta

**Estructura implementada en index.html**:

```html
<section
  id="sobre-mi"
  class="sobre-mi">
  <section class="educacion__contenedor">
    <h2 class="educacion__titulo--principal">Educación</h2>
    <article class="educacion__tarjeta">
      <figure class="educacion__figura">
        <img
          src="assets/icon-education.svg"
          alt="Icono educación"
          class="educacion__imagen" />
      </figure>
      <h3 class="educacion__carrera">Ingeniería de Software</h3>
      <h4 class="educacion__institucion">Universidad Católica Boliviana</h4>
      <p class="educacion__fecha">
        <time datetime="2024">2024</time> - Presente
      </p>
      <p class="educacion__descripcion">
        Actualmente curso el quinto semestre...
      </p>
    </article>
  </section>
</section>
```

**Cambios realizados**:

- Reemplacé `<div>` por `<section>` para mejor semántica
- Utilicé `<article>` para cada tarjeta de educación
- Añadí `<figure>` para envolver la imagen del icono
- Implementé nomenclatura BEM clara: `educacion__titulo-principal`, `educacion__tarjeta`, `educacion__figura`, `educacion__imagen`, `educacion__carrera`, `educacion__institucion`, `educacion__fecha`, `educacion__descripcion`
- Cambié de `sobre-mi__imagen` a `educacion__imagen` para coherencia
- Utilicé `<time datetime="">` para fechas legibles por máquinas
- Estructura jerárquica correcta de encabezados (h2 > h3 > h4)

## Pregunta 5: Mejora la redacción de README.md y corrige la sintaxis markdown

### Respuesta

He mejorado la redacción del archivo README.md para que sea más clara, profesional y fluida, manteniendo el contenido técnico y los detalles actuales. Si necesitas más ajustes o tienes otra solicitud, no dudes en indicarlo.
