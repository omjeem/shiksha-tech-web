import { RootState } from "../store";

export const getAllClasses = (state: RootState) => state.class

export const selectClassById = (state: RootState, classId: string) => {
    return state.class.data.find(cls => cls.id === classId)
}

export const getAllCLassesName = (state: RootState) => {
    return state.class.data.map(cls => cls.className)
}

export const getALLSections = (state: RootState) => {
    return state.class.data.map(cls => cls.sections)
}