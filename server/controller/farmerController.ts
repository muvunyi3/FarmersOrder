import { Request, Response } from 'express';
import { Farmer, FarmerEntity } from '../entities/farmers.entity';
const pool = require("../db");


export const getAllFarmers = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM farmers');
    const farmers = rows.map((farmer: any) => new FarmerEntity(farmer));
    res.json(farmers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific farmer
export const getFarmerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM farmers WHERE farmer_id = $1', [id]);
    const farmer = rows.length ? new FarmerEntity(rows[0]) : null;
    res.json(farmer);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export const createFarmer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, age, address } = req.body;
    console.log(`req.body ${name}`);
    const newFarmer = await pool.query(
      "INSERT INTO farmers (name, email, phone, age, address) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, email, phone, age, address]
    );

    const farmer = new FarmerEntity(newFarmer.rows[0]);
    res.json(farmer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFarmer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, age, address } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE farmers SET name = $1, email = $2, phone = $3, age = $4, address = $5  WHERE farmer_id = $6 RETURNING *',
      [name, email, phone, age, address, id]
    );
    const farmer = rows.length ? new FarmerEntity(rows[0]) : null;
    res.json(farmer);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteFarmer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM farmers WHERE farmer_id = $1', [id]);
    const message = rowCount !== 0 ? `Farmer ID ${id} Successfully deleted` : 'Operation Failed';
    const code = rowCount !== 0 ? `00` : '01';
    res.json({ "code": code, "message": message});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
