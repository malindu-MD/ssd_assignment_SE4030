const express = require('express');
const passport = require('passport');
const Register = require('../models/Register');
const router = express.Router();


router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    async  (req, res) => {
      // Successful login, redirect to the dashboard or home
      try {
        // Ensure req.user contains the authenticated user data from Google
        if (req.user) {
          // Fetch the latest user data from MongoDB using the googleId
          const user = await Register.findOne({ googleId: req.user.googleId });
  
          if (user) {
            // Construct the user object to send, based on the MongoDB data
            const userData = JSON.stringify({
                success: true, userId: user._id 
            });
  
            // Redirect back to the frontend with the user data encoded in the URL
            res.redirect(`http://localhost:3000/register?user=${encodeURIComponent(userData)}`);
          } else {
            // If no user found, handle it accordingly (redirect to login or show an error)
            res.redirect('http://localhost:3000/register');
          }
        } else {
          // If req.user is not populated, redirect to login
          res.redirect('/login');
        }
      } catch (error) {
        console.error('Error fetching user data from MongoDB:', error);
        res.redirect('login');  // Handle error appropriately
      }
    }
    
    
  );


  module.exports = router;  // Ensure you export the router

