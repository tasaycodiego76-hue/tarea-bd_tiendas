const express = require ('express')

//Actualizacion para despegar el frone
const cors = require('cors')// Permisos sobre el contenido a desplegar
const path = require('path')//Express servir el frontend

const clienteRoutes = require('./routes/clienteRoutes')

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

//Actualizacion - Permisos cors
app.use(cors({
  origin:'*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials:true
}))

//Actualizacion:
//Servir los documentos HTML, CSS JS
app.use(express.static(path.join(__dirname, 'public')))

//http://localhost:3000 -> public>tiendas.html
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'tiendas.html'))
})

//Comunicacion se realizara JSON
app.use(express.json())

//Rutas
app.use('/api/clientes', clienteRoutes)

//Iniciar el servidor
app.listen(PORT, () =>{
  console.log (`Servidor iniciado http://localhost:${PORT}`)
})