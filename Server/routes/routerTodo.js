const router = require('express').Router()
const controllerTodo = require('../controllers/controllerTodo')

router.get('/', controllerTodo.getTodos) // UNTUK LIST TOODS
router.post('/', controllerTodo.createTodo) // UNTUK CREATE TODOS
router.get('/:id', controllerTodo.getTodo) // UNTUK MENCARI TODO ID TERSEBUT
router.put('/:id') // UPDATE DATA TODO DENGAN ID TERSEBUT
router.delete('/:id', controllerTodo.deleteTodo) // UNTUK DELETE TIDI DENGAN ID TERSEBUT

module.exports = router  