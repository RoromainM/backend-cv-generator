const CvModel = require('../models/cv');

const createCv = async (req, res) => {
    try {
        const cv = new CvModel({
            user: req.body.user,
            information: req.body.information,
            education: req.body.education,
            experience: req.body.experience,
            visibilite: req.body.visibilite,
        });
        await cv.save();
        res.status(201).send(cv);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getCvs = async (req, res) => {
    try {
        const cvs = await CvModel.find();
        res.status(200).send(cvs);
    } catch (error) {
        res.status(400
        ).send(error);
    }
}

const getCv = async (req, res) => {
    try {
        const cv = await CvModel.findById(req.params.id);
        if (!cv) {
            return res.status(404).send('CV not found');
        }
        res.status(200).send(cv);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateCv = async (req, res) => {
    try {
        const cv = await CvModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cv) {
            return res.status(404).send('CV not found');
        }
        res.status(200).send(cv);
    }
    catch (error) {
        res.status
    }
}

module.exports = { createCv, getCvs, getCv, updateCv };