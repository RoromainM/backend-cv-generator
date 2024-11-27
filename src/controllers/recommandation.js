const CV = require('../models/CVModel');
const Recommendation = require('../models/RecommandationModel');

module.exports = {
    createRecommandataion : async (p_req, p_res) => {
        const { CVNote, content } = p_req.body;

        try {
            const v_targetCV = await CV.findById(CVNote);
            if (!v_targetCV) {
                return p_res.status(404).json({ message: 'CV non trouvé.' });
            }

            const v_recommendation = new Recommendation({
                author: p_req.user.userId,
                CVNote,
                content,
            });

            await v_recommendation.save();
            p_res.status(200).json({
                message: 'Recommandation ajoutée avec succès.',
                v_recommendation,
            });
        } catch (error) {
            console.error(error);
            p_res.status(500).json({ message: 'Erreur lors de l\'ajout de la recommandation.' });
        }
    },

    getRecommendationsForCV : async (p_req, p_res) => {
        const { CVNote } = p_req.params;

        try {
            const v_recommendations = await Recommendation.find({ CVNote })
                .populate('author', 'firstname lastname')
                .populate('CVNote', 'personalInfo');

            p_res.status(200).json(v_recommendations);
        } catch (error) {
            console.error(error);
            p_res.status(500).json({ message: 'Erreur lors de la récupération des recommandations.' });
        }
    },

    deleteRecommendation : async (p_req, p_res) => {
        const { id } = p_req.params;

        try {
            const v_recommendation = await Recommendation.findById(id).populate('CVNote');
            if (!v_recommendation) {
                return p_res.status(404).json({ message: 'Recommandation non trouvée.' });
            }

           if ( v_recommendation.author.toString() !== p_req.user.userId && v_recommendation.CVNote.user._id.toString() !== p_req.user.userId) {
                return p_res.status(403).json({ message: 'Action non autorisée.' });
            }

            await v_recommendation.deleteOne();
            p_res.status(200).json({ message: 'Recommandation supprimée avec succès.' });
        } catch (error) {
            console.error(error);
            p_res.status(500).json({ message: 'Erreur lors de la suppression de la recommandation.' });
        }
    },

    getRecommendationsForUser : async (p_req, p_res) => {
        try {
            const v_recommendations = await Recommendation.find({ author: p_req.user.userId })
                .populate('CVNote', 'personalInfo');

            p_res.status(200).json(v_recommendations);
        } catch (error) {
            console.error(error);
            p_res.status(500).json({ message: 'Erreur lors de la récupération des recommandations.' });
        }
    },

    updateRecommendation: async (p_req, p_res) => {
        const { id } = p_req.params;
        const { content } = p_req.body;

        try {
            const v_recommendation = await Recommendation.findById(id);
            if (!v_recommendation) {
                return p_res.status(404).json({ message: 'Recommandation non trouvée.' });
            }

            if (v_recommendation.author.toString() !== p_req.user.userId) {
                return p_res.status(403).json({ message: 'Action non autorisée.' });
            }

            v_recommendation.content = content;

            await v_recommendation.save();

            p_res.status(200).json({
                message: 'Recommandation modifiée avec succès.',
                v_recommendation,
            });
        } catch (error) {
            console.error(error);
            p_res.status(500).json({ message: 'Erreur lors de la modification de la recommandation.' });
        }
    }

}