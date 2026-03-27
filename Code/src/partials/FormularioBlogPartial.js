import Handlebars from 'handlebars';

export function registrarFormularioBlogPartial() {
  Handlebars.registerPartial(
    'formulario-blog',
    `
      <form class="{{nombre}}__formulario" id="{{nombre}}-formulario">
        <div class="{{nombre}}__grupo">
          {{> etiqueta contenedor=nombre nombre="categoria" etiqueta="Categoría"}}
          <select
            id="{{nombre}}__categoria"
            name="categoria"
            required
            class="{{nombre}}__campo-selector">
            <option value="" disabled selected>{{placeholderCategoria}}</option>
            {{#each categorias}}
              <option value="{{this}}">{{this}}</option>
            {{/each}}
          </select>
        </div>

        <div class="{{nombre}}__grupo">
          {{> campoTexto contenedor=nombre nombre="fecha" tipo="text" etiqueta="Fecha" placeholder=placeholderFecha}}
        </div>

        <div class="{{nombre}}__grupo">
          {{> campoTexto contenedor=nombre nombre="titulo" tipo="text" etiqueta="Título" placeholder=placeholderTitulo}}
        </div>

        <div class="{{nombre}}__grupo">
          {{> campoMensaje contenedor=nombre nombre="descripcion" etiqueta="Descripción" placeholder=placeholderDescripcion}}
        </div>
      </form>
    `,
  );
}
