const bcrypt = require('bcrypt');
const {User} = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

//Schema Validator
module.exports = async (req, res) =>{
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        pass: 'string|min:6',
        role: {
            type: 'enum',
            values: ['admin', 'operator'],
            empty: false
        },
        avatar: 'string|optional',
        profession: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    //jika length == 1 berarti ada error
    if (validate.length){
        return res.status(200).json(
            {
                status: 'error',
                message: validate
            });
    }

    const user = await User.findOne(
        {
            where: {email: req.body.email},
            attibutes: ['id','name','email']
        });

    if (user){
        return res.status(200).json({
            status:'error',
            message:'email already exist'
        });
    }

    const password = await bcrypt.hash(req.body.pass,10);

    const data = {
        pass: password,
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        avatar:req.body.avatar,
        profession: req.body.profession
    }

    const createdUser = await User.create(data);

    return res.json({
        status:'success',
        data:{
            id: createdUser.id
        }
    });
}