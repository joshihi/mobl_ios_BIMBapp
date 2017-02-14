function this_class( amount ) {
	
	var _container;
	var _dots_array = new Array();
	var _dot_size = 20;
	var _dot_container_size = 30;
	
	_container = Ti.UI.createView({
		left: 0,
		width: '100%', height: _dot_size
	});
	
		var dot_holder = Ti.UI.createView({
			top:0, 
			width: _dot_container_size*amount, 
			height: _dot_size,
			layout: 'horizontal'
		});
		_container.add( dot_holder );
		
		for ( var i=0; i <amount; i++ ) {
			
			print( i );
			var dot = create_dot();
			dot_holder.add( dot );
			_dots_array.push( dot );
			
		}
		
		change_dot_state( 0 );
		
		
		

	_container.update_position = function( position ) {
		
		for ( var i=0; i <_dots_array.length; i++ ) {
			
			if ( i == position && !_dots_array[i].selected ) {
				change_dot_state( i );
			} else if ( i != position && _dots_array[i].selected )  {
				change_dot_state( i );
			}
			
		}
		
	};
	
	
	function create_dot () {
		
		var dot_container = Ti.UI.createView({
			left: 0, top:0, 
			width: _dot_container_size, height: _dot_size,
			selected: false
		});
		
			dot_container.dot = Ti.UI.createView({
				top:0, 
				width: _dot_size, height: _dot_size,
				backgroundImage: 'includes/images/dot_indicator_normal.png'
			});
			dot_container.add( dot_container.dot );
		
		return dot_container;
		
	};
	
	function change_dot_state ( position ) {
		
		if ( _dots_array[ position ].selected ) { 
			_dots_array[ position ].dot.backgroundImage = 'includes/images/dot_indicator_normal.png';
			_dots_array[ position ].selected = !_dots_array[ position ].selected;
		} else {
			_dots_array[ position ].dot.backgroundImage = 'includes/images/dot_indicator_selected.png';
			_dots_array[ position ].selected = !_dots_array[ position ].selected;		
		}
		
	};
	
	return _container;
	
}

module.exports = this_class;