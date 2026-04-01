import Handlebars from 'handlebars';

export function registrarImagenPartial() {
  Handlebars.registerPartial(
    'imagen',
    `
    <figure class="{{nombre}}__figura">
      <img
        src="{{imagen}}"
        data-src="{{imagen}}"
        alt="Imagen de {{titulo}}"
        title="{{titulo}}"
        class="{{nombre}}__imagen" />
    </figure>
  `,
  );
}
