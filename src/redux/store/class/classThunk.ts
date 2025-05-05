import { ClassData } from "@/utils/types/class";
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchAllClasses = createAsyncThunk<ClassData[]>(
    'classData/fetchAll',
    async () => {
        const response = await axios.get('/api/classes');
        return response.data;
    }
);

export const addClass = createAsyncThunk<ClassData, ClassData>(
    'classData/addClass',
    async (newClass) => {
        const response = await axios.post('/api/classes', newClass);
        return response.data;
    }
);

export const updateClass = createAsyncThunk<ClassData, ClassData>(
    'classData/updateClass',
    async (updatedClass) => {
        const response = await axios.put(`/api/classes/${updatedClass.id}`, updatedClass);
        return response.data;
    }
);