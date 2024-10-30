const express = require('express');
const router = express.Router();
const User = require("../models/User");

//Create - add a new user
router.post('/api/users', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age
        });

        const savedUser = await newUser.save(); //save the new user to database
        res.status(201).json(savedUser); //respond with the saved user data
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message});
    }
});

// Get user
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); //get all users from the database
        res.status(200).json(users); //respond with the users data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message});
    }
});

//Get user by ID
router.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); //get user by id from the database
        if (!user) return res.status(404).json({ message: 'User not found in the database'});
        res.status(200).json(user); //respond with the user data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message});
    }
});

// Update User
router.put('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        } , { new: true }); //update user by id from the database
        if (!updatedUser) return res.status(404).json({ message: 'User not found'});
        res.status(200).json(updatedUser); //respond with the updated user data
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message});
    }
});

// Delete User
 router.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); //delete user by id from the database
        if (!deletedUser) return res.status(404).json({ message: 'User not found'});
        res.status(200).json({ message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message});
    }
 });

 module.exports = router;