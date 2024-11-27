const CvModel = require('../models/cv');
const mongoose = require('mongoose');

module.exports = {
    // Création d'un CV
    createCv: async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'No data provided to create CV' });
            }

            const cv = new CvModel(req.body);
            await cv.save();
            res.status(201).json({
                message: 'CV successfully created',
                cv: cv
            });
        } catch (error) {
            console.error('Error creating CV:', error);
            res.status(500).json({ message: 'Failed to create CV', error: error.message });
        }
    },

    // Récupération de tous les CVs
    getCvs: async (req, res) => {
        try {
            const cvs = await CvModel.find();
            if (!cvs.length) {
                return res.status(404).json({ message: 'No CVs found' });
            }
            res.status(200).json(cvs);
        } catch (error) {
            console.error('Error retrieving CVs:', error);
            res.status(500).json({ message: 'Failed to retrieve CVs', error: error.message });
        }
    },

    // Récupération d'un CV par ID
    getCvById: async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid CV ID format' });
        }

        try {
            const cv = await CvModel.findById(id);
            if (!cv) {
                return res.status(404).json({ message: 'CV not found' });
            }
            res.status(200).json(cv);
        } catch (error) {
            console.error('Error retrieving CV:', error);
            res.status(500).json({ message: 'Failed to retrieve CV', error: error.message });
        }
    },

    // Mise à jour d'un CV par ID
    updateCv: async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid CV ID format' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided to update CV' });
        }

        try {
            const cv = await CvModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

            if (!cv) {
                return res.status(404).json({ message: 'CV not found' });
            }

            res.status(200).json({
                message: 'CV successfully updated',
                cv: cv
            });
        } catch (error) {
            console.error('Error updating CV:', error);
            res.status(500).json({ message: 'Failed to update CV', error: error.message });
        }
    },

    deleteCv: async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid CV ID format' });
        }

        try {
            const cv = await CvModel.findByIdAndDelete(id);

            if (!cv) {
                return res.status(404).json({ message: 'CV not found' });
            }

            res.status(200).json({
                message: 'CV successfully deleted',
                cv: cv
            });
        } catch (error) {
            console.error('Error deleting CV:', error);
            res.status(500).json({ message: 'Failed to delete CV', error: error.message });
        }
    }
    
};
