// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    contact:{
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [10, 10],
    }
  },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
  });

  return User;
};
