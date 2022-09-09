const { Guru } = require("../models");
const uuid = require("uuid");

class GuruController {
  static async getGurus(req, res) {
    try {
      const data = await Guru.findAll({
        include: [
          {
            all: true,
          },
        ],
      });
      res.status(200).json({ data });
    } catch (error) {
      return res.status(404).json({ data: "no data found" });
    }
  }

  static async createGuru(req, res) {
    try {
      const id = uuid.v4();
      const { name, nis, email, datebirth, gender, telephone, education, address, photo, pondokId } = req.body;

      const payload = {
        id,
        name,
        nis,
        email,
        datebirth,
        gender,
        telephone,
        education,
        address,
        photo,
        pondokId,
      };

      const newData = await Guru.create(payload);
      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(404).json({ data: "Pastikan data terisi dengan benar" });
    }
  }

  static async updateGuru(req, res) {
    try {
      const { name, nis, email, datebirth, gender, telephone, education, address, photo, pondokId } = req.body;

      const payload = {
        name,
        nis,
        email,
        datebirth,
        gender,
        telephone,
        education,
        address,
        photo,
        pondokId,
      };

      const newData = await Guru.update(payload, { returning: true, where: { id: req.params.id } });
      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(404).json({ data: "Pastikan Semua data benar" });
    }
  }

  static async deleteGuru(req, res) {
    try {
      const deleteData = await Guru.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json("delete data" + deleteData + "successfully");
    } catch (error) {
      return res.status(404).json({ data: "pastikan id data benar" });
    }
  }
}

module.exports = GuruController;
