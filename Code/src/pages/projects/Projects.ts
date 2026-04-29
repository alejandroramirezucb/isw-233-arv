import { Block } from '@/shared/lib/Block';
import { ProjectCard } from '@/entities/project/model/ProjectCard';
import { Project } from '@/entities/project/ui/Project';
import _template from '@/pages/projects/Projects.hbs?raw';

export class Projects extends Block {
  protected template = _template;

  constructor(props: ProjectCard[]) {
    super(props);
  }

  protected willMount(): void {
    this.makeCards();
  }

  private makeCards() {
    const container = this.element.querySelector('.cards__container');

    this.props.forEach((prop) => {
      const project = new Project(prop);
      container.appendChild(project.element);
    });
  }
}
