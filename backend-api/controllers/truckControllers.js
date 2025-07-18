const express = require('express')
const router = express.Router()
const Truck = require('../models/schema')
const auth = require('../middlewares/auth')


// post route

router.post('/', async (req, res) => {
  const { plate, model, status, lastServiceDate, driver } = req.body;

  if (!plate || !model || !status) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    const exists = await Truck.findOne({ plate });
    if (exists) {
      return res.status(400).json({ message: "Truck with this plate already exists." });
    }

    const newTruck = await Truck.create({
      plate,
      model,
      status,
      lastServiceDate,
      driver,
    });

    res.status(201).json({ message: "Truck created successfully", truck: newTruck });
  } catch (err) {
    console.error("🚨 Error in POST /api/trucks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




// Get router

router.get('/', async (req, res)=>{

    try {
         const trucks = await Truck.find().sort({created:1});
         res.status(200).json(trucks)
    } catch (error) {
        res.status(400).json({message:"Not able to load all trucks"})
        console.error("Error Occurred Loading Trucks", error.message)
    }
})


// Get one route

router.get('/:id', async (req, res)=>{
    
    try {
    const truck = await Truck.findById(req.params.id)
    if(!truck) return res.status(400).json({message:'Results not found'})
    
    res.status(200).json(truck)
    } catch (error) {
        res.status(500).json({message:"Error Loading Truck"})
        console.error(error.message)
    }
    
})


// Update route

router.put('/:id',  async (req, res)=>{
    const {plate, status, driverID} = req.body;

    if(!plate || !status || !driverID) return res.status(400).json({message:"All fields required"})

    try {
        const updateTruck = await Truck.findByIdAndUpdate(
            req.params.id,
            {plate, status, model, capacity, driverID},
            {new:true, runValidators:true}
        )

        if(!updateTruck) res.status.json({message:"Truck Not found"})

        res.status(200).json(updateTruck)   
    } catch (error) {
     res.status(400).json({message:"Not Able to Update"})   
     console.error("Updating error",error.message)
    }
})

// Delete route
router.patch('/:id', async (req,res)=>{
    
    try {
        const updateTruckOne = await Truck.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators:true},
        )

        if(!updateTruckOne) res.status(400).json({message:"Truck not Found"})
        
        res.status(200).json(updateTruckOne)
    } catch (error) {
        res.status(500).json({message:"Error Updating..."})
        console.error(error.message)
    }

})

router.delete('/:id',  async (req, res)=>{
    try {
        const truckDel = await Truck.findByIdAndDelete(req.params.id)

        if(!truckDel) res.status(400).json({message:"Truck not Found"})
        res.status(200).json(truckDel)

    } catch (error) {
        res.status(500).json({message:"Error Deleting..."})
        console.error(error.message)
    }
})


// GET /api/trucks/summary
router.get('/summary/data',  async (req, res) => {
  try {
    const totalTrucks = await Truck.countDocuments();
    const underMaintenance = await Truck.countDocuments({ status: 'maintenance' });
    const activeTrucks = await Truck.countDocuments({ status: 'active' });
    const inactiveTrucks = await Truck.countDocuments({ status: 'inactive' });

    res.status(200).json({
      totalTrucks,
      underMaintenance,
      activeTrucks,
      inactiveTrucks,
    });
  } catch (error) {
    console.error('Error fetching summary:', error.message);
    res.status(500).json({ message: 'Error getting summary data' });
  }
});

module.exports = router