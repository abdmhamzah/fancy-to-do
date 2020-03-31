const { Todo } = require('../models')

const authorization = (req, res, next) => {
    const id = req.params.id
    Todo.findOne({
        where: { id: id }
    })
        .then(todo => {
            if (!todo) {
                res.status(404).json({
                    messege: `Todos with ID ${id} not found`
                })
            } else {
                if (todo.UserId == req.UserId) {
                    next()
                } else {
                    res.status(400).json({
                        messege: 'Access Forbidden'
                    })
                }
            }
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({ // SERVER ERROR
                messege: 'Server failed to response'
            }) 
        })
}

module.exports = authorization