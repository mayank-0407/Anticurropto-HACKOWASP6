
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new insurance record
const createInsurance = async (req, res) => {
  try {
    const { provider, policyNo, startDate, endDate, vehicleId } = req.body;

    if (!provider || !policyNo || !startDate || !endDate || !vehicleId) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const insurance = await prisma.insurance.create({
      data: {
        provider,
        policyNo,
        startDate,
        endDate,
        vehicleId
      }
    });

    res.status(201).json(insurance);
  } catch (error) {
    res.status(500).json({ error: 'Error creating insurance record', details: error.message });
  }
};

// Get all insurance records
const getAllInsurances = async (req, res) => {
  try {
    const insurances = await prisma.insurance.findMany();
    res.status(200).json(insurances);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching insurance records', details: error.message });
  }
};

// Get insurance record by ID
const getInsuranceById = async (req, res) => {
  const id = req.params.id;
  try {
    const insurance = await prisma.insurance.findUnique({
      where: { id }
    });
    if (!insurance) {
      res.status(404).json({ error: 'Insurance record not found' });
    } else {
      res.status(200).json(insurance);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching insurance record', details: error.message });
  }
};

// Update insurance record by ID
const updateInsurance = async (req, res) => {
  const id = req.params.id;
  const { provider, policyNo, startDate, endDate, vehicleId } = req.body;
  try {
    const insurance = await prisma.insurance.update({
      where: { id },
      data: { provider, policyNo, startDate, endDate, vehicleId }
    });
    res.status(200).json(insurance);
  } catch (error) {
    res.status(500).json({ error: 'Error updating insurance record', details: error.message });
  }
};

// Delete insurance record by ID
const deleteInsurance = async (req, res) => {
  const id = req.params.id;
  try {
    const insurance = await prisma.insurance.delete({
      where: { id }
    });
    res.status(200).json(insurance);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting insurance record', details: error.message });
  }
};

module.exports = {
  createInsurance,
  getAllInsurances,
  getInsuranceById,
  updateInsurance,
  deleteInsurance
};
