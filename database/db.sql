CREATE DATABASE webapp;

USE webapp;

CREATE TABLE linkVideo (
  id INT(11) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  url VARCHAR(200) NOT NULL,
  category VARCHAR(15) NOT NULL,
  user INT(11),
  id_Pla INT(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user) REFERENCES users(id),
  CONSTRAINT fk_Pla FOREIGN KEY(id_Pla) REFERENCES plataforma(id_Pla)

);

ALTER TABLE linkVideo
  ADD PRIMARY KEY (id);

ALTER TABLE linkVideo
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE linkVideo;

CREATE TABLE rate(
  id_rates INT(11) NOT NULL,
  rates INT(11) NOT NULL,
  CONSTRAINT fk_idvid FOREIGN KEY(id_rates) REFERENCES linkVideo(id)
);

CREATE TABLE users(
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL, 
  name VARCHAR(100) NOT NULL,
  gmail VARCHAR(100) NOT null,
  password VARCHAR(60) NOT NULL
 
);

ALTER TABLE user
  ADD PRIMARY KEY (id);

ALTER TABLE user
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


CREATE TABLE plataforma(
  id_Pla INT(11) NOT NULL,
  name_Pla VARCHAR(15) NOT NULL
);
INSERT INTO plataforma (id_Pla, name_Pla)  VALUES (1,'Youtube');
INSERT INTO plataforma (id_Pla, name_Pla)  VALUES (2,'Vimeo');
INSERT INTO plataforma (id_Pla, name_Pla)  VALUES (3,'Metacafe');
INSERT INTO plataforma (id_Pla, name_Pla)  VALUES (4, 'Viddler');
INSERT INTO plataforma (id_Pla, name_Pla)  VALUES (5, 'Twitch');

ALTER TABLE plataforma
  ADD PRIMARY KEY (id_Pla);
