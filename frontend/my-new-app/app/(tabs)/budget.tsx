import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function BudgetScreen() {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(true);
  const [budgetData, setBudgetData] = useState({
    totalBalance: "0 ₽",
    pieChart: [] as Array<any>,
    transactions: [] as Array<{
      id: string;
      name: string;
      value: string;
      type: "income" | "expense";
      icon: string;
    }>,
  });

  useEffect(() => {
    // ЗАГЛУШКА
    setTimeout(() => {
      setBudgetData({
        totalBalance: "1 240 000 ₽",
        pieChart: [
          {
            name: "Расходы",
            population: 45000,
            color: "#1A1A1A",
            legendFontColor: "#8E8E93",
            legendFontSize: 12,
          },
          {
            name: "Доходы",
            population: 120000,
            color: "#FFDD2D",
            legendFontColor: "#8E8E93",
            legendFontSize: 12,
          },
        ],
        transactions: [
          {
            id: "1",
            name: "Зарплата",
            value: "+120 000 ₽",
            type: "income",
            icon: "arrow-up-circle",
          },
          {
            id: "2",
            name: "Аренда жилья",
            value: "-35 000 ₽",
            type: "expense",
            icon: "home-outline",
          },
          {
            id: "3",
            name: "Супермаркеты",
            value: "-10 000 ₽",
            type: "expense",
            icon: "cart-outline",
          },
        ],
      });
      setIsLoading(false);
    }, 1200);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#FFDD2D" />
        <Text style={styles.loaderText}>Анализ бюджета...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Бюджет</Text>
          <MaterialCommunityIcons name="shield-star" size={28} color="#000" />
        </View>

        {/* ГРАФИК */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Баланс операций</Text>
          <PieChart
            data={budgetData.pieChart}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute
            hasLegend={true}
          />
          <View style={styles.chartSummary}>
            <Text style={styles.summaryText}>
              Чистая прибыль: <Text style={styles.profit}>+75 000 ₽</Text>
            </Text>
          </View>
        </View>

        {/* ОБЩИЙ ОСТАТОК */}
        <View style={styles.totalSection}>
          <Text style={styles.label}>Всего на счетах</Text>
          <Text style={styles.amount}>{budgetData.totalBalance}</Text>
        </View>

        {/* ИСТОРИЯ ОПЕРАЦИЙ */}
        <Text style={styles.sectionTitle}>Последние транзакции</Text>
        <View style={styles.historyList}>
          {budgetData.transactions.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyIconBox}>
                <Ionicons name={item.icon as any} size={20} color="#000" />
              </View>
              <Text style={styles.historyName}>{item.name}</Text>
              <Text
                style={[
                  styles.historyValue,
                  { color: item.type === "income" ? "#4CD964" : "#1A1A1A" },
                ]}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  loaderContainer: { justifyContent: "center", alignItems: "center" },
  loaderText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#8E8E93",
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  pageTitle: { fontSize: 28, fontWeight: "900" },
  chartCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 32,
    padding: 20,
    marginBottom: 25,
  },
  chartTitle: { fontSize: 16, fontWeight: "800", marginBottom: 10 },
  chartSummary: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 15,
  },
  summaryText: { fontSize: 14, fontWeight: "600", color: "#8E8E93" },
  profit: { color: "#000", fontWeight: "800" },
  totalSection: { marginBottom: 30, marginTop: 10 },
  label: { fontSize: 14, color: "#8E8E93", marginBottom: 5 },
  amount: { fontSize: 32, fontWeight: "800" },
  sectionTitle: { fontSize: 20, fontWeight: "800", marginBottom: 15 },
  historyList: { backgroundColor: "#F9F9F9", borderRadius: 24, padding: 10 },
  historyItem: { flexDirection: "row", alignItems: "center", padding: 15 },
  historyIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFDD2D",
    justifyContent: "center",
    alignItems: "center",
  },
  historyName: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: "600" },
  historyValue: { fontSize: 15, fontWeight: "700" },
});
