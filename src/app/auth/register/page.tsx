"use client"
import React, { useState } from 'react'

function RegisterPage() {


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        
        let res = await fetch("/api/auth/signup", { body: JSON.stringify(payload), method: "POST", headers: { "Content-Type": "application/json" }})
        res = await res.json()
        console.log(res)
    }


  return (
    <div>
        <form onSubmit={handleSubmit} className='flex justify-center mt-64'>
            <div className='flex flex-col w-4/5 lg:w-1/4'>
                <label htmlFor="name">Name</label>
                <input name={"name"} type="text" className='border border-gray-800' />
                <label htmlFor="email">Email</label>
                <input name={"email"} type="email" className='border border-gray-800' />
                <label htmlFor="password">Password</label>
                <input name={"password"} type="password" className='border border-gray-800' />
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage