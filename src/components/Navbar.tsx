"use client"
import React from 'react'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react' 

function Navbar() {
    const { data: session, status } = useSession()

  return (
    <nav
        className='flex justify-between items-center py-4 px-8 bg-white shadow-sm text-gray-900'
    >
        <h1>Saas Starter</h1>
        <div>
            <Link href="/">Initial</Link>
        </div>
        <div>
            <Link href="/dashboard">Dashboard</Link>
        </div>
        {
            status === "unauthenticated" && (
                <div onClick={()=>signIn()}>
                    Sign In
                </div>
            )
        }
        {
            status === "authenticated" && (
                <div onClick={async()=>await signOut({ callbackUrl:"/" })}>
                    Sign Out
                </div>
            )
        }
    </nav>
  )
}

export default Navbar