import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const BarChart = ({ data, title = "Bay Wise Loading Details", xaxis = "Bays", yaxis = "Pulse"  }) => {
  if (!data || data.length === 0) return <Text>No Data Available</Text>;

  const categories = [...new Set(data.flatMap((d) => Object.keys(d).filter((key) => key !== 'bay')))];
  const colors = ["orange", "blue", "gray", "green", "red", "purple"]; // Extendable color list
  const MAX_VALUE = Math.max(...data.flatMap((d) => categories.map((key) => d[key] || 0)));

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* ✅ Dynamic Legend Section */}
      <View style={styles.legendContainer}>
        {categories.map((category, index) => (
          <View key={category} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors[index % colors.length] }]} />
            <Text style={styles.legendText}>{category}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <Text style={styles.yAxisTitle}>{yaxis}</Text> 
        <View style={styles.yAxis}>
      
          {Array.from({ length: 6 }).map((_, i) => {
            const stepValue = Math.round((MAX_VALUE / 5) * (5 - i));
            return (
              <Text key={i} style={styles.yAxisLabel}>{stepValue}</Text>
            );
          })}
        </View>

        {/* Bars & X-axis */}
        <ScrollView horizontal>
          <View style={styles.barsContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.bayGroup}>
                <View style={styles.barGroup}>
                  {/* Dynamic Bars */}
                  {categories.map((category, i) => (
                    <View
                      key={`${index}-${category}`}
                      style={[
                        styles.bar,
                        {
                          height: (item[category] / MAX_VALUE) * 200,
                          backgroundColor: colors[i % colors.length],
                          marginLeft: i === 0 ? 0 : 5,
                        },
                      ]}
                    />
                  ))}
                </View>
                <Text style={styles.xAxisLabel}>{item.bay}</Text>
            
              </View>
            ))}
          </View>
  
        </ScrollView>
  
      </View>
      <Text style={styles.xAxisTitle}>{xaxis}</Text>
    </ScrollView>
    
  );
};


const styles = StyleSheet.create({
  scrollContainer: { paddingVertical: 10, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  // ✅ Dynamic Legend Styles
  legendContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", marginHorizontal: 10 },
  legendColor: { width: 15, height: 15, borderRadius: 3, marginRight: 5 },
  legendText: { fontSize: 14 },

  chartContainer: { flexDirection: "row", alignItems: "flex-end" },
  yAxis: { justifyContent: "space-between", marginRight: 10 },
  yAxisLabel: { fontSize: 10, textAlign: "right", paddingRight: 5, marginBottom: 20 },
  yAxisTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 115, transform: [{ rotate: "-90deg" }] },

  barsContainer: { flexDirection: "row", alignItems: "flex-end", paddingLeft: 10, paddingRight: 10 },
  bayGroup: { alignItems: "center", marginHorizontal: 20 },
  barGroup: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center" },
  bar: { width: 10, borderRadius: 3 },
  xAxisLabel: { fontSize: 10, marginTop: 10, textAlign: "center", transform: [{ rotate: "-10deg" }], width: 50 },
  xAxisTitle: { fontSize: 12, fontWeight: "bold", marginTop: 10, marginLeft:60, textAlign: "center" },
});

export default BarChart;
