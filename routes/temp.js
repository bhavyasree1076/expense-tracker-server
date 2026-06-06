const express = require("express");

const Expense = require("../models/Expense");

const auth = require("../middleware/authMiddleware");

const router = express.Router();


// Add Expense
router.post("/add", auth, async (req, res) => {

  try {

    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      user: req.user.id
    });

    res.status(201).json(expense);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// Get All Expenses
router.get("/", auth, async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user.id
    });

    res.status(200).json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.delete("/clear", auth, async (req, res) => {

  try {

    await Expense.deleteMany({
      user: req.user.id
    });

    res.json({
      message: "All Expenses Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


router.put("/:id", auth, async (req, res) => {

  try {

    const { title, amount, category } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title,
        amount,
        category
      },
      {
        new: true
      }
    );

    res.json(expense);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.delete("/:id", auth, async (req, res) => {

  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Expense Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;