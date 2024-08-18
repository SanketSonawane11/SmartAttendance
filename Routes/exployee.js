const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const z = require('zod');
const userValidation = require('../Middleware/userValidation');
require("dotenv").config();

const secret = process.env.JWT_SECRET;

