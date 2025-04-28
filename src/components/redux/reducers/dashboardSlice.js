import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_Base_URL } from '../../../constants/constants';


// Bay Wise Loading Data 

export const fetchDashboardBayWiseLoadingChart = createAsyncThunk(
  'fetchBayWiseLoadingChart/fetchDashboardBayWiseLoadingChart',
  async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
    try {
      if (!token || !userId || !roleId) {
        return rejectWithValue('Missing required parameters.');
      }

      const url = `${API_Base_URL}/api/TASDashboard/GetBayWiseLoadingChart?StartDate=${startDate}&EndDate=${endDate}`;
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

const fetchDashboardBayWiseLoadingChartSlice = createSlice({
  name: 'fetchBayWiseLoadingChart',
  initialState: {
    baywiseloadingdata: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardBayWiseLoadingChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardBayWiseLoadingChart.fulfilled, (state, action) => {
        state.loading = false;
        state.baywiseloadingdata = action.payload;
      })
      .addCase(fetchDashboardBayWiseLoadingChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// Average Bay Wise Flow Rate

export const fetchDashboardAvgBayWiseFlowRateChart = createAsyncThunk(
  'fetchAvgBayWiseFlowRateChart/fetchDashboardAvgBayWiseFlowRateChart',
  async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
    try {
      if (!token || !userId || !roleId) {
        return rejectWithValue('Missing required parameters.');
      }

      const url = `${API_Base_URL}/api/TASDashboard/GetAvgBayWiseFlowRateChart?StartDate=${startDate}&EndDate=${endDate}`;
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
        return rejectWithValue(data.Message || 'Failed to fetch bay-wise Average Flow Rate data.');
      }
    } catch (error) {
      return rejectWithValue('An error occurred while fetching bay-wise Average Flow Rate data.');
    }
  }
);

const fetchDashboardAvgBayWiseFlowRateChartSlice = createSlice({
  name: 'fetchAvgBayWiseFlowRateChart',
  initialState: {
    avgBaywiseFlowRateData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardAvgBayWiseFlowRateChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardAvgBayWiseFlowRateChart.fulfilled, (state, action) => {
        state.loading = false;
        state.avgBaywiseFlowRateData = action.payload;
      })
      .addCase(fetchDashboardAvgBayWiseFlowRateChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// Product Wise Loaded Qty

export const fetchDashboardProductWiseLoadedQtyChart = createAsyncThunk(
  'fetchProductWiseLoadedQtyChart/fetchDashboardProductWiseLoadedQtyChart',
  async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
    try {
      if (!token || !userId || !roleId) {
        return rejectWithValue('Missing required parameters.');
      }

      const url = `${API_Base_URL}/api/TASDashboard/GetAvgProductLoaded?StartDate=${startDate}&EndDate=${endDate}`;
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
        return rejectWithValue(data.Message || 'Failed to fetch bay-wise Average Flow Rate data.');
      }
    } catch (error) {
      return rejectWithValue('An error occurred while fetching bay-wise Average Flow Rate data.');
    }
  }
);

const fetchDashboardProductWiseLoadedQtyChartSlice = createSlice({
  name: 'fetchProductWiseLoadedQtyChart',
  initialState: {
    productwiseLoadedQtyData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardProductWiseLoadedQtyChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardProductWiseLoadedQtyChart.fulfilled, (state, action) => {
        state.loading = false;
        state.productwiseLoadedQtyData = action.payload;
      })
      .addCase(fetchDashboardProductWiseLoadedQtyChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// TTSHigherCycleTime

export const fetchDashboardTTSHigherCycleTimeChart = createAsyncThunk(
  'fetchHigherCycleTimeChart/fetchDashboardTTSHigherCycleTimeChart',
  async ({ token, userId, roleId, startDate, endDate }, { rejectWithValue }) => {
    try {
      if (!token || !userId || !roleId) {
        return rejectWithValue('Missing required parameters.');
      }

      const url = `${API_Base_URL}/api/TASDashboard/GetHigherCycleDataforDashboard?StartDate=${startDate}&EndDate=${endDate}`;
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
        return rejectWithValue(data.Message || 'Failed to fetch bay-wise Average Flow Rate data.');
      }
    } catch (error) {
      return rejectWithValue('An error occurred while fetching bay-wise Average Flow Rate data.');
    }
  }
);

const fetchDashboardTTSHigherCycleTimeChartSlice = createSlice({
  name: 'fetchHigherCycleTimeChart',
  initialState: {
    higherCycleTimeData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardTTSHigherCycleTimeChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardTTSHigherCycleTimeChart.fulfilled, (state, action) => {
        state.loading = false;
        state.higherCycleTimeData = action.payload;
      })
      .addCase(fetchDashboardTTSHigherCycleTimeChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const bayWiseLoadingChartReducer = fetchDashboardBayWiseLoadingChartSlice.reducer;
export const avgBayWiseFlowRateChartReducer = fetchDashboardAvgBayWiseFlowRateChartSlice.reducer;
export const productWiseLoadedChartReducer = fetchDashboardProductWiseLoadedQtyChartSlice.reducer;
export const higherCycleTimeChartReducer = fetchDashboardTTSHigherCycleTimeChartSlice.reducer;

