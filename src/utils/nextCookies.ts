"use server"
import { cookies } from 'next/headers'
import { AUTH_TOKEN, DecodedToken } from './types/constants'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'
import axios from 'axios'


export async function getToken() {
    const cookieStore = await cookies()
    return cookieStore.get(AUTH_TOKEN)?.value
}

export async function setToken(token: string) {
    console.log("Reached here ")
    const cookieStore = await cookies()
    cookieStore.set(AUTH_TOKEN, token, {
        name: AUTH_TOKEN,
        expires: 7,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    })
    console.log(cookieStore.get(AUTH_TOKEN)?.value)
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

export async function getUserRole() {
    const user = await getUserInfoFromToken()
    return user ? user.role : null;
}

export async function requireAuth() {
    const user = await getUserInfoFromToken()
    if (!user) {
        const response = await axios.get("http://localhost:3000/api/logout")
        console.log(response.data)
        return null;
    }
    return user
}
