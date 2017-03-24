/**
 * Health check controller
 *
 * @description :: Check the status of containers
 */

module.exports = {
    home: function(req, res) {
        return res.view('api/home', {
            layout: 'api/layout',
            api: sails.config.settings.api
        })
    },
    healthCheck: function(req, res) {
        return ResponseService.json(200, res, "OK", sails.config.settings.api);
    }
}