const router = require('express').Router()
const routerTodos = require('./routerTodo')
const controllerUser = require('../controllers/controllerUser')

router.post('/signup', controllerUser.createUser) // SIGN UP UNTUK USER BARU
router.post('/signin') // SIGN IN UNTUK MASUK
router.use('/todos', routerTodos)

module.exports = router