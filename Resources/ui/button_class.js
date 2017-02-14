
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	
////////////////////////////////////////////////////
//FUNCTIONS PUBLIC
////////////////////////////////////////////////////
	
	exports.create_proceed = function ( text, icon ) {
		
		var button = Ti.UI.createButton({	       
	        width: 230, height: 60,
	        title: text,
	       	backgroundColor: '#63b67c',
			borderColor: '#69c083', borderWidth: 6,
	        backgroundImage: icon,
	        color: 'white',
	        font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) }
		    		
	    });
		
		return button;
		
	};

////////////////////////////////////////////////////
//FUNCTIONS PRIVATE
////////////////////////////////////////////////////
		
	
	function temp(  ) {
		
	};	
	