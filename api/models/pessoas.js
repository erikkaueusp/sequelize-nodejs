'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pessoas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // models.Matriculas.addScope('confirmado', {
            //     where: {
            //         status: 'confirmado'
            //     }
            // })

            Pessoas.hasMany(models.Turmas, {
                foreignKey: 'docente_id'
            })
            Pessoas.hasMany(models.Matriculas, {
                foreignKey: 'estudante_id',
                scope: { status: 'confirmado' }, //usando mixins
                as: 'aulasMatriculadas'
            })


            // Pessoas.hasMany(models.Matriculas.scope('confirmado'), { as: 'aulasMatriculadas' });
        }
    }
    Pessoas.init({
        nome: {
            type: DataTypes.STRING,
            validate: {
                funcaovalida: function(data) {
                    if (data.length < 3) throw new Error('Campo nome deve ser maior que 3 caracteres')
                }
            }
        },
        ativo: DataTypes.BOOLEAN,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Email inválido."
                }
            }
        },
        role: DataTypes.STRING
    }, {
        sequelize,
        paranoid: true,
        modelName: 'Pessoas',
        defaultScope: {
            where: {}
        },
        scopes: {
            onlyAtivoTrue: { where: { ativo: true } }
            //name: { constraint: valor}
        },

    });
    return Pessoas;
};