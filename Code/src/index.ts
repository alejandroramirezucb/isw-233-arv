import './app/config/Handlebars';
import '@/index.css';
import type { Pages } from '@/pages/Pages';
import { Home } from '@/pages/home/Home';
import { About } from '@/pages/about/About';
import { Projects } from '@/pages/projects/Projects';
import { Blog } from '@/pages/blog/Blog';
import { Contact } from '@/pages/contact/Contact';
import { Router } from '@/app/router/Router';
import { Modal } from '@/widgets/blog/modal/Modal';
import { Api } from '@/app/api/Api';
import { OptimizeImage } from '@/shared/utils/OptimizeImage';
import { ScaleElements } from '@/shared/utils/ScaleElements';
import { Navbar } from '@/widgets/navbar/Navbar';

init();

async function init() {
  const nav = document.getElementById('navbar-container');
  const app = document.getElementById('app');

  const optimizeImage = new OptimizeImage();
  const scaleElements = new ScaleElements();
  const projectCards = await Api.projects();
  const articleCards = await Api.articles();
  const modal = new Modal(app);
  const navbar = new Navbar();
  nav.appendChild(navbar.element);

  const pages: Pages = {
    HOME: new Home(),
    ABOUT: new About(),
    PROJECTS: new Projects(projectCards),
    BLOG: new Blog(articleCards),
    CONTACT: new Contact(),
  };

  Router.init(pages, app);
  optimizeImage.optimize();
  scaleElements.scale();
}
