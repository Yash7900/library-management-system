const express = require("express");
const {
  borrowBook,
  returnBook,
  renewBook,
  getMyBorrows,
} = require("../controllers/borrow.controller");

const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/my", authenticate, getMyBorrows);
router.post("/", authenticate, borrowBook);
router.post("/return", authenticate, returnBook);
router.post("/renew", authenticate, renewBook);

module.exports = router;
