const { Surahpendeksantri, Pondok, sequelize } = require("../models");
const uuid = require("uuid");
const { QueryTypes } = require("sequelize");

class SurahPendekController {
  static async getSurahPendeks(req, res) {
    try {
      const { id } = req.params;
      const data = await Surahpendeksantri.findAll({
        where: { santriId: id },
        order: [["id", "DESC"]],
        include: [{ all: true }],
      });
      res.status(200).json({ data });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  static async listSurahPendekAwal(req, res) {
    try {
      const data = await sequelize.query(
        "SELECT santris.name as namasantri, test.*, pondoks.name as namapondok FROM (SELECT * FROM surahpendeksantris ORDER BY surahpendeksantris.id DESC LIMIT 18446744073709551615)AS test JOIN santris ON santris.id=test.santriId JOIN pondoks ON pondoks.id=santris.pondokId GROUP BY santriId",
        {
          model: Surahpendeksantri,
          type: QueryTypes.SELECT,
          mapToModel: true,
          nest: true,
          raw: true,
        }
      );
      res.status(200).json({ data });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  static async getSurahPendek(req, res) {
    try {
      const { id } = req.params;
      const data = await Surahpendeksantri.findOne({
        where: { id },
        include: [{ all: true, include: { model: Pondok } }],
      });
      res.status(200).json({ data });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  static async createSurahPendek(req, res) {
    try {
      const { name, tgl_selesai, santriId, ket } = req.body;

      const payload = {
        name,
        tgl_selesai,
        santriId,
        ket,
      };

      const newData = await Surahpendeksantri.create(payload);
      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  static async updateSurahpendek(req, res) {
    try {
      const { name, tgl_selesai, santriId } = req.body;

      const payload = {
        name,
        tgl_selesai,
        santriId,
      };

      const newData = await Surahpendeksantri.update(payload, {
        returning: true,
        where: { id: req.params.id },
      });
      res.status(200).json({ data: newData });
    } catch (error) {
      return res.status(404).json({ data: "Pastikan Semua data benar" });
    }
  }

  static async deleteSurahpendek(req, res) {
    try {
      const deleteData = await Surahpendeksantri.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json("delete data" + deleteData + "successfully");
    } catch (error) {
      return res.status(404).json({ data: "pastikan id data benar" });
    }
  }
}

module.exports = SurahPendekController;
