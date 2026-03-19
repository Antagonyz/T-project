import { StyleSheet, View } from "react-native";

export const ProgressBar = ({ progress }: { progress: number }) => {
  // progress - число от 0 до 1
  const percentage = Math.max(0, Math.min(100, progress * 100));

  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${percentage}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: "#EAEAEA",
    borderRadius: 3,
    width: "100%",
    marginTop: 8,
  },
  fill: {
    height: "100%",
    backgroundColor: "#FFDD2D", // Акцентный желтый Т-Банка
    borderRadius: 3,
  },
});
