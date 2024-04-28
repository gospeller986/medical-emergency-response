const findNearestHospital = require('../algo/algorithm');

const Hospital =  require('../models/hospital');
const { v4: uuidv4 } = require('uuid');

const express = require('express'); 


const HospitalRouter = express.Router() ;  

HospitalRouter.get('/health', async (req,res)=> {
    res.send({ message : "healthy route"})
})


HospitalRouter.post('/hospital/add', async (req,res) => {
    try { 

        const data = req.body
        const hospital_id = uuidv4().toString() 
        const newHospital = new Hospital({...data , hospital_id }) ; 
        await newHospital.save() ; 
        res.status(201).json({
            success : true,
            data : newHospital
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
} )

HospitalRouter.put('/hospital/update',async (req,res)=> {
    try { 
        const data = req.body
        const hospital_id = data.hospital_id ; 
        const hospital = await Hospital.findOne({ hospital_id }) ; 
        if(!hospital) {
            return res.status(404).json({
                success : false,
                error : 'Hospital not found'
            })
        }
        await Hospital.updateOne({ hospital_id },data) ; 
        res.status(200).json({
            success : true,
            data : hospital
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}) 


HospitalRouter.get('/hospital',async (req,res)=> {
    try { 
        const hospitals = await Hospital.find() ; 
        res.status(200).json({
            success : true,
            data : hospitals
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

HospitalRouter.get('/hospital/:hospital_id',async (req,res)=> {
    try { 
        const hospital_id = req.params.hospital_id ; 
        const hospital = await Hospital.findOne({ hospital_id }) ; 
        if(!hospital) {
            return res.status(404).json({
                success : false,
                error : 'Hospital not found'
            })
        }
        res.status(200).json({
            success : true,
            data : hospital
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

HospitalRouter.get('/hospital/city/:city', async (req,res)=> {
    try { 
        const city = req.params.city ; 
        const hospitals = await Hospital.find({ city }) ; 
        res.status(200).json({
            success : true,
            data : hospitals
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

HospitalRouter.get('/hospital/zip/:zip',async (req,res)=> {
    try { 
        const zip = req.params.zip ; 
        const hospitals = await Hospital.find({ zip }) ; 
        res.status(200).json({
            success : true,
            data : hospitals
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}) 


HospitalRouter.get('/hospital/find/:city/:zip' , async(req,res) => {
    try { 
        const city = req.params.city ; 
        const zip = req.params.zip ; 
        const hospitals = await Hospital.find({ city, zip }) ; 
        res.status(200).json({
            success : true,
            data : hospitals
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

HospitalRouter.get('/hospital/findnearest/:userlat/:userlng', async(req,res) => {
    try { 
        const hospitals = await Hospital.find() ; 
        const userlat = parseFloat(req.params.userlat) ;
        const userlng = parseFloat(req.params.userlng) ;
        const nearestHospital = findNearestHospital(userlat , userlng , hospitals )  
        res.status(200).json({
            success : true,
            data : nearestHospital
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }

})


module.exports = HospitalRouter  ; 
