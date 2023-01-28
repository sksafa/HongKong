import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (name === '') {
                toast.error("Name not be empty")
            } else if (email === '') {
                toast.error("email not be empty")
            } else if (password === '') {
                toast.error("password not be empty")
            } else {
                const { data } = await axios.post("/api/v1/users/register", {
                    name, email, password,
                })
                toast.success('Registered Successfully')
                setTimeout(() => navigate("/login"), 1000);


            }
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <div className="container">
            <div className='row mt-5'>
                <div className="col-md-3 col-sm-12"></div>
                <div className='col-md-6 col-sm-12 '>
                    <div className='bg-light p-3 mt-5'>
                        <h3 className='pt-4 mb-3'>Register Now </h3>
                        <form >
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="name" className="form-control" onChange={(e) => setName(e.target.value)} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                            </div>
                            <div className='d-flex flex-row'>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                    Submit
                                </button>
                                <p className='m-3'> Are You Already register ?<span className='text-success'> <Link to="/login">Go to Login </Link></span></p>

                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-3 col-sm-12"></div>
            </div>
        </div>
    )
}

export default Register