import React, {useEffect, useState} from 'react'
import './css/stud_styles.css';
import Logo from './images/LogoE.png';
import './css/progress.css';
import { useParams } from 'react-router-dom';

function Student(props) {
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    useEffect(() => {
        // Define the first API URL with the username parameter
        const firstApiUrl = `http://127.0.0.1:8000/stud_detail/${username}`;
      
        // Make the first API request
        fetch(firstApiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data); // Add this line for debugging
            setUserData(data); // Store the first user data object in state
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
          
        // Define the second API URL (replace 'secondUsername' with the actual parameter)
        
          
         
         
      
          // Make the second API request
          
      
      }, [username]);
    
    

    useEffect(() => {
        function percentageToDegrees(percentage) {
          return percentage / 100 * 360;
        }
    
        document.querySelectorAll(".progress").forEach(progress => {
          const value = parseFloat(progress.getAttribute('data-value'));
          const left = progress.querySelector('.progress-left .progress-bar');
          const right = progress.querySelector('.progress-right .progress-bar');
    
          if (value > 0) {
            if (value <= 50) {
              right.style.transform = `rotate(${percentageToDegrees(value)}deg)`;
            } else {
              right.style.transform = 'rotate(180deg)';
              left.style.transform = `rotate(${percentageToDegrees(value - 50)}deg)`;
            }
          }
        });
      }, []);
  return (
    <>
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-light shadow-sm " style={{height:90}}>
            <a class="navbar-brand font-weight-bolder" style={{color:'black'}} href="index.html">E-LEARNING</a>
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
            <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div className='Logo' style={{marginTop:-10}}>
                        <img src={Logo} style={{width:200}}></img>
                        <h5 style={{margin:'-50px 10px 20px 20px'}}>{username}</h5>
                        <div className='container-fluid'>
                            <div className='row text-center' style={{color:'grey'}}>
                                <div className='col-md-5    '>
                                    <p>0</p>
                                    <p>Programs</p>
                                </div>
                                <div className='col-md-5'>
                                    <p className='font-weight-bold'>0</p>
                                    <p>Task</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="nav" style={{fontSize:14}}>
                        
                        <a class="nav-link " id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"  aria-selected="true">
                            <div class="sb-nav-link-icon"><i class="fa fa-tachometer" aria-hidden="true"></i></div>
                            Dashboard
                        </a>
                    
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                <p > <i class="fa fa-briefcase" aria-hidden="true"></i>&nbsp; My Courses</p>
                            
                        </a>
                        <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link " id="social-tab" data-toggle="tab" href="#social" role="tab" aria-controls="social" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                    Add Enrollments
                                </a>
                                <a class="nav-link" id="enrolled-tab" data-toggle="tab" href="#enrolled" role="tab" aria-controls="enrolled" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                    Enrolled Students
                                </a>
                                            
                            </nav>
                        </div>

                        


                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePagess" aria-expanded="false" aria-controls="collapsePagess" style={{marginTop:-25}}>
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                <p > <i class="fa fa-bell" aria-hidden="true"></i>&nbsp; Notifications</p>
                         
                        </a>
                        <div class="collapse" id="collapsePagess" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link"  id="course_det-tab" data-toggle="tab" href="#course_det" role="tab" aria-controls="course_det" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                    Notifications
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


                    

                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAssess" aria-expanded="false" aria-controls="collapseAssess" style={{marginTop:-25}}>
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            <p> <i class="fa fa-unlock-alt" aria-hidden="true"></i>&nbsp; Reset Password</p>
                 
                        </a>
                        <div class="collapse" id="collapseAssess" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link"  id="assessment-tab" data-toggle="tab" href="#assessment" role="tab" aria-controls="assessment" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                    Create Assessments
                                </a>
                                <a class="nav-link"  id="assess_quest-tab" data-toggle="tab" href="#assess_quest" role="tab" aria-controls="assess_quest" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                    Add Questions
                                </a>
                                <a class="nav-link" id="questions-tab" data-toggle="tab" href="#questions" role="tab" aria-controls="questions" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                    Questions
                                </a> 
                                            
                            </nav>
                        </div>



                    

                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseFaculty" aria-expanded="false" aria-controls="collapseAssess" style={{marginTop:-25}}>
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            <p> <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Logout</p>
                            
                        </a>
                        <div class="collapse" id="collapseFaculty" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link"  id="faculty-tab" data-toggle="tab" href="#faculty" role="tab" aria-controls="faculty" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                    Faculty Details
                                </a>
                                <a class="nav-link"  id="facultyAdd-tab" data-toggle="tab" href="#facultyAdd" role="tab" aria-controls="facultyAdd" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                    Add Faculty
                                </a>
                                <a class="nav-link" id="questions-tab" data-toggle="tab" href="#questions" role="tab" aria-controls="questions" aria-selected="false">
                                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                    Questions
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
                
                <h6 className='p-4'>Dashboard</h6>

                <p className='ml-4 ' style={{fontWeight:900, fontSize:25, color:'#66ccff',fontFamily:'monospace'}}>Haii, E-Learning Certified Intern</p>
                
                <div className='container' >
                    <div className='row' >
                        <div className='col-md-4'>
                            <div class="card shadow" style={{width: '18rem' ,borderRadius:20}}>
                                <div class="card-body">
                                    <h6 class="card-title text-center font-weight-bold">Program Progress</h6>
                                    <div class="row d-flex justify-content-center ">

                                        <div class="col-md-6">



                                            <div class="progress" style={{marginLeft:-20}} data-value='80'>
                                                <span class="progress-left">
                                                                <span class="progress-bar border-primary"></span>
                                                </span>
                                                <span class="progress-right">
                                                                <span class="progress-bar border-primary"></span>
                                                </span>
                                                <div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                                    <div class="h2 font-weight-bold">80<sup class="small">%</sup></div>
                                                </div>
                                            </div>
                                            <hr style={{width:250, marginLeft:-70}} />
                                            <div style={{  display: 'flex', alignItems: 'center' }}>
                                          
                                            <h6>Program Name</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8' style={{marginLeft:-50}}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-6 p-2'>
                                        
                                        <div class="card shadow" style={{borderRadius:20}} >
                                            <div class="card-body">
                                                <h5 class="card-title">Card title</h5>
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                                
                                              
                                            </div>
                                        </div>




                                      
                                    </div>
                                    <div className='col-md-6 p-2'>
                                        <div class="card shadow" style={{borderRadius:20}} >
                                            <div class="card-body">
                                                <h5 class="card-title">Card title</h5>
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                               
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-6 p-2'>
                                        <div class="card shadow" style={{borderRadius:20}} >
                                            <div class="card-body">
                                                <h5 class="card-title">Card title</h5>
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                           
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-6 p-2'>
                                        <div class="card shadow" style={{borderRadius:20}} >
                                            <div class="card-body">
                                                <h5 class="card-title">Card title</h5>
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                           
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>    
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>





        


    </>
  )
}

export default Student
