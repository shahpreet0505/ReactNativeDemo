import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_Base_URL } from '../../../constants/constants';


// TTS Manually Completed Data

export const fetchTTSManuallyCompletedDataAction = createAsyncThunk(
    'fetchTTSManuallyCompletedData/fetchTTSManuallyCompletedDataAction',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TTSManuallyCompleted/GetTTSManuallyCompletedData?StartDate=${startDate}&EndDate=${endDate}`;
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

const fetchTTSManuallyCompletedDataSlice = createSlice({
    name: 'fetchTTSManuallyCompletedData',
    initialState: {
        ttsManuallyCompleteddata: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTTSManuallyCompletedDataAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTTSManuallyCompletedDataAction.fulfilled, (state, action) => {
                state.loading = false;
                state.ttsManuallyCompleteddata = action.payload;
            })
            .addCase(fetchTTSManuallyCompletedDataAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// TTS Manually Completed Data Grid 1 

export const fetchTTSManuallyCompletedTableGrid1Action = createAsyncThunk(
    'fetchTTSManuallyCompletedTableGrid/fetchTTSManuallyCompletedTableGrid1Action',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TTSManuallyCompleted/GetTTSManuallyCompletedTableGrid1?StartDate=${startDate}&EndDate=${endDate}`;
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

const fetchTTSManuallyCompletedTableGrid1Slice = createSlice({
    name: 'fetchTTSManuallyCompletedTableGrid',
    initialState: {
        ttsManuallyCompletedtablegrid1data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTTSManuallyCompletedTableGrid1Action.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTTSManuallyCompletedTableGrid1Action.fulfilled, (state, action) => {
                state.loading = false;
                state.ttsManuallyCompletedtablegrid1data = action.payload;
            })
            .addCase(fetchTTSManuallyCompletedTableGrid1Action.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// TTS Manually Completed Data Grid 2 

export const fetchTTSManuallyCompletedTableGrid2Action = createAsyncThunk(
    'fetchTTSManuallyCompletedTableGrid2/fetchTTSManuallyCompletedTableGrid2Action',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TTSManuallyCompleted/GetTTSManuallyCompletedTableGrid2?StartDate=${startDate}&EndDate=${endDate}`;
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

const fetchTTSManuallyCompletedTableGrid2Slice = createSlice({
    name: 'fetchTTSManuallyCompletedTableGrid2',
    initialState: {
        ttsManuallyCompletedtablegrid2data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTTSManuallyCompletedTableGrid2Action.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTTSManuallyCompletedTableGrid2Action.fulfilled, (state, action) => {
                state.loading = false;
                state.ttsManuallyCompletedtablegrid2data = action.payload;
            })
            .addCase(fetchTTSManuallyCompletedTableGrid2Action.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const ttsManuallyCompleteddataReducer = fetchTTSManuallyCompletedDataSlice.reducer;
export const ttsManuallyCompletedTableGrid1DataReducer = fetchTTSManuallyCompletedTableGrid1Slice.reducer;
export const ttsManuallyCompletedTableGrid2DataReducer = fetchTTSManuallyCompletedTableGrid2Slice.reducer;
