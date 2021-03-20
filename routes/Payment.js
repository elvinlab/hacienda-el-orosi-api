const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middelewares/Validate-fields");

const md_auth = require("../middelewares/Authenticated");
const router = Router();

const {
  registerSalaryCollaborator,
  paymentsByCollaborator,
  getPayments,
  registerPresence,
  getDayPendingByCollaborator,
} = require("../controllers/Payment.js");

router.post(
  "/realizar/pago/colaborador/:id",
  [check("paymentReg", "Faltan datos").not().isEmpty(), validate_fields],
  md_auth.authenticated,
  registerSalaryCollaborator
);
router.post(
  "/registrar/dia-laboral/:id",
  md_auth.authenticated,
  registerPresence
);

router.get(
  "/pagos/colaborador/:id/:page?",
  md_auth.authenticated,
  paymentsByCollaborator
);
router.get("/pagos/realizados/:page?", md_auth.authenticated, getPayments);
router.get(
  "/colaborador/dias-pendientes/:id",
  md_auth.authenticated,
  getDayPendingByCollaborator
);

module.exports = router;
