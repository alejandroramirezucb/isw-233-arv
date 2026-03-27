import Handlebars from 'handlebars';

export function registrarEtiquetaPartial() {
  Handlebars.registerPartial(
    'etiqueta',
    `
      <label
        for="{{contenedor}}__{{nombre}}"
        class="{{contenedor}}__etiqueta"
        >{{etiqueta}}</label
      >
    `,
  );
}
