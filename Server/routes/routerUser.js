const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')

router.post('/signup', ControllerUser.signup) // SIGN UP UNTUK USER BARU
router.post('/signin', ControllerUser.signin) // SIGN IN UNTUK MASUK
router.post('/signin-google', ControllerUser.googleSignIn) // OAuth

module.exports = router