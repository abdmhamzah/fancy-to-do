const router = require('express').Router()
const ControllerTodo = require('../controllers/controllerTodo')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, ControllerTodo.getTodos) // UNTUK LIST TOODS
router.post('/', authentication, ControllerTodo.createTodo) // UNTUK CREATE TODOS
router.get('/:id', authentication, ControllerTodo.getTodo) // UNTUK MENCARI TODO ID TERSEBUT
router.put('/:id', authentication, ControllerTodo.updateTodo) // UPDATE DATA TODO DENGAN ID TERSEBUT
router.delete('/:id', authentication, ControllerTodo.deleteTodo) // UNTUK DELETE TIDI DENGAN ID TERSEBUT

module.exports = router  