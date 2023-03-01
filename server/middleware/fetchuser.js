const { response } = require('express');
var jwt = require('jsonwebtoken');
JWT_SECRET = 'goodthingstaketimehopeforthebest'

const fetchuser = (req, res, next) => {
    const auth_token = req.header('auth-token');
    // check if token is present or not
    if (!auth_token) {
        return response.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    // check if token is correct or not
    try {
        const data = jwt.verify(auth_token,JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (err) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports = fetchuser;