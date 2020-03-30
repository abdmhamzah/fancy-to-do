const { Todo } = require('../models')

class ControllerTodo {

    static getTodos(req, res){
        Todo.findAll()
            .then(todos => {
                console.log(todos, 'ini todos');
                res.status(200).json({ todos }) // OK
            })
            .catch(err => {
                res.status(500).json(err) // SERVER ERROR
            })
    }

    static getTodo(req, res){

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
    
}

module.exports = ControllerTodo