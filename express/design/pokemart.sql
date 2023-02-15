DROP DATABASE IF EXISTS pokemart_db;
CREATE DATABASE pokemart_db;
USE pokemart_db;


DROP TABLE IF EXISTS regions;
CREATE TABLE regions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL
);
INSERT INTO regions (name) VALUES ('Kanto'),('Johto'),("Hoenn"),('Sinnoh'),('Teselia');



CREATE TABLE cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(35) NOT NULL,
    regionId INT NOT NULL,
    FOREIGN KEY (regionId) REFERENCES regions (id)
);
INSERT INTO cities (name, regionId) VALUES ("Pueblo Paleta", 1),("Ciudad Verde", 1),("Ciudad Plateada", 1),("Ciudad Celeste", 1),("Ciudad Carmín", 1),("Pueblo Lavanda", 1),("Ciudad Azafrán", 1),("Ciudad Azulona", 1),("Ciudad Fucsia", 1),("Isla Canela", 1),("Pueblo Primavera", 2);


DROP TABLE IF EXISTS avatars;
CREATE TABLE avatars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(35) NOT NULL
);
INSERT INTO avatars (filename) VALUES ("default.png"),("trainer1.png"),("trainer2.png"),("trainer3.png"),("trainer4.png"),("trainer5.png"),("trainer6.png"),("trainer7.png"),("trainer8.png"),("trainer9.png"),("trainer10.png"),("trainer11.png"),("trainer12.png"),("trainer13.png"),("trainer14.png"),("trainer15.png"),("trainer16.png"),("trainer17.png"),("trainer18.png"),("trainer19.png"),("trainer20.png"),("trainer21.png"),("trainer22.png"),("trainer23.png"),("trainer24.png"),("trainer25.png"),("trainer26.png"),("trainer27.png"),("trainer28.png"),("trainer29.png"),("trainer30.png"),("trainer31.png"),("trainer32.png"),("trainer33.png"),("trainer34.png"),("trainer35.png"),("trainer36.png"),("trainer37.png"),("trainer38.png"),("trainer39.png"),("trainer40.png"),("trainer41.png"),("trainer42.png"),("trainer43.png"),("trainer44.png"),("trainer45.png"),("trainer46.png"),("trainer47.png"),("trainer48.png"),("trainer49.png"),("trainer50.png"),("trainer51.png"),("trainer52.png"),("trainer53.png"),("trainer54.png"),("trainer55.png"),("trainer56.png"),("trainer57.png"),("trainer58.png"),("trainer59.png"),("trainer60.png"),("trainer61.png"),("trainer62.png"),("trainer63.png"),("trainer64.png"),("trainer65.png"),("trainer66.png"),("trainer67.png"),("trainer68.png"),("trainer69.png"),("trainer70.png"),("trainer71.png"),("trainer72.png"),("trainer73.png"),("trainer74.png"),("trainer75.png"),("trainer76.png"),("trainer77.png"),("trainer78.png"),("trainer79.png"),("trainer80.png"),("trainer81.png"),("trainer82.png"),("trainer83.png"),("trainer84.png"),("trainer85.png"),("trainer86.png"),("trainer87.png"),("trainer88.png"),("trainer89.png"),("trainer90.png"),("trainer91.png"),("trainer92.png"),("trainer93.png"),("trainer94.png"),("trainer95.png"),("trainer96.png"),("trainer97.png"),("trainer98.png"),("trainer99.png"),("trainer100.png"),("trainer101.png"),("trainer102.png"),("trainer103.png"),("trainer104.png"),("trainer105.png"),("trainer106.png");



CREATE TABLE usertypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(5) NOT NULL
);
INSERT INTO usertypes (role) VALUES ("user"),("admin"),("owner");



CREATE TABLE trainers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(15) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(70) NOT NULL,
    avatarId INT NOT NULL,
    cityId INT NOT NULL,
    money INT NOT NULL,
    usertypeId INT NOT NULL,
    FOREIGN KEY (usertypeId) REFERENCES usertypes (id),
    FOREIGN KEY (cityId) REFERENCES cities (id),
    FOREIGN KEY (avatarId) REFERENCES avatars (id)
);
INSERT INTO trainers (username,usertypeId,cityId,avatarId) VALUES ("Guest",1, 1, 1);
INSERT INTO trainers (username, email, password, avatarId, cityId, money, usertypeId) VALUES ("Aylu", "aylu@pokemart.com", 123, 1, 8, 250, 3),("Rojo", "red@gmail.com", 123, 2, 1, 999999, 1);



CREATE TABLE generations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    games VARCHAR(255) NOT NULL
);
INSERT INTO generations (games) VALUES ("RBGY"),("GSC"),("RZE"),("DPP"),("BW");



CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55) NOT NULL,
    icon VARCHAR(55) NOT NULL
);
INSERT INTO categories (name, icon) VALUES ("Botiquín", "potion.png"),("Captura", "pokeball.png"),("Mochila", "escaperope.png");



CREATE TABLE subcategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55) NOT NULL,
    icon VARCHAR(55) NOT NULL,
    categoryId INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories (id)
);
INSERT INTO subcategories (name, icon, categoryId) 
VALUES ("Curación", "potion.png",1),("Balls", "pokeball.png",2),("Combate", "xattack.png",1),("Utilidad", "escaperope.png",3),("Piedras", "waterstone.png",3),("Cartas", "mechmail.png",3),("Mejora", "carbon.png",3),("Vitaminas", "protein.png",1);



CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    subcategoryId INT NOT NULL,
    picture VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    description VARCHAR(250) NOT NULL,
    genId INT NOT NULL,
    FOREIGN KEY (subcategoryId) REFERENCES subcategories (id),
    FOREIGN KEY (genId) REFERENCES generations (id)
);
INSERT INTO items (name, subcategoryId, picture, price, description, genId) VALUES ("Poke Ball", 2, "pokeball.png", 200, "Dispositivo con diseño capsular que atrapa Pokémon salvajes. Se lanza como una bola contra el blanco.", 1),("Super Ball", 2, "superball.png", 500, "Poké Ball de alto rendimiento. Tiene un índice de éxito superior al de la Poké Ball.", 1),("Poción", 1, "potion.png", 200, "Medicina en espray que cura heridas y restaura 20 PS a un Pokémon.", 1),("Superpoción", 1, "superpotion.png", 600, "Medicina en espray que cura heridas y restaura 50 PS de un Pokémon.", 1),("Revivir", 1, "revive.png", 750, "Medicina que revive a un Pokémon debilitado y le devuelve la mitad de sus PS.", 1),("Cuerda Huida", 4, "escaperope.png", 350, "Cuerda larga y resistente que sirve para huír de cuevas y sitios cerrados en general.", 1),('Miel',4,'1667153722185-honey.png',100,'Su delicioso aroma atrae a Pokémon salvajes si se usa en zonas de hierba alta, cuevas o árboles especiales.',4),('Poke Muñeco',4,'1667153828977-pokedoll.png',1000,'Un muñeco que atrae a los Pokémon. Es útil para huír de un combate contra un Pokémon salvaje.',1),('Mas PS',8,'1667153912689-hpup.png',9800,'Nutritiva bebida que potencia los PS de base de un Pokémon.',1),('Ataque X',3,'1667154005298-xattack.png',500,'Aumenta el Ataque en combate. Al intercambiar de Pokémon, el efecto desaparece.',1),('Defensa X',3,'1667154066622-xdefense.png',550,'Aumenta la Defensa en combate. Al intercambiar de Pokémon, el efecto desaparece.',1),('Directo',3,'1667154181021-direhit.png',650,'Aumenta el índice de golpe crítico en combate. Al cambiar de Pokémon, el efecto desaparece.',1),('Agua Fresca',1,'1667154364399-freshwater.png',200,'Agua mineral que restaura 50 PS',1),('Cura Total',1,'1667154416028-fullheal.png',600,'Cura cualquier problema de estado',1);



CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trainerId INT NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (trainerId) REFERENCES trainers (id)
);


CREATE TABLE orderItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT NOT NULL,
    itemId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders (id),
    FOREIGN KEY (itemId) REFERENCES items (id)
);

CREATE TABLE chats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trainerId INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (trainerId) REFERENCES trainers (id)
);