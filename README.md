# Procedimientos
1. Clonar el repositorio
fit clone https://...
2. Restaurar la BD
```sql
CREATE DATABASE electroperu;
use electroperu;

CREATE TABLE productos
(
   id INT AUTO_INCREMENT PRIMARY KEY,
   descripcion  VARCHAR(50) NOT NULL,
   garantia     TINYINT     NOT NULL,
   precio       DECIMAL(7,2) NOT NULL
)ENGINE = INNODB;
```

3.Abrir el proyecto _electroperu_ en VSCode

4. Abrir la terminal **CTRL + Ñ** escribir: 
```
npm install
```
Se ejecutara la instalacion de todas las dependencias definidas en **package.json**

5. Crear e Ingresar los parametros en el archivo **.env**

6. Ejecutar el servidor (_nodemon)
```
nodemon server
```

7. Verificar cada verbo (GET/POST/PUT/DELETE) utilizando PostMan, ThunderClient