import React from 'react'

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 border-4 border-red-500">

            <img
                src="NotFound.png"
                alt="404 Not Found"
                className="max-w-full mb-6 w-96"
            />
            <a
                href="/"
                className="inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md bg-blue-600 rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Back to HomePage
            </a>
        </div>
    )

}

export default NotFound