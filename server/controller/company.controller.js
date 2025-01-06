import { Company } from '../model/company.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isValidObjectId } from 'mongoose';

export const registerCompany = asyncHandler(async (req, res) => {
    const { companyName } = req.body;

    if (!companyName) {
        throw new ApiError(400, 'Company name is required');
    }

    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
        throw new ApiError(409, 'Company already exists');
    }

    if (!req.user?._id) {
        throw new ApiError(401, 'Unauthorized access');
    }

    const newCompany = await Company.create({
        name: companyName,
        userId: req.user._id,
    });

    return res.status(201).json(
        new ApiResponse(201, newCompany, 'Company created successfully')
    );
});


export const getCompany = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(401, 'Unauthorized access');
    }

    const companies = await Company.find({ userId });
    if (!companies.length) {
        throw new ApiError(404, 'No companies found');
    }

    return res.status(200).json(
        new ApiResponse(200, companies, 'Companies fetched successfully')
    );
});


export const getCompanyById = asyncHandler(async (req, res) => {
    const { companyId } = req.params; // Corrected destructuring

    if (!companyId || !isValidObjectId(companyId)) {
        throw new ApiError(400, 'Provide a valid company ID');
    }

    const company = await Company.findById(companyId);
    if (!company) {
        throw new ApiError(404, 'Company not found');
    }

    return res.status(200).json(
        new ApiResponse(200, company, 'Company fetched successfully')
    );
});

export const updateCompany = asyncHandler(async (req, res) => {
    const { name, description, website, location } = req.body;
    const logo = req.file;
    const { companyId } = req.params;

    if (!companyId || !isValidObjectId(companyId)) {
        throw new ApiError(400, 'Provide valid company ID')
    }

    const updatedData = { name, description, website, location, logo }

    Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] === undefined) delete updatedData[key];
    });

    const updatedCompany = await Company.findByIdAndUpdate(
        companyId, updatedData,{new: true}
    )

    return res.status(200).json(
        new ApiResponse(200, updatedCompany, 'Company updated successfully')
    )
})

