import { getToken } from "@/utils/nextCookies"

export const fetchDataFromAPI = async () => {
    const token = await getToken()
    console.log("Token is >>>>>>>>>>>> ", token)
}