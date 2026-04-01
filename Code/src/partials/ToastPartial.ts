import Handlebars from 'handlebars';

export function registrarToastPartial() {
  Handlebars.registerPartial(
    'toast',
    `
      <div class="toast__mensaje">{{mensaje}}</div>
    `,
  );
}