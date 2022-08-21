// apiRouter.js

const express = require("express");
const apiRouter = express.Router();
const db = require("./db.js");

apiRouter.get("/", async (req, res) => {
    try {
        const mahasiswa = await db.getAllMahasiswa();
        res.status(200).json({mahasiswa: mahasiswa});
    } catch(err) {
        console.log(err)
        res.sendStatus(500);
    }
})

apiRouter.get('/:mahasiswaId',(req,res,next)=>{
    res.status(200).json({mahasiswa: req.mahasiswa});
    
})

apiRouter.post('/', async (req,res,next)=>{
    try {
        const name = req.body.mahasiswa.name;
        const npm = req.body.mahasiswa.npm;
            if(!name || !npm ) {
                return res.sendStatus(400);
            }
        const mahasiswa = await db.insertMahasiswa(name,npm).then(insertId=>{return db.getOneEmployee(insertId)});
    } catch(err) {
        console.log(err)
        res.sendStatus(500);
    }
})

module.exports = apiRouter;