const mongoose = require('mongoose');

const mongoDb = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/GoFood', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Fetch data from "FoodData" collection
        const foodItems = await mongoose.connection.db.collection("FoodData").find({}).toArray();

        // Ensure fetching "FoodItem" only after "FoodData" is fetched
        if (foodItems && foodItems.length > 0) {
            const catData = await mongoose.connection.db.collection("FoodItem").find({}).toArray();

            // Store data globally
            global.FoodData = foodItems;
            global.FoodItem = catData;

            console.log("Data fetched successfully.");
        } else {
            console.log("No data found in FoodData collection.");
        }

    } catch (error) {
        console.error("Error connecting to MongoDB or fetching data:", error);
        process.exit(1); // Exit the process on error
    }
};

module.exports = mongoDb;
