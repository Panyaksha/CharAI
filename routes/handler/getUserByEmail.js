const {User} = require('../../models');

module.exports = async (req, res) => {
    const schema = {
        email: "email|empty:false",
    };
    
    const users = await User.findOne({
        where: {email: req.body.email}
    });

    return res.status(200).json({
        status: 'berhasil',
        message: {
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            avatar: users.avatar,
            profession: users.profession,
        }
    });
}