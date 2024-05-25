const JWT = require('jsonwebtoken')

const createTokenPair = async(payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1h'
        })

        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1d'
        })
        
        JWT.verify(accessToken, publicKey, (err, decoded) => {
            if(err) {
                throw new Error(err)
            } else {
                return decoded
            }
        })
        return {accessToken, refreshToken}
    } catch(err) {
        throw new Error(err)
    }
}

module.exports = createTokenPair