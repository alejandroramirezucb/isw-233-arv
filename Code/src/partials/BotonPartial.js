import Handlebars from 'handlebars';

export function registrarBotonPartial() {
  Handlebars.registerPartial(
    'boton',
    `
      <button
        type="{{tipo}}"
        {{#if onclick}}onclick="{{onclick}}"{{/if}}
        class="boton boton--primario{{#if clases}} {{clases}}{{/if}}">
        {{texto}}
      </button>
    `,
  );
}
