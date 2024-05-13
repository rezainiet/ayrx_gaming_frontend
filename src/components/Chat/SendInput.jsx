import React from 'react'
import { IoSend } from "react-icons/io5"

const SendInput = () => {
    return (
        <form className='px-3 my-3'>
            <div className='w-full relative'>
                <input type="text"
                    className='input border text-sm rounded-lg block w-full bg-gray-600 text-white'
                    placeholder='Send a message...'
                />
                <button className='absolute flex items-center inset-y-0 end-0  pr-4' >
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput