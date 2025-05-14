import { ClassData, ClassDataCustomOrder } from '@/utils/types/class';
import { createSlice } from '@reduxjs/toolkit';
import { addClass, addNewSection, fetchAllClasses, updateClass } from './classThunk';

interface ClassState {
    data: ClassData[],
    loading: boolean,
    error: string | null,
    success: string | null
}

const initialState: ClassState = {
    data: [],
    loading: false,
    error: null,
    success: null
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
                state.success = null
            })
            .addCase(addClass.fulfilled, (state, action) => {
                state.loading = false
                state.data.push(action.payload)
                state.success = "Class Added Successfully!"
            })
            .addCase(addClass.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Error while adding class"
                state.success = null;
            });

        builder
            .addCase(fetchAllClasses.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(fetchAllClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...action.payload].sort(
                    (a, b) => ClassDataCustomOrder.indexOf(a.className) - ClassDataCustomOrder.indexOf(b.className)
                );
                state.error = null
                state.success = null
            })
            .addCase(fetchAllClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error while fetching classes"
                state.success = null;
            });

        builder
            .addCase(updateClass.pending, (state) => {
                state.loading = true;
                state.error = null
                state.success = null
            })
            .addCase(updateClass.fulfilled, (state, action) => {
                state.loading = false
                const index = state.data.findIndex(cls => cls.id === action.payload.id)
                if (index !== -1) {
                    state.data[index] = action.payload
                }
                state.success = "Class Updated Successfully!"
            })
            .addCase(updateClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error in updating class"
                state.success = null;
            })

        builder
            .addCase(addNewSection.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(addNewSection.fulfilled, (state, action) => {
                state.loading = false
                const index = state.data.findIndex(cls => cls.id === action.payload.classId)
                if (index !== -1) {
                    state.data[index].sections.push(action.payload)
                }
                state.success = "New Section Added Successfully!"
            })
            .addCase(addNewSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error in updating class"
                state.success = null;
            })
    }
});

export default classSlice.reducer