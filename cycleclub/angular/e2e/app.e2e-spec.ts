import { LogintestPage } from './app.po';

describe('logintest App', () => {
  let page: LogintestPage;

  beforeEach(() => {
    page = new LogintestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
