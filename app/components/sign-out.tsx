
"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function SignOut() {
    return (
        <button
            className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
            onClick={() => signOut()}
        >
            <LogOut size={18} />
           
        </button>
    )
}