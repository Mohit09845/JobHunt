import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { RadioGroup } from './ui/radio-group'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import {USER_API_ENDPOINT} from '../constants/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/appStore/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

  const navigate = useNavigate();
  const {loading} = useSelector(store=>store.auth);
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
    email: ''
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', input.fullName);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file)
    }
    try {
      dispatch(setLoadinging(true));
      const response = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if (response.data.success) {
        navigate('/')
        toast.success(response.data.message || 'Account registered successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border-gray-200 rounded-md p-4 my-10' action='submit'>
          <h1 className='font-bold text-xl mb-5'>Sign-up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              type='text'
              value={input.fullName}
              name='fullName'
              onChange={changeEventHandler}
              placeholder='Eg. Mohit Sharma'
              className='my-1'
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type='email'
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              placeholder='Eg. mohit@gmail.com'
              className='my-1'
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type='text'
              value={input.phoneNumber}
              name='phoneNumber'
              onChange={changeEventHandler}
              placeholder='924567XXXXXX'
              className='my-1'
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type='password'
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='**********'
              className='my-1'
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-3'>
              <div className="flex items-center space-x-2">
                <Input
                  type='radio'
                  name='role'
                  value='student'
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                  id='r1'
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type='radio'
                  name='role'
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  value='recruiter'
                  className='cursor-pointer'
                  id='r2'
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept='image/*'
                type='file'
                onChange={changeFileHandler}
                className='cursor-pointer'
              />
            </div>
          </div>
          {
            loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> :
             <Button type='submit' className='w-full my-4'>Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup