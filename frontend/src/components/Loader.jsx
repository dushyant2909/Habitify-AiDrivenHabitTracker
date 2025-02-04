import React from 'react'
import { FadeLoader } from 'react-spinners'

function Loader({ message = "Loading..." }) {
    return (
        <div className="w-full flex justify-center items-center min-h-screen">
            <FadeLoader color='#3641d6' />
            <div className='font-semibold'> {message}</div>
        </div>
    )
}

export default Loader