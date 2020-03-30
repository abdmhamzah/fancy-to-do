const router = require('express').Router()
const routerTodos = require('./routerTodo')

router.use('/todos', routerTodos)

module.exports = router