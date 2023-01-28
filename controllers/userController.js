const userModel = require('../models/userModel')

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password })
        if (!user){
            return res.status(404).send('User Not Found');
        }
        res.status(200).json({
            success:true,
            user,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error , Try again')
    }

}

const registerController = async(req, res) => {
    try {
        const newUser = new userModel(req.body);
       const user = await newUser.save();
        res.status(200).json({ user});
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error , Try again')
    }

}

module.exports = { loginController, registerController }