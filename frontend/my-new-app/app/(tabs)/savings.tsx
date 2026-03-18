import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SavingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Накопления</Text>

        <View style={styles.mainSavingsCard}>
          <Text style={styles.mainLabel}>Итого сохранено</Text>
          <Text style={styles.mainAmount}>300 000 ₽</Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Материально</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: "#333" }]}>
              <Text style={[styles.tagText, { color: "#FFF" }]}>Фиктивно</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ваши копилки</Text>
        {[1, 2].map((_, i) => (
          <View key={i} style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <MaterialCommunityIcons
                name="piggy-bank"
                size={24}
                color="#000"
              />
              <Text style={styles.goalName}>Покупка недвижимости</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: "45%" }]} />
            </View>
            <Text style={styles.progressValue}>45 000 ₽ из 100 000 ₽</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 28, fontWeight: "900", marginVertical: 20 },
  mainSavingsCard: {
    backgroundColor: "#FFDD2D",
    padding: 25,
    borderRadius: 32,
    marginBottom: 30,
  },
  mainLabel: { fontSize: 14, fontWeight: "600", opacity: 0.7 },
  mainAmount: { fontSize: 36, fontWeight: "900", marginVertical: 10 },
  tagRow: { flexDirection: "row", marginTop: 10 },
  tag: {
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
  },
  tagText: { fontSize: 11, fontWeight: "700" },
  sectionTitle: { fontSize: 20, fontWeight: "800", marginBottom: 20 },
  goalCard: {
    backgroundColor: "#F2F2F7",
    padding: 20,
    borderRadius: 24,
    marginBottom: 15,
  },
  goalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  goalName: { fontSize: 16, fontWeight: "700", marginLeft: 12 },
  progressContainer: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: "#FFDD2D" },
  progressValue: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 10,
    fontWeight: "600",
  },
});
