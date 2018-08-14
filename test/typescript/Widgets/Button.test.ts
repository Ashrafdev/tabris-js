import {Button, Color, Image, EventObject, Font, Properties} from 'tabris';

let widget: Button = new Button();

// Properties
let alignment: 'center' | 'left' | 'right';
let image: Image;
let text: string;
let textColor: Color;
let nullValue: null;
let font: Font | null;

alignment = widget.alignment;
image = widget.image as Image;
nullValue = widget.image as null;
text = widget.text;
textColor = widget.textColor;

widget.alignment = alignment;
widget.image = image;
widget.image = nullValue;
widget.text = text;
widget.textColor = textColor;
font = widget.font;

let properties: Properties<typeof Button> = {alignment, image, text, textColor, font};
widget = new Button(properties);
widget.set(properties);

// Events
let target: Button = widget;
let timeStamp: number = 0;
let type: string = 'foo';

let buttonSelectEvent: EventObject<Button> = {target, timeStamp, type};

widget.onSelect((event: EventObject<Button>) => {});

class CustomComponent extends Button {
  public foo: string;
  constructor(props: Properties<typeof Button> & Partial<Pick<CustomComponent, 'foo'>>) { super(props); }
}

new CustomComponent({foo: 'bar'}).set({foo: 'bar'});
