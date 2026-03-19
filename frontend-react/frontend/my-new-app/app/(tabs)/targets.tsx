import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TargetsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Цели</Text>

        <View style={styles.targetMainCard}>
          <Text style={styles.targetLabel}>Текущий приоритет</Text>
          <Text style={styles.targetName}>Новый автомобиль</Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>до 11 сентября 2026</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Чек-лист задач</Text>
        {[
          { t: "Отложить 10% с зарплаты", d: true },
          { t: "Продать старое авто", d: false },
          { t: "Выбрать комплектацию", d: false },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.taskItem}>
            <View style={[styles.checkbox, item.d && styles.checked]}>
              {item.d && <Ionicons name="checkmark" size={16} color="#000" />}
            </View>
            <Text style={[styles.taskText, item.d && styles.taskDone]}>
              {item.t}
            </Text>
          </TouchableOpacity>
        ))}

        {/* AI ИНСАЙТ (ПОД СТИЛЬ) */}
        <View style={styles.aiInsight}>
          <Ionicons name="flash" size={20} color="#FFDD2D" />
          <Text style={styles.aiInsightText}>
            Совет: Ускорьте накопления на 3%, чтобы успеть к дедлайну.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 28, fontWeight: "900", marginVertical: 20 },
  targetMainCard: {
    backgroundColor: "#1A1A1A",
    padding: 25,
    borderRadius: 32,
    marginBottom: 30,
  },
  targetLabel: {
    color: "#FFDD2D",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 5,
  },
  targetName: { color: "#FFF", fontSize: 24, fontWeight: "700" },
  dateBadge: {
    backgroundColor: "#333",
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 10,
    marginTop: 15,
  },
  dateText: { color: "#8E8E93", fontSize: 12, fontWeight: "600" },
  sectionTitle: { fontSize: 20, fontWeight: "800", marginBottom: 20 },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
    padding: 18,
    borderRadius: 20,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D1D1D6",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: { backgroundColor: "#FFDD2D", borderColor: "#FFDD2D" },
  taskText: {
    fontSize: 15,
    marginLeft: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  taskDone: { textDecorationLine: "line-through", color: "#8E8E93" },
  aiInsight: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 24,
    marginTop: 20,
  },
  aiInsightText: {
    color: "#FFF",
    marginLeft: 12,
    fontSize: 14,
    flex: 1,
    fontWeight: "500",
  },
});
