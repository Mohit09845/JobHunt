import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { Input } from './ui/input'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 <span className='font-medium text-[#0945f8]'>Website</span> for Job</span>
        <h1 className='font-bold text-5xl'>Search,Apply & <br/> Get your <span className='text-[#6A38C2]'>Dream Job</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus atque saepe obcaecati nulla?</p>
        <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <Input
            type='text'
            placeholder='Find your dream job'
            className='outline-none border-none w-full'
            />
            <Button className='rounded-r-full bg-[#6A38C2]'>
                <Search className='h-5 w-5'/>
            </Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection