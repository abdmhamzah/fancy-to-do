const router = require('express').Router()
const ControllerTodo = require('../controllers/controllerTodo')
const ControllerAPI = require('../controllers/controllerAPI')
const authentication = require('../middlewares/authentication')
const autorization = require('../middlewares/authorization')

router.get('/holiday/:ISOcountry/:year', ControllerAPI.holiday) // MENYAMBUNGKAN KE API
router.get('/', authentication, ControllerTodo.getTodos) // UNTUK LIST TOODS
router.post('/', authentication, ControllerTodo.createTodo) // UNTUK CREATE TODOS
router.get('/:id', authentication, autorization, ControllerTodo.getTodo) // UNTUK MENCARI TODO ID TERSEBUT
router.put('/:id', authentication, autorization, ControllerTodo.updateTodo) // UPDATE DATA TODO DENGAN ID TERSEBUT
router.delete('/:id', authentication, autorization, ControllerTodo.deleteTodo) // UNTUK DELETE TIDI DENGAN ID TERSEBUT

module.exports = router  