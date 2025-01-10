import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../model/application.model.js";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Job } from "../model/job.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const applyJob = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { jobId } = req.params;

    if (!jobId || !isValidObjectId(jobId)) {
        throw new ApiError(400, 'Provide valid job id')
    }

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid userId')
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

    if (existingApplication) {
        throw new ApiError(400, 'Already applied for this job')
    }

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, 'Job not found')
    }

    const newApplication = await Application.create({
        job: jobId,
        applicant: userId
    })

    if (!job.applications.includes(newApplication._id)) {
        job.applications.push(newApplication._id);
        await job.save();
    }    

    return res.status(200).json(
        new ApiResponse(200, '', 'job applied successfully')
    )
})

export const getappliedjob = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(400, 'Invalid userId')
    }

    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).
        populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });

        if(!application){
            throw new ApiError(404,'No job applications found')
        }

        return res.status(200).json(
            new ApiResponse(200,application,'Applications fetched successfully')
        )
})

export const getApplicants = asyncHandler(async(req,res)=>{
    const {jobId} = req.params;

    if (!jobId || !isValidObjectId(jobId)) {
        throw new ApiError(400, 'Provide valid job id')
    }

    const job = await Job.findById(jobId).populate({
        path: 'applications',
        options: {sort:{createdAt: -1}},
        populate: {
            path: 'applicant',
            options: {sort:{createdAt: -1}}
        }
    })

    if(!job){
        throw new ApiError(404,'Job not found')
    }

    return res.status(200).json(
        new ApiResponse(200,job,'Fetched all applicants')
    )
})

export const updateStatus = asyncHandler(async(req,res)=>{
    const { status } = req.body;

    const {applicationId} = req.params;

    if (!applicationId || !isValidObjectId(applicationId)) {
        throw new ApiError(400, 'Provide valid application id')
    }

    const application = await Application.findOne({_id: applicationId});

    if(!application){
        throw new ApiError(404,'Application not found')
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json(
        new ApiResponse(200,application,'Status updated')
    )
})