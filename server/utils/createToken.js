const JWT = require('jsonwebtoken')

const createTokenPair = async(payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, publicKey, {
            // algorithm: 'RS256',
            expiresIn: '1h'
        })

        const refreshToken = JWT.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '1d'
        })
        return {accessToken, refreshToken};
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = createTokenPair