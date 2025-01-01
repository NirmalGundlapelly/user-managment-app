import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
    name: {
      first: string;
      last: string;
    };
    phone: string;
    email: string;
    picture: {
      thumbnail: string;
    };
    login: {
      uuid: string;
    };
}

interface UserState {
    users: User[];
    filteredUsers: User[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    sortBy: 'name' | 'email';
    sortOrder: 'asc' | 'desc';
}

const initialState: UserState = {
    users: [],
    filteredUsers: [],
    loading: false,
    error: null,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
};

export const getUserList = createAsyncThunk(
    'userList/getUserList',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const network = await fetch('https://randomuser.me/api/?results=10');
            if (!network.ok) {
                throw new Error('Failed to fetch user list');
            }
            const response = await network.json();
            return fulfillWithValue(response.results);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
            return rejectWithValue(errorMessage);
        }
    }
);

export const userList = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredUsers = applySearchAndSort(state.users, state.searchQuery, state.sortBy, state.sortOrder);
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            state.filteredUsers = applySearchAndSort(state.users, state.searchQuery, state.sortBy, state.sortOrder);
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
            state.filteredUsers = applySearchAndSort(state.users, state.searchQuery, state.sortBy, state.sortOrder);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.filteredUsers = applySearchAndSort(state.users, state.searchQuery, state.sortBy, state.sortOrder);
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

function applySearchAndSort(
    users: User[], 
    searchQuery: string, 
    sortBy: 'name' | 'email', 
    sortOrder: 'asc' | 'desc'
) {
    const filtered = users.filter(user => {
        const userName = user.name.first.toLowerCase();
        const userEmail = user.email.toLowerCase();
        return userName.includes(searchQuery.toLowerCase()) || userEmail.includes(searchQuery.toLowerCase());
    });

    return filtered.sort((a, b) => {
        let compareA = sortBy === 'name' ? a.name.first : a.email;
        let compareB = sortBy === 'name' ? b.name.first : b.email;
        if (sortOrder === 'asc') {
            return compareA.localeCompare(compareB);
        } else {
            return compareB.localeCompare(compareA);
        }
    });
}

export const { setSearchQuery, setSortBy, setSortOrder } = userList.actions;

export default userList.reducer;
