const router = require('express').Router()
const controllerTodo = require('../controllers/controllerTodo')

router.get('/', controllerTodo.getTodos) // UNTUK LIST TOODS
router.post('/', controllerTodo.createTodo) // UNTUK CREATE TODOS

module.exports = router  