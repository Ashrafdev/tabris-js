import NativeObject from '../NativeObject';
import Widget from '../Widget';

export default class Picker extends Widget {

  constructor(properties) {
    super(Object.assign({selectionIndex: 0}, properties));
    tabris.on('flush', this.$flush, this);
    this.on('dispose', () => tabris.off('flush', this.$flush, this));
  }

  get _nativeType() {
    return 'tabris.Picker';
  }

  $flush() {
    if (this.$needsUpdateItems) {
      let items = new Array(this.itemCount);
      for (let index = 0; index < items.length; index++) {
        items[index] = this.itemText(index);
      }
      this._nativeSet('items', items);
      tabris._nativeBridge.flush();
      delete this.$needsUpdateItems;
    }
    if (this.$newSelectionIndex >= 0) {
      this._nativeSet('selectionIndex', this.$newSelectionIndex);
      this._triggerChangeEvent('selectionIndex', this.$newSelectionIndex);
      tabris._nativeBridge.flush();
      delete this.$newSelectionIndex;
    }
  }

  _trigger(name, event) {
    if (name === 'select') {
      return super._trigger('select', {index: event.selectionIndex});
    }
    return super._trigger(name, event);
  }

}

NativeObject.defineProperties(Picker.prototype, {
  itemCount: {
    type: 'natural',
    default: 0,
    set(name, value) {
      this._storeProperty(name, value);
      this.$needsUpdateItems = true;
    }
  },
  itemText: {
    type: 'function',
    default: () => () => '',
    set(name, value) {
      this.$needsUpdateItems = true;
      this._storeProperty(name, value);
    }
  },
  selectionIndex: {
    type: 'natural',
    default: 0,
    set(name, value) {
      this.$newSelectionIndex = value;
    },
    get(name) {
      return this.$newSelectionIndex >= 0 ? this.$newSelectionIndex : this._nativeGet(name);
    }
  },
  fillColor: {type: 'ColorValue'},
  borderColor: {type: 'ColorValue'},
  textColor: {type: 'ColorValue'}
});

NativeObject.defineEvents(Picker.prototype, {
  select: {native: true, changes: 'selectionIndex', changeValue: 'index'},
});
