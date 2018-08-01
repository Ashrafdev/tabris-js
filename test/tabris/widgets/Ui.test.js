import {expect, mockTabris, restore} from '../../test';
import ClientStub from '../ClientStub';
import Ui, {create} from '../../../src/tabris/widgets/Ui';
import ContentView from '../../../src/tabris/widgets/ContentView';
import Composite from '../../../src/tabris/widgets/Composite';

describe('Ui', function() {

  let client, ui;

  beforeEach(function() {
    client = new ClientStub();
    mockTabris(client);
    ui = create();
  });

  afterEach(restore);

  it('can not be created standalone', function() {
    expect(() => {
      new Ui({});
    }).to.throw(Error);
  });

  it('is instanceof Composite', function() {
    expect(ui).to.be.an.instanceOf(Composite);
  });

  it('is instanceof Ui', function() {
    expect(ui).to.be.an.instanceOf(Ui);
  });

  it('is CREATEed', function() {
    let createCalls = client.calls({op: 'create'});
    expect(createCalls[0].id).to.equal(ui.cid);
    expect(createCalls[0].type).to.equal('tabris.Ui');
  });

  it('contains children', function() {
    expect(ui.children().length).to.equal(4);
    expect(ui.children().indexOf(ui.contentView)).not.to.equal(-1);
    expect(ui.children().indexOf(ui.statusBar)).not.to.equal(-1);
    expect(ui.children().indexOf(ui.navigationBar)).not.to.equal(-1);
    expect(ui.children().indexOf(ui.drawer)).not.to.equal(-1);
  });

  it('does not accept any children', function() {
    expect(() => {
      ui.append(new Composite());
    }).to.throw(Error);
  });

  it('can not be appended', function() {
    expect(() => {
      new Composite().append(ui);
    }).to.throw(Error);
  });

  it('can not be disposed', function() {
    expect(() => {
      ui.dispose();
    }).to.throw(Error);
  });

  it('has no parent', function() {
    expect(ui.parent()).to.be.null;
  });

  it('has no listener registration functions for static properties', function() {
    expect(ui.onStatusBarChanged).to.be.undefined;
    expect(ui.onNavigationBarChanged).to.be.undefined;
    expect(ui.onContentViewChanged).to.be.undefined;
    expect(ui.onDrawerChanged).to.be.undefined;
  });

  describe('contentView', function() {

    it('is instance of ContentView', function() {
      expect(ui.contentView).to.be.an.instanceOf(ContentView);
    });

    it('is read-only ', function() {
      let contentView = ui.contentView;

      delete ui.contentView;
      ui.contentView = undefined;

      expect(ui.contentView).to.equal(contentView);
    });

    it('has root property set to true', function() {
      expect(client.calls({op: 'create', id: ui.contentView.cid})[0].properties.root).to.be.true;
    });
  });

});
