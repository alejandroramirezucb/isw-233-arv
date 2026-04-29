# Portafolio Web

## Introducción

Este portafolio web muestra mi perfil, formación académica, experiencia, habilidades, hobbies, proyectos y artículos, además de una sección de contacto. La aplicación funciona como una SPA (Single Page Application).

## Estructura del Proyecto

```
/
├── README.md
└── Code/
  ├── package.json
  ├── webpack.config.js
  ├── eslint.config.js
  ├── postcss.config.js
  ├── .stylelintrc.json
  ├── data/
  │   ├── blog.json
  │   ├── projects.json
  │   └── proyectos.json
    ├── images/
    └── src/
    ├── index.hbs
        ├── index.css
        ├── index.ts
    ├── handlebars.d.ts
    ├── app/
    │   ├── api/
    │   ├── config/
    │   ├── router/
    │   └── styles/
    ├── entities/
    │   ├── article/
    │   └── project/
    ├── pages/
    │   ├── home/
    │   ├── about/
    │   ├── projects/
    │   ├── blog/
    │   └── contact/
    ├── shared/
    │   ├── lib/
    │   ├── ui/
    │   ├── styles/
    │   └── utils/
    └── widgets/
      ├── navbar/
      └── blog/
        ├── articles/
        └── modal/
```

## Modulos principales

- **app**: Configuracion, router y consumo de datos.
- **entities**: Modelos y UI base de entidades (articulos y proyectos).
- **pages**: Vistas por ruta (home, about, projects, blog, contact).
- **widgets**: Componentes compuestos como navbar y modal de blog.
- **shared**: Librerias base, utilidades y componentes UI reutilizables.
- **data**: Fuentes JSON para proyectos y articulos.

## ¿Qué se hace?

- **Home**: Presentacion principal con acceso rapido a contacto.
- **Sobre mi**: Secciones de skills, educacion, experiencia y hobbies.
- **Proyectos**: Tarjetas de proyectos cargadas desde JSON.
- **Blog**: Articulos filtrables por categoria y modal para agregar nuevos.
- **Contacto**: Formulario y datos de contacto.

## Instalación y ejecución

```bash
cd Code
npm install
npm run dev
```

## ¿Cómo se hace?

### HTML

- **Estructura base del documento**: Se usa `src/index.hbs` con `nav`, `main` y `footer` para la jerarquia principal.
- **Renderizado por componentes**: Las secciones (`home`, `sobre-mi`, `proyectos`, `blog`, `contacto`) se crean con TypeScript y plantillas Handlebars.
- **Semántica en tarjetas y secciones**: Se usan `<section>`, `<article>`, `<figure>`, `<img>` y encabezados (`h2`, `h3`, `h4`).
- **Navegación**: El contenedor principal de navegacion vive en `#navbar-container` y el contenido se renderiza en `#app`.

### CSS

- **Metodología BEM (Block Element Modifier)**: Nombre las clases usando BEM (como `.navegacion__link` o `.proyectos__tarjeta`).
- **Variables CSS (Custom Properties)**: Definí mis colores principales y tipografías en `:root`.
- **Flexbox**: Use Flexbox para centrar el menú de navegación, organizar las tarjetas de proyectos en fila y estructurar el formulario de contacto.
- **Diseño Responsivo**: Use _Media Queries_ para adaptar la web a móviles.

### TypeScript

- **Arquitectura**: Componentes basados en `Block` con templates Handlebars.
- **Navegación**: Router SPA con rutas `/`, `/sobre-mi`, `/proyectos`, `/blog` y `/contacto`.
- **Datos**: `Api` consume JSON locales para proyectos y articulos.
- **Comunicación**: `EventBus` coordina eventos (navegacion, modal, acciones de blog).

## Patrones de Diseño

### Template Method

**Ubicacion**: `Code/src/shared/lib/Block.ts`

**Por que se usa**: `Block` define el flujo base de renderizado y eventos, y las clases hijas implementan solo su template.

**Uso**: Las paginas y widgets extienden `Block` y heredan el ciclo de vida (`willMount`, `didMount`) y el renderizado.

### EventBus (Pub/Sub)

**Ubicacion**: `Code/src/shared/lib/EventBus.ts`

**Por que se usa**: Desacopla la comunicacion entre componentes (navegacion, modal, acciones del blog) sin dependencias directas.

**Uso**: Se emiten eventos como `navigate`, `open::modal` y `add::article` desde distintos componentes.

## Observers

### IntersectionObserver

**Ubicación**: `Code/src/shared/utils/OptimizeImage.ts`

**Problema resuelto**:
Las imágenes se cargan incluso fuera de la pantalla. Es necesario cargar imágenes solo cuando el usuario esta apunto de verlas.

**Implementación**:

```javascript
export class OptimizeImage {
  optimize() {
    const observer = new IntersectionObserver(this.callback.bind(this), {
      threshold: 0.2,
    });

    const images = document.querySelectorAll('img[data-src]');

    images.forEach((image) => {
      observer.observe(image);
    });
  }

  callback(entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      const dataSrc = target.getAttribute('data-src');

      if (!dataSrc) return;

      target.src = dataSrc;
      observer.unobserve(target);
    });
  }
}
```

**Por qué IntersectionObserver es la solución correcta**:

- `threshold: 0.2` permite cargar imágenes antes de que sean visibles muy facilmente
- Desuscribirse (`unobserve`) es automático cuando ya no se necesita

### ResizeObserver

**Ubicación**: `Code/src/shared/utils/ScaleElements.ts`

**Problema resuelto**:
Los elementos con atributo `data-scale` deben escalar cuando el usuario pasa el mouse, pero solo si el elemento ha sido renderizado. Sin esto, podria fallar en elementos con display:none.

**Implementación**:

```javascript
export class ScaleElements {
  scale() {
    const observer = new ResizeObserver(this.callback.bind(this));
    const elements = document.querySelectorAll('[data-scale]');

    elements.forEach((element) => {
      observer.observe(element, { box: 'border-box' });
    });
  }

  callback(entries) {
    entries.forEach((entry) => {
      const target = entry.target;

      if (entry.contentRect.width === 0) return;
      if (target.dataset.scaled === 'true') return;

      target.dataset.scaled = 'true';

      target.addEventListener('mouseenter', () => {
        const scale = target.getAttribute('data-scale');

        if (!scale) return;

        target.style.transform = `scale(${scale})`;
      });

      target.addEventListener('mouseleave', () => {
        target.style.transform = '';
      });
    });
  }
}
```

**Por qué ResizeObserver es la solución correcta**:

- Primero verifica que el elemento tiene dimensiones válidas antes de registrar listeners
- Solo registra listeners una vez por elemento (usando `data-scaled`)
- Funciona con elementos dinámicos o con animaciones CSS

## ¿Por qué se hace?

1.  **Practicar Frontend**: Este proyecto me permite practicar HTML y CSS.
2.  **No Aplazarme**: Si no hago este proyecto me voy a aplazar.

## Link al Figma

[Portafolio Figma](https://goo.su/R5Hc7)

---

# Plugins Adicionales

Se implementaron dos plugins adicionales: `webpack-bundle-analyzer` y `image-minimizer-webpack-plugin`.
Ambos están instalados como `devDependencies` y se ejecutan desde los scripts de `package.json`.

## Plugin 1: `image-minimizer-webpack-plugin`

**¿Que hace?**: Comprime las imágenes durante el build de producción, reduciendo su tamaño sin pérdida de calidad.

**Cómo funciona**:

- Solo se activa en modo `production`.
- Cada formato usa un algoritmo distinto:
  - **PNG** → `optipng` con nivel de optimización 5
  - **JPG** → `jpegtran` en modo progresivo
  - **GIF** → `gifsicle` con entrelazado
  - **SVG** → `svgo` con configuración `preset-default`

**Resultados**:

| Imagen                       | Original | Comprimida | Reducción |
| ---------------------------- | -------- | ---------- | --------- |
| `foto-perfil.png`            | 1.16 MiB | 883 KB     | 24%       |
| `proyecto-pasa.png`          | 1.04 MiB | 755 KB     | 27%       |
| `proyecto-simulador-x86.png` | 30.6 KB  | 21 KB      | 31%       |
| `proyecto-ucb-hold.png`      | 484 KB   | 403 KB     | 17%       |

---

## Plugin 2: `webpack-bundle-analyzer`

**¿Que hace?**: Genera un reporte HTML que visualiza el tamaño y composición del bundle, sirve para detectar dependencias innecesarias o módulos que ocupan demasiado espacio.

**Cómo funciona**:

- Solo ocurre cuando se pasa la variable de entorno `ANALYZE=true`.
- `analyzerMode: 'static'` genera un archivo HTML estático en `dist/bundle-report.html` en lugar de abrir un servidor.
- `openAnalyzer: false` evita que abra el navegador automáticamente.

**Uso**:

```bash
npm run analyze
# Genera: dist/bundle-report.html
# Esto hay que abrirlo en el navegador
```
