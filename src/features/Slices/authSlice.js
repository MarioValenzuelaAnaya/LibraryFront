
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = 'https://localhost:7154/api/Account/Login';


const initialState= {
  email: localStorage.getItem('email') || null,
  token: localStorage.getItem('token') || null, 
  isLoading: false,
  error: null,
}
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('email'); 
      return true; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState
,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {

        state.isLoading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('email', action.payload.email);
        
      })
      .addCase(login.rejected, (state, action) => {
        
        state.isLoading = false;
        state.error = action.payload
  
      })
      .addCase(logout.pending, (state) => {
  
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {

        state.isLoading = false;
        state.email = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
 
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});



export default authSlice.reducer;
