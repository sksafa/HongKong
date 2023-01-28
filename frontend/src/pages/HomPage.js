import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout'
import AddSectors from './AddSectors'
import UserSectorInfo from './UserSectorInfo';

const HomPage = () => {
  const { id } = useParams();
  const [userInfoData, setUserInfoData] = useState([])

  const [user, setUser] = useState("")

  useEffect(() => {
    getUserInfos()
      const data = localStorage.getItem('user')
      const LoginUser = (JSON.parse(data))
      setUser(LoginUser?._id)
  }, [])

  const getUserInfos = async () => {
    const { data } = await axios.get(`/api/v1/userInfo/userInfos`)
    setUserInfoData(data)
}


  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <AddSectors id={id} getUserInfos={getUserInfos} />
          </div>
          <div className="col-md-6 col-sm-12">
            <UserSectorInfo userInfoData={userInfoData}  user={user} getUserInfos={getUserInfos} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomPage