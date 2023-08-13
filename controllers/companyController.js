const Institute = require('../models/institute');
const Company = require('../models/company');
const BigPromise = require('../middlewares/BigPromise');

exports.registerCompany = BigPromise(async (req, res, next) => {
    if(!req.files){
        return next(new Error("Company logo is required..."));
    }

    const {companyName, recruiterName, email, phoneNumber, posts, package, role} = req.body;

    let file = req.files.logo;

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "logo",
        width: 150,
        crop:"scale",
    });

    const company = await Company.create({
        companyName,
        recruiterName,
        email,
        phoneNumber,
        posts,
        package,
        role,
        logo: {
            id: result.public_id,
            secure_url: result.secure_url,
        },
        institute: req.params.id
    });

    const companies = await Companies.find({institute: req.params.id});

    res.status(200).json({
        success: true,
        message: "Company Added Successfully...",
        companies
    });
});

exports.getAllCompanies = BigPromise(async (req, res, next) => {

    const resultPerPage = 10;

    const totalCountCompanies= await Company.countDocuments();

    const companyObj = new whereClause(Company.find({institute: req.params.id}), req.query).search();

    // since we have to find query we have to run as .base
    let companies = await companyObj.base;

    // it gives number of products length we got after filtered
    const filterCompaniesLength = companies.length;

    companyObj.pager(resultPerPage);
    companies = await companyObj.base.clone();


    res.status(200).json({
        success: true,
        institutes,
        filterinstitutesLength,
        totalCountInstitute
    });
});