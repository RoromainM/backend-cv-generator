const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CVSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        information: {
            name: { type: String, required: true },
            description: { type: String, required: true },
        },
        education: [
            {
                degree: { type: String, required: true },
                institution: { type: String, required: true },
                year: { type: String, required: true },
            },
        ],
        experience: [
            {
                role: { type: String, required: true },
                company: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        visibilite: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const CV = mongoose.model('CV', CVSchema);
module.exports = CV;
