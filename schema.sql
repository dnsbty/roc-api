/* DROP tables if they exist */
DROP TABLE IF EXISTS users;

/* CREATE tables if they don't exist */
CREATE TABLE users (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	facebookID VARCHAR(255) NOT NULL UNIQUE,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255),
	joinDate DATETIME NOT NULL
);