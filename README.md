# Portafolio Web

## Introducción

Este portafolio web muestra mi perfil, formación académica, experiencia, habilidades, hobbies, proyectos y artículos, además de una sección de contacto. La aplicación funciona como una SPA (Single Page Application).

## Estructura del Proyecto

```
/
├── README.md
└── Code/
  ├── index.html
  ├── index.css
  ├── index.js
  ├── package.json
  ├── vite.config.js
  ├── blocks/
  │   ├── base.css
  │   ├── navegacion.css
  │   ├── introduccion.css
  │   ├── blog.css
  │   ├── proyectos.css
  │   ├── skills.css
  │   ├── hobbies.css
  │   ├── contacto.css
  │   ├── educacion.css
  │   ├── experiencia.css
  │   ├── boton.css
  │   └── footer.css
  ├── images/
  └── src/
    ├── base/
    ├── blog/
    ├── contacto/
    ├── home/
    ├── navegacion/
    ├── partials/
    ├── proyectos/
    ├── render/
    ├── router/
    ├── sobre-mi/
    └── tarjetas/
```

## Bloques Identificados

- **base** (`base.css`)
- **blog** (`blog.css`)
- **boton** (`boton.css`)
- **contacto** (`contacto.css`)
- **educacion** (`educacion.css`)
- **experiencia** (`experiencia.css`)
- **hobbies** (`hobbies.css`)
- **introduccion** (`introduccion.css`)
- **navegacion** (`navegacion.css`)
- **proyectos** (`proyectos.css`)
- **skills** (`skills.css`)
- **footer** (`footer.css`)

## ¿Qué se hace?

- **Home**: Muestra mi foto de perfil, un artículo de presentación, enlaces a redes sociales y un botón de contacto.
- **Sobre mí**: Incluye educación, experiencia, skills y hobbies.
- **Proyectos**: Muestra proyectos destacados con tarjeta, fecha, descripción e imagen.
- **Blog**: Muestra artículos y permite filtrar por categorías (incluyendo favoritos).
- **Contacto**: Incluye formulario de contacto y datos de contacto.

## ¿Cómo se hace?

### HTML

- **Estructura base del documento**: Se usa `<header>`, `<main>` y `<footer>` en `index.html` para la jerarquía principal.
- **Renderizado por componentes**: Las secciones (`home`, `sobre-mi`, `proyectos`, `blog`, `contacto`) se crean con JavaScript y plantillas Handlebars.
- **Semántica en tarjetas y secciones**: Se usan `<section>`, `<article>`, `<figure>`, `<img>` y encabezados (`h2`, `h3`, `h4`).
- **Navegación**: El contenedor de navegación usa `<nav>` y los web components son `role="list"` y `role="listitem"`.

### CSS

- **Metodología BEM (Block Element Modifier)**: Nombre las clases usando BEM (como `.navegacion__link` o `.proyectos__tarjeta`).
- **Variables CSS (Custom Properties)**: Definí mis colores principales y tipografías en `:root`.
- **Flexbox**: Use Flexbox para centrar el menú de navegación, organizar las tarjetas de proyectos en fila y estructurar el formulario de contacto.
- **Diseño Responsivo**: Use _Media Queries_ para adaptar la web a móviles.

### JavaScript

- **Arquitectura**: El proyecto está dividido por secciones (`home`, `blog`, `proyectos`, `contacto`, etc.).
- **Uso de Handlebars**: Cada componente define una plantilla para producir su HTML.
- **Navegación**: El router se encarga de las rutas como `/`, `/sobre-mi`, `/proyectos`, `/blog` y `/contacto` sin recargar toda la página.
- **Web Components**: Se usan elementos personalizados (`item-tarjeta`, `lista-tarjetas`, `item-navegacion`, `lista-navegacion`, etc.).

## Patrones de Diseño

### Factory

**Ubicación**: `Code/src/tarjetas/FactoryTarjeta.js`, `Code/src/blog/FactoryBlogTarjeta.js`, `Code/src/proyectos/FactoryProyectosTarjeta.js`

**Por qué se usa**: Para abstraer la creación de tarjetas y permitir variantes especializadas sin duplicar la lógica.

**Uso**: `FactoryBlogTarjeta.crearTarjeta()` crea instancias de `ItemBlogTarjeta` y `FactoryProyectosTarjeta.crearTarjeta()` crea instancias de `ItemProyectosTarjeta`.

### Singleton

**Ubicación**: `Code/src/navegacion/Navegacion.js`

**Por qué se usa**: Para garantizar una sola instancia de la navegación en toda la app.

**Uso**: `Navegacion.getInstancia()` crea o retorna la única instancia y evita duplicar listeners o estructura de menú.

### Template Method

**Ubicación**: `Code/src/base/ComponenteBase.js`, clases hijas en `Code/src/**`

**Por qué se usa**: La clase base define metodos comunes para la creación de un componente y las subclases implementan el paso específico de construcción de su nodo DOM.

**Uso**: `ComponenteBase.getElemento()` se encarga de obtener un elemento y delega en `crearElemento()` implementado por cada componente (por ejemplo, listas, items, secciones y tarjetas).

### Value Object

**Ubicación**: `Code/src/tarjetas/ItemTarjeta.js`, `Code/src/blog/ItemBlogTarjeta.js`, `Code/src/proyectos/ItemProyectosTarjeta.js`, `Code/src/contacto/ItemContacto.js`

**Por qué se usa**: Se crean objetos inmutables mediante congelación de propiedades para garantizar que sus atributos no cambien una vez instanciados. Esto es para realizar comparaciones entre objetos.

**Uso**: Las clases de lista requieren que los datos sean innmutables para comparar correctamente un elemeno cuando se necesita eliminarlo.

## ¿Por qué se hace?

1.  **Practicar Frontend**: Este proyecto me permite practicar HTML y CSS.
2.  **No Aplazarme**: Si no hago este proyecto me voy a aplazar.

## Link al Figma

[Portafolio Figma](https://goo.su/R5Hc7)

---

# Prompts

**Fuentes:**

- ChatGPT-5.3 Codex
- Gemini 3.1 Pro
- Claude Haiku 4.5

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
          src="images/icon-education.svg"
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
