/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
        var data = req.body;
        Item.create(data).then(function(createdItem) {
            return ResponseService.json(200, res, 'Item created successfully.', createdItem);
        }).catch(function(err) {
            return res.negotiate(err);
        });
    },
    read: function(req, res) {
        Item.findOne({
            id: req.params.id
        }).then(function(foundItem) {
            if (!foundItem) {
                return ResponseService.json(404, res, 'Item not found');
            }
            return ResponseService.json(200, res, 'Item retrieved successfully', foundItem);
        }).catch(function(err) {
            return res.negotiate(err);
        });
    },
    list: function(req, res) {
    	Item.find({}).then(function(items) {
            return ResponseService.json(200, res, 'Items retrieved successfully', items);
        }).catch(function(err) {
            return res.negotiate(err);
        });

        /*
        var perPage = req.query.per_page;
        var currentPage = req.query.page;
        var conditions = {};
        var populateData = [];
        var sortBy = 'createdAt';
        var sortDir = 'DESC';
        var _query = _.cloneDeep(req.query);

        if (_.has(req.query, 'title')) {
            delete _query.name;
            conditions.name = {'contains': req.query.title };
        }
        
        delete _query.per_page;
        delete _query.page;

        if (_.has(req.query, 'sort_by')) {
            delete _query.sort_by;
            sortBy = req.query.sort_by;
        }
        if (_.has(req.query, 'sort_dir')) {
            delete _query.sort_dir;
            sortDir = req.query.sort_dir;
        }
        var sort = sortBy + ' ' + sortDir.toUpperCase();
        conditions = _.merge(conditions, _query);
        _pager.paginate(Item, conditions, currentPage, perPage, populateData, sort).then(function(records) {
            return ResponseService.json(200, res, 'Data retrieved successfully', records.data, records.meta);
        }).catch(function(err) {
            return res.negotiate(err);
        });
        */
    },
    update: function(req, res) {
        var data = req.body;
        Item.update({
            id: req.params.id
        }, data).then(function(updatedItem) {
            if (!updatedItem.length) {
                return ResponseService.json(404, res, "Item not found");
            }
            return ResponseService.json(200, res, 'Item updated successfully.', updatedItem[0]);
        }).catch(function(err) {
            return res.negotiate(err);
        });
    },
    delete: function(req, res) {
        Item.destroy({id: req.params.id}).then(function(deletedItem) {
            if (!deletedItem.length) {
                return ResponseService.json(404, res, "Item not found");
            }
            return ResponseService.json(200, res, "Item deleted successfully", deletedItem[0]);
        }).catch(function(err) {
            return res.negotiate(err);
        });
    }
};

