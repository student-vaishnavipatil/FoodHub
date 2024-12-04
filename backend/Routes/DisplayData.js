const express = require('express');
const router = express.Router();

router.post('/displaydata', (req, res) => {
    try {
        // Combine data into a single response object
        res.send([
            foodData=global.FoodData,
            foodItem= global.FoodItem
        ]);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
