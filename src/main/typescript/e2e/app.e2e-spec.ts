import { KisshopPage } from './app.po';

describe('kisshop App', () => {
  let page: KisshopPage;

  beforeEach(() => {
    page = new KisshopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
