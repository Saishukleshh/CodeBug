const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../db');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

const uploadFields = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadhaar_doc', maxCount: 1 },
  { name: 'address_proof', maxCount: 1 },
  { name: 'medical_certificate', maxCount: 1 },
]);

// Generate unique application number: LL-YYYYMMDD-XXXX
const generateApplicationNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `LL-${year}${month}${day}-${random}`;
};

// Validation helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
const validateAadhaar = (aadhaar) => /^\d{12}$/.test(aadhaar);
const validatePincode = (pincode) => /^\d{6}$/.test(pincode);

const validateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 16;
};

// POST /api/applications - Submit a new application
router.post('/', (req, res) => {
  uploadFields(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 5MB limit.' });
      }
      return res.status(400).json({ error: err.message });
    }
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const {
        full_name, father_name, mother_name, date_of_birth, gender, blood_group, nationality,
        address_line1, address_line2, city, state, pincode, mobile_number, email, emergency_contact,
        aadhaar_number, existing_license_number,
        vehicle_class, license_type,
      } = req.body;

      // Server-side validation
      const errors = [];

      if (!full_name || full_name.trim().length < 2) errors.push('Full name is required (min 2 characters)');
      if (!father_name || father_name.trim().length < 2) errors.push("Father's name is required (min 2 characters)");
      if (!mother_name || mother_name.trim().length < 2) errors.push("Mother's name is required (min 2 characters)");
      if (!date_of_birth) errors.push('Date of birth is required');
      else if (!validateAge(date_of_birth)) errors.push('Applicant must be at least 16 years old');
      if (!gender) errors.push('Gender is required');
      if (!blood_group) errors.push('Blood group is required');
      if (!address_line1) errors.push('Address line 1 is required');
      if (!city) errors.push('City is required');
      if (!state) errors.push('State is required');
      if (!pincode) errors.push('Pincode is required');
      else if (!validatePincode(pincode)) errors.push('Pincode must be 6 digits');
      if (!mobile_number) errors.push('Mobile number is required');
      else if (!validateMobile(mobile_number)) errors.push('Invalid mobile number (10 digits, starting with 6-9)');
      if (!email) errors.push('Email is required');
      else if (!validateEmail(email)) errors.push('Invalid email format');
      if (!emergency_contact) errors.push('Emergency contact is required');
      else if (!validateMobile(emergency_contact)) errors.push('Invalid emergency contact number');
      if (!aadhaar_number) errors.push('Aadhaar number is required');
      else if (!validateAadhaar(aadhaar_number)) errors.push('Aadhaar number must be 12 digits');
      if (!vehicle_class) errors.push('Vehicle class is required');

      // Document validation
      if (!req.files || !req.files.photo) errors.push('Passport-size photo is required');
      if (!req.files || !req.files.aadhaar_doc) errors.push('Aadhaar document is required');
      if (!req.files || !req.files.address_proof) errors.push('Address proof document is required');
      if (!req.files || !req.files.medical_certificate) errors.push('Medical certificate is required');

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const applicationNumber = generateApplicationNumber();

      const [result] = await pool.execute(
        `INSERT INTO applications (
          application_number, full_name, father_name, mother_name, date_of_birth, gender, blood_group, nationality,
          address_line1, address_line2, city, state, pincode, mobile_number, email, emergency_contact,
          aadhaar_number, existing_license_number, vehicle_class, license_type,
          photo_path, aadhaar_doc_path, address_proof_path, medical_certificate_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          applicationNumber, full_name.trim(), father_name.trim(), mother_name.trim(), date_of_birth, gender, blood_group,
          nationality || 'Indian',
          address_line1.trim(), address_line2 ? address_line2.trim() : null, city.trim(), state.trim(), pincode,
          mobile_number, email.trim().toLowerCase(), emergency_contact,
          aadhaar_number, existing_license_number || null,
          vehicle_class, license_type || 'Learning License',
          req.files.photo[0].filename,
          req.files.aadhaar_doc[0].filename,
          req.files.address_proof[0].filename,
          req.files.medical_certificate[0].filename,
        ]
      );

      res.status(201).json({
        message: 'Application submitted successfully!',
        applicationNumber,
        id: result.insertId,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Application number already exists. Please try again.' });
      }
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  });
});

// GET /api/applications/:applicationNumber - Fetch application details
router.get('/:applicationNumber', async (req, res) => {
  try {
    const { applicationNumber } = req.params;

    if (!applicationNumber || !applicationNumber.startsWith('LL-')) {
      return res.status(400).json({ error: 'Invalid application number format. Must start with LL-' });
    }

    const [rows] = await pool.execute(
      'SELECT * FROM applications WHERE application_number = ?',
      [applicationNumber]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Application not found. Please check the application number.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/applications/:applicationNumber/approve - Approve application
router.post('/:applicationNumber/approve', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { applicationNumber } = req.params;
    const { remarks } = req.body;

    await connection.beginTransaction();

    // Fetch application
    const [rows] = await connection.execute(
      'SELECT * FROM applications WHERE application_number = ?',
      [applicationNumber]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Application not found.' });
    }

    const app = rows[0];

    if (app.status !== 'Pending') {
      await connection.rollback();
      return res.status(400).json({ error: `Application has already been ${app.status.toLowerCase()}.` });
    }

    // Insert into approved_applications
    await connection.execute(
      `INSERT INTO approved_applications (
        application_number, full_name, father_name, mother_name, date_of_birth, gender, blood_group, nationality,
        address_line1, address_line2, city, state, pincode, mobile_number, email, emergency_contact,
        aadhaar_number, existing_license_number, vehicle_class, license_type,
        photo_path, aadhaar_doc_path, address_proof_path, medical_certificate_path,
        remarks, original_submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        app.application_number, app.full_name, app.father_name, app.mother_name, app.date_of_birth,
        app.gender, app.blood_group, app.nationality,
        app.address_line1, app.address_line2, app.city, app.state, app.pincode,
        app.mobile_number, app.email, app.emergency_contact,
        app.aadhaar_number, app.existing_license_number, app.vehicle_class, app.license_type,
        app.photo_path, app.aadhaar_doc_path, app.address_proof_path, app.medical_certificate_path,
        remarks || null, app.created_at,
      ]
    );

    // Update status in applications table
    await connection.execute(
      'UPDATE applications SET status = ?, remarks = ? WHERE application_number = ?',
      ['Approved', remarks || null, applicationNumber]
    );

    await connection.commit();
    res.json({ message: 'Application approved successfully!', applicationNumber });
  } catch (error) {
    await connection.rollback();
    console.error('Error approving application:', error);
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    connection.release();
  }
});

// POST /api/applications/:applicationNumber/reject - Reject application
router.post('/:applicationNumber/reject', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { applicationNumber } = req.params;
    const { rejection_reason } = req.body;

    if (!rejection_reason || rejection_reason.trim().length < 10) {
      return res.status(400).json({ error: 'Rejection reason is required (min 10 characters).' });
    }

    await connection.beginTransaction();

    // Fetch application
    const [rows] = await connection.execute(
      'SELECT * FROM applications WHERE application_number = ?',
      [applicationNumber]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Application not found.' });
    }

    const app = rows[0];

    if (app.status !== 'Pending') {
      await connection.rollback();
      return res.status(400).json({ error: `Application has already been ${app.status.toLowerCase()}.` });
    }

    // Insert into rejected_applications
    await connection.execute(
      `INSERT INTO rejected_applications (
        application_number, full_name, father_name, mother_name, date_of_birth, gender, blood_group, nationality,
        address_line1, address_line2, city, state, pincode, mobile_number, email, emergency_contact,
        aadhaar_number, existing_license_number, vehicle_class, license_type,
        photo_path, aadhaar_doc_path, address_proof_path, medical_certificate_path,
        rejection_reason, original_submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        app.application_number, app.full_name, app.father_name, app.mother_name, app.date_of_birth,
        app.gender, app.blood_group, app.nationality,
        app.address_line1, app.address_line2, app.city, app.state, app.pincode,
        app.mobile_number, app.email, app.emergency_contact,
        app.aadhaar_number, app.existing_license_number, app.vehicle_class, app.license_type,
        app.photo_path, app.aadhaar_doc_path, app.address_proof_path, app.medical_certificate_path,
        rejection_reason.trim(), app.created_at,
      ]
    );

    // Update status in applications table
    await connection.execute(
      'UPDATE applications SET status = ?, remarks = ? WHERE application_number = ?',
      ['Rejected', rejection_reason.trim(), applicationNumber]
    );

    await connection.commit();
    res.json({ message: 'Application rejected.', applicationNumber });
  } catch (error) {
    await connection.rollback();
    console.error('Error rejecting application:', error);
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    connection.release();
  }
});

module.exports = router;
