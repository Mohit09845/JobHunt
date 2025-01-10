import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent } from './ui/popover'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/appStore/store'

const Navbar = () => {

    const {user} = useSelector(store=>store.auth);

    return (
        <div className='bg-gray-100'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/jobs'>Jobs</Link></li>
                        <li><Link to='/browse'>Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline'>Login</Button></Link>
                                <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button></Link>
                            </div>
                        ) : <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div className='flex gap-2 space-y-2'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>Mohit Sharma</h4>
                                        <p className='text-sm text-muted-foreground'>hehehehehheheehehhehhe</p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-600 my-2'>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <User2 />
                                        <Button variant='link'><Link to='/profile'>View Profile</Link></Button>
                                    </div>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut />
                                        <Button variant='link'>Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar