const { Op } = require('sequelize')
const User = require('../models/User')

module.exports = {
    async show(req, res) {
        //Encontrar todos os usarios que tem no email @outlook.com;
        //Desses usuarios buscar todos que moram na rua "Av Gustavo Adolfo"
        //Buscar techs com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.like]: '%@outlook.com'
                }
            },
            include: [
                { association: 'addresses', where: { street: 'Av Gustavo Adolfo' } },
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.like]: 'React%'
                        }
                    }
                }
            ]
        })

        return res.json(users)
    }
}