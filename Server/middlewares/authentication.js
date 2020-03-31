const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        const token = req.headers.token
        if (!token) {
            res.status(404).json({
                messege: 'Token not found'
            })
        } else {
            const decoded = jwt.verify(token, 'banana')
            console.log(decoded);
            req.UserId = decoded.UserId
            next()
        }
    } catch (err) {
        res.status(400).json({
            messege: 'Invalid Token'
        })
    }
}

module.exports = authentication