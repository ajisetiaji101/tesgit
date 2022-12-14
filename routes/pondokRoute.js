const { PondokController } = require("../controller");
const route = require("express").Router();
const { uploadMultipleFile } = require("../middleware/uploadFile");

route.get("/", PondokController.getPondoks);
route.post("/", uploadMultipleFile, PondokController.createPondok);
route.put("/:id", uploadMultipleFile, PondokController.updatePondok);
route.get("/:id", PondokController.getPondok);
route.delete("/:id", PondokController.deletePondok);
route.put("/data/:id", PondokController.updatePondokNoFile);

module.exports = route;
