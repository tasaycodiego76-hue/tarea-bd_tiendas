const amigos = ["Juan", "Carlos", "Maria"]
const [data1] = amigos
const [,data2] = amigos
const [,,data3] = amigos

const apps = [
  ["VSCode", "Xampp", "AndroidStudio"],
  ["Photoshop", "Ilustrador", "Premier"],
  ["Excel", "PowerBI", "SAP"]
]
const [appDev] =  apps
const [,adppDesign] =  apps
const [,,appAdmin] =  apps

//console.log(appDev)
//console.log(appDesign)
//console.log(addAdmin)

//DESERIALIZACION DE OBJETOS
const SENATI ={
  zonal: "Ica Ayacucho",
  sede: "UCP Chincha",
  carrera: "Ingenieria de Software IA"

}

const{zonal, sede, carrera} = SENATI

/*
const infoZonal = SENATI.zonal
const infoSede = SENATI.Sede
const infoCarrera = SENATI.carrera
*/

console.log(infoCarrera)