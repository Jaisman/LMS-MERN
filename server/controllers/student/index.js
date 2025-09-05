import express from 'express'
import StudentModel from '../../models/StudentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'codeforindia';
router.post('/studentRegister', async (req, res) => {
    try {
        let { name, email, password, password2, mobileNumber, address } = req.body;
        if (!name || !email || !password || !password2) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (password !== password2) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        let findstudent = await StudentModel.findOne({ email });
        if (findstudent) {
            return res.status(409).json({ error: 'Email already exists, please login' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        let studentData = {
            name,
            email,
            password: hashed,
            mobileNumber,
            address,
            role: 'student'
        };

        let studentDetails = new StudentModel(studentData);
        await studentDetails.save();

        const userDetails = {
            _id: studentDetails._id,
            name: studentDetails.name,
            email: studentDetails.email,
            role: studentDetails.role
        };

        const token = jwt.sign({ userDetails }, JWT_SECRET, { expiresIn: '1d' });

        return res.status(201).json({ success: 'student registered successfully', userDetails, token });

    } catch (error) {
        console.error(error.stack || error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/studentLogin', async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body
        let findUser = await StudentModel.findOne({ email, password })
        console.log(findUser)
        if (!findUser) {
            return res.status(404).json({ error: 'Email not found,please register' });
        }
        else {
            let payload = {
                email: req.body.email,
                role: findUser.role,
                userId: findUser._id,
                // student_id:find
                // location: location
            }
            let privatekey = 'codeforindia';
            var token = jwt.sign(payload, privatekey, { expiresIn: '1d' });
            res.status(200).json({ success: 'student logged in successfully', token, role: findUser.role, status: true, student_id: findUser._id });
        }
    } catch (error) {
        console.error(error)
    }
})

router.post('/studentUpdate', async (req, res) => {
    try {
        let id = req.query.id;
        let find = await StudentModel.findById(id);
        console.log(req.body, 'req.body')
        let updateData = req.body
        console.log(updateData, 'updateData');
        let updatedDetails = await StudentModel.updateOne({ _id: id },
            { $set: updateData })
        //   res.send(updateData); 
        console.log(updatedDetails)
        let payload = {
            userDetails: updateData
        }
        // console.log('payload',payload)
        let privatekey = 'codeforindia';

        let token = jwt.sign(payload, privatekey, { expiresIn: '1d' });
        console.log(token)
        res.status(200).json({ success: 'student data updated successfully', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })

    }

})


router.get('/findStudent', async (req, res) => {
    try {
        let id = req.query.id;
        let find = await StudentModel.findById(id);
        if (find) {
            res.send(find);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })

    }

})



router.post('/addToCart', async (req, res) => {
    try {
        const { courseData } = req.body;
        console.log(courseData, 'courseData');
        let id = req.query.id;
        // console.log(id)
        let find = await StudentModel.findById(id);
        if (!find) {
            res.status(400).json({ error: 'Student Not Found' })
        }
        console.log(find)
        //  find.courses.push(courseData);
        find.cart.push(courseData);
        await find.save()
        res.status(200).json({ success: 'Course Added to Cart' })


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })

    }
})
export default router