const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CVSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        personalInfo: {
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
        workExperience: [
            {
                role: { type: String, required: true },
                company: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        visibility: {
            type: Boolean,
            default: true, // Visible par défaut
        },
    },
    {
        timestamps: true,
    }
);

const CV = mongoose.model('CV', CVSchema);
module.exports = CV;
