import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import moment from "moment";
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from "react-redux";
import { fetchTTSManuallyCompletedDataAction, fetchTTSManuallyCompletedTableGrid1Action, fetchTTSManuallyCompletedTableGrid2Action } from '../components/redux/reducers/TTManuallyCompletedSlice'

const TTManuallyCompleted = () => {
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
    const { ttsManuallyCompleteddata } = useSelector((state => state.fetchTTSManuallyCompletedData));
    const { ttsManuallyCompletedtablegrid1data } = useSelector((state => state.fetchTTSManuallyCompletedTableGrid));
    const { ttsManuallyCompletedtablegrid2data } = useSelector((state => state.fetchTTSManuallyCompletedTableGrid2));


    console.warn('start date ', startDate);
    console.warn('end date', endDate);
    console.warn('TTS Manual Completed Data',  ttsManuallyCompleteddata?.Data?.length );
    console.warn('TTS Manual Grid 1', ttsManuallyCompletedtablegrid1data);


    useEffect(() => {
        if (token && userId && roleId && startDate && endDate) {
            dispatch(fetchTTSManuallyCompletedDataAction({ token, userId, roleId, startDate, endDate }));
            dispatch(fetchTTSManuallyCompletedTableGrid1Action({ token, userId, roleId, startDate, endDate }));
            dispatch(fetchTTSManuallyCompletedTableGrid2Action({ token, userId, roleId, startDate, endDate }));
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

    const summaryData = [
        { label: 'Total Indent', value:  ttsManuallyCompleteddata?.Data?.[0]?.TotalIndent || 0, color: '#FAD2D2' },
        { label: 'Total Result Count', value: ttsManuallyCompleteddata?.Data?.[0]?.TotalResultCount || 0, color: '#D4EDDA' },
        { label: 'Percentage', value: ` ${ttsManuallyCompleteddata?.Data?.[0]?.Percentage || 0}%`, color: '#D1ECF1' },
    ];

    const tableData = ttsManuallyCompletedtablegrid1data? ttsManuallyCompletedtablegrid1data.Data : [];

    const logData = ttsManuallyCompletedtablegrid2data? ttsManuallyCompletedtablegrid2data.Data : [];

    useEffect(() => {
        const handleOrientationChange = (newOrientation) => {
            setOrientation(newOrientation.includes('LANDSCAPE') ? 'landscape' : 'portrait');
        };
        Orientation.addOrientationListener(handleOrientationChange);
        return () => Orientation.removeOrientationListener(handleOrientationChange);
    }, []);

    const paginatedTableData =  tableData?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
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
                {summaryData.map((item, index) => (
                    <View key={index} style={[styles.summaryCard, { backgroundColor: item.color }]}>
                        <Text style={styles.summaryLabel}>{item.label}</Text>
                        <Text style={styles.summaryValue}>{item.value}</Text>
                    </View>
                ))}
            </View>

            <ScrollView>
                <Text style={styles.header}>Indent Count</Text>
                <FlatList
                    data={paginatedTableData}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.table}
                    ListHeaderComponent={
                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>Truck Number</Text>
                            <Text style={styles.headerText}>Indent Count</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.TruckNumber}</Text>
                            <Text style={styles.cell}>{item.IndentCount}</Text>
                        </View>
                    )}
                />

                <View style={styles.pagination}>
                    <TouchableOpacity onPress={() => setPage(page - 1)} disabled={page === 1}>
                        <Text style={styles.pageButton}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text>Page {page} of {Math.ceil(tableData?.length / itemsPerPage) || 1}</Text>
                    <TouchableOpacity onPress={() => setPage(page + 1)} disabled={page * itemsPerPage >= tableData?.length}>
                        <Text style={styles.pageButton}>{'>'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.header}>Log Details</Text>
                <FlatList
                    data={paginatedLogData}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.table}
                    ListHeaderComponent={
                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>Truck Number</Text>
                            <Text style={styles.headerText}>Manually Completed By</Text>
                            <Text style={styles.headerText}>Log Time</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.TruckNumber}</Text>
                            <Text style={styles.cell}>{item.ManuallyCompletedByName}</Text>
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
    summaryCard: { width: 100, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 5, elevation: 3 },
    summaryLabel: { fontSize: 10, fontWeight: '600' },
    summaryValue: { fontSize: 15, fontWeight: 'bold' },
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
});

export default TTManuallyCompleted;
