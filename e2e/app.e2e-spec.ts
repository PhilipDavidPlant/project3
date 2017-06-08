import { ProjectThreePage } from './app.po';

describe('project-three App', () => {
  let page: ProjectThreePage;

  beforeEach(() => {
    page = new ProjectThreePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
