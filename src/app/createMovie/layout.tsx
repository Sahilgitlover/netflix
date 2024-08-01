'use client'
import { useRouter } from 'next/navigation'
import React from 'react'



const layout:React.FC<{children:React.ReactNode}> = ({children}) => {

    const router = useRouter()
    const onCreate = () => {   
        router.replace("/createMovie")
    }
    const onUpdate = () => {   
        router.replace("/createMovie/updateMovie")
    }
    const onDelete = () => {   
        router.replace("/createMovie/deleteMovie")
    }
  return (
    <div>
        <h1 className=' text-3xl text-center'>Admin Panel</h1>
        <div className=" flex justify-around">
          <button onClick={onCreate} className=' bg-teal-600 rounded-md  p-3 m-8'>Create</button>
          <button onClick={onDelete} className=' bg-teal-600 rounded-md  p-3 m-8'>Delete</button>
          <button onClick={onUpdate} className=' bg-teal-600 rounded-md  p-3 m-8'>Update</button>
        </div>
        <div className=' border-y w-screen mb-4'></div>
        <div className="main">
            {children}
        </div>
    </div>
  )
}

export default layout