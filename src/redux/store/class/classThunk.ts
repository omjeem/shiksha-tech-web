import { ClassName_Enum } from "@/components/Student/StudentForm";
import apiServices from "@/services";
import { ClassData } from "@/utils/types/class";
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchAllClasses = createAsyncThunk<ClassData[]>(
    'classData/fetchAll',
    async () => {
        const data = await apiServices.classes.getAllClasses();
        console.log("Fetching :::::::::::::::::::::: ", data)
        return data;
    }
);

export const addClass = createAsyncThunk<ClassData, ClassName_Enum>(
    'classData/addClass',
    async (newClass) => {
        const response = await apiServices.classes.createClass(newClass);
        return response;
    }
);

export const updateClass = createAsyncThunk<ClassData, ClassData>(
    'classData/updateClass',
    async (updatedClass) => {
        const response = await axios.put(`/api/classes/${updatedClass.id}`, updatedClass);
        return response.data;
    }
);