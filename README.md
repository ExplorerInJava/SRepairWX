![图片 5](https://user-images.githubusercontent.com/39546319/130344981-990da0d3-0452-4bb4-8612-2c323b4b2b94.png)
![图片 22](https://user-images.githubusercontent.com/39546319/130344982-832c08bc-8e00-43d5-99cc-9f3665cb45ae.png)
![图片 29](https://user-images.githubusercontent.com/39546319/130344983-5e614225-5efc-4bc0-8083-52937878001b.png)
![图片 31](https://user-images.githubusercontent.com/39546319/130344984-3ffa4676-840f-457b-8a62-6b10e658686e.png)
![图片 33](https://user-images.githubusercontent.com/39546319/130344986-d287d130-3a7b-4736-97a3-c3341be84b22.png)
![图片 3](https://user-images.githubusercontent.com/39546319/130344991-e6cd1780-d3fe-478f-b5ff-b8c56aa4b54a.png)
![图片 7](https://user-images.githubusercontent.com/39546319/130344993-83c7640c-7d73-44d8-97a6-f24442ffade6.png)
![图片 10](https://user-images.githubusercontent.com/39546319/130344994-a22746a8-64a7-4160-8e78-a1ae317e4d06.png)
![图片 16](https://user-images.githubusercontent.com/39546319/130344995-cfe505fe-cba4-464c-b64b-daef60fc98cf.png)
![图片 37](https://user-images.githubusercontent.com/39546319/130344996-d62ed95c-4eb5-4c4c-b4e4-d03af198304c.png)
![图片 6](https://user-images.githubusercontent.com/39546319/130345002-0beb5028-7521-435d-9500-37a69004d79c.png)
![图片 8](https://user-images.githubusercontent.com/39546319/130345004-c78f35c3-5d38-477f-81c2-3c5bad31cd2e.png)
![图片 13](https://user-images.githubusercontent.com/39546319/130345007-31ad383e-efa2-4089-8652-11e523ba2f07.png)
![图片 24](https://user-images.githubusercontent.com/39546319/130345008-923339b6-261a-403a-b8e3-788b2ec8bf17.png)
![图片 31](https://user-images.githubusercontent.com/39546319/130345009-af91fa30-6958-4863-ad64-1517a8dfece3.png)
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
