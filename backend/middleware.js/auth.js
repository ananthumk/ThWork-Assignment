const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader.split('')[1]
    if(!token){
       return res.status(401).json({message: 'No token'})
    }
    try {
       const decoded = jwt.verify(token, process.env.JWTKEY) 
       req.user = decoded
       next()
    } catch (error) {
        console.log('Error at auth middle: ', error.message)
    }
}

module.exports = auth