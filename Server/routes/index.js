const router = require('express').Router()
const routerTodos = require('./routerTodo')
const routerUser = require('./routerUser')

router.use('/user', routerUser)
router.use('/todos', routerTodos)

module.exports = router