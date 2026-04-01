import Handlebars from 'handlebars';

export function registrarCamposFormularioPartials() {
  Handlebars.registerPartial(
    'campoTexto',
    `
      {{> etiqueta contenedor=contenedor nombre=nombre etiqueta=etiqueta}}
      <input
        type="{{tipo}}"
        id="{{contenedor}}__{{nombre}}"
        name="{{nombre}}"
        required
        placeholder="{{placeholder}}"
        class="{{contenedor}}__campo-{{tipo}}" />
    `,
  );

  Handlebars.registerPartial(
    'campoMensaje',
    `
      {{> etiqueta contenedor=contenedor nombre=nombre etiqueta=etiqueta}}
      <textarea
        id="{{contenedor}}__{{nombre}}"
        name="{{nombre}}"
        required
        placeholder="{{placeholder}}"
        class="{{contenedor}}__campo-{{nombre}}"></textarea>
    `,
  );
}
