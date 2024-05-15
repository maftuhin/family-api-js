const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('people',
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      father: {
        type: DataTypes.STRING
      },
      mother: {
        type: DataTypes.STRING
      },
      spouse: {
        type: DataTypes.STRING
      },
    },
    {
      timestamps: false
    },
  );
}