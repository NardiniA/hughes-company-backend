import express from 'express';
import nodemailer from "nodemailer";
import payload from 'payload';
import { mediaManagement } from 'payload-cloudinary-plugin/dist/services/cloudinaryService';

require('dotenv').config();
const app = express();

const transport = nodemailer.createTransport({ 
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Cloudinary Media Management
app.use(mediaManagement());

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
  email: {
    fromName: "Antonio Nardini",
    fromAddress: "contact@antonionardini.com",
    transport
  }
})

// Add your own express routes here

app.listen(process.env.PORT);
