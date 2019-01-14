import {Composite, TextView, Button, app, ui, device} from 'tabris';

// React to application hibernation, resume and back navigation

let paused = 0;

createTextView('Id', app.id);
createTextView('Version', app.version);
createTextView('Version Code', app.versionCode);

new Composite({
  left: 0, top: 'prev() 16', right: 0,
  height: 1,
  background: '#E8E8E8'
}).appendTo(ui.contentView);

const label = new TextView({
  left: 16, top: 'prev() 16', right: 16,
  font: 'italic 14px',
  text: 'You can press home and reopen the app to it to see how long you were away.'
}).appendTo(ui.contentView);

new Button({
  left: 16, right: 16, bottom: 16,
  text: 'Reload app'
}).on('select', () => app.reload())
  .appendTo(ui.contentView);

if (device.platform === 'Android') {
  new Button({
    left: 16, right: 16, bottom: 'prev() 16',
    text: 'Close app'
  }).on('select', () => app.close())
    .appendTo(ui.contentView);
}

app.on('pause', () => paused = Date.now())
  .on('resume', () => {
    if (paused > 0) {
      const diff = Date.now() - paused;
      label.text = ' Welcome back!\n You were gone for ' + (diff / 1000).toFixed(1) + ' seconds.';
    }
  });

app.on('backNavigation', (event) => {
  event.preventDefault();
  label.text = 'Back navigation prevented.';
});

function createTextView(key, value) {
  const composite = new Composite({left: 16, top: 'prev() 8', right: 16}).appendTo(ui.contentView);
  new TextView({text: key}).appendTo(composite);
  new TextView({text: value, left: 128}).appendTo(composite);
}
