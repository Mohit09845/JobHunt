import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType: 'Location',
        array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai']
    },
    {
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer']
    },
    {
        filterType: 'Salary',
        array: ['0-40k', '42-100k', '100k-500k']
    }
]

const FilterCard = () => {
    return (
        <div className='w-full bg-white rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-medium text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, ind) => {
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} />
                                        <Label>{item}</Label>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard