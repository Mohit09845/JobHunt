import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/appStore/store'

const skills = ['HTML', 'CSS', 'NodeJs', 'React']

const Profile = () => {

  const {user} = useSelector(store=>store.auth);

  const [open,setOpen] = useState(false);

  const isResume = true;

  return (
    <div>
      <div className='max-w-4xl mx-auto bg-white border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src='https://marketplace.canva.com/EAGGGpQ7cno/1/0/1600w/canva-navy-and-grey-classic-circle-business-consulting-logo-28WibL-VkRk.jpg' />
            </Avatar>
            <div>
              <h1 className='font-bold text-lg'>FullName</h1>
              <p className='font-medium text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint numquam consequuntur reprehenderit.</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>mohit@gmail.com</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>1234567890</span>
          </div>
        </div>
        <div className='my-3'>
          <h1 className='font-bold text-xl'>Skills</h1>
          <div className='flex items-center gap-1'>
            {
              skills.length > 0 ? skills.map((item, ind) => <Badge key={ind}>{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 my-3'>
          <Label className='font-bold text-xl'>Resume</Label>
          {
            isResume ? <a target='blank' href='https://hehe' className='text-blue-500 w-full hover:underline cursor-pointer'>Mohit Sharma</a> : <span>NA</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-4'>Applied Jobs</h1>
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile