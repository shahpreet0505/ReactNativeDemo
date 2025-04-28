import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_Base_URL } from '../../../constants/constants';


// TTS Late Reporting Data

export const fetchTTSLateReportingDataAction = createAsyncThunk(
    'fetchTTSLateReportingData/fetchTTSLateReportingDataAction',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TTSLateReporting/GetTTSLateReportingData?StartDate=${startDate}&EndDate=${endDate}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'userId': userId.toString(),
                    'RoleId': roleId.toString(),
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return rejectWithValue(data.Message || 'Failed to fetch bay-wise loading data.');
            }
        } catch (error) {
            return rejectWithValue('An error occurred while fetching bay-wise loading data.');
        }
    }
);

const fetchTTSLateReportingDataSlice = createSlice({
    name: 'fetchTTSLateReportingData',
    initialState: {
        ttsLateReportingdata: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTTSLateReportingDataAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTTSLateReportingDataAction.fulfilled, (state, action) => {
                state.loading = false;
                state.ttsLateReportingdata = action.payload;
            })
            .addCase(fetchTTSLateReportingDataAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// TTS Late Reporting Data Grid 1 

export const fetchTTSLateReportingTableGrid1Action = createAsyncThunk(
    'fetchTTSLateReportingTableGrid/fetchTTSLateReportingTableGrid1Action',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TTSLateReporting/GetTTSLateReportingGrid1?StartDate=${startDate}&EndDate=${endDate}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'userId': userId.toString(),
                    'RoleId': roleId.toString(),
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return rejectWithValue(data.Message || 'Failed to fetch bay-wise loading data.');
            }
        } catch (error) {
            return rejectWithValue('An error occurred while fetching bay-wise loading data.');
        }
    }
);

const fetchTTSLateReportingTableGrid1Slice = createSlice({
    name: 'fetchTTSLateReportingTableGrid',
    initialState: {
        ttsLateReportingtablegrid1data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTTSLateReportingTableGrid1Action.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTTSLateReportingTableGrid1Action.fulfilled, (state, action) => {
                state.loading = false;
                state.ttsLateReportingtablegrid1data = action.payload;
            })
            .addCase(fetchTTSLateReportingTableGrid1Action.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// TTS Late Reporting Data Grid 2 

export const fetchTTSLateReportingTableGrid2Action = createAsyncThunk(
    'fetchTTSLateReportingTableGrid2/fetchTTSLateReportingTableGrid2Action',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TTSLateReporting/GetTTSLateReportingGrid2?StartDate=${startDate}&EndDate=${endDate}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'userId': userId.toString(),
                    'RoleId': roleId.toString(),
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return rejectWithValue(data.Message || 'Failed to fetch bay-wise loading data.');
            }
        } catch (error) {
            return rejectWithValue('An error occurred while fetching bay-wise loading data.');
        }
    }
);

const fetchTTSLateReportingTableGrid2Slice = createSlice({
    name: 'fetchTTSLateReportingTableGrid2',
    initialState: {
        ttsLateReportingtablegrid2data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTTSLateReportingTableGrid2Action.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTTSLateReportingTableGrid2Action.fulfilled, (state, action) => {
                state.loading = false;
                state.ttsLateReportingtablegrid2data = action.payload;
            })
            .addCase(fetchTTSLateReportingTableGrid2Action.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const ttsLateReportingdataReducer = fetchTTSLateReportingDataSlice.reducer;
export const ttsLateReportingTableGrid1DataReducer = fetchTTSLateReportingTableGrid1Slice.reducer;
export const ttsLateReportingTableGrid2DataReducer = fetchTTSLateReportingTableGrid2Slice.reducer;
