import { BreakoutPage } from './app.po';

describe('breakout App', function() {
  let page: BreakoutPage;

  beforeEach(() => {
    page = new BreakoutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
