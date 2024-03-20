import React , {useState} from 'react'
import { toast } from "react-toastify";
import axios from 'axios';
import Brand from './images/brand.png';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({});
    function getDate() {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        const date = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${date}`;
      }

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
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Entered Value is", formData);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/create_stud/', formData);
    
            if (response.status === 201) {
                toast.success("Student Enrolled Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
                e.target.reset();
                navigate('/login')
            }
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };
    
  return (
   <>
        <div className='container p-3 m-3'>

            <div className='row'>
                <div className='col-md-6'>
                    <img src = {Brand}></img>
                </div>
                <div className=' col-md-6' style={{border: 'solid 1px lightgrey'}}>
                <form id="myForm" onSubmit={handleSubmit}>
                        <div className='row p-3'>
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
                      
        </div>
   </>
  )
}

export default Register
