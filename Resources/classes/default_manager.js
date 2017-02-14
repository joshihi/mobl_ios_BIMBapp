
var _default = {};


exports.update_default_obj = function () {
	
	print( 'update_default_obj ' + data_store.country_id );
	var default_data_class = require('includes/defaults/'+data_store.country_id );
	_default = new default_data_class();
	
};
