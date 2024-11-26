const CvModel = require('../models/cv');
const mongoose = require('mongoose');

module.exports = {
    createCv: async (req, res) => {
        try {
            const cv = new CvModel(req.body);
            await cv.save();
            res.status(201).send(cv);
        } catch (error) {
            res.status(500).send({ message: 'Failed to create CV', error: error.message });
        }
    },

    getCvs: async (req, res) => {
        try {
            const cvs = await CvModel.find();
            res.status(200).send(cvs);
        } catch (error) {
            res.status(500).send({ message: 'Failed to retrieve CVs', error: error.message });
        }
    },

    getCv: async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid CV ID' });
        }

        try {
            const cv = await CvModel.findById(id);
            if (!cv) {
                return res.status(404).send({ message: 'CV not found' });
            }
            res.status(200).send(cv);
        } catch (error) {
            res.status(500).send({ message: 'Failed to retrieve CV', error: error.message });
        }
    },

    updateCv: async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid CV ID' });
        }

        try {
            const cv = await CvModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!cv) {
                return res.status(404).send({ message: 'CV not found' });
            }
            res.status(200).send(cv);
        } catch (error) {
            res.status(500).send({ message: 'Failed to update CV', error: error.message });
        }
    }
};
