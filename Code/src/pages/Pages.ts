import type { Home } from '@/pages/home/Home';
import type { About } from '@/pages/about/About';
import type { Projects } from '@/pages/projects/Projects';
import type { Blog } from '@/pages/blog/Blog';
import type { Contact } from '@/pages/contact/Contact';

export interface Pages {
  HOME: Home;
  ABOUT: About;
  PROJECTS: Projects;
  BLOG: Blog;
  CONTACT: Contact;
}
