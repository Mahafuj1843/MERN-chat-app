import User from "../models/User.js"

export const allUser = async (req, res, next) =>{
   if(req.query.search){
    const keword = req.query.search ? {
        $or : [
            { firstname: {$regex: req.query.search, $options: 'i'}},
	    { lastname: {$regex: req.query.search, $options: 'i'}},
        ]
    } : {}

    const users = await User.find(keword).find({ _id: { $ne: req.user.id}})

    if(users) res.status(200).send(users)
    else res.status(404).send('User not found.')
    }else{
	res.status(200).send([])
    }
}