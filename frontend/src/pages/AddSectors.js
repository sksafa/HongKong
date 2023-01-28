import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSectors = ({id, getUserInfos}) => {
    const [name, setName] = useState("")
    const [sector, setSectorId] = useState("")
    const [active, setActive] = useState("")
    const [user, setUser] = useState("")
    const [singleUserInfo, setSingleUserInfo] = useState({})
    const [sectorName, setSectorName] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getSectors()
        const data = localStorage.getItem('user')
        const LoginUser = (JSON.parse(data))
        setUser(LoginUser?._id)

        if (id) {
            getSingleUserInfos()
        }
    }, [id])

    const getSectors = async () => {
        const { data } = await axios.get("/api/v1/sector/sectors")
        setSectorName(data.data)
    }

    const getSingleUserInfos = async () => {
        const { data } = await axios.get(`/api/v1/userInfo/userInfos/${id}`)
        setName(data.name)
        setSectorId(data.sector._id)
        setActive(data.active)
        setSingleUserInfo(data.sector.name)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (name === '') {
                toast.error("Name not be empty")
            } else if (sector === '') {
                toast.error("Sector Name not be empty")
            } else if (active === '') {
                toast.error("Click to agree")
            } else {
                if(id){
                    const { data } = await axios.put(`/api/v1/userInfo/updateUserInfos/${id}`, {
                        name, sector, active, user
                    })
                    toast.success('Updated Successfully')
                    setName('')
                    setSectorId('')
                    setActive('')
                    setSingleUserInfo('')
                    getUserInfos()
                    setTimeout(() => navigate("/"), 1000);
                }else{
                    const { data } = await axios.post(`/api/v1/userInfo/userInfos`, {
                        name, sector, active, user
                    })
                    toast.success('Added Successfully')
                    getUserInfos()
                    setName('')
                    setSectorId('')
                    setActive('')
                    setTimeout(() => navigate("/"), 1000);
                }
            }
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    return (
        <div className='m-5 bg-light p-4'>
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
                    <input type="name" value={name} className="form-control" onChange={(e) => setName(e.target.value)} aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Select Sector Name</label>
                    <select className="form-select" aria-label="Default select example" name="sector" onChange={(e) => setSectorId(e.target.value)}>
                        <option value=''>{id ? `${singleUserInfo}` : 'Select'}</option>
                        {sectorName && sectorName.map(sectorData => <option value={sectorData?._id} key={sectorData?._id}>{sectorData?.name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <input className="form-check-input" name="active" type="checkbox" value="true" id="flexCheckDefault" onChange={(e) => setActive(e.target.value)} />
                    <label className="form-check-label ms-2" for="flexCheckDefault">
                        Agree to terms
                    </label>
                </div>

                <div className='d-flex flex-row'>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        {id ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddSectors
