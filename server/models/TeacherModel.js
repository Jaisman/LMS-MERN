import mongoose from "mongoose";

let teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        // required: true
    },
    password:{
        type:String,
    },
    courses: [{
        type: String
    }],
    address: String,
    description: {
        type: String
    },
    isVerified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    role: {
        type: String
    }
}, { timestamps: true })

const teacherModel = mongoose.model('Teachers', teacherSchema, 'teacher');

export default teacherModel;