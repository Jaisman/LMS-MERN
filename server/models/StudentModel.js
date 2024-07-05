import mongoose from "mongoose";

let studentSchema = new mongoose.Schema({
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
    courses: [],
    cart:[],
    address: String,
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

const studentModel = mongoose.model('Students', studentSchema, 'student');

export default studentModel;