"use client"

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export function AdminLayoutWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>
        <Provider store={store}>
            {children}
        </Provider>
    </div>
}