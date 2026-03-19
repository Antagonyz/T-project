import { StyleSheet, View, ViewStyle } from "react-native";

export const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Тень для iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Тень для Android
    elevation: 4,
  },
});
