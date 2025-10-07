//Acceso a la BD mysql/promise
const db = require('../config/db')

//Métodos exportados
//req require (solicitud)
//res response (respuesta)

//Crear
exports.crearProducto = async (req, res) =>{
  //1. Recepcionar los datos
  const {descripcion, garantia, precio}= req.body

  //Validacion de backend
  if (!descripcion || garantia == undefined || !precio){
   return res.status(400).json({mesnaje: 'Falta completar los campos'})
  }

  //3. Estructura la consulta ....? = comodin (tiene un indice, similar a un array)
  const sql = "INSERT INTO productos (descripcion, garantia, precio) VALUES (?,?,?)"

  //4. Transaccion
  try{
    //5. Ejecutamos la consulta
    const result = await db.query(sql, [descripcion, garantia, precio])

    //6. Entregar un resultado (PK)
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Registrado correctamente'
    })

  }catch(e){
    console.error(e)
    res.status(500).json({mesnaje: 'Error interno del servidor'})
  }
}

//Listar
exports.obtenerProducto = async (req, res) => {
 //1.Preparar consulta
  const sql = "SELECT id, descripcion, garantia, precio FROM productos"
//2. Transaccion
try{
  //3.Deserializacion - PRIMER VALOR DEL ARREGLO
  const [productos] = await db.query(sql)
  //4. Enviamos los resultados
  res.status(200).json(productos)
}catch(e){
  console.error(e)
  res.status(500).json({mensaje: 'Error interno del servidor'})

}
}

//Buscar por ID
exports.obtenerProductoPorId = async (req, res) => {
  //1. Obteniendo el ID desde la URL
  //.params => http//miweb.com/api/modulo/7
  const {id} = req.params
 //2.Preparar consulta
  const sql = "SELECT id, descripcion, garantia, precio FROM productos WHERE id = ?"

//3. Transaccion
try{
  //4.Deserializacion - PRIMER VALOR DEL ARREGLO
  const [productos] = await db.query(sql, [id])
//5. Validacion
  //No encontramos el producto con el ID enviado
  if(productos.length == 0){
    //Cuando se ejecuta "return" se FINALIZA  el metodo 
    return res.status(404).json({mensaje: 'No encontramos el producto'})
  }

  //6. Enviamos los resultados
  res.status(200).json(productos[0])
}catch(e){
  console.error(e)
  res.status(500).json({mensaje: 'Error interno del servidor'})

}
}

//Actualizar 
exports.actualizarProducto = async (req, res) => {
//Necesitamos parametro
const {id} = req.params

//Leer un json body
const{descripcion, garantia, precio } = req.body

//Validacion => ES OBLIGATORIO QUE ALMENOS UNO
  if (!descripcion && garantia == undefined && !precio){
   return res.status(400).json({mesnaje: 'Falta completar los campos'})
  }

  //Algoritmo eficiente de actualizacion
  //NO SE HARA => UPDATE prodcuto SET descripcion = ?, garantia = ?, precio = ? WHERE id ?
  //SE DESARROLLARÁ => UPDATE productos SET precio = ? WHERE id = ? 
  let sqlParts = [] // campos que sufriran actualizacion
  let values = [] //valores para los campos

  if (descripcion){
    sqlParts.push('descripcion = ?')
    values.push(descripcion)
  }

  if (garantia != undefined){
    sqlParts.push('garantia = ?')
    values.push(garantia)
  }
  if (precio){
    sqlParts.push('precio= ?')
    values.push(precio)
  }

  if (sqlParts.length == 0){
    return res.status(400).json({mensaje: 'No hay datos por actualizar'})
  }

    values.push(id)
    const sql = `UPDATE productos SET ${sqlParts.join(', ')} WHERE id = ?`
  
    try{
      const [result] = await db.query(sql, values)

      if (result.affectedRows === 0){
        return res.status(404).json({mensaje:'No encontramos el producto con el ID'})
      }

      res.status(200).json({mensaje: 'Actualizado correctamente'})
    }
    catch(e){
      console.error(e)
      res.status(500).json({mensaje: 'Error interno del servidor'})
    }
  }



exports.eliminarProducto = async (req, res) =>{
    const {id} = req.params
    const sql = "DELETE FROM productos WHERE id = ?" //DELETE ES IRRESVERSIBLE
    try{
      const [result] = await db.query(sql, [id])

      if (result.affectedRows === 0){
        return res.status(404).json({mensaje: 'Producto no encontrado para eliminar'})
      }

      res.status(200).json({mensaje: 'Eliminado correctamente'})
    }catch(e){
      console.error(e)
      res.status(500).json({mesnaje: 'Error interno del servidor'})
    }
  }
//Eliminar