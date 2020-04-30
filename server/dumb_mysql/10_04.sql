-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: voucherbellastudio
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `compras_status_uso`
--

DROP TABLE IF EXISTS `compras_status_uso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras_status_uso` (
  `status_uso_id_fk` int(11) NOT NULL AUTO_INCREMENT,
  `nome_status` varchar(45) NOT NULL,
  PRIMARY KEY (`status_uso_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_status_uso`
--

LOCK TABLES `compras_status_uso` WRITE;
/*!40000 ALTER TABLE `compras_status_uso` DISABLE KEYS */;
INSERT INTO `compras_status_uso` VALUES (1,'Não usado'),(2,'Usado');
/*!40000 ALTER TABLE `compras_status_uso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras_vouchers`
--

DROP TABLE IF EXISTS `compras_vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras_vouchers` (
  `voucher_compra_id` int(11) NOT NULL AUTO_INCREMENT,
  `data_compra` timestamp NOT NULL DEFAULT current_timestamp(),
  `email_comprador` varchar(45) NOT NULL,
  `status_pag` varchar(45) NOT NULL DEFAULT 'Não pago',
  `status_uso_id_fk` int(11) DEFAULT 1,
  `id_pagamento` varchar(45) DEFAULT NULL,
  `telefone` varchar(11) NOT NULL,
  PRIMARY KEY (`voucher_compra_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6843 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_vouchers`
--

LOCK TABLES `compras_vouchers` WRITE;
/*!40000 ALTER TABLE `compras_vouchers` DISABLE KEYS */;
INSERT INTO `compras_vouchers` VALUES (6842,'2020-04-10 23:24:42','giovanna@houpa.app','Não pago',1,NULL,'11956472663');
/*!40000 ALTER TABLE `compras_vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras_vouchers_itens`
--

DROP TABLE IF EXISTS `compras_vouchers_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras_vouchers_itens` (
  `idcompras_vouchers_itens` int(11) NOT NULL AUTO_INCREMENT,
  `voucher_compra_id_fk` int(11) NOT NULL,
  `voucher_id_fk` int(11) NOT NULL,
  `preco_voucher` float NOT NULL,
  `qtd_vouchers` int(11) NOT NULL,
  PRIMARY KEY (`idcompras_vouchers_itens`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_vouchers_itens`
--

LOCK TABLES `compras_vouchers_itens` WRITE;
/*!40000 ALTER TABLE `compras_vouchers_itens` DISABLE KEYS */;
INSERT INTO `compras_vouchers_itens` VALUES (5,6842,1,100,2),(6,6842,2,130,1);
/*!40000 ALTER TABLE `compras_vouchers_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interesses`
--

DROP TABLE IF EXISTS `interesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interesses` (
  `id_interesse` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(45) NOT NULL,
  `email_cliente` varchar(45) NOT NULL,
  `telefone_cliente` varchar(11) NOT NULL,
  `data_interesse` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_interesse`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interesses`
--

LOCK TABLES `interesses` WRITE;
/*!40000 ALTER TABLE `interesses` DISABLE KEYS */;
INSERT INTO `interesses` VALUES (1,'Giovanna','giovanna@houpa.app','11956472663','2020-04-07 23:35:53');
/*!40000 ALTER TABLE `interesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_vouchers`
--

DROP TABLE IF EXISTS `tipos_vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_vouchers` (
  `tipo_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`tipo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_vouchers`
--

LOCK TABLES `tipos_vouchers` WRITE;
/*!40000 ALTER TABLE `tipos_vouchers` DISABLE KEYS */;
INSERT INTO `tipos_vouchers` VALUES (1,'Vouchers de quarentena'),(2,'Combos'),(3,'Tratamento Truss'),(4,'Produtos para cuidados em casa'),(5,'Serviços');
/*!40000 ALTER TABLE `tipos_vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vouchers` (
  `voucher_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_voucher_id_fk` int(11) NOT NULL,
  `voucher_nome` varchar(120) NOT NULL,
  `voucher_desc` text NOT NULL,
  `voucher_preco_antigo` float NOT NULL,
  `voucher_preco_novo` float NOT NULL,
  `voucher_image` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`voucher_id`),
  KEY `tipo_voucher_id_fk` (`tipo_voucher_id_fk`),
  CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`tipo_voucher_id_fk`) REFERENCES `tipos_vouchers` (`tipo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,1,'Progressiva cabelo curto','Progressiva cabelo curto',150,100,'progressiva.jpeg'),(2,1,'Progressiva cabelo médio','Progressiva cabelo médio',180,130,'progressiva.jpeg'),(3,1,'Progressiva cabelo longo','Progressiva cabelo longo',220,160,'progressiva.jpeg'),(4,1,'Corte Masculino','Corte Masculino',55,40,'corte_masculino.jpeg'),(5,1,'Corte Feminino','Corte Feminino',75,55,'corte_feminino.jpeg'),(6,1,'Retoque de raiz','Retoque de raiz',150,90,''),(7,1,'Retoque de raiz + escova','Retoque de raiz + escova',180,110,''),(8,1,'Retoque de raiz + escova + corte','Retoque de raiz + escova + corte',250,170,''),(9,1,'Limpeza de sobrancelha','Limpeza de sobrancelha',38,28,'sobrancelha.jpeg'),(10,1,'Maquiagem expressa','Maquiagem expressa',110,60,'make_expressa.jpeg'),(11,1,'Maquiagem madrinha','Maquiagem madrinha',180,100,'maquiagem.jpeg'),(12,1,'Maquiagem noiva','Maquiagem noiva',300,190,'make_noiva.jpeg'),(13,1,'Colocação de cílios','Colocação de cílios',180,110,'colocacao_cilios.jpeg'),(14,2,'#toDeVolta','Corte + hidração + escova  Pé + mão e Sombrancelhas',287,186,'to_de_volta.jpeg'),(15,2,'#vencemos','Hidratação ( Evooc ou Loreal )  + escova + Mão + Sombrancelhas',243,158,'vencemos.jpeg'),(16,2,'#união','Pé e mão',54,45,'uniao.jpeg'),(17,2,'#ficouTudoBem','Corte + Coloraçao + hidratação + escova + mão + pé + sombrancelhas',427,348,'ficoutudobem.jpeg'),(18,2,'#family','Corte Feminino + corte infantil',120,95,'family.jpeg'),(19,2,'#familyForever','Papai + mamae + corte infantil',175,125,'familyforever.jpeg'),(20,2,'#missaoMadrinha','Maquiagem + penteado',350,220,'combo_make_penteado.jpeg'),(21,2,'#euSouNoiva','Maquiagem + penteado',650,350,'combo_noiva.jpeg'),(22,2,'#semPelosNoRosto','design de sobrancelhas + buço com linha',80,50,''),(23,3,'Blond Recovery com 4 passos - cabelo curto','Ideal para pré e pós mechas Reconstruçao de Resistência ',250,180,''),(24,3,'Blond Recovery com 4 passos - cabelo médio','Ideal para pré e pós mechas Reconstruçao de Resistência ',320,250,''),(25,3,'Blond Recovery com 4 passos - cabelo longo','Ideal para pré e pós mechas Reconstruçao de Resistência ',380,290,''),(26,3,'Amino Restore com 6 passos - cabelo curto','Ideal para cabelos quimicamente tratados - aliados coloridos. Recuperaçao e Resistencia , elasticidade e brilho. *Com finalizaçao em escova modelada ou lisa ',380,310,''),(27,3,'Amino Restore com 6 passos - cabelo médio','Ideal para cabelos quimicamente tratados - aliados coloridos. Recuperaçao e Resistencia , elasticidade e brilho. *Com finalizaçao em escova modelada ou lisa ',420,350,''),(28,3,'Amino Restore com 6 passos - cabelo longo','Ideal para cabelos quimicamente tratados - aliados coloridos. Recuperaçao e Resistencia , elasticidade e brilho. *Com finalizaçao em escova modelada ou lisa ',510,380,''),(29,3,'Perfect Curls  com 5 passos - cabelo curto','Ideal para cabelos Cacheados , Volumosos e com frizz',250,180,''),(30,3,'Perfect Curls  com 5 passos - cabelo médio','Ideal para cabelos Cacheados , Volumosos e com frizz',320,250,''),(31,3,'Perfect Curls  com 5 passos - cabelo longo','Ideal para cabelos Cacheados , Volumosos e com frizz',380,290,''),(32,3,'Anti - Aging com 3 passos - cabelo curto','Um tratamento que age diretamente na raiz dos fios fortalecendo ativos para a renovaçao celular ',230,150,''),(33,3,'Anti - Aging com 3 passos - cabelo médio','Um tratamento que age diretamente na raiz dos fios fortalecendo ativos para a renovaçao celular ',280,180,''),(34,3,'Anti - Aging com 3 passos - cabelo longo','Um tratamento que age diretamente na raiz dos fios fortalecendo ativos para a renovaçao celular ',320,230,''),(35,3,'Sun Trat com 4 passos - cabelo curto','Tratamento dos fios antes e após exposiçao ao sol, mar e piscina',250,180,''),(36,3,'Sun Trat com 4 passos - cabelo médio','Tratamento dos fios antes e após exposiçao ao sol, mar e piscina',320,250,''),(37,3,'Sun Trat com 4 passos - cabelo longo','Tratamento dos fios antes e após exposiçao ao sol, mar e piscina',380,290,''),(57,4,'Ultra hydration','Kit para cabelos secos, opacos e frágeis. Garante muito mais hidratação e maciez enquanto restaura danos',245,180,'ultra_hydration.jpeg'),(58,4,'Infusion','Kit para cabelos secos e quebradiços. Repara e fortace os fios para devolver o movimento',230,189,'infusion.jpeg'),(59,4,'Day by day (kit shampoo e condicionador)','Kit miracle Summer para cabelos expostos ao sol, mar, ao cloro da piscina e ao vento. Protege nutre e hidrata ',209,155,'day_by_day.jpeg'),(60,4,'Day by day (kit shampoo, condicionador e living)','Kit miracle Summer para cabelos expostos ao sol, mar, ao cloro da piscina e ao vento. Protege nutre e hidrata ',351,274,'day_by_day.jpeg'),(61,4,'Curly light','Leave-in e creme para pentear para cabelos cacheados ou ondulados',120,95,'curly_light.jpeg'),(62,4,'Uso obrigatório','Uso obrigatório Summer para cabelos danificados por exposição ao sol',159,130,'uso_obrigatorio.jpeg'),(63,4,'Therapy','Shampoo para cabelos com caspa ou queda. Estimula a regeneração capilar e reduz as disfunções do couro',120,89,'therapy.jpeg'),(64,4,'Equilibrium','Kit equilibrium para cabelos oleosos ou mistos. Atua no couro cabeludo contra a oleosidade sem ressecar os fios',215.8,165,'equilibrium.jpeg');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-10 20:27:31
