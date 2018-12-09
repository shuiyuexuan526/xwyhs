SET NAMES utf8;

DROP DATABASE IF EXISTS xwyhs;
CREATE DATABASE xwyhs CHARSET=UTF8;
USE xwyhs;

CREATE TABLE IF NOT EXISTS `xwyhs_users` (
  `user_id` int(11) PRIMARY KEY  AUTO_INCREMENT,
  `user_name` varchar(100),
  `user_pwd` varchar(100),
  `user_mail` varchar(100),
  `user_phone` varchar(100)
);

INSERT INTO `xwyhs_users` VALUES(NULL, '吴邪', 'a123456','wuxie123@163.com',15950035666);

