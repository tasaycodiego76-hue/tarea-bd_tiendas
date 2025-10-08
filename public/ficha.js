const API_URL = 'http://localhost:3000/api/clientes'
const formulario = document.getElementById('form-buscar')
const dniBuscar = document.getElementById('dni-buscar')
const resultado = document.getElementById('resultado')
const mensajeError = document.getElementById('mensaje-error')

const datoApellidos = document.getElementById('dato-apellidos')
const datoNombres = document.getElementById('dato-nombres')
const datoDni = document.getElementById('dato-dni')
const datoTelefono = document.getElementById('dato-telefono')
const datoDireccion = document.getElementById('dato-direccion')
const datoTienda = document.getElementById('dato-tienda')

formulario.addEventListener('submit', async (event) => {
  event.preventDefault()
  
  const dni = dniBuscar.value.trim()
  
  try {
    const response = await fetch(API_URL)
    const clientes = await response.json()
    
    const cliente = clientes.find(c => c.dni === dni)
    
    if (cliente) {
      datoApellidos.textContent = cliente.apellidos
      datoNombres.textContent = cliente.nombres
      datoDni.textContent = cliente.dni
      datoTelefono.textContent = cliente.telefono || 'No registrado'
      datoDireccion.textContent = cliente.direccion
      
      if(cliente.tienda_id == 1) datoTienda.textContent = 'ICA'
      else if(cliente.tienda_id == 2) datoTienda.textContent = 'CHINCHA'
      else if(cliente.tienda_id == 3) datoTienda.textContent = 'LIMA'
      
      resultado.style.display = 'block'
      mensajeError.style.display = 'none'
    } else {
      resultado.style.display = 'none'
      mensajeError.style.display = 'block'
    }
  } catch (e) {
    console.error(e)
    alert('Error al buscar el cliente')
  }
})