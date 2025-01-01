import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export interface User {
    name: {
      first: string;
      last: string;
    };
    phone: string;
    picture: {
      thumbnail: string;
    };
    login: {
      uuid: string;
    };
  }

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
  };

export const getUserList = createAsyncThunk(
    'getUserList',
    async (_, { rejectWithValue, fulfillWithValue }) => {
      try {
        const network = await fetch('https://randomuser.me/api/?results=10');
        if (!network.ok) {
          throw new Error('Failed to fetch user list');
        }
        const response = await network.json();
  
        return fulfillWithValue(response.results);
      } catch (error:unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
        return rejectWithValue(errorMessage);
      }
    }
  );

export const userList = createSlice({
  name: 'userList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch user list';
      });
  },
});

export default userList.reducer;
