const axios = require('axios');

const { USERS_SERVICE } = require('../available_services');

module.exports = async (req, res, next) => {

    const isAuthResponse = await axios.get(USERS_SERVICE + "/users/is-authenticated", {
        headers: req.headers
    });

    if (isAuthResponse.data.ok) {
        return next();
    }

    return res.send('_whithout_permission_');

} 