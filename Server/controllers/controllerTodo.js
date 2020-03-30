const { Todo } = require('../models')

class ControllerTodo {

    static getTodos(req, res){
        Todo.findAll()
            .then(todos => {
                console.log(todos, 'ini todos');
                res.status(200).json({ todos }) // OK
            })
            .catch(err => {
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }

    static getTodo(req, res){
        const id = req.params.id
        Todo.findOne({ where: { id: id } })
            .then(todo => {
                if (todo) {
                    res.status(200).json({ todo })
                } else {
                    res.status(404).json({
                        messege: `Todos with ID ${id}, not found` 
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }

    static createTodo(req, res){
        const { title, description, status, due_date } = req.body
        Todo.create({
            title: title,
            description: description,
            status: status,
            due_date: due_date
        })
            .then(todo => { 
                if (todo) {
                    res.status(201).json({ todo }) // DATA CREATED
                } else {
                    res.status(400).json({ // BAD REQUEST, CLIENT ERROT
                        messege: 'Invalid Input, Please try again' 
                    })
                }
            })
            .catch(err => {
                console.log(err, 'error create todo baru');
                res.status(500).json(err) // SERVER ERROR
            })
    }
    
    static updateTodo(req, res){
        const { title, description, status, due_date } = req.body
        const id = req.params.id
    }

    static deleteTodo(req, res){
        const id = req.params.id
        Todo.destroy({ where: { id: id } })
            .then(deleted => {
                if (deleted) {
                    res.status(200).json({
                        messege: `Todos with ID ${id} successfully deleted`
                    })
                } else {
                    res.status(404).json({
                        messege: `Todos with ID ${id} cannot deleted, ID not found`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }

}

module.exports = ControllerTodo