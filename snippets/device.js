import {TextView, device, contentView} from 'tabris';

// Display available device information

['platform', 'version', 'model', 'vendor', 'name', 'language',
  'orientation', 'screenWidth', 'screenHeight', 'scaleFactor']
  .forEach((property) => {
    new TextView({
      id: property,
      left: 10, right: 10, top: 'prev() 10',
      text: property + ': ' + device[property]
    }).appendTo(contentView);
  });

device.onOrientationChanged(({value: orientation}) => {
  contentView.find('#orientation').first(TextView).set({text: 'orientation: ' + orientation});
});
