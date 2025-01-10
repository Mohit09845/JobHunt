import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/appStore/store'
import { USER_API_ENDPOINT } from '@/constants/constant'
import { setUser } from '@/appStore/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {

    const [loading, setLoaading] = useState(false);

    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const changeFileHandler = (e)=>{
        const file = e.target.files?.[0];
        setInput({...input,file});
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName',input.fullName);
        formData.append('email',input.email);
        formData.append('phoneNumber',input.phoneNumber);
        formData.append('bio',input.bio);
        formData.append('skills',input.skills);
        if(input.file){
            formData.append('skills',input.skills)
        }
        try {
            const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || 'Profile updated')
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong')
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" onInteractOustside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input 
                                id="name" 
                                name='name' 
                                value={input.fullName} 
                                onChange={changeEventHandler} 
                                className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input 
                                id="email" 
                                name='email' 
                                value={input.email} 
                                onChange={changeEventHandler} 
                                className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className="text-right">Phone Number</Label>
                                <Input 
                                id="number" 
                                name='number' 
                                value={input.phoneNumber} 
                                onChange={changeEventHandler}
                                className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input 
                                id="bio" 
                                name='bio' 
                                value={input.bio} 
                                onChange={changeEventHandler} 
                                className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input 
                                id="skills" 
                                name='skills' 
                                value={input.skills} 
                                onChange={changeEventHandler} 
                                className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input 
                                id="file" 
                                name='file' 
                                type='file' 
                                accept='application/pdf' 
                                onChange={changeFileHandler} 
                                value={input.file} 
                                className="col-span-3" />
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        {
                            loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                                <Button type='submit' className='w-full my-4 bg-red-500'>Save Changes</Button>
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog