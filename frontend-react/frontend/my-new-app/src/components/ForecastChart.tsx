// src/components/ForecastChart.tsx
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

// --- ДАННЫЕ ОТ SPRING (MOCK) ---
const mockAiData = {
  labels: ["Окт", "Ноя", "Дек", "Янв (П)", "Фев (П)", "Мар (П)"],
  datasets: [
    {
      data: [950000, 980000, 1000000, 1030000, 1060000, 1100000],
      // В chart-kit сложно сделать часть линии пунктирной,
      // поэтому мы просто используем один dataset и визуально пометим лейблы (П)
    },
  ],
};

const screenWidth = Dimensions.get("window").width;

// --- КОНФИГУРАЦИЯ СТИЛЯ Т-БАНКА ---
const chartConfig = {
  backgroundColor: "#1A1A1A", // Глубокий черный фон карточки
  backgroundGradientFrom: "#1A1A1A",
  backgroundGradientTo: "#1A1A1A",

  decimalPlaces: 0, // Без знаков после запятой (₽)

  // ЦВЕТА СЕТКИ И ЛЕЙБЛОВ
  color: (opacity = 1) => `rgba(255, 221, 45, ${opacity})`, // Основной желтый (#FFDD2D)
  labelColor: (opacity = 1) => `rgba(142, 142, 147, ${opacity})`, // Серый (#8E8E93)

  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "5", // Размер точки
    strokeWidth: "2",
    stroke: "#FFDD2D", // Желтый контур
  },
  propsForBackgroundLines: {
    strokeDasharray: "", // Сплошные линии сетки
    stroke: "rgba(255,255,255,0.05)", // Очень тусклая сетка
  },
};

export const ForecastChart = () => {
  return (
    <View style={styles.container}>
      {/* ЛЕГЕНДА ГРАФИКА */}
      <View style={styles.legendRow}>
        <View style={styles.aiLabel}>
          <Text style={styles.aiLabelText}>AI ПРОГНОЗ КАПИТАЛА</Text>
        </View>
        <Text style={styles.currency}>в ₽</Text>
      </View>

      <LineChart
        data={mockAiData}
        width={screenWidth - 40} // Отступы экрана
        height={220}
        chartConfig={chartConfig}
        bezier // Скругление линий
        // Настройка оси Y (для сокращения тыс/млн)
        formatYLabel={(value) => {
          const num = parseInt(value);
          if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
          if (num >= 1000) return `${num / 1000}k`;
          return value;
        }}
        // Скрываем сетку по X для минимализма
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withInnerLines={true}
        withOuterLines={false}
        withShadow={true} // Area Chart заливка
        style={{
          marginVertical: 10,
          borderRadius: 24,
          paddingRight: 40, // Чтобы лейблы Y не обрезались
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A", // Черная карточка
    borderRadius: 32,
    padding: 20,
    marginBottom: 30,
    overflow: "hidden",
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
    color: "#FFDD2D", // Желтый текст
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  currency: {
    color: "#8E8E93",
    fontSize: 12,
    fontWeight: "600",
  },
});
