const CV = require('../models/CVModel');
const Recommendation = require('../models/RecommandationModel');

module.exports = {
    createRecommandataion : async (req, res) => {
        const { CVNote, content } = req.body;

        try {
            const targetCV = await CV.findById(CVNote);
            if (!targetCV) {
                return res.status(404).json({ message: 'CV non trouvé.' });
            }

            console.log('Utilisateur connecté (ID) :', req.user.userId);
            console.log('CV demandé (ID) :', CVNote);

            const recommendation = new Recommendation({
                author: req.user.userId,
                CVNote,
                content,
            });

            await recommendation.save();
            res.status(200).json({
                message: 'Recommandation ajoutée avec succès.',
                recommendation,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'ajout de la recommandation.' });
        }
    },

    getRecommendationsForCV : async (req, res) => {
        const { CVNote } = req.params;

        try {
            const recommendations = await Recommendation.find({ CVNote })
                .populate('author', 'firstname lastname')
                .populate('CVNote', 'personalInfo');

            res.status(200).json(recommendations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des recommandations.' });
        }
    },

    deleteRecommendation : async (req, res) => {
        const { id } = req.params;

        try {
            const recommendation = await Recommendation.findById(id).populate('CVNote');
            if (!recommendation) {
                return res.status(404).json({ message: 'Recommandation non trouvée.' });
            }


            console.log('Utilisateur du CV NOTE (ID) :', recommendation.CVNote.user._id.toString().trim());
            console.log('utilisateur connecte : ', req.user.userId.trim())

            const v_bool = (recommendation.CVNote.user._id.toString() == req.user.userId);
            console.log('resultat : ', v_bool)
           if ( recommendation.author.toString() !== req.user.userId && recommendation.CVNote.user._id.toString() !== req.user.userId) {
                return res.status(403).json({ message: 'Action non autorisée.' });
            }

            await recommendation.deleteOne();
            res.status(200).json({ message: 'Recommandation supprimée avec succès.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la suppression de la recommandation.' });
        }
    },

    getRecommendationsForUser : async (req, res) => {
        try {
            const recommendations = await Recommendation.find({ author: req.user.userId })
                .populate('CVNote', 'personalInfo');

            res.status(200).json(recommendations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des recommandations.' });
        }
    }

}