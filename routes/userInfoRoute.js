const express = require('express');
const { userInfoPostController,
    getUserInfoController,
    singleUserInfoController,
    updateUserInfoController,
    deleteUserInfoController
} = require('../controllers/userInfoController');

const router = express.Router();
router.post('/userInfos', userInfoPostController)
router.get('/userInfos', getUserInfoController)
router.get('/userInfos/:id', singleUserInfoController)
router.put('/updateUserInfos/:id', updateUserInfoController)
router.delete('/deleteUserInfos/:id', deleteUserInfoController)

module.exports = router