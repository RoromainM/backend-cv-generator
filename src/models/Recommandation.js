const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema(
    {
        Author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        CVNote: {
            type: Schema.Types.ObjectId,
            ref: 'CV',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);
module.exports = Recommendation;
