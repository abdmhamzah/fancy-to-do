const router = require('express').Router()
const controllerUser = require('../controllers/controllerUser')

router.post('/signup', controllerUser.signup) // SIGN UP UNTUK USER BARU
router.post('/signin', controllerUser.signin) // SIGN IN UNTUK MASUK

module.exports = router