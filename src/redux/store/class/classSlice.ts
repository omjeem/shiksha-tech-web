import { ClassData } from '@/utils/types/class';
import { createSlice } from '@reduxjs/toolkit';
import { addClass, fetchAllClasses, updateClass } from './classThunk';

interface ClassState {
    data: ClassData[],
    loading: boolean,
    error: string | null
}

const initialState: ClassState = {
    data: [],
    loading: false,
    error: null
};

const classSlice = createSlice({
    name: 'classData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addClass.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addClass.fulfilled, (state, action) => {
                state.loading = false
                state.data.push(action.payload)
            })
            .addCase(addClass.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Error while adding class"
            });

        builder
            .addCase(fetchAllClasses.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload
                state.error = null
            })
            .addCase(fetchAllClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error while fetching classes"
            });

        builder
            .addCase(updateClass.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(updateClass.fulfilled, (state,action)=>{
                state.loading = false
                const index = state.data.findIndex(cls => cls.id === action.payload.id)
                if(index !== -1){
                    state.data[index] = action.payload
                }
            })
            .addCase(updateClass.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message || "Error in updating class"
            })
    }
});

export default classSlice.reducer