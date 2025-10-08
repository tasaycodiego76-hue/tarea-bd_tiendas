# Procedimientos
1. Clonar el repositorio
fit clone https://...
2. Restaurar la BD
```sql
CREATE DATABASE bd_tiendas;
USE bd_tiendas;

CREATE TABLE tiendas (
    id     INT PRIMARY KEY AUTO_INCREMENT,
    tienda VARCHAR(50) NOT NULL
);

CREATE TABLE clientes (
    id        INT PRIMARY KEY AUTO_INCREMENT,
    apellidos VARCHAR(100) NOT NULL,
    nombres   VARCHAR(100) NOT NULL,
    dni       VARCHAR(8) NOT NULL,
    telefono  VARCHAR(15),
    direccion VARCHAR(200),
    tienda_id INT,
    FOREIGN KEY (tienda_id) REFERENCES tiendas(id)
);

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