const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createVehicle = async (req, res) => {
  try{
    console.log("hi1");
    console.log(req.body);
    const { plateNumber, make, model, year, color, ownerId } = req.body;
    if (!plateNumber || !make || !model || !year || !color || !ownerId) {
      return res.status(203).json({ error: 'Please provide all required fields' });
    }
    console.log("hi2");
    const yearInInt=parseInt(year);
    console.log("hi3");
    const vehicle = await prisma.vehicle.create({
      data: {
        plateNumber,
        make,
        model,
        year:yearInInt,
        color,
        ownerId
      }
    });
    res.status(200).json({msg:"Vehicle added successfully"});
  } 
  
  catch (error) {
    res.status(203).json({ error: 'Error creating vehicle', details: error.message });
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(203).json({ error: 'Error fetching vehicles', details: error.message });
  }
};

const getVehicleById = async (req, res) => {
  const id = req.params.id;
  if(true) {
    const vehicle = await prisma.vehicle.findMany({
      where: { ownerId:id }
    });
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
    } else {
      res.status(200).json(vehicle);
    }
  } 
  // catch (error) {
  //   res.status(500).json({ error: 'Error fetching vehicle', details: error.message });
  // }
};
const getVehicleByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id }
    });
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
    } else {
      res.status(200).json(vehicle);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicle', details: error.message });
  }
};

const updateVehicle = async (req, res) => {
  const id = req.params.id;
  const { plateNumber, make, model, year, color, ownerId } = req.body;
  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: { plateNumber, make, model, year, color, ownerId }
    });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error updating vehicle', details: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await prisma.vehicle.delete({
      where: { id }
    });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting vehicle', details: error.message });
  }
};

const updatePollutionDone = async (vehicleId) => {
    try {
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + (3 * 30 * 24 * 60 * 60 * 1000)); // 3 months from current date
  
      const vehicle = await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { pollutionDone: currentDate, pollutionExpiration: expirationDate }
      });
      return vehicle;
    } catch (error) {
      res.status(500).json({error:`Error updating pollutionDone for vehicle: ${error.message}`});
    }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  updatePollutionDone,
  getVehicleByUserId
};

