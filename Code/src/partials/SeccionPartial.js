import Handlebars from 'handlebars';

export function registrarSeccionPartial() {
  Handlebars.registerPartial(
    'seccion',
    `
      <section
        id="{{nombre}}"
        class="{{nombre}}"
        aria-labelledby="{{nombre}}-titulo">
        <h2
          id="{{nombre}}-titulo"
          class="{{nombre}}__titulo-principal">
          {{titulo}}
        </h2>
        {{{contenido}}}
      </section>
    `,
  );
}
