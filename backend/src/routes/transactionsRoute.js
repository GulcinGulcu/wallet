import express from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  getSummary,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", createTransaction);

router.get("/:userId", getTransactions);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummary);

export default router;
