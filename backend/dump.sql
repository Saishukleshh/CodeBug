-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: learning_license_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_number` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `father_name` varchar(100) NOT NULL,
  `mother_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  `nationality` varchar(50) DEFAULT 'Indian',
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `mobile_number` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `emergency_contact` varchar(10) NOT NULL,
  `aadhaar_number` varchar(12) NOT NULL,
  `existing_license_number` varchar(20) DEFAULT NULL,
  `vehicle_class` enum('Two Wheeler','Light Motor Vehicle','Heavy Motor Vehicle','Both Two Wheeler & LMV') NOT NULL,
  `license_type` enum('Learning License','Permanent License') DEFAULT 'Learning License',
  `photo_path` varchar(500) DEFAULT NULL,
  `aadhaar_doc_path` varchar(500) DEFAULT NULL,
  `address_proof_path` varchar(500) DEFAULT NULL,
  `medical_certificate_path` varchar(500) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `application_number` (`application_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approved_applications`
--

DROP TABLE IF EXISTS `approved_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approved_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_number` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `father_name` varchar(100) NOT NULL,
  `mother_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  `nationality` varchar(50) DEFAULT 'Indian',
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `mobile_number` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `emergency_contact` varchar(10) NOT NULL,
  `aadhaar_number` varchar(12) NOT NULL,
  `existing_license_number` varchar(20) DEFAULT NULL,
  `vehicle_class` enum('Two Wheeler','Light Motor Vehicle','Heavy Motor Vehicle','Both Two Wheeler & LMV') NOT NULL,
  `license_type` enum('Learning License','Permanent License') DEFAULT 'Learning License',
  `photo_path` varchar(500) DEFAULT NULL,
  `aadhaar_doc_path` varchar(500) DEFAULT NULL,
  `address_proof_path` varchar(500) DEFAULT NULL,
  `medical_certificate_path` varchar(500) DEFAULT NULL,
  `remarks` text,
  `approved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `original_submitted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `application_number` (`application_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approved_applications`
--

LOCK TABLES `approved_applications` WRITE;
/*!40000 ALTER TABLE `approved_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `approved_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rejected_applications`
--

DROP TABLE IF EXISTS `rejected_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rejected_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_number` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `father_name` varchar(100) NOT NULL,
  `mother_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  `nationality` varchar(50) DEFAULT 'Indian',
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `mobile_number` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `emergency_contact` varchar(10) NOT NULL,
  `aadhaar_number` varchar(12) NOT NULL,
  `existing_license_number` varchar(20) DEFAULT NULL,
  `vehicle_class` enum('Two Wheeler','Light Motor Vehicle','Heavy Motor Vehicle','Both Two Wheeler & LMV') NOT NULL,
  `license_type` enum('Learning License','Permanent License') DEFAULT 'Learning License',
  `photo_path` varchar(500) DEFAULT NULL,
  `aadhaar_doc_path` varchar(500) DEFAULT NULL,
  `address_proof_path` varchar(500) DEFAULT NULL,
  `medical_certificate_path` varchar(500) DEFAULT NULL,
  `rejection_reason` text NOT NULL,
  `rejected_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `original_submitted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `application_number` (`application_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rejected_applications`
--

LOCK TABLES `rejected_applications` WRITE;
/*!40000 ALTER TABLE `rejected_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `rejected_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'learning_license_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-17 23:27:17
