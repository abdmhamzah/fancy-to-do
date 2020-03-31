const router = require('express').Router()
const ControllerTodo = require('../controllers/controllerTodo')

router.get('/', ControllerTodo.getTodos) // UNTUK LIST TOODS
router.post('/', ControllerTodo.createTodo) // UNTUK CREATE TODOS
router.get('/:id', ControllerTodo.getTodo) // UNTUK MENCARI TODO ID TERSEBUT
router.put('/:id', ControllerTodo.updateTodo) // UPDATE DATA TODO DENGAN ID TERSEBUT
router.delete('/:id', ControllerTodo.deleteTodo) // UNTUK DELETE TIDI DENGAN ID TERSEBUT

module.exports = router  