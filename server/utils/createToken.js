const JWT = require('jsonwebtoken')

exports.createTokenPair = async(payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, publicKey, {
            // algorithm: 'RS256',
            expiresIn: '2h'
        })

        const refreshToken = JWT.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '30d'
        })
        return {accessToken, refreshToken};
    } catch(err) {
        throw new Error(err);
    }
}
