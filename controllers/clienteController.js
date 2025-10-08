const db = require('../config/db')

exports.crearCliente = async (req, res) => {
  const {apellidos, nombres, dni, telefono, direccion, tienda_id} = req.body

  if (!apellidos || !nombres || !dni || !direccion || !tienda_id){
    return res.status(400).json({mensaje: 'Falta completar los campos'})
  }

  const sql = "INSERT INTO clientes (apellidos, nombres, dni, telefono, direccion, tienda_id) VALUES (?,?,?,?,?,?)"

  try{
    const result = await db.query(sql, [apellidos, nombres, dni, telefono, direccion, tienda_id])

    res.status(201).json({
      id: result.insertId,
      mensaje: 'Registrado correctamente'
    })

  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

exports.obtenerClientes = async (req, res) => {
  const sql = "SELECT id, apellidos, nombres, dni, telefono, direccion, tienda_id FROM clientes"

  try{
    const [clientes] = await db.query(sql)
    res.status(200).json(clientes)
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

exports.obtenerClientePorId = async (req, res) => {
  const {id} = req.params
  const sql = "SELECT id, apellidos, nombres, dni, telefono, direccion, tienda_id FROM clientes WHERE id = ?"

  try{
    const [clientes] = await db.query(sql, [id])

    if(clientes.length == 0){
      return res.status(404).json({mensaje: 'No encontramos el cliente'})
    }

    res.status(200).json(clientes[0])
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

exports.actualizarCliente = async (req, res) => {
  const {id} = req.params
  const {apellidos, nombres, dni, telefono, direccion, tienda_id} = req.body

  if (!apellidos && !nombres && !dni && !telefono && !direccion && !tienda_id){
    return res.status(400).json({mensaje: 'Falta completar los campos'})
  }

  let sqlParts = []
  let values = []

  if (apellidos){
    sqlParts.push('apellidos = ?')
    values.push(apellidos)
  }

  if (nombres){
    sqlParts.push('nombres = ?')
    values.push(nombres)
  }

  if (dni){
    sqlParts.push('dni = ?')
    values.push(dni)
  }

  if (telefono){
    sqlParts.push('telefono = ?')
    values.push(telefono)
  }

  if (direccion){
    sqlParts.push('direccion = ?')
    values.push(direccion)
  }

  if (tienda_id){
    sqlParts.push('tienda_id = ?')
    values.push(tienda_id)
  }

  if (sqlParts.length == 0){
    return res.status(400).json({mensaje: 'No hay datos por actualizar'})
  }

  values.push(id)
  const sql = `UPDATE clientes SET ${sqlParts.join(', ')} WHERE id = ?`

  try{
    const [result] = await db.query(sql, values)

    if (result.affectedRows === 0){
      return res.status(404).json({mensaje:'No encontramos el cliente con el ID'})
    }

    res.status(200).json({mensaje: 'Actualizado correctamente'})
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

exports.eliminarCliente = async (req, res) => {
  const {id} = req.params
  const sql = "DELETE FROM clientes WHERE id = ?"

  try{
    const [result] = await db.query(sql, [id])

    if (result.affectedRows === 0){
      return res.status(404).json({mensaje: 'Cliente no encontrado para eliminar'})
    }

    res.status(200).json({mensaje: 'Eliminado correctamente'})
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}