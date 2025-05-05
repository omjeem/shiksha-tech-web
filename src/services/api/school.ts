import api from "@/utils/axios"

export class school {
    static getSchoolList = async () => {
        try {
            const response = await api.get("/school/list")
            const responseData = response.data
            console.log("Response is ", responseData)
            return responseData.data
        } catch (err) {
            console.log("Erroe while fetching school list", err)
            return []
        }
    }
}