import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import moment from "moment";
import { Picker } from '@react-native-picker/picker';
import BarChart from '../utils/BarChart'
import { useDispatch, useSelector } from "react-redux";
import { fetchTankUtilizationDateForCardsAction, fetchTankUtilizationForBarChartDataAction, fetchTankUtilizationTableGridDataAction } from '../components/redux/reducers/TankUtilizationSlice';

const TankUtilization = () => {
    
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { user, data } = useSelector((state) => state.auth);
    const token = data?.accessToken;
    const userId = user?.[0]?.Id;
    const roleId = user?.[0]?.RoleId;
    const [orientation, setOrientation] = useState('portrait');
    const [page, setPage] = useState(1);
    const [logPage, setLogPage] = useState(1);
    const itemsPerPage = 7;
    const [filterType, setFilterType] = useState("Day");
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { tankUtilizationCardData } = useSelector((state => state.fetchTankUtilizationCardData));
    const { tankUtilizationForBarChartData } = useSelector((state => state.fetchTankUtilizationBarChartData));
    const { tankUtilizationTableGridData } = useSelector((state => state.fetchTankUtilizationTableGridData));


    console.warn('start date ', startDate);
    console.warn('end date', endDate);
    // console.warn('TTS Manual Completed Data', ttsManuallyCompleteddata?.Data?.length);
    // console.warn('TTS Manual Grid 1', ttsManuallyCompletedtablegrid1data);


    useEffect(() => {
        if (token && userId && roleId && startDate && endDate) {
            dispatch(fetchTankUtilizationDateForCardsAction({ token, userId, roleId, startDate, endDate }));
            dispatch(fetchTankUtilizationForBarChartDataAction({ token, userId, roleId, startDate, endDate }));
            dispatch(fetchTankUtilizationTableGridDataAction({ token, userId, roleId, startDate, endDate }));
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

    const cardData = tankUtilizationCardData ? tankUtilizationCardData.Data : [];

    console.warn('Card Data', cardData);

    const processDataForTankUtilizationBarChart = (data) => {
        if (!data || !Array.isArray(data)) {
            console.error("Invalid or undefined data received:", data);
            return [];
        }

        const aggregatedData = {};

        data.forEach((item) => {
            const { TankName, Pulse, Product } = item;
            if (!aggregatedData[TankName]) {
                aggregatedData[TankName] = {};
            }
            if (!aggregatedData[TankName][Product]) {
                aggregatedData[TankName][Product] = 0;
            }
            aggregatedData[TankName][Product] += Pulse;
        });

        return Object.entries(aggregatedData).map(([bay, products]) => ({
            bay: `${bay}`,
            ...products,  // Spreads all dynamically found product categories
        }));
    };

    const logData = tankUtilizationTableGridData ? tankUtilizationTableGridData.Data : [];

    console.warn('Log Data', logData);

    const TankUtilizationBarChartData = tankUtilizationForBarChartData? processDataForTankUtilizationBarChart(tankUtilizationForBarChartData?.Data) : [];

    console.log('TankUtilizationBarChartData ', TankUtilizationBarChartData);

   

    useEffect(() => {
        const handleOrientationChange = (newOrientation) => {
            setOrientation(newOrientation.includes('LANDSCAPE') ? 'landscape' : 'portrait');
        };
        Orientation.addOrientationListener(handleOrientationChange);
        return () => Orientation.removeOrientationListener(handleOrientationChange);
    }, []);

    const paginatedLogData = logData?.slice((logPage - 1) * itemsPerPage, logPage * itemsPerPage);

    return (
        <View style={styles.container}>

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

            <View style={styles.summaryContainer}>
                {cardData?.map((item, index) => {
                    const backgroundColor = index % 3 === 0 ? '#D1ECF1' : index % 3 === 1 ? '#D4EDDA' : '#FAD2D2';
                    return (
                        <View key={index} style={[styles.summaryCard, { backgroundColor }]}>
                            <Text style={styles.summaryLabel}>Product : {item.Product}</Text>
                            <Text style={styles.summaryValue}>Average Sale : {item.Pulse.toFixed(2)}KL</Text>
                        </View>
                    );
                })}
            </View>

            <ScrollView>

                <View style={styles.card}>
                    <Text style={TankUtilizationBarChartData.length > 0 ? styles.title : styles.titlewithnodata}>Tank Utilization Data</Text>
                    {
                        TankUtilizationBarChartData.length > 0 ?
                            <BarChart data={TankUtilizationBarChartData} title="Bay Wise Loading Details" xaxis='Tanks' yaxis='Pulse' /> :
                            <Text style={styles.noDataText}>No Data Available</Text>
                    }

                </View>

                <Text style={styles.header}>Tank-Wise Pulse Log Details</Text>
                <FlatList
                    data={paginatedLogData}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.table}
                    ListHeaderComponent={
                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>Tank Name</Text>
                            <Text style={styles.headerText}>Pulse</Text>
                            <Text style={styles.headerText}>Product</Text>
                            <Text style={styles.headerText}>Log Time</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.TankName}</Text>
                            <Text style={styles.cell}>{item.Pulse.toFixed(2)}</Text>
                            <Text style={styles.cell}>{item.Product}</Text>
                            <Text style={styles.cell}>{moment(item.LogTime).format("DD-MM-YYYY HH:mm:ss")}</Text>
                        </View>
                    )}
                />
                <View style={styles.pagination}>
                    <TouchableOpacity onPress={() => setLogPage(logPage - 1)} disabled={logPage === 1}>
                        <Text style={styles.pageButton}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text>Page {logPage} of {Math.ceil(logData?.length / itemsPerPage) || 1}</Text>
                    <TouchableOpacity onPress={() => setLogPage(logPage + 1)} disabled={logPage * itemsPerPage >= logData?.length}>
                        <Text style={styles.pageButton}>{'>'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 3, padding: 10, backgroundColor: '#fff' },
    summaryContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
    summaryCard: { width: 150, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 5, elevation: 3},
    summaryLabel: { fontSize: 10, fontWeight: '600' },
    summaryValue: { fontSize: 10, fontWeight: 'bold' },
    header: { fontSize: 14, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
    table: { marginTop: 10 },
    tableHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: '#f0f0f0' },
    headerText: { flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    cell: { flex: 1, fontSize: 10, textAlign: 'center' },
    pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
    pageButton: { fontSize: 20, paddingHorizontal: 10, color: 'blue' },

    // filter Style

    filterContainer: { flexDirection: "row", justifyContent: "space-between", margin: 10, padding: 10, borderRadius: 8, backgroundColor: "#f9f9f9", elevation: 3 },
    picker: { flex: 1, marginHorizontal: 5 },
    pickerItem: {
        fontSize: 10,  // Decreased font size 
        color: "#333"  // Slightly darker for visibility a
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
      title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, marginLeft:70},
      titlewithnodata: { fontSize: 18, fontWeight: "bold", marginBottom: 10, marginLeft:20},
});

export default TankUtilization;
