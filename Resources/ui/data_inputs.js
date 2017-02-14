function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var accordian_header_class = require('ui/data_inputs/accordian_header');
	
	var comparator_selection_class = require('ui/data_inputs/comparator_selection');			
	var selection_group_class = require('ui/data_inputs/selection_group');	
	var input_table_class = require('ui/data_inputs/input_table');	
	var base_year_selector_class = require('ui/data_inputs/base_year_selector');

	var current_eligible_market_class = require( 'ui/data_inputs/current_eligible_market_view' );

	var yearly_market_share_class = require('ui/data_inputs/yearly_market_share_view');	
	var price_table_class = require('ui/data_inputs/price_table');	
	var weighted_price_table_class = require( 'ui/data_inputs/weighted_price_table' );
	var pen_cart_share_class = require( 'ui/data_inputs/pen_cart_share' );
	
	
	
	var self = Ti.UI.createWindow( { width: 1024, height: 768, zIndex: 0, fullscreen: true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Data Inputs" } );
	
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		self.container = Ti.UI.createView({
			width: 1024,
			height: 768,
			left:0,
			backgroundColor: settings.get_color( 'white' )
		});
		self.add( self.container );
		
		//TOP BAR
			
			var top_bar = lvc_ui.create_top_bar();
			self.container.add( top_bar );
			
			//HEADER
			
			var header_banner_container = Ti.UI.createView({
				width: 1024,
				height: 82,
				left:0,
				top:55
			});
			self.container.add( header_banner_container );

				var arrows_and_dots_container = Ti.UI.createView({
					width:130,
					height: 26,
					top:26,
					left:49,
					zIndex:1000,
					backgroundImage: 'includes/images/dots_and_arrow.png'	
				});
				header_banner_container.add( arrows_and_dots_container );
				arrows_and_dots_container.addEventListener( 'click', function() {
					
					engine.re_calculate();					
					engine.print_everything();
					
				});

					var header_label = Ti.UI.createLabel({						
						left:195, top:16,
						width:400, height:50,
						font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: json_data.data_inputs.title,
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );
		
		//MAIN
		
		var scroll_view = Ti.UI.createScrollView({
			width: Ti.UI.FILL,
			height: Ti.UI.FILL,
			left:0,
			top:130,
			backgroundColor: settings.get_color( 'white' ),
			layout: 'vertical'
		});
		self.container.add( scroll_view );
		
		var main_container = Ti.UI.createScrollView({
			width: 912,
			height: Ti.UI.SIZE,
			left:56,
			top:0,
			backgroundColor: settings.get_color( 'white' ),
			layout: 'vertical'
		});
		scroll_view.add( main_container );
			
			var t1dm_container = Ti.UI.createView({
				left: 0, top:0,
				width: Ti.UI.FILL, height: Ti.UI.SIZE,
				layout: 'horizontal'
			});
			
			var t2dm_container = Ti.UI.createView({
			left: 0, top:0,
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'horizontal'
		});
		
//------------------------------------------------------------------		
//------------------------------------------------------------------		
//------------------------------------------------------------------		
//COMPARATOR ACCORDIAN	
		
		var comparator_accordian_header = accordian_header_class ( 'Comparator', create_comparator_content );
		comparator_accordian_header.change_disabled_state( );
		main_container.add( comparator_accordian_header );

		function create_comparator_content() {

			//------------------------------------------------------------------		
			//PRODUCT LIST	
			var product_list_view = new comparator_selection_class( product_selection_changed );
			comparator_accordian_header.container.add( product_list_view );
		
		};
			
//------------------------------------------------------------------		
//------------------------------------------------------------------		
//------------------------------------------------------------------		
//POPULATION ACCORDIAN		
	
		var population_accordian_header = accordian_header_class ( 'Population Inputs', create_population_content );
		main_container.add( population_accordian_header );
		population_accordian_header.change_disabled_state( );
//		population_accordian_header.reveal();
		
		
		function create_population_content() {
			
			var top_stretch = create_100();
			population_accordian_header.container.add( top_stretch );			
					
				var left_view = create_50();
				top_stretch.add( left_view );			
				
					//------------------------------------------------------------------		
					//DIABETES TYPE		
					var diabetes_type_array = [ { title:'T1DM', id:1 }, { title:'T2DM', id:2 }, { title:'T1DM & T2DM', id:3 }  ];			
					var diabetes_type_area = selection_group_class( 'Please select if you would like to see model inputs and outputs based on T1DM , T2DM or both', diabetes_type_array, 'diabetes_type', diabetes_type_area_updated );
					left_view.add( diabetes_type_area );			
					
						//------------------------------------------------------------------		
						//OVERALL POPULATION - CREATED HERE BUT ADDED LATER - FOR ORDERING											
						var overall_population_array = [ 
							{ id: 'total_population', title: 'Total Population', type: 'normal', row: 5 }, 
							{ id: 'growth_rate', title: 'Growth Rate', type: 'percentage', row: 6 } 
						];					
						self.overall_population_section = input_table_class( 'Overall Population', overall_population_array );
						
						//------------------------------------------------------------------		
						//OVERALL DIABETES POPULATION - CREATED HERE BUT ADDED LATER - FOR ORDERING											
						var overall_diabetes_population_array = [ 
							{ id: 'percentage_of_population_with_diabetes', title: '% of population with diabetes', type: 'percentage', row: 10 }, 
							{ id: 'percentage_of_patients_with_t1dm', title: '% of patients with T1DM', type: 'percentage', row: 11 },
							{ id: 'percentage_of_patients_with_t2dm', title: '% of patients with T2DM', type: 'percentage', row: 12 }  
						];					
						self.overall_diabetes_population_section = input_table_class( 'Overall Diabetes Population', overall_diabetes_population_array );
						
									
					var know_population_array = [ { title:'Yes', id: true }, { title:'No', id: false } ];			
					var know_population_view = selection_group_class( 'Do you know your eligible population of interest?', know_population_array, 'know_population', know_population_updated );
					left_view.add( know_population_view );
						
						self.table_labels = create_table_labels();
						left_view.add( self.table_labels );
													
						left_view.add( self.overall_population_section );
						left_view.add( self.overall_diabetes_population_section );
				
				var right_view = create_50();
				top_stretch.add( right_view );			
					
					//------------------------------------------------------------------
					//YEAR SELECTOR		
					var year_selector = base_year_selector_class();
					right_view.add( year_selector );


//------------------------------------------------------------------
//------------------------------------------------------------------
//T1DM
		
		population_accordian_header.container.add( t1dm_container );
			
			self.t1dm_left_view = create_50();
			t1dm_container.add( self.t1dm_left_view );	
			
				//------------------------------------------------------------------
				//T1DM POPULATION			
				var t1dm_population_array = [ 
					{ id: 't1dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine', title: '% of patients treated with basal insulin glargine', type: 'percentage', row: 34  }, 
					{ id: 't1dm_percentage_of_basal_insulin_market_who_are_new_initiators', title: '% of basal insulin glargine market who are new initiators (eligible market)', type: 'percentage', row: 35 }
				];		
				var t1dm_population_section = input_table_class( 'T1DM Population', t1dm_population_array );
				self.t1dm_left_view.add( t1dm_population_section );
				
				//------------------------------------------------------------------
				//T1DM MARKET SHARE			
				var t1dm_market_share_array = [ 
					{ id: 't1dm_lantus_market_share_split', data_store_ref: 'lantus', title: '% of Basaglar uptake from Lantus', type: 'percentage', row: 45 },
					{ id: 't1dm_toujeo_market_share_split', data_store_ref: 'toujeo', title: '% of Basaglar uptake from Toujeo', type: 'percentage', row: 46 },
					{ id: 't1dm_merck_insulin_glargine_market_share_split', data_store_ref: 'merck_insulin_glargine', title: '% of Basaglar uptake from Merck Insulin Glargine', type: 'percentage', row: 47 },
					{ id: 't1dm_biocon_insulin_glargine_market_share_split', data_store_ref: 'biocon_insulin_glargine', title: '% of Basaglar uptake from Biocon Insulin Glargine', type: 'percentage', row: 48 }				
				];			
				self.t1dm_market_share_section = input_table_class( 'T1DM Market Share', t1dm_market_share_array );		
				self.t1dm_left_view.add( self.t1dm_market_share_section );
				self.t1dm_market_share_section.top += 40; 
				
			var t1dm_right_view = create_50();
			t1dm_container.add( t1dm_right_view );	
				
				//------------------------------------------------------------------
				//CURRENT ELIGIBLE MARKET			
				var t1dm_current_eligible_market = current_eligible_market_class( 't1dm' );
				t1dm_right_view.add( t1dm_current_eligible_market );	
				
				//------------------------------------------------------------------
				//T1DM YEARLY MARKET SHARE		
				self.t1dm_yearly_market_share = yearly_market_share_class( 't1dm' );
				t1dm_right_view.add( self.t1dm_yearly_market_share );		
				

//------------------------------------------------------------------
//------------------------------------------------------------------
//T2DM
		population_accordian_header.container.add( t2dm_container );
		
			self.t2dm_left_view = create_50();
			t2dm_container.add( self.t2dm_left_view );
		
				//------------------------------------------------------------------
				//T2DM POPULATION			
				var t2dm_population_array = [ 
					{ id: 't2dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine', title: '% of patients treated with basal insulin glargine', type: 'percentage', row: 60 }, 
					{ id: 't2dm_percentage_of_basal_insulin_market_who_are_new_initiators', title: '% of basal insulin glargine market who are new initiators (eligible market)', type: 'percentage', row: 61 }
				];					
				var t2dm_population_section = input_table_class( 'T2DM Population', t2dm_population_array );
				self.t2dm_left_view.add( t2dm_population_section );
				
				//------------------------------------------------------------------
				//T2DM MARKET SHARE			
				var t2dm_market_share_array = [ 
					{ id: 't2dm_lantus_market_share_split', data_store_ref: 'lantus', title: '% of Basaglar uptake from Lantus', type: 'percentage', row: 71 },
					{ id: 't2dm_toujeo_market_share_split', data_store_ref: 'toujeo', title: '% of Basaglar uptake from Toujeo', type: 'percentage', row: 72 },
					{ id: 't2dm_merck_insulin_glargine_market_share_split', data_store_ref: 'merck_insulin_glargine', title: '% of Basaglar uptake from Merck Insulin Glargine', type: 'percentage', row: 73 },
					{ id: 't2dm_biocon_insulin_glargine_market_share_split', data_store_ref: 'biocon_insulin_glargine', title: '% of Basaglar uptake from Biocon Insulin Glargine', type: 'percentage', row: 74 }
				
				];			
				self.t2dm_market_share_section = input_table_class( 'T2DM Market Share', t2dm_market_share_array );		
				self.t2dm_left_view.add( self.t2dm_market_share_section );
				self.t2dm_market_share_section.top += 40;
				
			var t2dm_right_view = create_50();
			t2dm_container.add( t2dm_right_view );	
				
				//------------------------------------------------------------------
				//CURRENT ELIGIBLE MARKET			
				var t2dm_current_eligible_market = current_eligible_market_class( 't2dm' );
				t2dm_right_view.add( t2dm_current_eligible_market );	
							
				//------------------------------------------------------------------
				//T2DM YEARLY MARKET SHARE		
				self.t2dm_yearly_market_share = yearly_market_share_class( 't2dm' );
				t2dm_right_view.add( self.t2dm_yearly_market_share );

	
		
//------------------------------------------------------------------		
//DURATION
		var duration_array = [ { title:'ALL', id:'4' } , { title:'<5', id:'1' }, { title:'5-10', id:'2' }, { title:'>10', id:'3' } ];		
		var duration_area = selection_group_class( 'Optional population filter: duration of diabetes', duration_array, 'duration_of_diabetes', engine.re_calculate );
		population_accordian_header.container.add( duration_area );
	
		var spacer = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: 20,
			top:0, left:0
		});
		population_accordian_header.container.add( spacer );
		
		product_selection_changed();
		know_population_updated();
				
		
	};

//------------------------------------------------------------------		
//------------------------------------------------------------------		
//------------------------------------------------------------------		
//DRUG COSTS ACCORDIAN	
	
		var drug_costs_accordian_header = accordian_header_class ( 'Drug Costs Inputs', create_drug_price_content );
		main_container.add( drug_costs_accordian_header );		
		drug_costs_accordian_header.change_disabled_state( );
//		drug_costs_accordian_header.reveal();
		
		
		function create_drug_price_content() {
				
			var price_top_row = Ti.UI.createView({
		        top: 0,
		        width: Ti.UI.FILL, height: Ti.UI.SIZE,
		        layout: 'horizontal'
		    });
		    drug_costs_accordian_header.container.add( price_top_row );
		    	
		    	var price_container_left = Ti.UI.createView({
			        top: 0,
			        width: '50%', height: Ti.UI.SIZE,
			        layout: 'vertical'
			        
			    });
				price_top_row.add( price_container_left );
		    	
					//------------------------------------------------------------------		
					//PRICE CATEGORY		
					//var price_category_array = [ { title:'Public', id:2 }, { title:'Manufacturer', id: 3 }, { title:'Wholesale', id:1 } ];				
					var price_category_array = [ { title:'Public', id: 2 }, { title:'Net Wholesale', id: 1 } ];				
					var price_category_area = selection_group_class( 'Please select price', price_category_array, 'drug_prices', engine.re_calculate );
					price_container_left.add( price_category_area );
				
				
				var slider_container_right = Ti.UI.createView({
			        left: 0, top: 0,
			        width: '50%', height: Ti.UI.SIZE
			    });
				price_top_row.add( slider_container_right );
				
					var pen_cart_sliders_row = Ti.UI.createView({
				        top: 0,
				        width: Ti.UI.FILL, height: Ti.UI.SIZE,
				        layout: 'horizontal'
				    });
				    slider_container_right.add( pen_cart_sliders_row );	
			
						var pen_cart_share_basglar = pen_cart_share_class( 'Basaglar' );
						pen_cart_sliders_row.add( pen_cart_share_basglar );
					
						var pen_cart_share_lantus = pen_cart_share_class( 'Lantus' );
						pen_cart_sliders_row.add( pen_cart_share_lantus );
									
			var price_area_row = Ti.UI.createView({
		       left: 0, top: 0,
		        width: Ti.UI.FILL, 
		        height: Ti.UI.SIZE,
		        layout: 'horizontal'
		    });
		    drug_costs_accordian_header.container.add( price_area_row );
			
				
				var price_middle_row = Ti.UI.createView({
			       left: 0, top: 0,
			        //width: Ti.UI.FILL, 
			        width: '70%', 
			        height: Ti.UI.SIZE,
			        layout: 'horizontal'
			    });
			    price_area_row.add( price_middle_row );
	//------------------------------------------------------------------		
	//PRICE TABLE 
				
					//PENS 			
					var pens_price_table_labels_array = {
						title: 'Drug Costs – Pens',
						rows_array:
						[ 	
							[ {type:'label', value:'Treatment'}, 	{type:'label', value:'Pack price'}, {type:'label', value:'Daily dose \n(one injection)'}, {type:'label', value:'Daily dose \n(user defined)'}, {type:'label', value:'Daily cost \n(calculated)'}, {type:'label', value:'Daily cost \n(user defined)'}, {type:'label', value:'Annual cost' } ],			 
							[ {type:'label', value:'Lantus', id:'lantus'}, 		{type:'label', row:89, col:4}, 		{type:'label', row:108, col:3}, {type:'input', row:108, col:2}, {type:'label', row:108, col:5}, {type:'input', row:108, col:4}, {type:'label', row:108, col:6, ref:'Source for pack price: IMS MIDAS, 2015; Source for daily dose: WHO, 2015 (link:http://www.whocc.no/atc_ddd_index/?showdescription=yes&code=A10AE04)'} ],
							[ {type:'label', value:'Toujeo', id:'toujeo', info:'Please note: list price for Toujeo is not available. Add in expected daily cost.' }, 		{type:'label', row:90, col:4}, 		{type:'label', row:109, col:3}, {type:'input', row:109, col:2}, {type:'label', row:109, col:5}, {type:'input', row:109, col:4}, {type:'label', row:109, col:6} ],	
							[ {type:'label', value:'Merck Insulin Glargine', id:'merck_insulin_glargine' }, 		{type:'label', row:91, col:4}, 		{type:'label', row:110, col:3}, {type:'input', row:110, col:2}, {type:'label', row:110, col:5}, {type:'input', row:110, col:4}, {type:'label', row:110, col:6} ],		
							[ {type:'label', value:'Biocon Insulin Glargine', id:'biocon_insulin_glargine' }, 		{type:'label', row:92, col:4}, 		{type:'label', row:111, col:3}, {type:'input', row:111, col:2}, {type:'label', row:111, col:5}, {type:'input', row:111, col:4}, {type:'label', row:111, col:6} ],		
							[ {type:'label', value:'Basaglar'}, 		{type:'label', row:93, col:4}, 		{type:'label', row:112, col:3}, {type:'input', row:112, col:2}, {type:'label', row:112, col:5}, {type:'input', row:112, col:4}, {type:'label', row:112, col:6, ref: 'Source for pack price: Eli Lilly, 2015; Source for daily dose: Eli Lilly, 2015'} ]
						]	
					};		
					self.pens_price_table_view = price_table_class( pens_price_table_labels_array );		
					self.pens_price_table_view.top = 25;
					price_middle_row.add( self.pens_price_table_view );
				
					//CARTRIDGES 	
					var carts_price_table_labels_array = {
						title: 'Drug Costs – Cartridges',
						rows_array:
						[ 
							[ {type:'label', value:'Treatment'}, 	{type:'label', value:'Pack price'}, {type:'label', value:'Daily dose \n(one injection)'}, {type:'label', value:'Daily dose \n(user defined)'}, {type:'label', value:'Daily cost \n(calculated)'}, {type:'label', value:'Daily cost \n(user defined)'}, {type:'label', value:'Annual cost' } ],			 
							[ {type:'label', value:'Lantus', id:'lantus' }, 		{type:'label', row:99, col:4}, 		{type:'label', row:117, col:3}, {type:'input', row:117, col:2}, {type:'label', row:117, col:5}, {type:'input', row:117, col:4}, {type:'label', row:117, col:6, ref:'Source for pack price: IMS MIDAS, 2015; Source for daily dose: WHO, 2015 (link:http://www.whocc.no/atc_ddd_index/?showdescription=yes&code=A10AE04)'  } ],
							[ {type:'label', value:'Toujeo', id:'toujeo', info:'Please note: list price for Toujeo is not available. Add in expected daily cost.' }, 		{type:'label', row:100, col:4}, 		{type:'label', row:118, col:3}, {type:'input', row:118, col:2}, {type:'label', row:118, col:5}, {type:'input', row:118, col:4}, {type:'label', row:118, col:6} ],	
							[ {type:'label', value:'Merck Insulin Glargine', id:'merck_insulin_glargine' }, 		{type:'label', row:101, col:4}, 		{type:'label', row:119, col:3}, {type:'input', row:119, col:2}, {type:'label', row:119, col:5}, {type:'input', row:119, col:4}, {type:'label', row:119, col:6} ],		
							[ {type:'label', value:'Biocon Insulin Glargine', id:'biocon_insulin_glargine' }, 		{type:'label', row:102, col:4}, 		{type:'label', row:120, col:3}, {type:'input', row:120, col:2}, {type:'label', row:120, col:5}, {type:'input', row:120, col:4}, {type:'label', row:120, col:6} ],		
							[ {type:'label', value:'Basaglar'}, 		{type:'label', row:103, col:4}, 		{type:'label', row:121, col:3}, {type:'input', row:121, col:2}, {type:'label', row:121, col:5}, {type:'input', row:121, col:4}, {type:'label', row:121, col:6, ref: 'Source for pack price: Eli Lilly, 2015; Source for daily dose: Eli Lilly, 2015'} ]
						]
					};		
					self.carts_price_table_view = price_table_class( carts_price_table_labels_array );		
					self.carts_price_table_view.top = 25;
					price_middle_row.add( self.carts_price_table_view );
			
				
	//------------------------------------------------------------------		
	//WEIGHTED PRICE TABLE 
			
				var price_container_right = Ti.UI.createView({
			        left: '1%', top: 0,
			        width: '29%', height: Ti.UI.SIZE
			    });
				price_area_row.add( price_container_right );
			
					self.weighted_price_table = weighted_price_table_class();
					price_container_right.add( self.weighted_price_table );
				
				product_selection_changed();
				
		};	
		
		
		
		
//		drug_type_area_updated();

		var proceed_button = Ti.UI.createButton({
	        top: 20, bottom: 30,
	        width: 330, height: 48,
	        title: 'ALL DATA INPUTS HAVE BEEN REVIEWED',
	        backgroundColor: '#63b67c',
			borderColor: '#69c083', borderWidth: 6,
	        color: 'white',
	        font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) }
		    		
	    });
		main_container.add( proceed_button );
		proceed_button.addEventListener( 'click', proceed_button_clicked );
		
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function product_selection_changed () {
		
//		alert( weighted_price_table );
		
		if ( typeof self.pens_price_table_view != 'undefined' ) self.pens_price_table_view.update();
		if ( typeof self.carts_price_table_view != 'undefined'  ) self.carts_price_table_view.update();
		if ( typeof self.weighted_price_table != 'undefined'  ) self.weighted_price_table.update();		
		if ( typeof self.t1dm_market_share_section != 'undefined'  ) self.t1dm_market_share_section.update();
		if ( typeof self.t2dm_market_share_section != 'undefined'  ) self.t2dm_market_share_section.update();
	};
	
	function create_100 () {
		var view_100 = Ti.UI.createView({
	        top: 0, left: 0,
	        width: '100%', height: Ti.UI.SIZE,
	        layout: 'horizontal'
	       
	    });
	    return view_100;
	};
	
	function create_50 () {
		var view_50 = Ti.UI.createView({
	        top: 0, left: 0,
	        width: '50%', height: Ti.UI.SIZE,
	        layout: 'vertical'
	    });
	    return view_50;
	};
 	
	function create_table_labels () {
			
		var row = Ti.UI.createView({
	        top: 20,
	        width: Ti.UI.FILL, height: Ti.UI.SIZE,
	        layout: 'horizontal'
	    });
		
			row.user_label = Ti.UI.createLabel ({
			    left: 185,
			    width: 90, height: Ti.UI.SIZE,
			   	font: { fontSize: 11, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),				
			    text: 'User Defined',
			    textAlign: 'left'
			});
			row.add( row.user_label );
			
			row.default_label = Ti.UI.createLabel ({
			    left: 0, 
			    width: 90, height: Ti.UI.SIZE,
			   	font: { fontSize: 11, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),				
			    text: 'Default Defined',
			    textAlign: 'left'
			});
			row.add( row.default_label );
			
			row.source_label = Ti.UI.createLabel ({
			    left: 0, 
			    width: 90, height: Ti.UI.SIZE,
			   	font: { fontSize: 11, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),				
			    text: 'Source',
			    textAlign: 'left'
			});
			row.add( row.source_label );
		
		return row;	
		
	};
	
	function diabetes_type_area_updated () {
		
		if ( data_store.diabetes_type == 1 ) {
			t1dm_container.height = Ti.UI.SIZE;
			t2dm_container.height = 0;
		} else if ( data_store.diabetes_type == 2 ) {
			t1dm_container.height = 0;
			t2dm_container.height = Ti.UI.SIZE;			
		} else {
			t1dm_container.height = Ti.UI.SIZE;
			t2dm_container.height = Ti.UI.SIZE;
		}
		
	}
	
	function know_population_updated () {
		
		if ( typeof  self.t1dm_left_view !== 'undefined' ) {
			if ( data_store.know_population == false ) {
				self.overall_population_section.height = Ti.UI.SIZE;
				self.overall_diabetes_population_section.height = Ti.UI.SIZE;
				self.t1dm_left_view.height = Ti.UI.SIZE;
//				self.t1dm_yearly_market_share.height = Ti.UI.SIZE;
				self.t2dm_left_view.height = Ti.UI.SIZE;
//				self.t2dm_yearly_market_share.height = Ti.UI.SIZE;
				self.table_labels.height = Ti.UI.SIZE;
			} else if ( data_store.know_population == true ) {
				self.overall_population_section.height = 0;
				self.overall_diabetes_population_section.height = 0;
				self.t1dm_left_view.height = 0;
//				self.t1dm_yearly_market_share.height = 0;
				self.t2dm_left_view.height = 0;
//				self.t2dm_yearly_market_share.height = 0;
				self.table_labels.height = 0;
			} 
		}
		
	};
	
	
	function proceed_button_clicked () {
		
		screen_controller.switch_screen_state_function( 'Budget Impact' );
		
	};
	
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;