import express from 'express'
import TeacherModel from '../../models/TeacherModel.js';
import  jwt  from 'jsonwebtoken';
import StudentModel from '../../models/StudentModel.js';
const router = express.Router()

router.post('/loginUser',async(req,res)=>{
    try {
        let {
            email,
            password
        }=req.body
        let findTeacher = await TeacherModel.findOne({email});
        let findStudent = await StudentModel.findOne({email});
        if(!findTeacher && !findStudent){
            return res.status(404).json({error:'Email not found,please register'})
        }
       if(findTeacher){
        let payload={
            email:req.body.email,
            role:findTeacher.role,
            userDetails:findTeacher
        }
        let privatekey='codeforindia';
        let role = findTeacher.role
        let token =jwt.sign(payload,privatekey,{expiresIn:'1d'});
        res.status(200).json({ success: 'teacher logged in successfully', token,role});
       }
       if(findStudent){
        let payload={
            email:req.body.email,
            role:findStudent.role,
            userDetails:findStudent
        }
        let privatekey='codeforindia';
        let role = findStudent.role;
        
        let token =jwt.sign(payload,privatekey,{expiresIn:'1d'});
        res.status(200).json({ success: 'Student logged in successfully', token,role});
       }
  
      
    } catch (error) {
        console.error(error)
    }
})
export default router;

// import express from 'express';
// import jwt from 'jsonwebtoken';
// const router = express.Router();
// router.get('/verify', async (req, res) => {
//     try {
//         let token = req.headers.token
//         req.payload = jwt.verify(token, 'codeforindia');
//         if (req.payload) {
//             return res.json(req.payload)
//         }
//     } catch (error) {
//         return res.status(401).json({ error: 'Session Expired, please login' });
//     }

// })
// export default router;