'use client'
import React from 'react'
import Link from 'next/link'

function Main() {

  return (
    <div className='flex justify-center mt-64'>
      <Link href={"/payment/paymentSuscription"} className='p-4 text-white bg-slate-800 font-bold cursor-pointer hover:bg-slate-950 hover:scale-95 transition-all'>Start Adventure</Link>
    </div>
  )
}

export default Main