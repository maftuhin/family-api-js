const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false
    },
  );
}