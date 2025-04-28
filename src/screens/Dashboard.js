import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import BarChart from '../utils/BarChart';
import { PieChart } from "react-native-chart-kit";
import { fetchDashboardBayWiseLoadingChart, fetchDashboardAvgBayWiseFlowRateChart, fetchDashboardProductWiseLoadedQtyChart, fetchDashboardTTSHigherCycleTimeChart } from '../components/redux/reducers/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get("window").width;
  const { user, data } = useSelector((state) => state.auth);
  const token = data?.accessToken;
  const userId = user?.[0]?.Id;
  const roleId = user?.[0]?.RoleId;

  const [filterType, setFilterType] = useState("Day");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { baywiseloadingdata } = useSelector((state => state.fetchBayWiseLoadingChart));
  const { avgBaywiseFlowRateData } = useSelector((state => state.fetchAvgBayWiseFlowRateChart));
  const { productwiseLoadedQtyData } = useSelector((state => state.fetchProductWiseLoadedQtyChart));
  const { higherCycleTimeData } = useSelector((state => state.fetchHigherCycleTimeChart));
  console.log("Bay Loading Data", baywiseloadingdata);
  console.log("Avg Bay Flow Rate", avgBaywiseFlowRateData);
  console.log("higher Cycle Time Data", higherCycleTimeData);

  console.warn('start date ', startDate);
  console.warn('end date', endDate);

  useEffect(() => {
    if (token && userId && roleId && startDate && endDate) {
      dispatch(fetchDashboardBayWiseLoadingChart({ token, userId, roleId, startDate, endDate }));
      dispatch(fetchDashboardAvgBayWiseFlowRateChart({ token, userId, roleId, startDate, endDate }));
      dispatch(fetchDashboardProductWiseLoadedQtyChart({ token, userId, roleId, startDate, endDate }));
      dispatch(fetchDashboardTTSHigherCycleTimeChart({ token, userId, roleId, startDate, endDate }));
    }
  }, [dispatch, token, userId, roleId, startDate, endDate]);

  const updateDateRange = (type, value) => {
    let start, end;
    if (type === "Day") {
      start = moment(value).format("YYYY-MM-DD");
      end = start;
    } else if (type === "Week") {
      start = moment(value, "GGGG-WW").startOf("isoWeek").format("YYYY-MM-DD");
      end = moment(value, "GGGG-WW").endOf("isoWeek").format("YYYY-MM-DD");
    } else if (type === "Month") {
      start = moment(value, "YYYY-MM").startOf("month").format("YYYY-MM-DD");
      end = moment(value, "YYYY-MM").endOf("month").format("YYYY-MM-DD");
    } else if (type === "Year") {
      start = moment(value, "YYYY").startOf("year").format("YYYY-MM-DD");
      end = moment(value, "YYYY").endOf("year").format("YYYY-MM-DD");
    }
    setStartDate(start);
    setEndDate(end);
  };

  const processDataForBayLoading = (data) => {
    if (!data || !Array.isArray(data)) {
      console.error("Invalid or undefined data received:", data);
      return [];
    }

    const aggregatedData = {};

    data.forEach((item) => {
      const { BayNumber, Pulse, Product } = item;
      if (!aggregatedData[BayNumber]) {
        aggregatedData[BayNumber] = {};
      }
      if (!aggregatedData[BayNumber][Product]) {
        aggregatedData[BayNumber][Product] = 0;
      }
      aggregatedData[BayNumber][Product] += Pulse;
    });

    return Object.entries(aggregatedData).map(([bay, products]) => ({
      bay: `Bay ${bay}`,
      ...products,  // Spreads all dynamically found product categories
    }));
  };

  const processDataForBayFlowRate = (data) => {
    if (!data || !Array.isArray(data)) {
      console.error("Invalid or undefined data received:", data);
      return [];
    }

    const aggregatedData = {};

    data.forEach((item) => {
      const { BayNumber, FlowRate, Product } = item;
      if (!aggregatedData[BayNumber]) {
        aggregatedData[BayNumber] = {};
      }
      if (!aggregatedData[BayNumber][Product]) {
        aggregatedData[BayNumber][Product] = 0;
      }
      aggregatedData[BayNumber][Product] += FlowRate;
    });

    return Object.entries(aggregatedData).map(([bay, products]) => ({
      bay: `Bay ${bay}`,
      ...products,  // Automatically handles all product types dynamically
    }));
  };

  const processPieChartProductWiseLoadedData = (data) => {
    if (!data || !Array.isArray(data)) {
      console.error("Invalid or undefined data received:", data);
      return [];
    }

    return data
      .filter(item => item.Product) // Exclude null product names
      .map((item, index) => ({
        name: `% ${item.Product}`,
        population: item.LoadPercentage,  // Value for Pie Chart
        color: getColor(index),  // Assign colors dynamically
        legendFontColor: "#7F7F7F",
        legendFontSize: 7,
      }));
  };

  const processPieChartCycleTimeData = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Invalid or undefined data received:", data);
      return [];
    }

    const item = data[0]; // Assuming there's only one object in the array
    return [
      { name: "% Main Entry to Main Exit", population: item.MainEntryToLicenseEntryTimePercentage, color: "#4285F4", legendFontColor: "#7F7F7F", legendFontSize: 7 },
      { name: "% License Entry to Loading End", population: item.LicenseEntryToLoadingEndTimePercentage, color: "#EA4335", legendFontColor: "#7F7F7F", legendFontSize: 7 },
      { name: "% Loading End to License Exit", population: item.LoadingEndToLicenseExitTimePercentage, color: "#FBBC05", legendFontColor: "#7F7F7F", legendFontSize: 7 },
      { name: "% License Exit to Main Exit", population: item.LicenseExitToMainExitTimePercentage, color: "#34A853", legendFontColor: "#7F7F7F", legendFontSize: 7 },
    ];
  };

  const getColor = (index) => {
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#9B59B6", "#F39C12"];
    return colors[index % colors.length]; // Loop through colors
  };


  const bayWiseData = baywiseloadingdata ? processDataForBayLoading(baywiseloadingdata.Data) : [];

  console.log('Bay wise Loadig Data ', bayWiseData);

  const bayWiseFlowRateData = avgBaywiseFlowRateData ? processDataForBayFlowRate(avgBaywiseFlowRateData.Data) : [];

  console.log('Bay Flow Rate Data ', bayWiseFlowRateData);

  const productwiseloadeddata = productwiseLoadedQtyData ? processPieChartProductWiseLoadedData(productwiseLoadedQtyData?.Data) : [];

  console.warn('ProductWise Loaded Data', productwiseloadeddata)

  const cycleTimeChartData = higherCycleTimeData ? processPieChartCycleTimeData(higherCycleTimeData?.Data) : [];

  console.warn('Higher Cycle Data', cycleTimeChartData)

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.filterContainer}>
        {/* Main Filter Type Picker */}
        <Picker selectedValue={filterType} onValueChange={(itemValue) => {
          setFilterType(itemValue);
          setSelectedValue("");
          if (itemValue !== "Month" && itemValue !== "Year") {
            setSelectedYear(moment().format("YYYY")); // Reset year when switching filters
          }
        }} style={styles.picker} itemStyle={styles.pickerItem}>
          <Picker.Item style={styles.pickerItem} label="Day" value="Day" />
          <Picker.Item style={styles.pickerItem} label="Week" value="Week" />
          <Picker.Item style={styles.pickerItem} label="Month" value="Month" />
          <Picker.Item style={styles.pickerItem} label="Year" value="Year" />
        </Picker>

        {/* Year Picker for "Month", "Week", and "Year" */}
        {(filterType === "Month" || filterType === "Week") && (
          <Picker selectedValue={selectedYear} onValueChange={(itemValue) => {
            setSelectedYear(itemValue);
            setSelectedValue(""); // Reset selection when year changes
          }} style={styles.picker} itemStyle={styles.pickerItem}>
            {Array.from({ length: 5 }, (_, i) => {
              const year = moment().subtract(i, "years").format("YYYY");
              return <Picker.Item style={styles.pickerItem} key={year} label={year} value={year} />;
            })}
          </Picker>
        )}

        {/* Show relevant options based on filter selection */}
        {(filterType !== "Month" || selectedYear) && (
          <Picker selectedValue={selectedValue} onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            updateDateRange(filterType, itemValue);
          }} style={styles.picker} itemStyle={styles.pickerItem}>

            {/* Day Picker */}
            {filterType === "Day" &&
              Array.from({ length: moment().daysInMonth() }, (_, i) => (
                <Picker.Item key={i} style={styles.pickerItem} label={moment().date(i + 1).format("YYYY-MM-DD")} value={moment().date(i + 1).format("YYYY-MM-DD")} />
              ))}

            {/* Week Picker */}
            {filterType === "Week" &&
              Array.from({ length: moment(selectedYear, "YYYY").isoWeeksInYear() }, (_, i) => {
                const weekStart = moment().year(selectedYear).isoWeek(i + 1).startOf("isoWeek").format("YYYY-MM-DD");
                const weekEnd = moment().year(selectedYear).isoWeek(i + 1).endOf("isoWeek").format("YYYY-MM-DD");
                return <Picker.Item key={i} style={styles.pickerItem} label={`Week ${i + 1} (${weekStart} - ${weekEnd})`} value={`${selectedYear}-${i + 1}`} />;
              })}

            {/* Month Picker (Updates when Year changes) */}
            {filterType === "Month" &&
              selectedYear && // Only show months if year is selected
              Array.from({ length: 12 }, (_, i) => {
                const monthLabel = moment().month(i).format("MMMM");
                return <Picker.Item style={styles.pickerItem} key={i} label={`${monthLabel} ${selectedYear}`} value={`${selectedYear}-${moment().month(i).format("MM")}`} />;
              })}
            {filterType === "Year" && Array.from({ length: 5 }, (_, i) => (
              <Picker.Item style={styles.pickerItem} key={i} label={moment().subtract(i, "years").format("YYYY")} value={moment().subtract(i, "years").format("YYYY")} />
            ))}
          </Picker>
        )}
      </View>

      {/* Bar Charts */}
      <View style={styles.card}>
        <Text style={bayWiseData.length > 0 ? styles.title : styles.titlewithnodata}>Bay Wise Loading Details</Text>
        {
          bayWiseData.length > 0 ?
            <BarChart data={bayWiseData} title="Bay Wise Loading Details" /> :
            <Text style={styles.noDataText}>No Data Available</Text>
        }

      </View>

      <View style={styles.card}>
        <Text style={bayWiseFlowRateData.length > 0 ? styles.title : styles.titlewithnodata}>Average Bay Wise Flow Rate(LPM)</Text>
        {
          bayWiseFlowRateData.length > 0 ?
            <BarChart data={bayWiseFlowRateData} title="Average Bay Wise Flow Rate(LPM)" xaxis="Bays" yaxis="Flow Rate" /> :
            <Text style={styles.noDataText}>No Data Available</Text>
        }

      </View>

      <View style={styles.card}>
        <Text style={productwiseloadeddata.length > 0 ? styles.title : styles.titlewithnodata}>Product Wise Loaded Qty</Text>

        {productwiseloadeddata.length > 0 ? (
          <PieChart
            data={productwiseloadeddata}
            width={screenWidth - 60}  // Adjust width
            height={220}  // Chart height
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
            }}
            accessor={"population"}  // Key for values
            backgroundColor={"transparent"}
            paddingLeft={"10"}
            center={[0, 0]}  // Adjust positioning
            absolute  // Show values inside the chart
          />
        ) : (
          <Text style={styles.noDataText}>No Data Available</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={cycleTimeChartData.length > 0 ? styles.title : styles.titlewithnodata}>
          TTS Higher Cycle Time Distribution
        </Text>
        {cycleTimeChartData.length > 0 ? (
          <PieChart
            data={cycleTimeChartData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
            center={[0, 0]}
            absolute
          />
        ) : (
          <Text style={styles.noDataText}>No Data Available</Text>
        )}
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { paddingVertical: 10, alignItems: "center" },
  filterContainer: { flexDirection: "row", justifyContent: "space-between", margin: 10, padding: 10, borderRadius: 8, backgroundColor: "#f9f9f9", elevation: 3 },
  picker: { flex: 1, marginHorizontal: 5 },
  pickerItem: {
    fontSize: 10,  // Decreased font size 
    color: "#333"  // Slightly darker for visibility 
  },
  card: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 360,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    padding: 20,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, marginLeft: 70 },
  titlewithnodata: { fontSize: 18, fontWeight: "bold", marginBottom: 10, marginLeft: 20 },

});

export default Dashboard;