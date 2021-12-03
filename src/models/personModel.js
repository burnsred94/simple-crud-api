let persons = require('../person/person.json')
const { v4: uuidv4 } = require('uuid')
const { writeDataFile } = require('../utils/utils')



function findAll() {
    return new Promise((resolve, reject)=>{
        resolve(persons)
    })
}

function findById(id) {
    return new Promise((resolve, reject)=>{
        const person = persons.find((p)=> p.id === id);
        resolve(person)
    })
}

function create(person) {
    return new Promise((resolve, reject)=>{
        const newPerson = {id:uuidv4(),...person}
        persons.push(newPerson)
        writeDataFile('C:/Users/ASUS/Desktop/simple-crud-api/src/person/person.json', persons)
        resolve(newPerson)
    })
}

function update (id, person){
    return new Promise((resolve,reject)=>{
        const index = persons.findIndex((p) => p.id === id)
        persons[index] = {id, ...person}
        writeDataFile('C:/Users/ASUS/Desktop/simple-crud-api/src/person/person.json', persons)
        resolve(persons[index])
    })
}

function remove (id){
    return new Promise((resolve,reject)=>{
        persons = persons.filter((a)=> a.id !== id)
        writeDataFile('../person/person.json', persons)
        resolve()
    })
}



module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}