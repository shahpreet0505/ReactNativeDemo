import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_Base_URL } from '../../../constants/constants';


// Thunk for handling login API call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_Base_URL}/api/Login/ValidateUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ LoginName: username, Password: password }),
      });

      const data = await response.json();

      console.log("API Response:", JSON.stringify(data, null, 2));

      if (response.ok && data.ResponseStatus === 0) {
        return data.Data; 
      } else {
        return rejectWithValue(data.Message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue("An error occurred. Please try again later.");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    data:null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.data = action.payload; // Store the user object
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
