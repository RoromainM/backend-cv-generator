const CvModel = require('../models/CVModel');
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

    getVisibleCvs: async (req, res) => {
        try {
            const cvs = await CvModel.find({ visibilite: true });
    
            if (cvs.length === 0) {
                return res.status(404).json({ message: 'No visible CVs found' });
            }
    
            console.log('Visible CVs:', cvs);
    
            res.status(200).json(cvs);
        } catch (error) {
            console.error('Error retrieving visible CVs:', error);
            res.status(500).json({ message: 'Failed to retrieve visible CVs', error: error.message });
        }
    },
    
    

    // Mise à jour d'un CV par ID
    updateCv: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Format de l\'ID CV invalide.' });
        }
    
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'Aucune donnée fournie pour mettre à jour le CV.' });
        }
    
        try {
            const cv = await CvModel.findById(id);
            if (!cv) {
                return res.status(404).json({ message: 'CV non trouvé.' });
            }

            if (cv.user.toString() !== req.user.userId) {
                return res.status(403).json({ message: 'Action non autorisée.' });
            }
    
            Object.keys(updates).forEach((key) => {
                cv[key] = updates[key];
            });
    
            await cv.save();
    
            res.status(200).json({
                message: 'CV mis à jour avec succès.',
                cv,
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du CV :', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour du CV.', error: error.message });
        }
    },    

    deleteCv: async (req, res) => {
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Format de l\'ID CV invalide.' });
        }
    
        try {
            const cv = await CvModel.findById(id);
            if (!cv) {
                return res.status(404).json({ message: 'CV non trouvé.' });
            }
    
            // Vérification des permissions
            if (cv.user.toString() !== req.user.userId) {
                return res.status(403).json({ message: 'Action non autorisée.' });
            }
    
            await cv.deleteOne();
            res.status(200).json({ message: 'CV supprimé avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la suppression du CV :', error);
            res.status(500).json({ message: 'Erreur lors de la suppression du CV.', error: error.message });
        }
    },

    
    
};
