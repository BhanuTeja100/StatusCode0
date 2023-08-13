const Institute = require('../models/institute');
const Company = require('../models/company');
const BigPromise = require('../middlewares/BigPromise');
const whereClause = require('../utils/whereClause');
const cloudinary = require('cloudinary');
exports.registerInstitute = BigPromise(async (req, res, next) => {
    if(!req.files){
        return next(new Error("Institute logo is required..."));
    }

    const {name, email, phoneNumber, noOfStudents, noOfStudentsPlaced} = req.body;

    let file = req.files.logo;

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "logo",
        width: 150,
        crop:"scale",
    });

    const institute = await Institute.create({
        name,
        email,
        phoneNumber,
        noOfStudents,
        noOfStudentsPlaced,
        logo: {
            id: result.public_id,
            secure_url: result.secure_url,
        },
        user: req.user.id
    });

    const institutes = await Institute.find();

    res.status(200).json({
        success: true,
        message: "Institue Added Successfully...",
        institutes
    });
});

exports.getAllInstitues = BigPromise(async (req, res, next) => {

    const resultPerPage = 10;

    const totalCountInstitute = await Institute.countDocuments();

    const instituteObj = new whereClause(Institute.find(), req.query).search();

    // since we have to find query we have to run as .base
    let institutes = await instituteObj.base;

    // it gives number of products length we got after filtered
    const filterinstitutesLength = institutes.length;

    instituteObj.pager(resultPerPage);
    institutes = await instituteObj.base.clone();


    res.status(200).json({
        success: true,
        institutes,
        filterinstitutesLength,
        totalCountInstitute
    });
});
