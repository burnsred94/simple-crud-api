const Person = require('../models/personModel')

const { getPostData } = require('../utils/utils')


// @desc Gets all person
// @route /person
async function getPersons (req, res) {
    try {
        const persons = await Person.findAll()

        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(persons))
    } catch (error) {
        console.log(error)
    }
}

// @desc Get single person
// @route /person/:id
async function getPerson (req, res, id) {
    try {
        const person = await Person.findById(id)
        if(!person){
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: 'Person not found'}))
        }else{
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify(person))
        }
        
    } catch (error) {
        console.log(error)
    }
}

// @desc Creat a person
// @route POST /person
async function createPerson (req, res) {
    try {

        const body = await getPostData(req)
    
            const { name, age, hobbies } =  JSON.parse(body)
             
            const person = {
                name,
                age, 
                hobbies
            }
            
            const newPerson =  await Person.create(person)
            
            res.writeHead(201, {'Content-Type' : 'application/json'})
            return res.end(JSON.stringify(newPerson))

    } catch (error) {
        console.log(error)
    }
}

// @desc Update a person
// @route PUT /person
async function updatePerson(req, res, id) {
    try {
        const person = Person.findById(id)

        if(!person){
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: 'Person not found'}))
        }else {
            const body = await getPostData(req)
    
            const { name, age, hobbies } =  JSON.parse(body)
             
            const personData = {
                name: name || person.name,
                age: age || person.age, 
                hobbies: hobbies || person.hobbies
            }
            
            const updPerson =  await Person.update(id, personData)
            
            res.writeHead(200, {'Content-Type' : 'application/json'})
            return res.end(JSON.stringify(updPerson))
        }

    } catch (error) {
        console.log(error)
    }
}

// @descr DELETE a person:id
// @rout DELETE /person:id
async function removePerson(req, res, id){
    try {
        const person = await Person.findById(id)
        if(!person){
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: 'Person not found'}))
        }else{
            await Person.remove(id)
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: `Person ${id} remove`}))
        }
        
    } catch (error) {
        console.log(error)
    }
}

 

module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    removePerson
}