import React from 'react'
import Job from './Job'

const randomJobs = [1, 2, 3]

const Browse = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-lg'>Search Results ({randomJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        randomJobs.map((item, ind) => <Job />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse