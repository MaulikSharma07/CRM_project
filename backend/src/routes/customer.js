const express = require("express");
const authenticate = require("../middleware/auth");
const withTenant = require("../../utils/withTenant");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const customers = await withTenant(
      req.user.tenantId,
      async (tx) => {
        return tx.customer.findMany();
      }
    );

    res.json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
});

module.exports = router;