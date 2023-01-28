const sectorsModel = require('../models/sectorsModel')

const sectorsPostController = async(req, res) => {
    try {
        const newSectors = new sectorsModel(req.body);
       const sectors = await newSectors.save();
        res.status(200).json({ sectors});
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error , Try again')
    }

}

const sectorsGetController = async(req, res) => {
    try {
        const data = await sectorsModel.find({})
        res.status(200).json({ data});
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error , Try again')
    }

}

module.exports = { sectorsPostController,sectorsGetController }