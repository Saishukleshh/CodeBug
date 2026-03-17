const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'learning_license_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const initializeDatabase = async () => {
  try {
    // Create database if not exists
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    await tempConnection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'learning_license_db'}\``
    );
    await tempConnection.end();

    // Create applications table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_number VARCHAR(20) UNIQUE NOT NULL,
        
        -- Personal Information
        full_name VARCHAR(100) NOT NULL,
        father_name VARCHAR(100) NOT NULL,
        mother_name VARCHAR(100) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
        nationality VARCHAR(50) DEFAULT 'Indian',
        
        -- Contact Details
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pincode VARCHAR(6) NOT NULL,
        mobile_number VARCHAR(10) NOT NULL,
        email VARCHAR(100) NOT NULL,
        emergency_contact VARCHAR(10) NOT NULL,
        
        -- Identification
        aadhaar_number VARCHAR(12) NOT NULL,
        existing_license_number VARCHAR(20),
        
        -- Vehicle & License Details
        vehicle_class ENUM('Two Wheeler', 'Light Motor Vehicle', 'Heavy Motor Vehicle', 'Both Two Wheeler & LMV') NOT NULL,
        license_type ENUM('Learning License', 'Permanent License') DEFAULT 'Learning License',
        
        -- Document paths
        photo_path VARCHAR(500),
        aadhaar_doc_path VARCHAR(500),
        address_proof_path VARCHAR(500),
        medical_certificate_path VARCHAR(500),
        
        -- Status
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        remarks TEXT,
        
        -- Timestamps
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create approved_applications table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS approved_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_number VARCHAR(20) UNIQUE NOT NULL,
        
        full_name VARCHAR(100) NOT NULL,
        father_name VARCHAR(100) NOT NULL,
        mother_name VARCHAR(100) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
        nationality VARCHAR(50) DEFAULT 'Indian',
        
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pincode VARCHAR(6) NOT NULL,
        mobile_number VARCHAR(10) NOT NULL,
        email VARCHAR(100) NOT NULL,
        emergency_contact VARCHAR(10) NOT NULL,
        
        aadhaar_number VARCHAR(12) NOT NULL,
        existing_license_number VARCHAR(20),
        
        vehicle_class ENUM('Two Wheeler', 'Light Motor Vehicle', 'Heavy Motor Vehicle', 'Both Two Wheeler & LMV') NOT NULL,
        license_type ENUM('Learning License', 'Permanent License') DEFAULT 'Learning License',
        
        photo_path VARCHAR(500),
        aadhaar_doc_path VARCHAR(500),
        address_proof_path VARCHAR(500),
        medical_certificate_path VARCHAR(500),
        
        remarks TEXT,
        approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        original_submitted_at TIMESTAMP
      )
    `);

    // Create rejected_applications table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS rejected_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_number VARCHAR(20) UNIQUE NOT NULL,
        
        full_name VARCHAR(100) NOT NULL,
        father_name VARCHAR(100) NOT NULL,
        mother_name VARCHAR(100) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
        nationality VARCHAR(50) DEFAULT 'Indian',
        
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pincode VARCHAR(6) NOT NULL,
        mobile_number VARCHAR(10) NOT NULL,
        email VARCHAR(100) NOT NULL,
        emergency_contact VARCHAR(10) NOT NULL,
        
        aadhaar_number VARCHAR(12) NOT NULL,
        existing_license_number VARCHAR(20),
        
        vehicle_class ENUM('Two Wheeler', 'Light Motor Vehicle', 'Heavy Motor Vehicle', 'Both Two Wheeler & LMV') NOT NULL,
        license_type ENUM('Learning License', 'Permanent License') DEFAULT 'Learning License',
        
        photo_path VARCHAR(500),
        aadhaar_doc_path VARCHAR(500),
        address_proof_path VARCHAR(500),
        medical_certificate_path VARCHAR(500),
        
        rejection_reason TEXT NOT NULL,
        rejected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        original_submitted_at TIMESTAMP
      )
    `);

    console.log('✅ Database and tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, initializeDatabase };
