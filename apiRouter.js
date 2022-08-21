// apiRouter.js

const express = require("express");
const apiRouter = express.Router();
const db = require("./db.js");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jsonwebtoken = require('jsonwebtoken');
apiRouter.post('/register', async (req,res,next)=>{
    try {
        const username = req.body.username;
        const email = req.body.email;
        let password = req.body.password
            if(!username || !email || !password ) {
                return res.sendStatus(400);
            }
            
            const salt = genSaltSync(10);
            password = hashSync(password,salt);

            const user = await db.insertUser(username,email,password);

            const jsontoken = jsonwebtoken.sign({user:user},process.env.SECRET_KEY,{expiresIn:'30m'});
            res.cookie('token', jsontoken, { httpOnly: true,  SameSite: 'strict' , 
            expires: new Date(Number(new Date()) + 30*60*1000) }); //we add secure: true, when using https.
            res.json({token:jsontoken});
        
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    }
})

apiRouter.post('/login',async(req,res,next)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        user = await db.getUserByEmail(email);
        
            if(!user ) {
                return res.json({
                    message: "Invalid email or password"
                })
            }
            
            const isValidPassword = compareSync(password,user[0].password);
            
            if(isValidPassword){
                // user.password = undefined;
                const jsontoken = jsonwebtoken.sign({user:user},process.env.SECRET_KEY,{expiresIn:'30m'});
                res.cookie('token', jsontoken, { httpOnly: true,  SameSite: 'strict' , 
                expires: new Date(Number(new Date()) + 30*60*1000) }); //we add secure: true, when using https.
                res.json({token:jsontoken});
            } else {
                return res.json({
                    message: "Invalid email or password"
                });
            }
    } catch(err) {
        console.log(err)
    }
})

module.exports = apiRouter;