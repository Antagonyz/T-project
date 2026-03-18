import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { FinanceService } from '../../src/api/service'; // Раскомментируешь позже

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Состояния для работы с бэкендом
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    balance: "0 ₽",
    cards: [] as Array<{
      id: string;
      name: string;
      price: string;
      isBlack: boolean;
    }>,
    forecast: { labels: [""], datasets: [{ data: [0] }] }, // Дефолтная структура для графика
  });

  // Загрузка данных при открытии экрана
  useEffect(() => {
    // ЗАГЛУШКА: Имитация ответа от Spring Boot (удалить позже)
    setTimeout(() => {
      setDashboardData({
        balance: "1 000 000 ₽",
        cards: [
          { id: "1", name: "Mir Private", price: "450 000 ₽", isBlack: true },
          { id: "2", name: "T-Black", price: "550 000 ₽", isBlack: false },
        ],
        forecast: {
          labels: ["Окт", "Ноя", "Дек", "Янв (П)", "Фев (П)"],
          datasets: [{ data: [950000, 980000, 1000000, 1030000, 1060000] }],
        },
      });
      setIsLoading(false);
    }, 1500); // Имитируем загрузку 1.5 секунды

    /* РЕАЛЬНЫЙ КОД (раскомментируй, когда будет бэк):
    FinanceService.getDashboard()
      .then(response => {
        setDashboardData(response.data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
    */
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#FFDD2D" />
        <Text style={styles.loaderText}>Синхронизация данных...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ХЕДЕР */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="shield-star" size={32} color="#000" />
            <Text style={styles.brandName}>Т-БАНК</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* БАЛАНС */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Ваш капитал</Text>
          <Text style={styles.balanceValue}>{dashboardData.balance}</Text>
        </View>

        {/* ПОИСК */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#8E8E93" />
          <TextInput
            placeholder="Поиск по приложению"
            style={styles.input}
            placeholderTextColor="#8E8E93"
          />
        </View>

        {/* КОШЕЛЕК (Динамический рендер) */}
        <Text style={styles.sectionTitle}>Кошелек</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {dashboardData.cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.blackCard,
                !card.isBlack && { backgroundColor: "#FFDD2D" },
              ]}
            >
              <MaterialCommunityIcons
                name="credit-card-chip"
                size={28}
                color={card.isBlack ? "#FFDD2D" : "#000"}
              />
              <Text
                style={[styles.cardInfo, !card.isBlack && { color: "#000" }]}
              >
                {card.name}
              </Text>
              <Text
                style={[styles.cardPrice, !card.isBlack && { color: "#000" }]}
              >
                {card.price}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ГРАФИК (Данные из стейта) */}
        <View style={styles.chartContainer}>
          <View style={styles.legendRow}>
            <View style={styles.aiLabel}>
              <Text style={styles.aiLabelText}>AI ПРОГНОЗ</Text>
            </View>
            <Text style={styles.currency}>в ₽</Text>
          </View>
          <LineChart
            data={dashboardData.forecast}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#1A1A1A",
              backgroundGradientFrom: "#1A1A1A",
              backgroundGradientTo: "#1A1A1A",
              color: (opacity = 1) => `rgba(255, 221, 45, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(142, 142, 147, ${opacity})`,
              propsForBackgroundLines: {
                strokeDasharray: "",
                stroke: "rgba(255,255,255,0.05)",
              },
            }}
            bezier
            formatYLabel={(value) => {
              const num = parseInt(value);
              if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
              if (num >= 1000) return `${num / 1000}k`;
              return value;
            }}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withInnerLines={true}
            withOuterLines={false}
            style={{ borderRadius: 24, paddingRight: 40, marginVertical: 10 }}
          />
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  brandName: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
    marginLeft: 8,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceSection: { marginVertical: 30 },
  balanceLabel: { fontSize: 14, color: "#8E8E93", marginBottom: 5 },
  balanceValue: { fontSize: 36, fontWeight: "800", color: "#000" },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  input: { marginLeft: 10, fontSize: 16, flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: "800", marginBottom: 15 },
  horizontalScroll: { marginBottom: 30 },
  blackCard: {
    backgroundColor: "#1A1A1A",
    width: 160,
    height: 180,
    borderRadius: 24,
    padding: 20,
    justifyContent: "space-between",
    marginRight: 15,
  },
  cardInfo: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  cardPrice: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  chartContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 32,
    padding: 20,
    marginBottom: 30,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  aiLabel: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiLabelText: {
    color: "#FFDD2D",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  currency: { color: "#8E8E93", fontSize: 12, fontWeight: "600" },
});
