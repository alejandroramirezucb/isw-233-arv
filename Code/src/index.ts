import './index.css';
import { Navegacion } from './navegacion/Navegacion.js';
import { EscalaRender } from './render/EscalaRender.js';
import { ImagenRender } from './render/ImagenRender.js';
import { registrarBotonPartial } from './partials/BotonPartial.js';
import { registrarCamposFormularioPartials } from './partials/FormularioCamposPartial.js';
import { registrarEtiquetaPartial } from './partials/FormularioEtiquetaPartial.js';
import { registrarFormularioBlogPartial } from './partials/FormularioBlogPartial.js';
import { registrarImagenPartial } from './partials/ImagenPartial.js';
import { registrarSeccionPartial } from './partials/SeccionPartial.js';
import { registrarToastPartial } from './partials/ToastPartial.js';
import './navegacion/HTMLItemNavegacion.js';
import './navegacion/HTMLListaNavegacion.js';
import './home/HTMLArticuloHome.js';
import './home/HTMLListaRedesSociales.js';
import './home/HTMLRedSocial.js';
import './sobre-mi/HTMLGrupoSkills.js';
import './sobre-mi/HTMLItemHobbie.js';
import './sobre-mi/HTMLItemSkill.js';
import './sobre-mi/HTMLListaHobbies.js';
import './sobre-mi/HTMLListaSkills.js';
import './sobre-mi/HTMLTarjetaInformacion.js';
import './contacto/HTMLFormularioContacto.js';
import './contacto/HTMLItemContacto.js';
import './contacto/HTMLListaContacto.js';
import './tarjetas/HTMLItemTarjeta.js';
import './tarjetas/HTMLListaTarjetas.js';
import './blog/HTMLItemCategoria.js';
import './blog/HTMLListaCategorias.js';
import './base/HTMLToast.js';

registrarBotonPartial();
registrarCamposFormularioPartials();
registrarEtiquetaPartial();
registrarFormularioBlogPartial();
registrarImagenPartial();
registrarSeccionPartial();
registrarToastPartial();

const navegacion = Navegacion.getInstancia()!;
navegacion.renderizar();

const escalaRender = new EscalaRender();
escalaRender.render();

const imagenRender = new ImagenRender();
imagenRender.render();
