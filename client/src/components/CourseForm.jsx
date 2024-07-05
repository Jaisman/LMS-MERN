import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TeacherNavBar from './TeacherNavBar';
import { useGlobalContext } from "../GlobalContext";
import Toast from "./Toast";

const CourseForm = () => {
  const {user} = useGlobalContext()
  const teacherId = user._id;
  const teacherName = user.name;
  const { courseId } = useParams();
  const navigate = useNavigate()
  const [toast, setToast] = useState(null);
  const [img, setImg] = useState('');
  const [video, setVideo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageValue, setImageValue] = useState(false);
  const [profile, setProfile] = useState(false);
  const [home, setHome] = useState(false);
  const [createCourse, setCreateCourse] = useState(true);
  const [mycourses, setCourses] = useState(false);

  let [courseData, setCourseData] = useState({
    courseTitle: '',  
    courseDescription: '',
    courseImage: '',
    coursePrice: '',
    courseCategory: '',
    courseChapters: [],
    courseQuiz: [],
    teacherId
  });

  let handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  }
  const showToast = (message, duration = 2000) => {
    setToast({ message });
    return new Promise((resolve) => {
      setTimeout(() => {
        setToast(null);
        resolve();
      }, 1000);
    });
  };

  let uploadFile = async (type, data) => {
    try {
      let cloudName = 'drgqcwxq6';
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;

      if (resourceType === 'image') {
        setImageValue(false)
        setImageUrl(secure_url);


      }

      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };


  //  handleUpload(); 

  // const handleUpload = async () => {
  //   try {
  //     console.log('in upload');
  //     setLoading(true);

  //     let imgUrl = await uploadFile('image');
  //     console.log(imgUrl)

  //     // let videoUrl = await uploadFile('video');

  //     await axios.post(`/api/videos/upload`, { imgUrl });

  //     // setImg(null);
  //     // setVideo(null);

  //     console.log("File upload success!");
  //     setLoading(false);
  //     // navigate("/")
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }



  let handleSubmit = async (e) => {
    // console.log(courseData)
    e.preventDefault()
    if (courseData.courseChapters.length < 1) {
      return;
    }
    let response = await axios.post('/api/courses/updateCourse', { ...courseData,teacherId,teacherName }, {
      params: {
        id: courseId
      }
    })
    console.log(courseData);
    setCourseData({
      courseTitle: '',
      courseDescription: '',
      courseImage: '',
      coursePrice: '',
      courseCategory: '',
      courseChapters: [],
      courseQuiz: [],
    })
    if (response.status === 200) {
      await showToast(
        "Course Created"
      )
 
        navigate('/teacherMain')
  } else {
      showToast("Something went wrong!");
  }
  

  }
  const handleSelectChange = (e) => {
    setCourseData({ ...courseData, 'courseCategory': e.target.value });
    console.log(courseData);
  };

  const handleImageUpload = async (e) => {
    try {
      setImageValue(true);
      const newData = new FormData();
      newData.append("file", e.target.files[0]);
      newData.append('upload_preset', 'images_preset');

      setImg(e.target.files[0]);

      const imageUrl = await uploadFile('image', newData);
      setCourseData((prevData) => ({ ...prevData, 'courseImage': imageUrl }));
      console.log(courseData, 'courseData');
      console.log(imageUrl);

      // Display image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);

    } catch (error) {
      console.error(error);
    }
  };




  let courseDataFetch = async () => {
    try {
      const response = await axios.get('/api/courses/getCourse', {
        params: {
          courseIdValue: courseId,
        },
      });
      console.log(response.data);
      setCourseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChapter = async () => {
    if (courseId) {
      if (!courseData.courseCategory || !courseData.courseTitle || !courseData.coursePrice || !courseData.courseDescription || !courseData.courseImage) {
        return;
      }
      navigate(`/addChapter/${courseId}`)
    }
    else {
      if (!courseData.courseCategory || !courseData.courseTitle || !courseData.coursePrice || !courseData.courseDescription || !courseData.courseImage) {
        return;
      }
      let response = await axios.post('/api/courses/createCourse', { ...courseData,teacherId,teacherName });
      let courseId = response.data.id;
      navigate(`/addChapter/${courseId}`)

    }

  }



  useEffect(() => {

    courseId ? courseDataFetch() : ''
  }, []);

  return (
    <>
      {/* <h2 className='p-1 bg-indigo-600 ' style={{ textAlign:'',border:'2px solid transparent',fontSize:'1.5rem',color:'white' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline m-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
</svg>
Create Course</h2> */}
      <TeacherNavBar profile={profile} home={home} mycourses={mycourses} createCourse={createCourse} />
      <div id='animation-container' style={{ minHeight: '85vh', width: '100%', }}>
        <form className="flex flex-col md:flex-row bg-gray-00 w-full " onSubmit={handleSubmit}  >
          <div className="w-full p-2 pt-2" >
            <div className="mt-2 px-16">
              <label htmlFor="courseTitle" className="block text-md font-bold font-medium leading-6 text-gray-900 " style={{ textAlign: 'left' }}>
                Course Title
              </label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={courseData.courseTitle}
                onChange={handleChange}
                required
                className="w-full h-11 rounded border-1 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
            <div className="mt-4 px-16">
              <label htmlFor="courseDescription" className="block text-md font-medium leading-6 text-gray-900" style={{ textAlign: 'left' }}>
                Course Description
              </label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={courseData.courseDescription}
                onChange={handleChange}

                required
                className="w-full h-24 rounded border-1 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2 text-sm"
              ></textarea>
            </div>
            <div className="mt-2 px-16 " >
              <label htmlFor="courseImage" className="block text-md font-bold font-medium leading-6 text-gray-900 " style={{ textAlign: 'left' }}>
                Course Image
              </label>
              <input
                id="courseImage"
                name="courseImage"
                type="file"
                accept="image/*"
                // value={imageUrl}
                onChange={handleImageUpload}


                // required
                className="file-input   w-full h-11  rounded border-1   text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 text-sm    
            file:bg-indigo-600"
                style={{ border: '1px solid grey', marginBottom: '0' }}
              />
            </div>
            <div className=' px-16'>
              {imageValue ? <div className='w-full h-80' style={{ border: '1px solid gray' }}><div class="flex items-center justify-center w-full h-full bg-gray-300   dark:bg-gray-700">
                <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div></div>
                : <img src={courseData.courseImage}  alt="" className=' w-full h-80 rounded border-1 ' />
              }

            </div>
          </div>

          <div className="md:w-full p-2 pt-2">
            <div className="mt-2.5 px-16">
              <label htmlFor="coursePrice" className="block text-md font-bold leading-6 text-gray-900" style={{ textAlign: 'left' }}>
                Course Price
              </label>

              <input
                id="coursePrice"
                name="coursePrice"
                value={courseData.coursePrice}
                onChange={handleChange}
                required
                type='number'
                className="w-full h-11 rounded border-1 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>

            <div className="mt-5 px-16 ">
              <label htmlFor="select" className="block text-md font-bold leading-6 text-gray-900" style={{ textAlign: 'left' }}>
                Course Category
              </label>
              <select id="select"
                value={courseData.courseCategory}
                onChange={handleSelectChange}
                required
                name='select' className="bg-gray-10 border border-gray-400 text-gray-500 text-sm rounded focus:ring-indigo-500 focus:border-indigo-500 block w-full h-11 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" style={{ marginTop: '0%' }}>
                <option selected hidden className='text-gray-200' style={{ color: 'grey' }}>Select a Category</option>
                <option >Web Development</option>
                <option >Health and Fitness</option>
                <option >Finance and Marketing</option>
                <option >Data Analytics</option>
                <option >Other</option>
              </select>
            </div>
            <div className="mt-4 px-16">
              <label htmlFor="courseTitle" className="block text-md font-bold font-medium leading-6 text-gray-900" style={{ textAlign: 'left' }}>
                Course Chapters
              </label>
              <div className='overflow-x-hidden overflow-y-auto' style={{ border: '1px solid #94a3b8', height: '50vh' }}>

                {/* <div className='flex'>

                <button onClick={handleAddChapter} className="w-full h-11 bg-indigo-500   text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:text-sm p-2 pt-0 " style={{ borderRadius: '0', color: 'white' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Add Chapter</button>
              </div> */}

                {/* <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle py-0 ">
                    <div className="overflow-hidden"> */}
                {/* <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {courseData.courseChapters.map((ele, index) => {
                          return <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 pl-0">{ele.chapterTitle}</td>
                              <td className="px-3 py-3 whitespace-nowrap text-end text-sm font-medium pr-0">
                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                  Edit</button>
                              </td>
                              <td className="px-2 py-2 whitespace-nowrap text-end text-sm font-medium pl-0">
                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                  Delete</button>
                              </td>
                            </tr>
                          </tbody>
                        })
                        }

                      </table> */}
                <div className="p-0 max-w-screen-xl mx-auto px-0 md:px-0">
                  <div className="items-start justify-between md:flex">

                    <div className="mt-2 ml-auto md:mt-3.5 md:mr-2 ">
                      <button
                        onClick={handleAddChapter}
                        className="inline-block px-3 py-2  text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm mt-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline m-1 mb-1.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Add Chapter
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 shadow-sm border  overflow-x-auto p-0">
                    <table className="w-full table-auto text-sm text-left p-0">

                      <tbody className="text-gray-600 divide-y">
                        {
                          courseData.courseChapters.map((ele, index) => (
                            <tr key={index} className='hover:bg-gray-100'>

                              <td className="px-6 py-4 whitespace-nowrap ">{ele.chapterTitle}</td>
                              <td className="text-right px-6 whitespace-nowrap">
                                <button  className="py-1.5 px-3 font-medium text-indigo-600 mx-1 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                  Edit
                                </button>
                                <button  className="py-2 leading-none px-3 mx-1 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* </div>
                  </div>
                </div>
              </div> */}

                {/* {courseData.courseChapters.map((ele,index)=>{
             return <div key={index} className='flex w-full h-8 bg-gray-10 border border-gray-400 text-gray-900 text-sm  bg-gray-50' style={{border:'1px solid grey',fontSize:'1.2rem'}}>
                <p className='m-1 p-1 '>{index+1}</p>
                <p className='m-1 p-1 w-1/2 '>{ele.chapterTitle}</p>
                <div className='flex items-center p-3'>
  <button className='flex items-center m-0.5 p-2 ml-8 bg-indigo-500 mt-0.5 p-2.5 text-white  ' style={{fontSize:'1rem',borderRadius:'0%'}}  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-5 h-5 mr-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    Edit
  </button>
</div>
<div className='flex items-center'>
  <button className='flex items-center m-0.5 p-2 ml-8 bg-indigo-500 mt-0.5 p-2.5 text-white ' style={{fontSize:'1rem',borderRadius:'0'}}  >
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

    Delete
  </button>
</div>

        

              </div>
              
             })} */}



              </div>

            </div>
            <div className='px-16 mt-4'>
              <button
                type="submit"
                className=" md:w-full justify-center rounded bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 "
              >
                Create Course
              </button>
            </div>

          </div>
        </form>
        {toast && <Toast message={toast.message} onClose={toast.onClose} />}
      </div>
    </>

  );
};

export default CourseForm;
