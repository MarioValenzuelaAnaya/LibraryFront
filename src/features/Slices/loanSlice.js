import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../app/Interceptors/axiosInterceptor";
import {  toast } from 'react-toastify';



const API_URL = 'https://localhost:7154/api/Book';
const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchLoans = createAsyncThunk(
    'loans/fetchLoans',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`${API_URL}/GetLoans`);
        console.log(response.data, "fetch");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const returnLoan = createAsyncThunk('loans/returnLoan', async (loan,{ rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/ReturnLoan`, loan);
    return response.data;
  } catch (error) {
    console.error('Error returning loan:', error);
    return rejectWithValue(error.response.data);
  }
});

export const LoanBook = createAsyncThunk('loans/LoanBook', async (loan, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/AddLoan`, loan);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.Message : action.error.message;
        toast.error(`Error: ${state.error}`, {
            autoClose: 5000, 
            toastId: "loanError"
          });
      })
      .addCase(LoanBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoanBook.fulfilled, (state, action) => {
        console.log("loan", action);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(LoanBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.Message : action.error.message;
        toast.error(`Error: ${state.error}`, {
            autoClose: 5000, 
            toastId: "loanError"
          });
      })
      .addCase(returnLoan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(returnLoan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(returnLoan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.Message : action.error.message;
        toast.error(`Error: ${state.error}`, {
            autoClose: 5000, 
            toastId: "loanError"
          });
      });
  },
});

export default loansSlice.reducer;
