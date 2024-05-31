const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new repair record
const createRepair = async (req, res) => {
  try {
    const { description, cost, vehicleId } = req.body;

    if (!description || !cost || !vehicleId) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const repair = await prisma.repair.create({
      data: {
        description,
        cost,
        vehicleId
      }
    });

    res.status(201).json(repair);
  } catch (error) {
    res.status(500).json({ error: 'Error creating repair record', details: error.message });
  }
};

// Get all repair records
const getAllRepairs = async (req, res) => {
  try {
    const repairs = await prisma.repair.findMany();
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching repair records', details: error.message });
  }
};

// Get repair record by ID
const getRepairById = async (req, res) => {
  const id = req.params.id;
  try {
    const repair = await prisma.repair.findUnique({
      where: { id }
    });
    if (!repair) {
      res.status(404).json({ error: 'Repair record not found' });
    } else {
      res.status(200).json(repair);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching repair record', details: error.message });
  }
};

// Update repair record by ID
const updateRepair = async (req, res) => {
  const id = req.params.id;
  const { description, cost, vehicleId } = req.body;
  try {
    const repair = await prisma.repair.update({
      where: { id },
      data: { description, cost, vehicleId }
    });
    res.status(200).json(repair);
  } catch (error) {
    res.status(500).json({ error: 'Error updating repair record', details: error.message });
  }
};

// Delete repair record by ID
const deleteRepair = async (req, res) => {
  const id = req.params.id;
  try {
    const repair = await prisma.repair.delete({
      where: { id }
    });
    res.status(200).json(repair);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting repair record', details: error.message });
  }
};

module.exports = {
  createRepair,
  getAllRepairs,
  getRepairById,
  updateRepair,
  deleteRepair
};
