"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alquran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alquran.belongsTo(models.Santri, { foreignKey: "santriId" });
    }
  }
  Alquran.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      juz: DataTypes.STRING,
      surah: DataTypes.STRING,
      ayat: DataTypes.STRING,
      tgl_selesai: DataTypes.DATE,
      santriId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Alquran",
    }
  );
  return Alquran;
};
