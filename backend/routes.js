const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const router = express.Router();

const User = mongoose.model("User", new mongoose.Schema({
    username: {type: String, required : true},
    email: { type: String, unique: true },
    password: {type: String, required: true}
}));

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    });

router.get("/users", async(req,res)=>{
    const users = await User.find()
    res.json(users)
})

router.put("/users/:id",async(req,res)=>{
    const {id} = req.params
    const {username} = req.body;
    const updated = await User.findByIdAndUpdate(id, { username }, { new: true });
    if (!updated) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({message: "User updated successfully"});
    
})

module.exports = router;