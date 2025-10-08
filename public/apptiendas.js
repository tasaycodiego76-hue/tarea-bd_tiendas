const API_URL = 'http://localhost:3000/api/clientes'
const formulario = document.getElementById('form-cliente')
const tabla = document.querySelector('#table-clientes tbody')
const idcliente = document.getElementById('idcliente')
const apellidos = document.getElementById('apellidos')
const nombres = document.getElementById('nombres')
const dni = document.getElementById('dni')
const telefono = document.getElementById('telefono')
const direccion = document.getElementById('direccion')
const tienda_id = document.getElementById('tienda_id')

const btnGuardar = document.getElementById('btnGuardar')
const btnCancelar = document.getElementById('btnCancelar')

btnCancelar.addEventListener('click', () => {
  idcliente.value = ''
  btnGuardar.innerText = 'Guardar'
})

async function obtenerClientes(){
  const response = await fetch(API_URL, {method: 'get'}) 
  const clientes = await response.json()
  console.log(clientes)
  tabla.innerHTML = ''
  clientes.forEach(cliente => {
    const row = tabla.insertRow()
    row.insertCell().textContent = cliente.id 
    row.insertCell().textContent = cliente.apellidos
    row.insertCell().textContent = cliente.nombres
    row.insertCell().textContent = cliente.dni
    row.insertCell().textContent = cliente.telefono
    row.insertCell().textContent = cliente.direccion
    
    const tiendaCell = row.insertCell()
    if(cliente.tienda_id == 1) tiendaCell.textContent = 'ICA'
    else if(cliente.tienda_id == 2) tiendaCell.textContent = 'CHINCHA'
    else if(cliente.tienda_id == 3) tiendaCell.textContent = 'LIMA'
    
    const actionCell = row.insertCell()
    
    const editButton = document.createElement('button')
    editButton.textContent = 'Editar'
    editButton.classList.add('btn', 'btn-info', 'btn-sm', 'me-1')
    editButton.onclick = () => cargarParaEdicion(cliente)
    
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Eliminar'
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm')
    deleteButton.onclick = () => eliminarCliente(cliente.id, cliente.apellidos, cliente.nombres)
    
    actionCell.appendChild(editButton)
    actionCell.appendChild(deleteButton)
  })
}

async function eliminarCliente(id, apellidos, nombres){
  if (confirm(`¿Está seguro de eliminar al cliente: ${apellidos} ${nombres}?`)){
    try{
      const response = await fetch(API_URL + `/${id}`, {method: 'delete'})
      if (!response.ok){
        throw new Error(`Error al eliminar: ${apellidos} ${nombres}`)
      }
      const result = await response.json()
      console.log(result)
      obtenerClientes()
    }catch(e){
      console.error(e)
    }
  }
}

async function cargarParaEdicion(cliente) {
  idcliente.value = cliente.id
  apellidos.value = cliente.apellidos
  nombres.value = cliente.nombres
  dni.value = cliente.dni
  telefono.value = cliente.telefono
  direccion.value = cliente.direccion
  tienda_id.value = cliente.tienda_id
  btnGuardar.innerText = 'Actualizar'
}

formulario.addEventListener("submit", async (event) => {
  event.preventDefault()
  
  const data = {
    apellidos: apellidos.value,
    nombres: nombres.value,
    dni: dni.value,
    telefono: telefono.value,
    direccion: direccion.value,
    tienda_id: parseInt(tienda_id.value)
  }
  
  try{
    let response = null
    
    if (idcliente.value == ''){
      response = await fetch(API_URL, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
    }else{
      response = await fetch(API_URL + `/${idcliente.value}`, {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
    }
    
    const result = await response.json()
    console.log(result)
    btnGuardar.innerText = 'Guardar'
    idcliente.value = ''
    formulario.reset()
    obtenerClientes()
  }catch(e){
    console.error(e)
  }
})

document.addEventListener('DOMContentLoaded', obtenerClientes)