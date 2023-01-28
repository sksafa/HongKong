import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi';
import { HiOutlineEye } from 'react-icons/hi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UserSectorInfo = ({userInfoData, user, getUserInfos}) => {

    const handleDelete = async (id) => {
        try {
           
            const { data } = await axios.delete(`/api/v1/userInfo/deleteUserInfos/${id}`);
            toast.success("Data Deleted Successfully");
            getUserInfos()
        } catch (error) {
            toast.error(error);
        }
    }
    
    return (
        <div className='m-5 bg-light p-4' style={{overFlow:"scroll"}}>
            <h6 className='text-center mb-2'>List of User Infos with Sector </h6>
            <div className="table-responsive">
                <table className="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Sector</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfoData && userInfoData.map(data =>
                            <tr key={data._id}>
                                <td>{data.name}</td>
                                <td>{data?.sector?.name}</td>
                                <td>
                                    <span className='text-success'>
                                        <HiOutlineEye />
                                    </span>

                                    {user && user === data?.user?._id && (
                                        <>
                                            <Link className='text-primary p-2' to={`/${data._id}`}>
                                                <FiEdit />
                                            </Link>
                                            <span className='text-danger' onClick={() => handleDelete(data._id)} style={{cursor:'pointer'}}>
                                                <RiDeleteBinLine />
                                            </span>
                                        </>
                                    )}

                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default UserSectorInfo