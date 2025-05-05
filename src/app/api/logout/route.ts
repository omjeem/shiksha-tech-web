import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const allCookies = (await cookies()).getAll();

    for (const cookie of allCookies) {
        (await cookies()).set(cookie.name, "", {
            path: "/",
            expires: new Date(0),
        });
    }

    return NextResponse.json({ message: "ALl cookies data deleted successfully!" });
}
