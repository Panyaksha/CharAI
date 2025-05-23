const { User } = require('../../models');

module.exports = async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(400).json({
                status: 'gagal',
                message: 'Parameter email diperlukan'
            });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                status: 'gagal',
                message: 'User tidak ditemukan'
            });
        }

        return res.status(200).json({
            status: 'berhasil',
            message: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                profession: user.profession,
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'gagal',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};
