const {ImageView, Slider, ui} = require('tabris');

var imageView = new ImageView({
  left: 20, top: 20, width: 100, height: 250,
  image: 'images/target_200.png',
  background: '#aaaaaa',
  scaleMode: 'auto'
}).appendTo(ui.contentView);

new Slider({
  left: 20, top: [imageView, 20], right: 100,
  minimum: 50,
  selection: 100,
  maximum: 300
}).on('selectionChanged', function({value: selection}) {
  imageView.set({left: 20, top: 20, width: selection, height: 250});
}).appendTo(ui.contentView);
