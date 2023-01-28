const userInfoModel = require('../models/userInfoModel')

//post userInfo
const userInfoPostController = async (req, res) => {
    try {
        const newUserInfo = new userInfoModel(req.body);
        const userInfo = await newUserInfo.save();
        res.status(200).json({ userInfo });
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error , Try again')
    }
}

//get userInfo
const getUserInfoController = async (req, res) => {
    try {
        const data = await userInfoModel
            .find({})
            .populate("sector", "_id name value")
            .populate("user", "_id name")
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
};

//get single userInfo
const singleUserInfoController = async (req, res) => {
    try {
        const data = await userInfoModel.findById(req.params.id)
        .populate("sector", "_id name value")
        .populate("user", "_id name");
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

//update single userInfo
const updateUserInfoController = async (req, res) => {
    try {
        const data = await userInfoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(data);
    } catch (error) {
        console.log(error)
    }
}


 const deleteUserInfoController = async(req, res)=>{
    const id= req.params.id
    try {
         const data = await userInfoModel.findByIdAndDelete(id)
         res.status(201).json({ok:true});
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    userInfoPostController,
    getUserInfoController,
    updateUserInfoController,
    singleUserInfoController,
    deleteUserInfoController
}