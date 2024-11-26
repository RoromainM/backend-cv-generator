const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema(
    {
        fromUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        toCV: {
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
