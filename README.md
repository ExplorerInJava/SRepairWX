项目使用技术与环境配置：
项目后端使用java经典框架ssm（spring，sturts2， mybatis）框架所开发，并采用maven所为项目管理工具，开发工具为Intellij IDEA 2018.2.3 x64，jdk版本为1.8.0_77，tomcat版本为9.0。
数据库使用mysql数据库、版本为8.0，
项目前端为小程序，开发工具为微信web开发者工具，版本为v1.02.1902010，小程序开发使用ColorUI最新框架，并引入校验、wxmap等第三方js库。
项目开发使用操作系统为windows10操作系统

项目使用注意事项：
小程序功能方面：一个申请分为五种状态，status值为从零到四，“0”代表刚刚提交的申请，还未加处理，“1”表示管理员以确认接收并处理，但未联系维修部门，“2”表示设备正在维修中，“3”表示设备维修完成，“4”表示该申请彻底完结状态，管理员在维修主页看到的都是刚提交还未确认处理的申请，在“我的”界面可以查看所有申请以及处理的申请数量统计，普通用户在“我的”界面可以看到自己提交的所有申请统计，申请状态为“0”到“3”的都属于处理中申请。


建表SQL：
/*
SQLyog Trial v11.01 (32 bit)
MySQL - 8.0.11 : Database - srepair
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`srepair` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;

USE `srepair`;

/*Table structure for table `hibernate_sequence` */

DROP TABLE IF EXISTS `hibernate_sequence`;

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `hibernate_sequence` */

insert  into `hibernate_sequence`(`next_val`) values (63),(63);

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `detailAddress` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `last_date` datetime DEFAULT NULL,
  `local_path` varchar(255) DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd9e8w9v9hjt780w7ivi7po9wc` (`userId`),
  CONSTRAINT `FKd9e8w9v9hjt780w7ivi7po9wc` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `orders` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `account` varchar(255) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user` */


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
