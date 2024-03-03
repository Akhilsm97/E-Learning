import { toast } from 'react-toastify';
import './css/styles.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import EnrolledStudents from './EnrolledStudents';
import Add_Course from './Add_Course';
import Course_Details from './Course_Details';
import Course_Mod from './Course_Mod';
import Module_Details from './Module_Details';
import { Modal } from 'bootstrap';
import Upload from './images/upload.png';

function Admin() {
    function getDate() {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        const date = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${date}`;
      }
    const [totalCount, setTotalCount] = useState('');
    const [totalCounts, setTotalCounts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Update the URL with your Django server's address
                const response = await axios.get('http://127.0.0.1:8000/counts/');
                setTotalCount(response.data.student_count);
                setTotalCounts(response.data.course_count);
                console.log('Total Count',totalCount)
            } catch (error) {
                console.error('Error fetching total count:', error);
            }
        };

        fetchData();
    }, [totalCount]);

    const [data, setData]= useState([])
    useEffect(()=>{
        axios
        .get('http://127.0.0.1:8000/create_stud/')
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            console.log("error")
        })
    }, [data])
        const[currentPage, setCurrentPage] = useState(1)
        const [searchItem, setSearchItem] = useState('');
        const recordPerPage = 5

        const filterData = data.filter((item) =>
            item.Stud_name.toLowerCase().includes(searchItem.toLowerCase())
        )

        
        const lastIndex = currentPage * recordPerPage;
        const firstIndex = lastIndex - recordPerPage;
        const records = filterData.slice(firstIndex, lastIndex);
        const npage = Math.ceil(data.length / recordPerPage);
        const numbers = [...Array(npage +1 ).keys()].slice(1)

        function prevPage(){
            if(currentPage !== firstIndex){
                setCurrentPage(currentPage - 1)
            }
        }

        function nextPage(){
            if(currentPage !== lastIndex){
                setCurrentPage(currentPage + 1)
            }
        }

        function changePage(id){
            setCurrentPage(id)
        }


        // Add Student to API


        const [formData, setFormData] = useState({});
        const [showModal, setShowModal] = useState(true);

const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
        
    });
    console.log('Before'+formData)
};

const handleInputImage = (e) => {
    const file = e.target.files[0];
    const formDataImage = new FormData();

    formDataImage.append("Stud_name", formData.Stud_name);
    formDataImage.append("email", formData.email);
    formDataImage.append("gender", formData.gender);
    formDataImage.append("phone", formData.phone);
    formDataImage.append("Address_line_1", formData.Address_line_1);
    formDataImage.append("Address_line_2", formData.Address_line_2);
    formDataImage.append("qualification", formData.qualification);
    formDataImage.append("percent_mark", formData.percent_mark);
    formDataImage.append("username", formData.username);
    formDataImage.append("password", formData.password);
    formDataImage.append('reg_date', getDate())
    formDataImage.append("stud_img", file);

    setFormData(formDataImage);
    console.log('entered value is '+ formData)
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered Value is", formData);

    try {
        const response = await axios.post('http://127.0.0.1:8000/create_stud/', formData);

        if (response.status === 201) {
            setShowModal(false); 
            toast.success("Student Enrolled Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log('Error occurred:', error);
    }
};

// ------------------------------------------------------------Course Module ----------------------------------------------------------------

const [course, setCourse] = useState([]);

useEffect(() => {
    axios
        .get('http://127.0.0.1:8000/course-names/')
        .then((response) => {
            setCourse(response.data);
        })
        .catch((error) => {
            console.error("Error fetching course data:", error);
        });
}, []); 

const [datas, setDatas]= useState([])
useEffect(()=>{
    axios
    .get('http://127.0.0.1:8000/create_course/')
    .then((response)=>{
        setDatas(response.data)
    })
    .catch((error)=>{
        console.log("error")
    })
}, [datas])


const [formDatas, setFormDatas] = useState({
    course_enrollment_id: '',
    module: '',
    topic_title: '',
    topic_details: ''
});
const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormDatas({ ...formDatas, [name]: value });
};

const handleSubmits = async (e) => {
    e.preventDefault();
    console.log("Entered Value is", formDatas);

    try {
        const response = await axios.post('http://127.0.0.1:8000/create_topic/', formDatas);

        if (response.status === 201) {
            toast.success("Course Modules Added Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    } catch (error) {
        console.log('Error occurred:', error);
    }
};




const [courses, setCourses] = useState([]);


    

    const handleLinkClick = (id) => {
        fetch('http://127.0.0.1:8000/topic_details/' + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCourses(data); // Update courses state with fetched data
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                // Optionally, you can handle the error state here
            });
    };

    // --------------------------------Update Module -----------------------------------------------------

    const [up, setUp] = useState({}); // Initialize with proper initial state
    const [originalData, setOriginalData] = useState({});

    // Fetch initial data when component mounts
    useEffect(() => {
        // Fetch initial data
        updateModules();
    }, []);

    // Function to fetch initial data
    const updateModules = (id) => {
        fetch('http://127.0.0.1:8000/topic_update/' + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUp(data); // Set initial state with fetched data
                setOriginalData(data); // Set original data for comparison
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle error
            });
    };

    // Function to handle input changes
    const handleInputModule = (event, fieldName) => {
        const value = event.target.value;
        setUp(prevUpdate => ({
            ...prevUpdate,
            [fieldName]: value,
           
        }));
    };

    // Function to update module data
    const updateMod = async (e, id) => {
        e.preventDefault();

   
        console.log("ID is"+ id)
        console.log(up)
       

        const requestData = {
            "id": up.id,
            "module": up.module,
            "topic_title": up.topic_title,
            "topic_details": up.topic_details,
            "course_enrollment_id": up.course_enrollment_id,

        };
        console.log("Updated data is" , requestData)
        try{
            const response = await axios.put(`http://127.0.0.1:8000/topic_update/${id}/`, requestData,{
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
            },
        });
        console.log(response)
            if (response.status === 200){
                const modalElement = document.getElementById('yourModalId'); // Replace 'yourModalId' with the actual ID of your modal

                // Close the modal using Bootstrap's Modal class method
                const modal = Modal.getInstance('myModalz');
                if (modal) {
                    modal.hide(); // Hide the modal
                }

                setShowModal(false); // Set the state to hide the modal
               
                toast.success("Module Updated Successful", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                });
                
            }
        }catch(error){
            console.log(error)

        }
        
    };
    const handleDelete=((id) =>{
        setShowModal(false)
        fetch(`http://127.0.0.1:8000/topic/${id}/delete/ ` ,
            {method: 'DELETE'})
            .then(()=>{
                console.log("Deleted")

            })
        
        }
)

    const [ups, setUps] = useState({});
    

        const handleMaterials=(id, enroll_id)=>{
            console.log("Material Id", id)
            fetch('http://127.0.0.1:8000/topic_update/' + id)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setUp(data); // Set initial state with fetched data
                    setOriginalData(data); // Set original data for comparison
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Handle error
                });

                fetch('http://127.0.0.1:8000/course_details/' + enroll_id)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setUps(data); // Set initial state with fetched data
                    setOriginalData(data); // Set original data for comparison
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Handle error
                });

               

        };


        // fetch(`http://127.0.0.1:8000/course_materials/${ups.course_enrollment_id}/${up.module}/`)
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Error on display');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     setDisplay(data); // Set initial state with fetched data
        //     setOriginalData(data); // Set original data for comparison
        // })
        // .catch(error => {
        //     console.error('Error fetching data:', error);
        //     // Handle error
        // });


        
        const[display, setDisplay] = useState([])
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/course_materials/${ups.course_enrollment_id}/${up.module}/`);
                setDisplay(response.data);
                console.log("RESPONSE DATA", response);
            } catch (error) {
                console.error("Error fetching course materials:", error);
            }
        };
    
        useEffect(() => {
            fetchData();
        }, [ups.course_enrollment_id, up.module]);


        




        // ---------------------------------------------------------Image Preview-----------------------------------

        

            const[formDatass, setFormDatass] = useState({})
            const handleMaterialss = (e) => {
                const { name, value } = e.target;
                setFormDatass({
                    ...formDatass,
                    [name]: value,
                    
                });
                console.log('Before'+formDatass.course_enrollment_id)
            };
            const [imageSrc, setImageSrc] = useState(null);

            const showPreview = (event) => {
                if (event.target.files.length > 0) {
                const src = URL.createObjectURL(event.target.files[0]);
                setImageSrc(src);
                }
                const file = event.target.files[0];
                const formDataImage = new FormData();

                formDataImage.append("course_enrollment_id", ups.course_enrollment_id);
                
                formDataImage.append("module", up.module);
               
                formDataImage.append("video_title", formDatass.video_title);
                console.log('ENTERED',formDatass.video_title)
                formDataImage.append("type", 'video');
                formDataImage.append("Thumbnail", file);
                formDataImage.append("created_at", getDate());
                formDataImage.append("video_url", formDatass.video_url);
                formDataImage.append("pdf", '');
                setFormDatass(formDataImage);
                console.log('entered value is '+ formDatass)
            };

            const handleMaterialSubmit = async (e) => {
                e.preventDefault();
                console.log("Entered Value is", JSON.stringify(formDatass.video_title));
            
                try {
                    const response = await axios.post('http://127.0.0.1:8000/Course_Materials/', formDatass);
                    console.log(response.data)

                    fetchData();
                    
            
                    if (response.status === 201) {
                        toast.success("Material Added Successfully", {
                            position: toast.POSITION.TOP_CENTER,
                            theme: 'colored'
                        });
                    }
                } catch (error) {
                    console.log('Error occurred:', error);
                }
            };

            // --------------------------------------------------------------------Update Material -----------------------------------------
            const[materialUpdate, setmaterialUpdate] = useState({})
            const updateMaterial = (id) => {
                fetch('http://127.0.0.1:8000/material_details/' + id)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setmaterialUpdate(data); // Set initial state with fetched data
                        setOriginalData(data); // Set original data for comparison
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        // Handle error
                    });
            };

            const[formDataz, setFormDataz] = useState({})

            const handleMaterialUpdate = (event, fieldName) => {
                const value = event.target.value;
                setmaterialUpdate(prevUpdate => ({
                    ...prevUpdate,
                    [fieldName]: value,
                   
                }));
                console.log('CHANGING DATA', materialUpdate)
            };

            const handleThumbnail = (e) => {
                const file = e.target.files[0];
                setFormDataz({
                    ...formDataz,
                    Thumbnail: file,
                });
                console.log('CHANGED DATA', materialUpdate)
            };

            const handleMaterialSubmits = async (e, id) => {
                e.preventDefault();
                console.log("CLICKED ID IS", id);
            
                // Prepare Thumbnail data
                let ThumbnailData = {};
                if (formDataz.Thumbnail) {
                    ThumbnailData = { Thumbnail: formDataz.Thumbnail };
                } else {
                    ThumbnailData = { Thumbnail: '' }; 
                }

                console.log('THUMBNAIL DATA', ThumbnailData)
            
                // Compare updated data with original data and include only changed fields
                
            
                // Prepare request data
                const requestData = {
                    ...materialUpdate, // Include only the changed fields
                    ...ThumbnailData,
                    created_at: '', // Always include reg_date
                };
            
                console.log("Updated Data:", requestData);
            
                try {
                    // Send PUT request
                    const response = await axios.put(`http://127.0.0.1:8000/material_update/${id}/`, requestData, {
                        headers: {
                            'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
                        },
                    });
            
                    // Handle response
                    console.log("Response:", response.data);
                    setShowModal(false);
                    toast.success("Material Updated Successfully", {
                        position: toast.POSITION.TOP_CENTER,
                        theme: 'colored',
                    });
                    fetchData();
                    
                } catch (error) {
                    console.error('Error updating material:', error);
                    // Handle error
                    toast.error("Failed to update material. Please try again later.", {
                        position: toast.POSITION.TOP_CENTER,
                        theme: 'colored',
                    });
                }
            };

            


            const showPdf = (e)=>{
                
                const fileInput1 = document.getElementById('fileInput1');
                const fileInput2 = document.getElementById('fileInput2');
            
                const file1 = fileInput1.files[0]; // File from first input
                const file2 = fileInput2.files[0]; // File from second input
               
                const formDataPdf = new FormData();

                formDataPdf.append("course_enrollment_id", ups.course_enrollment_id);
                formDataPdf.append("module", up.module);
                formDataPdf.append("video_title",formDatass.video_title);
                console.log('ENTERED',formDatass.video_title)
                formDataPdf.append('Thumbnail', file1)
                console.log('THUMBNAIL DATA', file1)
                formDataPdf.append("type", 'PDF');
                formDataPdf.append('pdf', file2)
                console.log('PDF DATA', file2)
                formDataPdf.append("created_at", getDate());
                formDataPdf.append("video_url", '');
                setFormDatass(formDataPdf);
            }
            


            const handleMaterialPdf = async (e) => {
                e.preventDefault();
                console.log("Entered Value is", JSON.stringify(formDatass.video_title));
                
            
                try {
                    console.log('entered value is '+ formDatass)


                    const response = await axios.post('http://127.0.0.1:8000/Course_Materials/', formDatass);
                    console.log(response.data)

                    fetchData();
                    
            
                    if (response.status === 201) {
                        toast.success("Material Added Successfully", {
                            position: toast.POSITION.TOP_CENTER,
                            theme: 'colored'
                        });
                    }
                } catch (error) {
                    console.log('Error occurred:', error);
                }
            };



            // ---------------------------------------------------------------------------Count Class ----------------------------------------

            const[classCount, setClassCount] = useState([])
            const fetchClass = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/course-materials/count/`);
                    setClassCount(response.data);
                    console.log("RESPONSE DATA", response);
                } catch (error) {
                    console.error("Error fetching course materials:", error);
                }
            };
        
            useEffect(() => {
                fetchClass();
            }, [classCount]);
    
  return (
    <>
    
     <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand font-weight-bolder" href="index.html">E-LEARNING</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
         
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
            
            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw" style={{color:"white"}}></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="logout.php">Logout</a>
                    </div>
                </li>
            </ul>
        </nav>
        

<div id="layoutSidenav">
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <div class="nav">
                    <div class="sb-sidenav-menu-heading">Core</div>
                    <a class="nav-link " id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"  aria-selected="true">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </a>
                    <div class="sb-sidenav-menu-heading">
                       STUDENT ENROLLMENTS
                    </div>
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                              Enrollments
                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>
                    <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" id="social-tab" data-toggle="tab" href="#social" role="tab" aria-controls="social" aria-selected="false">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Add Enrollments
                            </a>
                            <a class="nav-link" id="enrolled-tab" data-toggle="tab" href="#enrolled" role="tab" aria-controls="enrolled" aria-selected="false">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Enrolled Students
                            </a>
                                          
                        </nav>
                    </div>

                    <div class="sb-sidenav-menu-heading">COURSE ENROLLMENT</div>


                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePagess" aria-expanded="false" aria-controls="collapsePagess">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                              Course Enrollments
                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>
                    <div class="collapse" id="collapsePagess" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link"  id="course_det-tab" data-toggle="tab" href="#course_det" role="tab" aria-controls="course_det" aria-selected="false">
                                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                Course Details
                            </a>
                            <a class="nav-link"  id="course_add-tab" data-toggle="tab" href="#course_add" role="tab" aria-controls="course_add" aria-selected="false">
                                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                Add Courses
                            </a>
                            <a class="nav-link" id="course_mod-tab" data-toggle="tab" href="#course_mod" role="tab" aria-controls="course_mod" aria-selected="false">
                                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                Add Course Modules
                            </a>
                                          
                        </nav>
                    </div>




                    
                    
                    
                    
                    
                   

                        

                           
                            
                                
                                    
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                Adminzzz
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="container" style={{padding: 30}}>
                        
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card border-primary mb-3 shadow" style={{ maxWidth: '18rem' }}>
                                        <div class="card-header" style={{fontWeight: "bold"}}>STUDENTS</div>
                                            <div class="card-body text-primary">
                                                <h5 class="card-title">Registered Students</h5>
                                                <p class="card-text text-center"  style={{ fontSize: 50, fontWeight: 'bolder' }}>{totalCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                <div class="col-md-4">
                                    <div class="card border-primary mb-3 shadow" style={{ maxWidth: '18rem' }}>
                                        <div class="card-header" style={{fontWeight: "bold"}}>COURSES</div>
                                        <div class="card-body text-primary">
                                          <h5 class="card-title">Registered Courses</h5>
                                          <p class="card-text text-center"  style={{ fontSize: 50, fontWeight: 'bolder' }}>{totalCounts}</p>
                                        </div>
                                      </div>

                                </div>
                            </div>
                        </div>

                        <div class="container shadow" style={{padding: 20}}>
                            <div className='row' style={{marginBottom:20, marginLeft:850}}>
                                <input type='text' className='form-control' placeholder='Search Here' style={{width:200}} value={searchItem}
                                
                                onChange={(e)=>{
                                    setSearchItem(e.target.value);
                                    setCurrentPage(1);

                                }}
                                ></input>
                            </div>
                            <table class="table table-hover table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Mail Id</th>
                                    <th scope="col">Phone No</th>
                                    <th scope='col'>Registration</th>
                                    <th scope="col">Qualification</th>
                                  
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                        records.map((item)=>(
                                            <tr>
                                                <th scope="col">{item.id}</th>
                                                <th scope="col"><img src={item.stud_img} style={{width:30, borderRadius:'50%'}} />&nbsp;{item.Stud_name}</th>
                                                <th scope="col">{item.gender}</th>
                                                <th scope="col">{item.email}</th>
                                                <th scope="col">{item.phone}</th>
                                                <th scope='col'>{item.reg_date}</th>
                                                <th scope="col">{item.qualification}</th>
                                            
                                            </tr>
                                            
                                        ))
                                    }
                                
                                 
                                </tbody>
                            </table>

                            
                            <nav aria-label="...">
                                <ul className="pagination">


                                    <li className="page-item">
                                    <a className="page-link"  onClick={prevPage}>Previous</a>
                                    </li>

                                    {
                                        numbers.map((n,i)=>(
                                            <li className={`page-item ${currentPage ===n ? 'active' : ''}`} key={i}>
                                                <a class="page-link" href="#" onClick={()=>changePage(n)}>{n}</a>
                                                </li>
                                        ))
                                    }
                                
                                    

                                    <li className="page-item">
                                    <a className="page-link" href="#" onClick={nextPage}>Next</a>
                                    </li>
                                </ul>
                            </nav>  

                            <br />
                        </div>
            </div>
            <div class="tab-pane fade" id="social" role="tabpanel" aria-labelledby="social-tab">
                <h3 className='text-center font-weight-bolder pt-5'>Enrolled Students</h3>
                    <div class="container shadow" style={{padding: 20, marginTop:50}}>
                            <div className='row' style={{marginBottom:20, marginLeft:850}}>
                                <div className='col-md-2'>

                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className='col-md-8'>
                                <button type="button" class="btn btn-success font-weight-bolder" data-toggle="modal" data-target="#myModal" onClick={() => setShowModal(true)}>Add Students</button>
                                </div>
                            </div>
                            <table class="table table-hover table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Mail Id</th>
                                    <th scope="col">Phone No</th>
                                    <th scope='col'>Registration</th>
                                    <th scope="col">Qualification</th>
                                  
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                        records.map((item)=>(
                                            <tr>
                                                <td scope="col">{item.id}</td>
                                                <td scope="col"><img src={item.stud_img} style={{width:30, borderRadius:'50%'}} />&nbsp;{item.Stud_name}</td>
                                                <td scope="col">{item.gender}</td>
                                                <td scope="col">{item.email}</td>
                                                <td scope="col">{item.phone}</td>
                                                <td scope='col'>{item.reg_date}</td>
                                                <td scope="col">{item.qualification}</td>
                                            
                                            </tr>
                                            
                                        ))
                                    }
                                
                                 
                                </tbody>
                            </table>

                            
                            <nav aria-label="...">
                                <ul className="pagination">


                                    <li className="page-item">
                                    <a className="page-link"  onClick={prevPage}>Previous</a>
                                    </li>

                                    {
                                        numbers.map((n,i)=>(
                                            <li className={`page-item ${currentPage ===n ? 'active' : ''}`} key={i}>
                                                <a class="page-link" href="#" onClick={()=>changePage(n)}>{n}</a>
                                                </li>
                                        ))
                                    }
                                
                                    

                                    <li className="page-item">
                                    <a className="page-link" href="#" onClick={nextPage}>Next</a>
                                    </li>
                                </ul>
                            </nav>  

                            <br />
                         </div>
            </div>

            <div class="tab-pane fade" id="enrolled" role="tabpanel" aria-labelledby="enrolled-tab">
                                    
                                    <EnrolledStudents />
            </div>
            <div class="tab-pane fade" id="course_add" role="tabpanel" aria-labelledby="course_add-tab">
                                    
                                   <Add_Course />
            </div>
            <div class="tab-pane fade" id="course_det" role="tabpanel" aria-labelledby="course_det-tab">
                                    
                                   <Course_Details />
            </div>

{/* --------------------------------------------------------------Course Modules -------------------------------------------------------------*/}



            <div class="tab-pane fade" id="course_mod" role="tabpanel" aria-labelledby="course_mod-tab">
                                    
                                   


                <h3 className='text-center p-3 font-weight-bolder'>Add Course Module Here</h3>

      
      


                <div className='container-fluid m-4 w-auto' >
                    <div className='container-fluid p-5'>
                    <form id="myForm" onSubmit={handleSubmits}>
                        <div className='row'>
                            
                            <div className='col-md-6 pb-2'>
                            <label htmlFor="course_enrollment_id" className='font-weight-bolder'>Course Name:</label>
                                <select name="course_enrollment_id" className='form-control font-weight-bolder' onChange={handleChanges}>
                                    <option className='font-weight-bolder'>-----Select Course</option>
                                    {
                                        course.map((items)=>(
                                            
                                            <option className='font-weight-bold' value={items.course_enrollment_id}>{items.course_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-md-6 pb-2'>
                                
                                <label htmlFor="module" className='font-weight-bolder'>Module:</label>
                                <select id="module" name="module" onChange={handleChanges} className='form-control font-weight-bolder' >
                                    <option className='font-weight-bold' value="">Select Module</option>
                                    <option className='font-weight-bold' value="1">Module 1</option>
                                    <option className='font-weight-bold' value="2">Module 2</option>
                                    <option className='font-weight-bold' value="3">Module 3</option>
                                    <option className='font-weight-bold' value="4">Module 4</option>
                                    <option className='font-weight-bold' value="5">Module 5</option>
                                    <option className='font-weight-bold' value="6">Module 6</option>
                                    <option className='font-weight-bold' value="7">Module 7</option>
                                    <option className='font-weight-bold' value="8">Module 8</option>
                                    <option className='font-weight-bold' value="9">Module 9</option>
                                    <option className='font-weight-bold' value="10">Module 10</option>
                                    {/* Add other module options */}
                                </select>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label htmlFor="topic_title" className='font-weight-bolder'>Topic Title:</label>
                                <input type="text" id="topic_title" name="topic_title" value={formDatas.topic_title} className='form-control font-weight-bolder' onChange={handleChanges}  />
                            </div>
                            <div className='col-md-6 pb-2'>
                            <label htmlFor="topic_details" className='font-weight-bolder'>Topic Details:</label>
                            <input type="text" id="topic_details" name="topic_details" value={formDatas.topic_details} className='form-control font-weight-bolder' onChange={handleChanges} />
                            </div>
                            
                            
                        </div>
                        <button type='submit' className='btn btn-success mt-3'  style={{marginBottom: 20, marginLeft: 480}}>Add Module</button>
                        </form>
                    </div>
                </div>





                <div className='container w-100'>
                    <div className="row">

                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Price</th>
                                <th scope='col'>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datas.map((items)=>(
                                        <tr className='font-weight-bolder'>
                                            <th scope="col">{items.course_enrollment_id}</th>
                                            <td><img src={items.course_img} className='img-thumbnail' style={{width:50, borderRadius:'40%'}} />&nbsp;{items.course_name}</td>
                                            <td>{items.created_at}</td>
                                            <td>{items.start_date}</td>
                                            {items.status === 'Active' ? (
                                            <td className="font-weight-bolder" style={{color:'green'}}>{items.status}</td>
                                            ): (
                                                <td className="font-weight-bolder" style={{color:'red'}}>{items.status}</td>
                                                )}
                                            <td>₹{items.price}</td>
                                            <td>
                                                <a className='btn btn-warning font-weight-bold ml-1  collapsed '  id="course_module-tab" data-toggle="tab" href="#course_module" role="tab" aria-controls="course_module" aria-selected="false"   onClick={() => handleLinkClick(items.course_enrollment_id)} >Modules</a>
                                                
                                                <button className='btn btn-danger  font-weight-bold ml-1'  >Delete</button>
                                                </td>

                                                
                                            
                                            </tr>
                                    ))
                                }
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>










{/* --------------------------------------------------------------Modules Details  -------------------------------------------------------------*/}





            
            <div class="tab-pane fade" id="course_module" role="tabpanel" aria-labelledby="course_module-tab">

                
                                    
                     
                    <div className='container-fluid mt-5'>
                        <div className='row'>
                            {
                                courses.map((itemsss)=>(
                                    <div className='col-md-4 mb-5 rounded-top'>
                                        <div class="card shadow" style={{width:330, borderRadius:30}}>
                                            <div className='card-header' style={{height:220,backgroundColor: '#042224',borderRadius:'30px 30px 0px 0px'}}>
                                                
                                                <p className='text-center ' style={{fontSize:48, fontWeight:700, color:'rgba(51, 143, 51, 0.969)',marginBlock:-20, marginTop:10}}>MODULE</p> <p className='text-center ' style={{fontSize:58, fontWeight:700, color:'rgba(51, 143, 51, 0.969)',}}>0{itemsss.module}</p>
                                                <p style={{fontSize:20, fontWeight:900, color:'grey',marginTop:20, textTransform:'uppercase'}}>{itemsss.topic_title}</p>                                            
                                            </div>
                                            <div class="card-body">
                                                
                                                <p class="card-text" style={{overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>{itemsss.topic_details}</p>
                                                <div className='row'>
                                                    <div className='col-md-5'>

                                                        {classCount.map((items) => (
                                                            <div>
                                                            {itemsss.course_enrollment_id === items.course_enrollment_id && itemsss.module === items.module && items.type==='video' ? (
                                                                <p style={{ color:'rgba(51, 143, 51, 0.969)', fontWeight: 900, fontSize:22 }}>{items.total_count} classes</p>
                                                            ) : null}
                                                        </div>
                                                        ))}

                                                    </div>
                                                    <div className='col-md-7'>
                                                        {classCount.map((items) => (
                                                            <div>
                                                            {itemsss.course_enrollment_id === items.course_enrollment_id && itemsss.module === items.module && items.type==='PDF' ? (
                                                                <p style={{ color:'rgba(51, 143, 51, 0.969)', fontWeight: 900, fontSize:22 }}>{items.total_count} Challenges</p>
                                                            ) : null}
                                                        </div>
                                                        ))}

                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <button className='btn btn-warning text-white' id="course_mat-tab" data-toggle="tab" href="#course_mat" role="tab" aria-controls="course_mat" aria-selected="false" onClick={() => handleMaterials(itemsss.id, itemsss.course_enrollment_id)} >Materials</button>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <a className='btn btn-success font-weight-bold ml-1 w-100' href="#" data-toggle="modal" data-target="#myModalz" onClick={()=>updateModules(itemsss.id)}>Edit</a>
                                                    </div>
                                                    <div className='col-md-4'>
                                                    <a className='btn btn-danger font-weight-bold ml-1 w-100' href="#" data-toggle="modal" data-target="#myModalzz" onClick={()=>updateModules(itemsss.id)}>Delete</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                ))
                            }
                            
                            
                        </div>
                    </div>

                   
                    
                           
                            
                                   
            </div>

            {/* <--------------------------------------------------------------------Course Materials ---------------------------------------------------> */}

            <div class="tab-pane fade" id="course_mat" role="tabpanel" aria-labelledby="course_mat-tab">

                            <div className='container p-4 mt-3 ' style={{backgroundColor:'#F8F8FF', border:'solid 1px lightgrey'}}>
                                <h2>{ups.course_name}({up.topic_title})</h2>
                            </div>
                            <div className='container p-3' style={{ border:'solid 1px lightgrey'}}>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <p>Module Contents</p>
                                    </div>
                                    <div className='col-md-8 ' >
                                        <div className='inner' style={{ marginLeft:380}}>
                                            <a className='btn btn-success ' href="#" data-toggle="modal" data-target="#myModalmat">+ Create New Video</a>
                                            <a className='btn btn-warning ml-2 text-dark' href="#" data-toggle="modal" data-target="#myModalTask"> + Upload PDF/ Task</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='container p-3' style={{ border:'solid 1px lightgrey'}}>
                                <table class="table table-striped mt-5">
                                    <thead>
                                        <tr>
                                        <th scope="col">#Module</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Thumbnail</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Opeartions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        

                                        {
                                            display.map((it)=>(
                                                <tr className='font-weight-bold'>
                                                    <th scope="row">{it.module}</th>
                                                    <td>{it.video_title}</td>
                                                    <td> <img src={it.Thumbnail} style={{width:65}} className='img-thumbnail'></img></td>
                                                        {it.type ==='video' ?(
                                                                <td className='btn btn-success' style={{padding:2, marginTop:25, borderRadius:5}}>{it.type}</td>
                                                        ):(
                                                            <td className='btn btn-info' style={{padding:2, marginTop:25, borderRadius:5}}>{it.type}</td>
                                                        )}
                                                    
                                                    <td>{it.created_at}</td>
                                                    <td>
                                                        <a className='btn btn-success' href="#" data-toggle="modal" data-target="#myModalEdit" onClick={()=>updateMaterial(it.id)}>Edit</a>&emsp;
                                                        <a className='btn btn-danger' >Delete</a></td>
                                                    

                                                    </tr>

                                            ))
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>

            </div>
            
            

        </div>
    </div>
</div>

   
   


        

    

            {/* Student Modal */}
          





            {showModal && (

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div className='container-fluid'>
                      <form id="myForm" onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Student Name</label>
                                <input type='text' className='form-control' name='Stud_name' onChange={handleInput} />
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Student Mail Id</label>
                                <input type='mail' className='form-control' name="email" onChange={handleInput}/>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Gender</label>
                                <select className='form-control font-weight-bolder' name="gender" onChange={handleInput}>
                                    <option value=''>----- Select Gender ------</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </select>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Student Contact No</label>
                                <input type='text' className='form-control' name="phone" onChange={handleInput}/>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>AddressLine 1</label>
                                <textarea className='form-control'  name="Address_line_1" onChange={handleInput} ></textarea>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>AddressLine 2</label>
                                <textarea className='form-control' name="Address_line_2" onChange={handleInput} ></textarea>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Qualification</label>
                                <input type='text' className='form-control' name="qualification" onChange={handleInput} />
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Percentage</label>
                                <input type='number' className='form-control' name="percent_mark" onChange={handleInput}/>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Username</label>
                                <input type='text' className='form-control' name="username"  onChange={handleInput}/>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Password</label>
                                <input type='password' className='form-control' name="password" onChange={handleInput}/>
                            </div>
                            <div className='col-md-6 pb-2'>
                                <label className='font-weight-bolder'>Student Image</label>
                                <input type='file' className='form-control' name="stud_img" accept='image/*' onChange={handleInputImage}/>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-success mt-3'  style={{marginBottom: 20, marginLeft: 300}}>Enroll Student</button>
                        </form>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>   
    )}   

{showModal && (
    
            <div  className="modal fade" id="myModalz" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" style={{ width: 750 }}>
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Module Update</h1>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                      
                        <div className='container'>
                        
                        <form onSubmit={(e) => updateMod(e, up.id)}>
                            <div className='row'>
                                <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                    <label className='mr-2'>Course Name:</label>
                                    <input type='text' className='form-control' name='course_enrollment_id' value={up.course_enrollment_id} onChange={(event)=>handleInputModule(event, 'course_enrollment_id')} readOnly />
                                </div>
                                <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                    <label className='mr-2'>Module:</label>
                                    <select name='module' className='form-control' value={up.module} onChange={(event)=>handleInputModule(event, 'module')}>
                                        <option className='font-weight-bold' value="1">Module 1</option>
                                        <option className='font-weight-bold' value="2">Module 2</option>
                                        <option className='font-weight-bold' value="3">Module 3</option>
                                        <option className='font-weight-bold' value="4">Module 4</option>
                                        <option className='font-weight-bold' value="5">Module 5</option>
                                        <option className='font-weight-bold' value="6">Module 6</option>
                                        <option className='font-weight-bold' value="7">Module 7</option>
                                        <option className='font-weight-bold' value="8">Module 8</option>
                                        <option className='font-weight-bold' value="9">Module 9</option>
                                        <option className='font-weight-bold' value="10">Module 10</option>

                                    </select>
                                </div>
                                <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                    <label className='mr-2'>Topic Title:</label>
                                    <input type='text' className='form-control' name='topic_title' value={up.topic_title} onChange={(event)=>handleInputModule(event, 'topic_title')} />
                                </div>
                                <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                    <label className='mr-2'>Topic Details:</label>
                                    <input type='text' className='form-control' name='topic_details' value={up.topic_details} onChange={(event)=>handleInputModule(event, 'topic_details')} />
                                </div>
                            </div>
                            <button type="submit" className='btn btn-primary ' style={{margin:'20px 20px 20px 270px'}}>Update Module</button>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                    {showModal &&<button type="button" class="btn btn-secondary">Close</button>}
                        
                    </div>
                    </div>
                </div>
            </div>  
       
    
)}   



{/* -------------------------------------------------------------------------Delete Module  Modals ----------------------------------------- */}

{showModal && (
    
    <div  className="modal fade" id="myModalzz" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog " >
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title " id="exampleModalLabel">Module Update</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="modal-body">
              
            <p className='font-weight-bolder'> Are you want to delete {up.topic_title} !</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" onClick={()=>{handleDelete(up.id)}}>Delete</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                
            </div>
            </div>
        </div>
    </div>  


)}   


{/* --------------------------------------------------------------Module Material ------------------------------------- */}
{showModal && (
    
    <div  className="modal fade" id="myModalmat" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" >
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title font-weight-bolder font-italic " id="exampleModalLabel">Material Upload</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="modal-body">
                <div className='container-fluid'>
                 <form onSubmit={handleMaterialSubmit}> 
                        <div className='row'>
                            <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                <label className='font-weight-bold'>Course Id:</label>
                                <input type='text' className='form-control' name='course_enrollment_id' value={ups.course_enrollment_id}  onChange={handleMaterialss} readOnly></input>
                            </div>
                            <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                <label className='font-weight-bold' >Module:</label>
                                <input type='text' name='module' value={up.module} className='form-control ml-1' onChange={handleMaterialss} readOnly></input>
                            </div>
                            <div className='col-md-6 mt-2' style={{  display: 'flex', alignItems: 'center' }}>
                                <label className='font-weight-bold' >Video Title:</label>
                                <input type='text' name='video_title' className='form-control ml-1 text-center' placeholder='Video Title' onChange={handleMaterialss}></input>
                            </div>
                            <div className='col-md-6 mt-2' style={{  display: 'flex', alignItems: 'center' }}>
                                <label className='font-weight-bold' >Video Url:</label>
                                <input type='text' name='video_url' className='form-control ml-1 text-center' placeholder='Enter Video Url' onChange={handleMaterialss}></input>
                            </div>
                            <div className='col-md-6 mt-2' >
                            <div className="container con">
                                {imageSrc && (
                                    <img
                                    id="file-ip-1-preview"
                                    src={imageSrc}
                                    style={{ width: 150, height: 220 }}
                                    />
                                )}
                                <label htmlFor="file-ip-1" className="up_label">
                                    <img src={Upload} className="up_img" style={{ width: 30 }} />
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="file-ip-1"
                                    name="Thumbnail"
                                    accept="image/*"
                                    onChange={(event) => showPreview(event)}
                                    hidden
                                />
                                </div>
                            </div>
                            <div className='col-md-6 mt-2' style={{  display: 'flex', alignItems: 'center' }}>
                            
                            </div>
                        </div>

                        <button type='submit' className='btn btn-success' style={{marginLeft:300, marginTop:20}}>Upload Details</button>
                    </form>    
                </div>
              
            <p className='font-weight-bolder'></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  data-dismiss="modal" aria-label="Close">Close</button>
            </div>
            </div>
        </div>
    </div>  
)} 

        <div  className="modal fade" id="myModalEdit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" style={{ width: '700px' }}>
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title " id="exampleModalLabel">Material Update</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <div className='container-fluid'>
                            <form onSubmit={(e)=>handleMaterialSubmits(e, materialUpdate.id )}  > 
                                <div className='row'>
                                    <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                        <label className='font-weight-bold'>Course Id:</label>
                                        <input type='text' className='form-control' name='course_enrollment_id' value={materialUpdate.course_enrollment_id} onChange={(event)=>handleMaterialUpdate(event, 'course_enrollment_id')} ></input>
                                    </div>
                                    <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                        <label className='font-weight-bold'>Module:</label>
                                        <input type='text' className='form-control' name='module' value={materialUpdate.module} onChange={(event)=>handleMaterialUpdate(event, 'module')}></input>
                                    </div>
                                    <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                        <label className='font-weight-bold'>Video Title:</label>
                                        <input type='text' className='form-control' name='video_title' value={materialUpdate.video_title} onChange={(event)=>handleMaterialUpdate(event, 'video_title')}></input>
                                    </div>
                                    <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                        <label className='font-weight-bold'>Video URL:</label>
                                        <input type='text' className='form-control' name='video_url' value={materialUpdate.video_url} onChange={(event)=>handleMaterialUpdate(event, 'video_url')}></input>
                                    </div>
                                    <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                        <label className='font-weight-bold'>Video Thumbnail:</label>
                                        <img src={materialUpdate.Thumbnail} style={{width:50}} className='img-thumbnail'></img>
                                        <input type='file' className='form-control' name='Thumbnail' onChange={handleThumbnail} ></input>
                                    </div>
                                </div>    
                                <button type='submit' className='btn btn-primary' style={{margin:'20px 0px 0px 220px'}}>Update Materials</button>
                            </form>   
                        </div>     
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Close</button>
                        
                    </div>
                    </div>
                </div>
            </div> 


            <div  className="modal fade" id="myModalTask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg " style={{ width: '600px' }}>
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title font-weight-bolder font-italic" id="exampleModalLabel">Challenge Upload</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <form onSubmit={handleMaterialPdf}>
                    <div class="modal-body">

                        <div className='container-fluid'>
                            <div className='row'>
                                    <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                        <label className='font-weight-bold'>Course Id:</label>
                                        <input type='text' className='form-control' name='course_enrollment_id' value={ups.course_enrollment_id} readOnly onChange={handleMaterialss} ></input>
                                    </div>
                                    <div className='col-md-6' style={{  display: 'flex', alignItems: 'center' }}>
                                        <label className='font-weight-bold'>Module:</label>
                                        <input type='text' className='form-control' name='module' value={up.module} readOnly  onChange={handleMaterialss}></input>
                                    </div>
                                    
                                        <label className='font-weight-bold pt-2'>Document Title:</label>
                                        <input type='text' className='form-control' name='video_title' onChange={handleMaterialss}></input>

                                        <label className='font-weight-bold pt-2'>Thumbnail:</label>
                                        <input type='file' className='form-control' name='Thumbnail' id='fileInput1' onChange={showPdf}></input>


                                        
                                        <label className='font-weight-bold'>Select a file...</label>
                                        <input type='file' className='form-control' name='pdf' id="fileInput2" style={{border: 'solid 0px black'}} onChange={showPdf}></input>

                                    
                            </div>
                        </div>
                    
                    
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        
                    </div>
                    </form>
                    </div>
                </div>
            </div>  
    </>
  )
}

export default Admin