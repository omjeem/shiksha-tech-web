import api from "@/utils/axios";
import { StudentData } from "@/utils/types/student";

export class student {
    static addStudent = async (schoolData: StudentData) => {
        try {
            const { classId, sectionId, ...data } = schoolData
            const response = await api.post("/student", {
                classId,
                sectionId,
                studentData: [{ ...data }]
            })
            const responseData = response.data
            return responseData
        } catch (error: any) {
            const message = error.response.data.error || "Error while adding student"
            throw message
        }
    }
}