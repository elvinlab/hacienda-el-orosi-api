const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middelewares/Validate-fields");

const md_auth = require("../middelewares/Authenticated");
const router = Router();

const {
  registrerTool,
  getTools,
  changeStatus,
  getToolsByStatus,
} = require("../controllers/Tool.js");

router.post(
  "/registrar",
  [
    check("name", "Nombre de la herramienta requerido").not().isEmpty(),
    validate_fields,
  ],
  md_auth.authenticated,
  registrerTool
);
router.put(
  "/cambiar-estado/:id",
  [check("status", "estado no recibido").not().isEmpty(), validate_fields],
  md_auth.authenticated,
  changeStatus
);
router.get("/registradas/:page?", md_auth.authenticated, getTools);
router.get(
  "/ver/:status",
  md_auth.authenticated,
  getToolsByStatus
);

module.exports = router;