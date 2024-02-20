
const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Template extends Model {
    }

    Template.init({
        create_user_id: {
            type: DataTypes.INTEGER,
        },
        create_system_type: {
            type: DataTypes.TINYINT,
        },
        update_user_id: {
            type: DataTypes.INTEGER,
        },
        update_system_type: {
            type: DataTypes.TINYINT,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        }
    }, {
        sequelize,
        modelName: 'Template',
        tableName: 'templates',
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'update_date',
    });

// Đồng bộ model với database
    return Template
}
