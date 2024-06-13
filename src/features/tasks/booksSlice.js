// slices/booksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from "../../app/Interceptors/axiosInterceptor"
import {  toast } from 'react-toastify';


const API_URL = 'https://localhost:7154/api/Book';
const initialState = {
  list: [] ,
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    try {
      const response = await axiosInstance.get(API_URL, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data,"fetch");
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  });

export const addBook = createAsyncThunk('books/addBook', async (newBook,{rejectWithValue}) => {
  try{
  const response = await axiosInstance.post(API_URL, newBook);
  return response.data;
  }catch (error) {
    console.error('Error returning loan:', error);
    return rejectWithValue(error.response.data);
  }
});

export const updateBook = createAsyncThunk('books/updateBook', async (newBook) => {
  console.warn(newBook,"cambio")
  const response = await axiosInstance.post(`${API_URL}/UpdateBook`, newBook);
  return response.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId) => {
  await axiosInstance.delete(`${API_URL}/${bookId}`);
    return bookId;
  });

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.list.push(action.payload);
        console.log("Book added:", action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.Message : action.error.message;
        toast.error(`Error: ${state.error}`, {
            autoClose: 5000, 
            toastId: "bookError"
          });
      })
      .addCase(updateBook.fulfilled,(state,action)=>{
        console.log("updated",action)
      })
      .addCase(deleteBook.fulfilled,(state,action)=>{
        console.log("Book removed:", action.payload);  
      });
  },
});

export default booksSlice.reducer;
