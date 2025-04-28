import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_Base_URL } from '../../../constants/constants';


// Tank Utilization Card Data

export const fetchTankUtilizationDateForCardsAction = createAsyncThunk(
    'fetchTankUtilizationCardData/fetchTankUtilizationDateForCardsAction',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }
            const url = `${API_Base_URL}/api/TankUtilization/GetTankUtilizationDataforCards?StartDate=${startDate}&EndDate=${endDate}`;
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

const fetchTankUtilizationCardDataSlice = createSlice({
    name: 'fetchTankUtilizationCardData',
    initialState: {
        tankUtilizationCardData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTankUtilizationDateForCardsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTankUtilizationDateForCardsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.tankUtilizationCardData = action.payload;
            })
            .addCase(fetchTankUtilizationDateForCardsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

//Tank Utilization Bar Chart Data

export const fetchTankUtilizationForBarChartDataAction = createAsyncThunk(
    'fetchTankUtilizationBarChartData/fetchTankUtilizationForBarChartDataAction',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TankUtilization/GetTankUtilizationData?StartDate=${startDate}&EndDate=${endDate}`;
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

const fetchTankUtilizationForBarChartDataSlice = createSlice({
    name: 'fetchTankUtilizationBarChartData',
    initialState: {
        tankUtilizationForBarChartData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTankUtilizationForBarChartDataAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTankUtilizationForBarChartDataAction.fulfilled, (state, action) => {
                state.loading = false;
                state.tankUtilizationForBarChartData = action.payload;
            })
            .addCase(fetchTankUtilizationForBarChartDataAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Tank Utilization Table Grid Data

export const fetchTankUtilizationTableGridDataAction = createAsyncThunk(
    'fetchTankUtilizationTableGridData/fetchTankUtilizationTableGridDataAction',
    async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
        try {
            if (!token || !userId || !roleId) {
                return rejectWithValue('Missing required parameters.');
            }

            const url = `${API_Base_URL}/api/TankUtilization/GetTankUtilizationDataforTable?StartDate=${startDate}&EndDate=${endDate}`;
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

const fetchTankUtilizationTableGridDataSlice = createSlice({
    name: 'fetchTankUtilizationTableGridData',
    initialState: {
        tankUtilizationTableGridData : [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTankUtilizationTableGridDataAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTankUtilizationTableGridDataAction.fulfilled, (state, action) => {
                state.loading = false;
                state.tankUtilizationTableGridData = action.payload;
            })
            .addCase(fetchTankUtilizationTableGridDataAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const tankUtilizationCardDataReducer = fetchTankUtilizationCardDataSlice.reducer;
export const tankUtilizationForBarChartDataReducer = fetchTankUtilizationForBarChartDataSlice.reducer;
export const tankUtilizationTableGridDataReducer = fetchTankUtilizationTableGridDataSlice.reducer;
