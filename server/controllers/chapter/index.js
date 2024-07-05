import express from 'express';
import CourseModel from '../../models/CourseModel.js';

const router = express.Router();

router.post('/addChapter',async (req,res)=>{
    try {
        console.log('in serrver')
        let {chapterTitle, chapterVideo,chapterDuration} = req.body;
        let courseId = req.query.id;
        let find =await CourseModel.findById({_id:courseId});
        console.log(find);

        let chapterData = {
            chapterTitle,
            chapterVideo,
            chapterDuration
        }
        if(find){
            find.courseChapters.push(chapterData);
            await find.save()
            res.status(200).json({message:'chapter added successfully'})
        }

       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }    
})


export default router;