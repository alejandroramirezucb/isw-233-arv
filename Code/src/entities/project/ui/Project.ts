import { Block } from '@/shared/lib/Block';
import { ProjectCard } from '@/entities/project/model/ProjectCard';
import _template from '@/entities/project/ui/Project.hbs?raw';

export class Project extends Block {
  protected template = _template;

  constructor(props: ProjectCard) {
    super(props);
  }

  get events() {
    return {
      click: () => this.clickCard(),
    };
  }

  private clickCard() {
    window.open(this.props.link, '_blank');
  }
}
