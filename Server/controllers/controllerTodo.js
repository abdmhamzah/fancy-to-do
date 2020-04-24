const { Todo, User, Product } = require('../models')

class ControllerTodo {

    static getTodos(req, res){
        Todo.findAll({
            include: [ User, Product ],
            where: { UserId: req.UserId }
        })
            .then(todos => {
                // console.log(todos, 'ini todos');
                res.status(200).json({ todos }) // OK
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }

    static getTodo(req, res){
        const id = req.params.id
        Todo.findOne({ 
            include: User,
            where: { 
                id: id
            } 
        })
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
            due_date: new Date(due_date),
            UserId: req.UserId
        })
            .then(todo => { 
                if (todo) {
                    res.status(201).json({ todo }) // DATA CREATED
                } else {
                    res.status(400).json({ // BAD REQUEST, CLIENT ERROR
                        messege: 'Invalid Input, Please try again' 
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }
    
    static updateTodo(req, res){
        const { title, description, status, due_date } = req.body
        const id = req.params.id
        Promise.all([
            Todo.update({
                title: title,
                description: description,
                status: status,
                due_date: due_date,
                UserId: req.UserId
            }, {
                include: User,
                where: { 
                    id: id
                }
            }),
            Todo.findByPk(id)
        ])
        .then(updated => {
                if (updated[1]) {
                    res.status(200).json( updated[1] )
                } else if (updated[0] == 0){
                    res.status(404).json({
                        messege: `Todos with ID ${id} not found`
                    })
                } else {
                    res.status(400).json({ // BAD REQUEST, CLIENT ERROT
                        messege: 'Invalid Input, Please try again' 
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }

    static deleteTodo(req, res){
        const id = req.params.id
        Promise.all([
            Todo.findByPk(id),
            Todo.destroy({ 
                include: User,
                where: { 
                    id: id
                } 
            })
        ])
            .then(deleted => {
                if (deleted[0]) {
                    res.status(200).json( deleted[0] )
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