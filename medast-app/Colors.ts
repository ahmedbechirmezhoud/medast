import { Appearance } from 'react-native';

let Colors = {
  primaryColor : "#38D700",
    backgroundColor : "#F6F6F6",
    gray : "#EAEAEA",
    secondary : "#0063D7",
    text: "#333333",
    danger: "#FF1A1A"
}


const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  Colors =  {
    primaryColor : "#FF7612",
    backgroundColor : "#1E1B17",
    gray : "#525252",
    secondary : "#4CA1F0",
    text: "#CCCCCC",
    danger: "#FF1A1A"
  }
}

export default Colors