import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ICustomButton {
  title: string;
  bgColor?: string;
  color?: string;
  width?: string;
  style?: any; // StyleProp<ViewStyle>;
  onPress: () => void;
}

export default function CustomButton({
  title,
  bgColor,
  color,
  onPress,
  width,
  style,
}: ICustomButton) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...styles.button,
          minHeight: 48,
          backgroundColor: bgColor ?? "white",
          alignItems: "center",
          justifyContent: "center",
          width: width ?? "100%",
          ...style,
        }}
      >
        <Text
          style={{
            color: color ?? "#F98B25",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
});
