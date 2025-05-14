import api from "@/utils/axios"

export class auth {

  static login = async (body: any) => {
    try {
      const response = await api.post("/auth/login", body)
      return response;
    } catch (err: any) {
      const message = err?.response?.data?.error || "Error while login"
      throw message
    }
  }

}

