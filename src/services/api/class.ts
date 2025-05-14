import { ClassName_Enum } from "@/components/Student/StudentForm"
import api from "@/utils/axios"
import { SectionData } from "@/utils/types/class"

export class classes {
    static getAllClasses = async () => {
        try {
            const response = await api.get("/class")
            return response.data.data
        } catch (error: any) {
            console.log("Error while fetching classes", error)
            const message = error?.response?.data?.error || "Error while login"
            throw message;
        }
    }

    static createClass = async (className: ClassName_Enum) => {
        try {
            const response = await api.post("/class", {
                className
            })
            return response.data.data[0]
        } catch (error: any) {
            console.log("Error while Creating classes", error)
            const message = error?.response?.data?.error || "Error while creating class"
            console.log("Message is >>>>>>>>>> ", message)
            throw message;
        }
    }

    static createSection = async (sectionData: SectionData) => {
        try {
            const response = await api.post("/section", sectionData)
            return response.data.data[0]
        } catch (error: any) {
            console.log("Error while Creating classes", error)
            const message = error?.response?.data?.error || "Error while creating section"
            console.log("Message is >>>>>>>>>> ", message)
            throw message;
        }
    }
}