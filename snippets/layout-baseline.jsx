import {TextInput, TextView, contentView, $} from 'tabris';

contentView.append(
  <$>
    <TextView left={16} top={16}>Label:</TextView>
    <TextInput left='prev() 16' baseline>Text</TextInput>
  </$>
);
