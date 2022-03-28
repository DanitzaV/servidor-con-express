const fs = require('fs')
module.exports = class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  async save(object) {
    const allobjects = await this.getAll()
    let newId = 1
    if (allobjects.length != 0) {
      newId = allobjects[allobjects.length - 1].id + 1
    }
    const newObject = { ...object, id: newId }
    allobjects.push(newObject)
    try {
      await fs.promises.writeFile(`${__dirname}/${this.archivo}`, JSON.stringify(allobjects, null, 2))
      return console.log("Se guardo correctamente c:")
    } catch (error) {
      throw new Error(`Ups :C :${error}`)
    }
  }
  async getById(id) {
    const allobjects = await this.getAll()
    if (allobjects.length == 0) {
      console.log(`Ups :c no encontramos el id: ${id}`)
    } else {
      return await allobjects.find(objetc => objetc.id == id ? objetc : console.log(`Ups :c no encontramos el id: ${id}`))
    }
  }
  async getAll() {
    try {
      //console.log("getAll", `${__dirname}/${this.archivo}`)
      const allobjects = await fs.promises.readFile(`${__dirname}/${this.archivo}`, 'utf-8')
      return JSON.parse(allobjects)
    } catch (error) {
      return []
    }
  }
  async deleteById(id) {
    const allobjects = await this.getAll()
    const index = allobjects.findIndex(objetc => objetc.id == id)
    try {
      if (index == -1) {
        throw new Error(`Ups :c no encontramos el id: ${id}`)
      }else {
        allobjects.splice(index, 1)
        await fs.promises.writeFile(this.archivo, JSON.stringify(allobjects, null, 2))
      }
    } catch (error) {
      throw new Error(`Ups :c : ${error}`)
    }
  }
  async deleteAll() {
    await fs.promises.writeFile(this.archivo, JSON.stringify([], null, 2))
  }
}
//let container = new Contenedor("productos.txt")
async function enciende(){

/* const save =  await container.save({title:"Torta de helada",price:11, thumbnail:"https://www.tortasdecocina.com/wp-content/uploads/2018/10/torta-de-chocolate-con-queso-y-chocolate-1.jpg"})
const prods = await container.getById(2)
const all = await container.getAll() */

//console.log(prods,save, all)

/* ejecutando */
/*  await container.save({title:"Torta de helada",price:11, thumbnail:"https://www.tortasdecocina.com/wp-content/uploads/2018/10/torta-de-chocolate-con-queso-y-chocolate-1.jpg"})
await container.getById(2)
await container.getAll()  */
}
/* enciende()  */
