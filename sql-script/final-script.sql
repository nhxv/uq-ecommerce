CREATE DATABASE  IF NOT EXISTS `uniqueproject` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uniqueproject`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: uniqueproject
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `cmnd` varchar(255) DEFAULT NULL,
  `date_hired` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `order_work` bigint(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `product_work` bigint(20) DEFAULT NULL,
  `salary` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'12345 Street M City',0,NULL,NULL,'admin@gmail.com','Admin',1,'$2y$12$D3wl929Xy6N9f01GjSWBy.rwFl7R9xPMaT76sgvdEoeII6NqVA8OO','0937063945',0,NULL),(2,'ABC XYZ',0,NULL,'2020-05-14 05:38:06','trieu@gmail.com','Trần Hải Triều',10,'$2a$10$GW8DVlUY1EMPiIq1YfBej.mdt2mrrYQVDnZjzQbqDg5ZX/kGalrnO','0123456789',0,50000000.00),(3,'ABX CYZ',0,NULL,'2020-05-14 14:45:54','vinh@gmail.com','Ngô Hoàng Xuân Vinh',0,'$2a$10$jza78wr/rKoNn3AVb246g.q.e6CBbTlY1.8XdFoH047OvEeajuDaO','0123456987',0,0.00),(4,'ABBA ',0,NULL,NULL,'tung@gmail.com','Nguyễn Dũng Sơn Tùng',0,'$2a$10$Guuiy5j4lkcvxJaHHahteuO9FtCAWQePficU496cEsWV6mRrkFPLu','01234587891',0,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_order`
--

DROP TABLE IF EXISTS `account_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `staff_edit` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_price` decimal(19,2) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrwakkftq9hw5bgj495jja09a6` (`account_id`),
  CONSTRAINT `FKrwakkftq9hw5bgj495jja09a6` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_order`
--

LOCK TABLES `account_order` WRITE;
/*!40000 ALTER TABLE `account_order` DISABLE KEYS */;
INSERT INTO `account_order` VALUES (1,'ABX CYZ','2020-05-14 12:26:56','vinh@gmail.com','Ngô Hoàng Xuân Vinh','0123456987','trieu@gmail.com','DELIVERED',630000.00,3),(2,'ABX CYZ','2020-05-14 12:27:45','vinh@gmail.com','Ngô Hoàng Xuân Vinh','0123456987','trieu@gmail.com','DELIVERED',250000.00,3),(3,'ABBA ','2020-05-14 12:29:44','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','trieu@gmail.com','DELIVERED',200000.00,4),(4,'ABBA ','2020-05-14 12:32:49','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','trieu@gmail.com','DELIVERED',200000.00,4),(5,'ABBA ','2020-05-14 12:34:20','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','trieu@gmail.com','RETURN',120000.00,4),(6,'ABC XYZ','2020-05-14 12:44:38','trieu@gmail.com','Trần Hải Triều','0123456789','trieu@gmail.com','RETURN',100000.00,2),(7,'ABC XYZ','2020-05-14 13:30:26','trieu@gmail.com','Trần Hải Triều','0123456789','trieu@gmail.com','DELIVERED',200000.00,2),(8,'ABBA ','2020-05-14 13:35:21','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','vinh@gmail.com','DELIVERED',220000.00,4),(9,'ABBA ','2020-05-14 13:42:42','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','trieu@gmail.com','DELIVERED',100000.00,4),(10,'ABBA ','2020-05-14 14:21:19','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','trieu@gmail.com','DELIVERED',120000.00,4),(11,'ABBA ','2020-05-14 14:41:56','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','admin@gmail.com','DELIVERED',120000.00,4),(12,'ABBA ','2020-05-14 14:46:32','tung@gmail.com','Nguyễn Dũng Sơn Tùng','01234587891','trieu@gmail.com','RETURN',120000.00,4);
/*!40000 ALTER TABLE `account_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_roles`
--

DROP TABLE IF EXISTS `account_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_roles` (
  `account_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`account_id`,`role_id`),
  KEY `FKi84870gssnbi37wfqfifekghb` (`role_id`),
  CONSTRAINT `FKi84870gssnbi37wfqfifekghb` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKtp61eta5i06bug3w1qr6286uf` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_roles`
--

LOCK TABLES `account_roles` WRITE;
/*!40000 ALTER TABLE `account_roles` DISABLE KEYS */;
INSERT INTO `account_roles` VALUES (1,1),(2,2),(3,3),(4,3);
/*!40000 ALTER TABLE `account_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Áo phông'),(2,'Áo sơ mi'),(3,'Váy liền'),(4,'Quần ngắn'),(5,'Quần jean'),(6,'Áo khoác');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsgsuxxoc1h5pskbjpch4id2ec` (`product_id`),
  CONSTRAINT `FKsgsuxxoc1h5pskbjpch4id2ec` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'CAM',1),(2,'TRẮNG',2),(3,'CAM',3),(4,'ĐỎ',3),(5,'HỒNG',3),(6,'ĐEN',3),(7,'XANH',4),(8,'ĐỎ',4),(9,'CAM',5),(10,'XAMH',6),(11,'XÁM',6),(12,'HỒNG',6),(13,'XANH',7),(14,'ĐỎ',7),(15,'XANH',8),(16,'ĐỎ',8),(17,'XANH',9),(18,'XANH',10),(19,'XANH',11),(20,'XANH',12),(21,'HỒNG',12),(22,'TRẮNG',12),(23,'XANH',13),(24,'XANH',14),(25,'TRẮNG',15),(26,'XANH',15),(27,'XANH',16),(28,'HỒNG',16),(29,'TRẮNG',16),(30,'TÍM',16),(31,'XANH ĐEN',17),(32,'XANH',18),(33,'ĐEN',18),(34,'XANH',19),(35,'ĐỎ',19),(36,'TRẮNG',19),(37,'HỒNG',20),(38,'XANH LÁ',21),(39,'XANH DƯƠNG',21),(40,'XANH LÁ',22),(41,'XANH LÁ',23),(42,'HỒNG',23),(43,'CAM',24),(44,'ĐEN',24),(45,'XANH',24);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgpextbyee3uk9u6o2381m7ft1` (`product_id`),
  CONSTRAINT `FKgpextbyee3uk9u6o2381m7ft1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'http://localhost:8080/images/6ds20c015-so020_3_.jpg','6ds20c015-so020_3_.jpg','image/jpeg',1),(2,'http://localhost:8080/images/6ds20c015-so020-1.jpg','6ds20c015-so020-1.jpg','image/jpeg',1),(3,'http://localhost:8080/images/6ds20c015-so020-2.jpg','6ds20c015-so020-2.jpg','image/jpeg',1),(4,'http://localhost:8080/images/6ds20c015-so020-thumb2-2.jpeg','6ds20c015-so020-thumb2-2.jpeg','image/jpeg',1),(5,'http://localhost:8080/images/6ds19c021-sw001--2.jpg','6ds19c021-sw001--2.jpg','image/jpeg',2),(6,'http://localhost:8080/images/6ds19c021-sw001--4.jpg','6ds19c021-sw001--4.jpg','image/jpeg',2),(7,'http://localhost:8080/images/6ds19c021-sw001-m.jpg','6ds19c021-sw001-m.jpg','image/jpeg',2),(8,'http://localhost:8080/images/--6ds19c021-sw0011.jpg','--6ds19c021-sw0011.jpg','image/jpeg',2),(9,'http://localhost:8080/images/6ds20s034-po022-l.jpg','6ds20s034-po022-l.jpg','image/jpeg',3),(10,'http://localhost:8080/images/6ds20s034-pr026-m.jpg','6ds20s034-pr026-m.jpg','image/jpeg',3),(11,'http://localhost:8080/images/6ds20s034-pw038-m.jpg','6ds20s034-pw038-m.jpg','image/jpeg',3),(12,'http://localhost:8080/images/6ds20s034-sb015-m.jpg','6ds20s034-sb015-m.jpg','image/jpeg',3),(13,'http://localhost:8080/images/6ds20s034-so064_1_.jpg','6ds20s034-so064_1_.jpg','image/jpeg',3),(14,'http://localhost:8080/images/6ds20s034-so064_2_.jpg','6ds20s034-so064_2_.jpg','image/jpeg',3),(15,'http://localhost:8080/images/6ds20s034-so064-m.jpg','6ds20s034-so064-m.jpg','image/jpeg',3),(16,'http://localhost:8080/images/6ds19c002-sb038-m.jpg','6ds19c002-sb038-m.jpg','image/jpeg',4),(17,'http://localhost:8080/images/6ds19c002-sb0383.jpg','6ds19c002-sb0383.jpg','image/jpeg',4),(18,'http://localhost:8080/images/6ds19c002-sb0384.jpg','6ds19c002-sb0384.jpg','image/jpeg',4),(19,'http://localhost:8080/images/6ds19c002-sr091-m.jpg','6ds19c002-sr091-m.jpg','image/jpeg',4),(20,'http://localhost:8080/images/6ds19c002-sr0912.jpg','6ds19c002-sr0912.jpg','image/jpeg',4),(21,'http://localhost:8080/images/6ds19c010-so020-33.jpg','6ds19c010-so020-33.jpg','image/jpeg',5),(22,'http://localhost:8080/images/6ds19c010-so020-34.jpg','6ds19c010-so020-34.jpg','image/jpeg',5),(23,'http://localhost:8080/images/6ds19c010-so020-35.jpg','6ds19c010-so020-35.jpg','image/jpeg',5),(24,'http://localhost:8080/images/6ds19c010-so020-36.jpg','6ds19c010-so020-36.jpg','image/jpeg',5),(25,'http://localhost:8080/images/6ds19c010-so020-m.jpg','6ds19c010-so020-m.jpg','image/jpeg',5),(26,'http://localhost:8080/images/6ot19s001-sa079-m.jpg','6ot19s001-sa079-m.jpg','image/jpeg',6),(27,'http://localhost:8080/images/6ot19s001-sb215-m.jpg','6ot19s001-sb215-m.jpg','image/jpeg',6),(28,'http://localhost:8080/images/6ot19s001-sm176-m.jpg','6ot19s001-sm176-m.jpg','image/jpeg',6),(29,'http://localhost:8080/images/6ot19w027--c.jpg','6ot19w027--c.jpg','image/jpeg',7),(30,'http://localhost:8080/images/6ot19w027-sb090-m.jpg','6ot19w027-sb090-m.jpg','image/jpeg',7),(31,'http://localhost:8080/images/6ot19w027-sb619-m.jpg','6ot19w027-sb619-m.jpg','image/jpeg',7),(32,'http://localhost:8080/images/6ot19w027-sk010-m.jpg','6ot19w027-sk010-m.jpg','image/jpeg',7),(33,'http://localhost:8080/images/6ot19w027-sm294-m.jpg','6ot19w027-sm294-m.jpg','image/jpeg',7),(34,'http://localhost:8080/images/6ot19w027-sr018-m.jpg','6ot19w027-sr018-m.jpg','image/jpeg',7),(35,'http://localhost:8080/images/6ot19w007-sk010-m.jpg','6ot19w007-sk010-m.jpg','image/jpeg',8),(36,'http://localhost:8080/images/6ot19w007-sp177-m.jpg','6ot19w007-sp177-m.jpg','image/jpeg',8),(37,'http://localhost:8080/images/6tc19s001--1.jpg','6tc19s001--1.jpg','image/jpeg',9),(38,'http://localhost:8080/images/6tc19s001-se178-m.jpg','6tc19s001-se178-m.jpg','image/jpeg',9),(39,'http://localhost:8080/images/6tc19s001-sk010-m.jpg','6tc19s001-sk010-m.jpg','image/jpeg',9),(40,'http://localhost:8080/images/6tc19s001-so128-m.jpg','6tc19s001-so128-m.jpg','image/jpeg',9),(41,'http://localhost:8080/images/6tc19s001-so128-m.jpg','6tc19s001-so128-m.jpg','image/jpeg',9),(42,'http://localhost:8080/images/6bj19a006-sj286-28.jpg','6bj19a006-sj286-28.jpg','image/jpeg',10),(43,'http://localhost:8080/images/6bj19a006-sj401-28.jpg','6bj19a006-sj401-28.jpg','image/jpeg',10),(44,'http://localhost:8080/images/6bj19a006-sj402-28.jpg','6bj19a006-sj402-28.jpg','image/jpeg',10),(45,'http://localhost:8080/images/6bj19w003-sj505-m.jpg','6bj19w003-sj505-m.jpg','image/jpeg',11),(46,'http://localhost:8080/images/6bj19w003-sj508-m.jpg','6bj19w003-sj508-m.jpg','image/jpeg',11),(47,'http://localhost:8080/images/6th20s006-sb090-m.jpg','6th20s006-sb090-m.jpg','image/jpeg',12),(48,'http://localhost:8080/images/6th20s006-sg205-m.jpg','6th20s006-sg205-m.jpg','image/jpeg',12),(49,'http://localhost:8080/images/6th20s006-sm001-m.jpg','6th20s006-sm001-m.jpg','image/jpeg',12),(50,'http://localhost:8080/images/6th20s006-so006_1_.jpg','6th20s006-so006_1_.jpg','image/jpeg',12),(51,'http://localhost:8080/images/6th20s006-so006_2_.jpg','6th20s006-so006_2_.jpg','image/jpeg',12),(52,'http://localhost:8080/images/6th20s006-so006-m.jpg','6th20s006-so006-m.jpg','image/jpeg',12),(53,'http://localhost:8080/images/6th20s006-sw001-m.jpg','6th20s006-sw001-m.jpg','image/jpeg',12),(54,'http://localhost:8080/images/6th19w013-sj526-m.jpg','6th19w013-sj526-m.jpg','image/jpeg',13),(55,'http://localhost:8080/images/6th19w003-cg055-m_optimized.jpg','6th19w003-cg055-m_optimized.jpg','image/jpeg',14),(56,'http://localhost:8080/images/6th19w003-ck029-m_optimized.jpg','6th19w003-ck029-m_optimized.jpg','image/jpeg',14),(57,'http://localhost:8080/images/6th19w003-cp013-m_optimized.jpg','6th19w003-cp013-m_optimized.jpg','image/jpeg',14),(58,'http://localhost:8080/images/6th19c008-pb223-m.jpg','6th19c008-pb223-m.jpg','image/jpeg',15),(59,'http://localhost:8080/images/6th19c008-pg044-m.jpg','6th19c008-pg044-m.jpg','image/jpeg',15),(60,'http://localhost:8080/images/6th19c0081 (1).jpg','6th19c0081 (1).jpg','image/jpeg',15),(61,'http://localhost:8080/images/6th19c0081.jpg','6th19c0081.jpg','image/jpeg',15),(62,'http://localhost:8080/images/6th19c0082.jpg','6th19c0082.jpg','image/jpeg',15),(63,'http://localhost:8080/images/6th19c0083.jpg','6th19c0083.jpg','image/jpeg',15),(64,'http://localhost:8080/images/6th19c0084.jpg','6th19c0084.jpg','image/jpeg',15),(65,'http://localhost:8080/images/6bs20s004-pa088-m.jpg','6bs20s004-pa088-m.jpg','image/jpeg',16),(66,'http://localhost:8080/images/6bs20s004-pb087-m.jpg','6bs20s004-pb087-m.jpg','image/jpeg',16),(67,'http://localhost:8080/images/6bs20s004-pg013-m.jpg','6bs20s004-pg013-m.jpg','image/jpeg',16),(68,'http://localhost:8080/images/6bs20s004-po008-m.jpg','6bs20s004-po008-m.jpg','image/jpeg',16),(69,'http://localhost:8080/images/6bs20s004-po008-m-1.jpg','6bs20s004-po008-m-1.jpg','image/jpeg',16),(70,'http://localhost:8080/images/6bs19a002-sj404-28.jpg','6bs19a002-sj404-28.jpg','image/jpeg',17),(71,'http://localhost:8080/images/6bs19a002-sj404-33.jpg','6bs19a002-sj404-33.jpg','image/jpeg',17),(72,'http://localhost:8080/images/6bs19a002-sj404-34.jpg','6bs19a002-sj404-34.jpg','image/jpeg',17),(73,'http://localhost:8080/images/6bs20s020-sb090-m.jpg','6bs20s020-sb090-m.jpg','image/jpeg',18),(74,'http://localhost:8080/images/6bs20s020-sk010-m.jpg','6bs20s020-sk010-m.jpg','image/jpeg',18),(75,'http://localhost:8080/images/6bs20s020-sw011-m.jpg','6bs20s020-sw011-m.jpg','image/jpeg',18),(76,'http://localhost:8080/images/6bs20s020-sw011-m-4.jpg','6bs20s020-sw011-m-4.jpg','image/jpeg',18),(77,'http://localhost:8080/images/6bs19a005-se163-33_thumb.jpg','6bs19a005-se163-33_thumb.jpg','image/jpeg',19),(78,'http://localhost:8080/images/6bs19a005-se163-34.jpg','6bs19a005-se163-34.jpg','image/jpeg',19),(79,'http://localhost:8080/images/6bs19a005-sk010-28-2.jpg','6bs19a005-sk010-28-2.jpg','image/jpeg',19),(80,'http://localhost:8080/images/6bs19a005-sk010-34.jpg','6bs19a005-sk010-34.jpg','image/jpeg',19),(81,'http://localhost:8080/images/6bs19a005-sr014-29_-4.jpg','6bs19a005-sr014-29_-4.jpg','image/jpeg',19),(82,'http://localhost:8080/images/6ta20s005-sp089_1_.jpg','6ta20s005-sp089_1_.jpg','image/jpeg',20),(83,'http://localhost:8080/images/6ta20s005-sp089_2_.jpg','6ta20s005-sp089_2_.jpg','image/jpeg',20),(84,'http://localhost:8080/images/6ta20s005-sp089-m.jpg','6ta20s005-sp089-m.jpg','image/jpeg',20),(85,'http://localhost:8080/images/6rs20s018-sg069_1_.jpg','6rs20s018-sg069_1_.jpg','image/jpeg',21),(86,'http://localhost:8080/images/6ts20s018-sb038-m_copy.jpg','6ts20s018-sb038-m_copy.jpg','image/jpeg',21),(87,'http://localhost:8080/images/6ts20s018-sg069-m_copy.jpg','6ts20s018-sg069-m_copy.jpg','image/jpeg',21),(88,'http://localhost:8080/images/6ts20s018-sy031-1.jpg','6ts20s018-sy031-1.jpg','image/jpeg',21),(89,'http://localhost:8080/images/6ts20s018-sy031-2.jpg','6ts20s018-sy031-2.jpg','image/jpeg',21),(90,'http://localhost:8080/images/6ts20s003-pg038_1_.jpg','6ts20s003-pg038_1_.jpg','image/jpeg',22),(91,'http://localhost:8080/images/6ts20s003-pg038_2_.jpg','6ts20s003-pg038_2_.jpg','image/jpeg',22),(92,'http://localhost:8080/images/6ts20s003-pg038-m.jpg','6ts20s003-pg038-m.jpg','image/jpeg',22),(93,'http://localhost:8080/images/6ts19s031-pg038-33.jpg','6ts19s031-pg038-33.jpg','image/jpeg',23),(94,'http://localhost:8080/images/6ts19s031-pg038-34.jpg','6ts19s031-pg038-34.jpg','image/jpeg',23),(95,'http://localhost:8080/images/6ts19s031-pg038-35.jpg','6ts19s031-pg038-35.jpg','image/jpeg',23),(96,'http://localhost:8080/images/6ts19s031-pg038-36.jpg','6ts19s031-pg038-36.jpg','image/jpeg',23),(97,'http://localhost:8080/images/6ts19s031-pg038-m-abc.jpg','6ts19s031-pg038-m-abc.jpg','image/jpeg',23),(98,'http://localhost:8080/images/6ts19s031-pr067-m-abc.jpg','6ts19s031-pr067-m-abc.jpg','image/jpeg',23),(99,'http://localhost:8080/images/6ts20s005-sb213-m.jpg','6ts20s005-sb213-m.jpg','image/jpeg',24),(100,'http://localhost:8080/images/6ts20s005-sk010-m.jpg','6ts20s005-sk010-m.jpg','image/jpeg',24),(101,'http://localhost:8080/images/6ts20s005-so133_1_.jpg','6ts20s005-so133_1_.jpg','image/jpeg',24),(102,'http://localhost:8080/images/6ts20s005-so133_2_.jpg','6ts20s005-so133_2_.jpg','image/jpeg',24),(103,'http://localhost:8080/images/6ts20s005-so133-m.jpg','6ts20s005-so133-m.jpg','image/jpeg',24),(104,'http://localhost:8080/images/6ts20s005-sw011-m.jpg','6ts20s005-sw011-m.jpg','image/jpeg',24);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `available` bit(1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `unit_price` decimal(19,2) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,_binary '','2020-05-14 05:41:00','Váy liền nữ cam mát mẻ','Váy liền nữ',200000.00,3),(2,_binary '','2020-05-14 05:41:39','Váy trắng mát mẻ ngày hè','Váy liền nữ trắng',300000.00,3),(3,_binary '','2020-05-14 05:42:42','Váy cổ tròn mát mẻ','Váy liền nữ cổ tròn',150000.00,3),(4,_binary '','2020-05-14 05:43:32','Váy hè mát mẻ','Váy liền nữ in to',200000.00,3),(5,_binary '','2020-05-14 05:45:04','Linen huyền thoại','Váy liền nữ Linen',500000.00,3),(6,_binary '','2020-05-14 05:45:43','Chống nắng ngày hè','Áo chống nắng',100000.00,6),(7,_binary '','2020-05-14 05:46:33','Aó gió ngày hè','Áo gió 3 giây 4 cản nữ',100000.00,6),(8,_binary '','2020-05-14 05:47:04','Nỉ mát mẻ cực kì','Áo khoác nỉ nữ',100000.00,6),(9,_binary '','2020-05-14 05:47:57','Khoác bờ vai anh ','Áo khoác nữ',150000.00,6),(10,_binary '','2020-05-14 05:48:50','Jean ngày hè mát mẻ','Quần dài Jean nữ',100000.00,5),(11,_binary '','2020-05-14 05:49:20','Annie huyền thoại','Quần jean nữ Annie',100000.00,5),(12,_binary '','2020-05-14 05:50:19','Sơ mi mát mẻ','Áo sơ mi nữ',100000.00,1),(13,_binary '','2020-05-14 05:50:56','Kawa huyền thoại','Áo sơ mi nữ Kawa',50000.00,2),(14,_binary '','2020-05-14 05:51:29','Dayan huyền thoại','Áo sơ mi nữ Dayan',50000.00,2),(15,_binary '','2020-05-14 05:52:07','Họa tiết chuyên nghiệp','Áo sơ mi nữ họa tiết',120000.00,2),(16,_binary '','2020-05-14 05:52:44','Short mát mẻ','Quần short nữ',50000.00,4),(17,_binary '','2020-05-14 05:53:16','Aloha huyền thoại','Quần short nữ Aloha',50000.00,4),(18,_binary '','2020-05-14 05:53:50','Galio huyền thoại','Quần short nữ Galio',70000.00,4),(19,_binary '','2020-05-14 05:54:26','Gats huyền thoại','Quần short nữ Gats',60000.00,4),(20,_binary '','2020-05-14 05:55:05','Hồng hào nữ tính','Áo ba lỗ nữ',500000.00,1),(21,_binary '','2020-05-14 05:56:55','phông mát mẻ','Áo phông nữ',150000.00,1),(22,_binary '','2020-05-14 05:57:45','Xanh lá chuối ngọt ngào','Áo phông nữ Gans',200000.00,1),(23,_binary '','2020-05-14 05:58:17','Xanh lá Mickey','Áo phông nữ kẻ Mickey',120000.00,1),(24,_binary '','2020-05-14 05:59:10','Tay kiểu cách wao','Áo phông nữ tay kiểu',100000.00,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_order`
--

DROP TABLE IF EXISTS `product_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `unit_price` decimal(19,2) DEFAULT NULL,
  `account_order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK79qcspv3fg54kaoap8c17p15l` (`account_order_id`),
  CONSTRAINT `FK79qcspv3fg54kaoap8c17p15l` FOREIGN KEY (`account_order_id`) REFERENCES `account_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_order`
--

LOCK TABLES `product_order` WRITE;
/*!40000 ALTER TABLE `product_order` DISABLE KEYS */;
INSERT INTO `product_order` VALUES (1,'CAM','http://localhost:8080/images/6ts20s005-sb213-m.jpg','Áo phông nữ tay kiểu',24,1,'S',100000.00,1),(2,'CAM','http://localhost:8080/images/6ts20s005-sb213-m.jpg','Áo phông nữ tay kiểu',24,1,'L',100000.00,1),(3,'TRẮNG','http://localhost:8080/images/6th19c008-pb223-m.jpg','Áo sơ mi nữ họa tiết',15,1,'S',120000.00,1),(4,'XANH','http://localhost:8080/images/6th19c008-pb223-m.jpg','Áo sơ mi nữ họa tiết',15,1,'S',120000.00,1),(5,'XANH','http://localhost:8080/images/6th19c008-pb223-m.jpg','Áo sơ mi nữ họa tiết',15,1,'L',120000.00,1),(6,'XANH','http://localhost:8080/images/6bs20s020-sb090-m.jpg','Quần short nữ Galio',18,1,'S',70000.00,1),(7,'XANH','http://localhost:8080/images/6tc19s001--1.jpg','Áo khoác nữ',9,1,'S',150000.00,2),(8,'XANH','http://localhost:8080/images/6bj19w003-sj505-m.jpg','Quần jean nữ Annie',11,1,'S',100000.00,2),(9,'CAM','http://localhost:8080/images/6ts20s005-sb213-m.jpg','Áo phông nữ tay kiểu',24,1,'S',100000.00,3),(10,'XANH','http://localhost:8080/images/6bj19a006-sj286-28.jpg','Quần dài Jean nữ',10,1,'S',100000.00,3),(11,'XANH','http://localhost:8080/images/6ot19w007-sk010-m.jpg','Áo khoác nỉ nữ',8,1,'S',100000.00,4),(12,'XANH','http://localhost:8080/images/6ot19w007-sk010-m.jpg','Áo khoác nỉ nữ',8,1,'L',100000.00,4),(13,'XANH LÁ','http://localhost:8080/images/6ts19s031-pg038-33.jpg','Áo phông nữ kẻ Mickey',23,1,'S',120000.00,5),(14,'CAM','http://localhost:8080/images/6ts20s005-sb213-m.jpg','Áo phông nữ tay kiểu',24,1,'S',100000.00,6),(15,'CAM','http://localhost:8080/images/6ts20s005-sb213-m.jpg','Áo phông nữ tay kiểu',24,1,'S',100000.00,7),(16,'CAM','http://localhost:8080/images/6ts20s005-sb213-m.jpg','Áo phông nữ tay kiểu',24,1,'L',100000.00,7),(17,'XANH LÁ','http://localhost:8080/images/6ts19s031-pg038-33.jpg','Áo phông nữ kẻ Mickey',23,1,'S',120000.00,8),(18,'XANH','http://localhost:8080/images/6bj19a006-sj286-28.jpg','Quần dài Jean nữ',10,1,'S',100000.00,8),(19,'CAM','http://localhost:8080/images/6ts20s005-sb213-m.jpg','Áo phông nữ tay kiểu',24,1,'S',100000.00,9),(20,'XANH LÁ','http://localhost:8080/images/6ts19s031-pg038-33.jpg','Áo phông nữ kẻ Mickey',23,1,'S',120000.00,10),(21,'XANH LÁ','http://localhost:8080/images/6ts19s031-pg038-33.jpg','Áo phông nữ kẻ Mickey',23,1,'S',120000.00,11),(22,'XANH LÁ','http://localhost:8080/images/6ts19s031-pg038-33.jpg','Áo phông nữ kẻ Mickey',23,1,'S',120000.00,12);
/*!40000 ALTER TABLE `product_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin role','ADMIN'),(2,'Staff role','STAFF'),(3,'Customer role','CUSTOMER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `size` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj2c44yesw2o1kacfugn5oh6sg` (`product_id`),
  CONSTRAINT `FKj2c44yesw2o1kacfugn5oh6sg` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'S',1),(2,'L',1),(3,'XL',1),(4,'S',2),(5,'L',2),(6,'XL',2),(7,'XXL',2),(8,'S',3),(9,'L',3),(10,'XL',3),(11,'XXL',3),(12,'S',4),(13,'L',4),(14,'XL',4),(15,'S',5),(16,'L',5),(17,'XL',5),(18,'S',6),(19,'L',6),(20,'XL',6),(21,'S',7),(22,'L',7),(23,'XL',7),(24,'S',8),(25,'L',8),(26,'XL',8),(27,'S',9),(28,'L',9),(29,'S',10),(30,'L',10),(31,'XL',10),(32,'S',11),(33,'L',11),(34,'XL',11),(35,'S',12),(36,'L',12),(37,'S',13),(38,'L',13),(39,'XL',13),(40,'S',14),(41,'L',14),(42,'S',15),(43,'L',15),(44,'XL',15),(45,'S',16),(46,'L',16),(47,'S',17),(48,'L',17),(49,'S',18),(50,'L',18),(51,'XL',18),(52,'S',19),(53,'L',19),(54,'XXL',19),(55,'S',20),(56,'L',20),(57,'XL',20),(58,'S',21),(59,'L',21),(60,'XXL',21),(61,'S',22),(62,'L',22),(63,'S',23),(64,'L',23),(65,'XL',23),(66,'S',24),(67,'L',24);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'uniqueproject'
--

--
-- Dumping routines for database 'uniqueproject'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-14 22:01:14
