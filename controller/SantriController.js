const { Santri } = require("../models");
const uuid = require("uuid");

class SantriController {
  static async getSantris(req, res) {
    const newData = await Santri.findAll({
      include: [
        {
          all: true,
        },
      ],
    });
    res.status(200).json({ data: newData });
  }

  static async getSantri(req, res) {
    try {
      const { id } = req.params;

      const newData = await Santri.findOne({
        where: { id },
        include: [{ all: true }],
      });

      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(400).json({ data: "Data tidak ditemukan" });
    }
  }

  static async createSantri(req, res) {
    try {
      const { files, fields } = req.fileAttrb;
      const payload = {
        id: uuid.v4(),
        name: fields[0].value,
        nis: fields[1].value,
        address: fields[2].value,
        datebirth: fields[3].value,
        gender: fields[4].value,
        education: fields[5].value,
        city: fields[6].value,
        province: fields[7].value,
        parent: fields[8].value,
        telephone: fields[9].value,
        tgl_masuk: fields[10].value,
        pondokId: fields[11].value,
        photo: files[0].file.newFilename,
      };

      const newData = await Santri.create(payload);
      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  static async updateSantri(req, res) {
    try {
      const { files, fields } = req.fileAttrb;
      const { id } = req.params;

      const payload = {
        name: fields[0].value,
        nis: fields[1].value,
        address: fields[2].value,
        datebirth: fields[3].value,
        gender: fields[4].value,
        education: fields[5].value,
        city: fields[6].value,
        province: fields[7].value,
        parent: fields[8].value,
        telephone: fields[9].value,
        tgl_masuk: fields[10].value,
        pondokId: fields[11].value,
        photo: files[0].file.newFilename,
      };

      const newData = await Santri.update(payload, {
        where: { id },
        returning: true,
      });
      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(404).json({ data: "Pastikan Semua data benar" });
    }
  }

  static async updateSantriNoFile(req, res) {
    try {
      const {
        name,
        nis,
        datebirth,
        gender,
        education,
        city,
        province,
        address,
        parent,
        telephone,
        tgl_masuk,
        pondokId,
      } = req.body;

      const payload = {
        name,
        nis,
        datebirth,
        gender,
        education,
        city,
        province,
        address,
        parent,
        telephone,
        tgl_masuk,
        pondokId,
      };

      const newData = await Santri.update(payload, {
        returning: true,
        where: { id: req.params.id },
      });
      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(404).json({ data: "Pastikan Semua data benar" });
    }
  }

  static async deleteSantri(req, res) {
    try {
      const deleteData = await Santri.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ data: deleteData });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }
}

module.exports = SantriController;
