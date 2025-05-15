"use server"
import { cookies } from 'next/headers'
import { AUTH_TOKEN, DecodedToken } from './types/constants'
import { jwtDecode } from 'jwt-decode'
import { SchoolStaffRole_Enum } from './types/user'


export async function getToken() {
    const cookieStore = await cookies()
    console.log("All cookies >>>>>>>>>>>> ", cookieStore.getAll())
    return cookieStore.get(AUTH_TOKEN)?.value
}


export async function removeToken() {
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_TOKEN)
}

export async function getUserInfoFromToken() {
    const token = await getToken()
    if (!token) return null;
    try {
        const decode = jwtDecode<DecodedToken>(token)
        if (decode.exp * 1000 < Date.now()) {
            await removeToken()
            return null;
        }
        return decode;
    } catch (err) {
        console.log("Failed to decode token", err)
        await removeToken()
        return null;
    }
}

export async function isAuthenticated() {
    return await getToken() !== null
}

export async function getUserRole(): Promise<SchoolStaffRole_Enum | null> {
    const user = await getUserInfoFromToken()
    return user ? user.role : null;
}

export async function requireAuth() {
    const user = await getUserInfoFromToken()
    if (!user) {
        await removeToken()
        return null;
    }
    return user
}
