import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Job } from "../model/job.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const postJob = asyncHandler(async (req, res) => {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.user?._id;

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid userId');
    }

    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!description) missingFields.push('description');
    if (!requirements) missingFields.push('requirements');
    if (!salary) missingFields.push('salary');
    if (!location) missingFields.push('location');
    if (!jobType) missingFields.push('jobType');
    if (!experience) missingFields.push('experience');
    if (!position) missingFields.push('position');
    if (!companyId) missingFields.push('companyId');

    if (missingFields.length > 0) {
        throw new ApiError(404, `Missing fields: ${missingFields.join(', ')}`);
    }

    const job = await Job.create({
        title: title.trim(),
        description: description.trim(),
        requirements: requirements.split(',').map((req) => req.trim()),
        salary: Number(salary),
        location: location.trim(),
        jobType: jobType.trim(),
        experience: Number(experience),
        position: Number(position),
        company: companyId,
        created_by: userId,
    });

    return res.status(201).json(
        new ApiResponse(201, job, 'New job created successfully')
    );
});

export const getAllJobs = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword || '';

    const query = {
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
        ]
    }

    const jobs = await Job.find(query).populate({ path: 'company' }).sort({ createdAt: -1 })

    if (!jobs) {
        throw new ApiError(404, 'jobs not found')
    }

    return res.status(200).json(
        new ApiResponse(200, jobs, 'Jobs fetched successfully')
    )
})

export const getJobByid = asyncHandler(async (req, res) => {
    const {jobId} = req.params;

    if (!jobId || !isValidObjectId(jobId)) {
        throw new ApiError(400, 'JobId is not valid')
    }

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, 'Job not found')
    }

    return res.status(200).json(
        new ApiResponse(200, job, 'Job fetched successfully')
    )
})

export const getAdminjobs = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid userId')
    }

    const jobs = await Job.find({ created_by: userId })

    if (!jobs) {
        throw new ApiError(404, 'Jobs not found')
    }

    return res.status(200).json(
        new ApiResponse(200, jobs, 'Jobs fetched')
    )
})