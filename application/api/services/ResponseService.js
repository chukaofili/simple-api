/**
 * ResponseService.js
 */
module.exports = {
    json: function(status, res, message, data, meta) {
        var response = {
                message: message
        };
        if (typeof data !== 'undefined') {
            response.data = data;
        }
        if (typeof meta !== 'undefined') {
            response.meta = meta;
        }
        return res.status(status).json(response);
    }
};