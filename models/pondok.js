"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pondok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pondok.hasMany(models.Santri);
      Pondok.hasMany(models.Guru);
    }
  }
  Pondok.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      no: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      chief: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pondok",
    }
  );
  return Pondok;
};
