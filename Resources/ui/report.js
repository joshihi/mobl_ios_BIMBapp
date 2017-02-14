function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Report" } );
	
	var statement_array = new Array();
	
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
				header_banner_container.add(arrows_and_dots_container);

					var header_label = Ti.UI.createLabel({						
						left:195, top:16,
						width:400, height:50,
						font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: json_data.summary.title,
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );			
		
		//MAIN
		
		var email_button_container = Ti.UI.createLabel({
			right: 55, top: 68,
			width: 130, height: 48,
			backgroundColor: '#69c083',
			borderColor: '#76cc90', 
			borderWidth: 6				
		});	
		self.container.add( email_button_container );
		email_button_container.addEventListener( 'click', email_clicked );
			
			var email_icon = Ti.UI.createView({
				left: 13,
				width: 30, height: 20,		
				backgroundImage: 'includes/images/email_icon.png'
			});
			email_button_container.add( email_icon );
			
			var email_title = Ti.UI.createLabel({
				left: 25,
				width: Ti.UI.FILL, height: "100%",
				font: { fontFamily: settings.get_font( 'GR-Medium' ), fontSize: 14 },
				color: settings.get_color( 'white' ),
				textAlign: 'center',
				text: 'EMAIL'						
			});	
			email_button_container.add( email_title );
			email_button_container.addEventListener( 'click', email_clicked );
		
		var bg = Ti.UI.createScrollView({
			width: 912,
			height: 560,
			left:56,
			top:130,
			backgroundColor: '#EEEEEE'
		});
		self.container.add( bg );	
				
		var main_container = Ti.UI.createScrollView({
			width: 912,
			height: Ti.UI.FILL,
			top:130,
			layout: 'vertical'
		});
		self.container.add( main_container );
		
			calculate_statements();
					
			main_container.content_container = Ti.UI.createView({
				opacity: 1,
				left:0, top: 45,
				width: "100%", height: Ti.UI.SIZE
			});
			main_container.add( main_container.content_container );
				
				var slide_array = new Array();
						
				var slide_1 = Ti.UI.createLabel({
					left: 65, right: 65, width: Ti.UI.FILL, height: Ti.UI.FILL,					
					color:  settings.get_color( 'brown' ),
					font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Book' ) },
					textAlign: 'center'
				});				
				slide_1.text = statement_array[ 0 ] + '\n\n' + statement_array[ 1 ];
				slide_array.push( slide_1 );
				
				var slide_2 = Ti.UI.createLabel({
					left: 65, right: 65, width: Ti.UI.FILL, height: Ti.UI.FILL,					
					color:  settings.get_color( 'brown' ),
					font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Book' ) },
					textAlign: 'center'
				});				
				slide_2.text = statement_array[ 2 ] + '\n\n' + statement_array[ 3 ];
				slide_array.push( slide_2 );
				
				var slide_3 = Ti.UI.createLabel({
					left: 65, right: 65, width: Ti.UI.FILL, height: Ti.UI.FILL,					
					color:  settings.get_color( 'brown' ),
					font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Book' ) },
					textAlign: 'center'
				});				
				slide_3.text = statement_array[ 4 ] + '\n\n' + statement_array[ 5 ];
				slide_array.push( slide_3 );
				
				var slide_4 = Ti.UI.createLabel({
					left: 65, right: 65, width: Ti.UI.FILL, height: Ti.UI.FILL,					
					color:  settings.get_color( 'brown' ),
					font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Book' ) },
					textAlign: 'center'
				});				
				slide_4.text = statement_array[ 6 ] ;
				slide_array.push( slide_4 );
				
				var slide_6 = Ti.UI.createView({
					width: 750, height: 430
				});
				slide_array.push( slide_6 );
								
				create_budget_impact_graph( slide_6 );
				
						
				var scrollable_view = Ti.UI.createScrollableView({
					top:0,
					width: 750, height: 450,
					views: slide_array,
					backgroundColor: '#FFFFFF'
				});
				main_container.content_container.add( scrollable_view );
				
				scrollable_view.addEventListener( 'scrollEnd', scroll_end_function );
					
				var left_arrow = Ti.UI.createView({
					left: 62, top: 185,
					width: 63, height: 48,
					direction: -1, opacity: 0,
					backgroundImage: 'includes/images/intro/left_arrow.png'
				});
				main_container.content_container.add( left_arrow );
				left_arrow.addEventListener( 'click', arrow_clicked );
						
				var right_arrow = Ti.UI.createView({
					right: 62, top: 185,
					width: 63, height: 48,
					direction: 1,
					backgroundImage: 'includes/images/intro/right_arrow.png'
				});
				main_container.content_container.add( right_arrow );
				right_arrow.addEventListener( 'click', arrow_clicked );
				
				var dot_indicator = dot_indicator_class( slide_array.length );
					dot_indicator.bottom = 20;
				bg.add( dot_indicator );
				
			
					
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	function email_clicked () {
		
		leavepiece_html_class.test_html();	
		
	};
	
	
	function calculate_statements () {
		
		
		
		statement_array = [];
		
		var country_name = _default.title;
		var country_name_local = _default.title_local;
		
		var diabetes_type_name = get_type_name();
		
		var daily_price_basaglar_pens = daily_price_lantus_pens = daily_price_basaglar_carts = daily_price_lantus_carts = _default.cur;
			daily_price_basaglar_pens += ( engine.get_value( 112, 4 ) && engine.get_value( 112, 4 ) != 'USER_VALUE' ) ? dp_2( engine.get_value( 112, 4 ) ) : dp_2( engine.get_value( 112, 5 ) );
			daily_price_lantus_pens += ( engine.get_value( 108, 4 ) && engine.get_value( 108, 4 ) != 'USER_VALUE' ) ? dp_2( engine.get_value( 108, 4 ) ) : dp_2( engine.get_value( 108, 5 ) );
		
			daily_price_basaglar_carts += ( engine.get_value( 121, 4 ) && engine.get_value( 121, 4 ) != 'USER_VALUE' ) ? dp_2( engine.get_value( 121, 4 ) ) : dp_2( engine.get_value( 121, 5 ) );
			daily_price_lantus_carts += ( engine.get_value( 117, 4 ) && engine.get_value( 117, 4 ) != 'USER_VALUE' ) ? dp_2( engine.get_value( 117, 4 ) ) : dp_2( engine.get_value( 117, 5 ) );
		
		var market_first_year = with_commas( Math.round( engine.get_value( 37, 4 ) ));		
			if ( data_store.diabetes_type == 2 ) {
				market_first_year = with_commas( Math.round( engine.get_value( 63, 4 ) ));		
			} else {
				market_first_year += ' and ' + with_commas( Math.round( engine.get_value( 63, 4 ) ));
			}
		
		var new_init_percentage = Math.round( engine.get_value( 35, 3 ) ) + "% likely to be new initiators for T1DM";		
			if ( data_store.diabetes_type == 2 ) {
				new_init_percentage = Math.round( engine.get_value( 35, 3 ) ) + "% likely to be new initiators for T2DM";		
			} else {
				new_init_percentage += ' and ' + Math.round( engine.get_value( 61, 3 ) ) + "% for T2DM";
			}
		
		var market_first_year_share = Math.round( engine.get_value( 39, 4 ) ) + "%";		
			if ( data_store.diabetes_type == 2 ) {
				market_first_year_share = Math.round( engine.get_value( 65, 4 ) ) + "%";		
			} else {
				market_first_year_share += ' and ' + Math.round( engine.get_value( 65, 4 ) ) + "%";
			}
		
		var market_fifth_year_share = Math.round( engine.get_value( 39, 8 ) ) + "%";		
			if ( data_store.diabetes_type == 2 ) {
				market_fifth_year_share = Math.round( engine.get_value( 65, 8 ) ) + "%";		
			} else {
				market_fifth_year_share += ' and ' + Math.round( engine.get_value( 65, 8 ) ) + "%";
			}
		
		var total_basaglar_patients_year_5 = with_commas( Math.round( engine.get_value( 37, 8 ) ));			
			if ( data_store.diabetes_type == 2 ) {
				total_basaglar_patients_year_5 = with_commas( Math.round( engine.get_value( 63, 8 ) ));		
			} else {
				total_basaglar_patients_year_5 +=  ' and ' + with_commas( Math.round( engine.get_value( 63, 8 ) ));
			}
		
		var saving_or_impact_text = engine.check_if_saving();
		var budget_saving_year_5 = _default.cur + with_commas( Math.round( engine.get_value( 255, 8 ) ));	
		
		statement_array.push( "The budget impact analysis estimates the cost impact of introducing Basaglar to the basal insulin glargine market in " + country_name + " over a 5 year period." );
		statement_array.push( "The analysis compares a market scenario where a proportion of eligible " + diabetes_type_name + " patients are managed on Basaglar to an alternative market scenario where Basaglar is not available and patients are managed on Lantus." );
		
		var basaglar_pens_carts_exist = engine.check_if_pens_and_carts( 'basaglar' );
		var lantus_pens_carts_exist = engine.check_if_pens_and_carts( 'lantus' );
				
		var price_statement = "Costs are estimated based on a daily price of";
		
		if ( basaglar_pens_carts_exist.pens ) price_statement += " " + daily_price_basaglar_pens + " for Basaglar";
		if ( basaglar_pens_carts_exist.pens && lantus_pens_carts_exist.pens ) price_statement += " and";
		if ( lantus_pens_carts_exist.pens ) price_statement += " " + daily_price_lantus_pens + " for Lantus";
		if ( basaglar_pens_carts_exist.pens || lantus_pens_carts_exist.pens ) price_statement += " per pen and";
		if ( basaglar_pens_carts_exist.carts ) price_statement += " " + daily_price_basaglar_carts + " for Basaglar";
		if ( basaglar_pens_carts_exist.carts && lantus_pens_carts_exist.carts ) price_statement += " and";
		if ( lantus_pens_carts_exist.carts ) price_statement += " " + daily_price_lantus_carts + " for Lantus";
		if ( basaglar_pens_carts_exist.pens || lantus_pens_carts_exist.pens ) price_statement += " per cartridge.";
		
		statement_array.push( price_statement );
			
		statement_array.push( "The total basal insulin glargine market for " + diabetes_type_name + " in the first year of introduction is estimated at " + market_first_year + ", respectively with " + new_init_percentage );statement_array.push( "Basaglar market share is defined as the percentage of new initiators of basal insulin glargine likely to be managed on Basaglar once it becomes available." );
		statement_array.push( "The analysis assumes that over the 5 year period, Basaglar uptake would increase from " + market_first_year_share + " of basal insulin glargine new initiators in year 1 to " + market_fifth_year_share + " in year 5, resulting in a total of " + total_basaglar_patients_year_5 + " Basaglar patients by the end of year 5 for " + diabetes_type_name + ", respectively." );
		statement_array.push( "The " + saving_or_impact_text + " expected over the 5 year time horizon are estimated at " + budget_saving_year_5 + " indicating that introduction of Basaglar would result in substantial net savings for the " + country_name_local + " market." );
			


/*		
		statement_array.push( "The budget impact analysis estimates the cost impact of introducing Basaglar to the basal insulin glargine market in " + _default.title + "over a 5 year period." );
		statement_array.push( "The analysis compares a market scenario where a proportion of eligible " + diabetes_type_name + " patients are managed on Basaglar to an alternative market scenario where Basaglar is not available and patients are managed on Lantus." );
		statement_array.push( "Costs are estimated based on a daily price of " + daily_price_basaglar + " for Basaglar and " + daily_price_lantus + " for Lantus." );
		
//		statement_array.push( "The total basal insulin glargine market for " + diabetes_type_name + " in the first year of introduction is estimated at " + market_first_year + " with " + market_first_year_share + " of these patients likely to be new initiators." );
		
		
		statement_array.push( "Basaglar market share is defined as the percentage of new initiators of basal insulin glargine likely to be managed on Basaglar once it becomes available." );
		
		statement_array.push( "The savings expected over the 5 year time horizon are estimated at 318,385,503 indicating that introduction of Basaglar would result in substantial net savings for the Saudi Arabian market." );
		
		
		if ( data_store.diabetes_type == 1 ) {
			statement_array.push( "The model assumed there are " + with_commas( Math.round( engine.get_value( 11, 4 ) )) + " patients with T1DM. This was calculated applying a " + engine.get_value( 10, 3 ) + "% diabetes prevalence rate." );		
			statement_array.push( "Of T1DM patients, " + with_commas( Math.round( engine.get_value( 35, 4 ) ) ) + " were considered eligible for Basaglar in year 1." );
			statement_array.push( "In T1DM the expected uptake of Basaglar in new initiators from years 1-5 was estimated at " + engine.get_value( 39, 4 ) + "%, " + engine.get_value( 39, 5 ) + "%, " + engine.get_value( 39, 6 ) + "%, " + engine.get_value( 39, 7 ) + "% and " + engine.get_value( 39, 8 ) + "%, respectively." );			
			var year_1 = with_commas( Math.round( engine.get_value( 37, 4 ))) ;
			var year_5 = with_commas( Math.round( engine.get_value( 37, 8 )));
			statement_array.push( "In T1DM, the model estimated that Basaglar patients increase from " + year_1 + " in year 1 to " + year_5 + " by year 5." );
			statement_array.push( "Drug costs were based on annual cost " + _default.cur + annual_price + " for Basaglar and annual cost " + _default.cur + lantus_annual_price + " for Lantus"  );
			var grand_total = with_commas( Math.abs( Math.round( engine.get_value( 254, 8 ))));	
			statement_array.push( "Based on the current assumptions, the model predicts potential 5 year savings in the region of " + _default.cur + grand_total + " through the introduction of Basaglar."  );
			
		} else if ( data_store.diabetes_type == 2 ) {
			statement_array.push( "The model assumed there are " + with_commas( Math.round( engine.get_value( 12, 4 ) )) + " patients with T2DM. This was calculated applying a " + engine.get_value( 10, 3 ) + "% diabetes prevalence rate." );		
			statement_array.push( "Of T2DM patients, " + with_commas( Math.round( engine.get_value( 61, 4 ) ) ) + " were considered eligible for Basaglar in year 1." );
			statement_array.push( "In T2DM the expected uptake of Basaglar in new initiators from years 1-5 was estimated at " + engine.get_value( 65, 4 ) + "%, " + engine.get_value( 65, 5 ) + "%, " + engine.get_value( 65, 6 ) + "%, " + engine.get_value( 65, 7 ) + "% and " + engine.get_value( 65, 8 ) + "%, respectively" );			
			var year_1 = with_commas( Math.round( engine.get_value( 63, 4 ) )) ;
			var year_5 = with_commas( Math.round( engine.get_value( 63, 8 ) ));
			statement_array.push( "In T2DM, the model estimated that Basaglar patients increase from " + year_1 + " in year 1 to " + year_5 + " by year 5." );
			statement_array.push( "Drug costs were based on annual cost " + _default.cur + annual_price + " for Basaglar and annual cost " + _default.cur + lantus_annual_price + " for Lantus"  );
			var grand_total = with_commas( Math.abs( Math.round( engine.get_value( 254, 8 ))));	
			statement_array.push( "Based on the current assumptions, the model predicts potential 5 year savings in the region of " + _default.cur + grand_total + " through the introduction of Basaglar."  );
			
		} else if ( data_store.diabetes_type == 3 ) {
			statement_array.push( "The model assumed there are " + with_commas( Math.round(engine.get_value( 10, 4 ) )) + " patients with T1DM & T2DM. This was calculated applying a " + engine.get_value( 10, 3 ) + "% diabetes prevalence rate. The split between T1DM and T2DM is " + engine.get_value( 11, 3 ) + "% and " + engine.get_value( 12, 3 ) + "%, respectively." );					
			statement_array.push( "Of T1DM patients, " + with_commas( Math.round( engine.get_value( 35, 4 ) ) ) + " were considered eligible for Basaglar in year 1. Of T2DM patients, " + with_commas( Math.round( engine.get_value( 61, 4 ) ) ) + " were considered eligible for Basaglar in year 1." );
			statement_array.push( "In T1DM the expected uptake of Basaglar in new initiators from years 1-5 was estimated at " + engine.get_value( 39, 4 ) + "%, " + engine.get_value( 39, 5 ) + "%, " + engine.get_value( 39, 6 ) + "%, " + engine.get_value( 39, 7 ) + "% and " + engine.get_value( 39, 8 ) + "%, respectively. In T2DM the expected uptake of Basaglar in new initiators from years 1-5 was estimated at " + engine.get_value( 65, 4 ) + "%, " + engine.get_value( 65, 5 ) + "%, " + engine.get_value( 65, 6 ) + "%, " + engine.get_value( 65, 7 ) + "% and " + engine.get_value( 65, 8 ) + "%, respectively" );			
			var year_1 = with_commas( Math.round( engine.get_value( 37, 4 ) + engine.get_value( 63, 4 ) )) ;
			var year_5 = with_commas( Math.round( engine.get_value( 37, 8 ) + engine.get_value( 63, 8 ) ));
			statement_array.push( "In T1DM & T2DM, the model estimated that Basaglar patients increase from " + year_1 + " in year 1 to " + year_5 + " by year 5." );
			statement_array.push( "Drug costs were based on annual cost " + _default.cur + annual_price + " for Basaglar and annual cost " + _default.cur + lantus_annual_price + " for Lantus"  );
			var grand_total = with_commas( Math.abs( Math.round( engine.get_value( 254, 8 ))));	
			statement_array.push( "Based on the current assumptions, the model predicts potential 5 year savings in the region of " + _default.cur + grand_total + " through the introduction of Basaglar."  );
			
		}
*/												
	};
	
	function create_budget_impact_graph( parent ) {
		
		var padding =100;
		
		var html = graphs.get_detailed_results_html( false, 'detailed' );
					
		var web_view = Ti.UI.createWebView( {
			
			width: parent.width - padding, height: parent.height - padding,			
			//touchEnabled: false,
			disableBounce: true,
			html: html
		} );
		parent.add( web_view );
		
		web_view.addEventListener( 'load', loader=function () { 
			web_view.removeEventListener( 'load', loader );
			web_view.reload();
		});
		
	};
	
	function arrow_clicked ( e ) {
					
		var object = e.source;
		
		if ( scrollable_view.currentPage+object.direction >= 0 && scrollable_view.currentPage+object.direction < scrollable_view.views.length ) { 
			scrollable_view.scrollToView( scrollable_view.currentPage+object.direction );				
			
		}
		
	}
	
	function scroll_end_function ( e ) {
		
		var object = e.source;
		
		if ( scrollable_view.currentPage == 0 ) { 
			left_arrow.opacity = 0;				
		} else if ( scrollable_view.currentPage == scrollable_view.views.length-1 ) { 
			right_arrow.opacity = 0;	
		} else {
			left_arrow.opacity = 1;
			right_arrow.opacity = 1;
		}
		
		dot_indicator.update_position( scrollable_view.currentPage );
		
	}
/*	
	function send_email ( e ) {
		
		var message = '<p><img width="69" height="39" src="file://localhost/Users/vaughanbarwood/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image002.gif" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eli_Lilly_and_Company.svg/2000px-Eli_Lilly_and_Company.svg.png"/><img width="80" height="38" src="file://localhost/Users/vaughanbarwood/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image004.gif" alt="http://cdn-2.famouslogos.us/images/boehringer-ingelheim-logo.jpg"/></p><p>This leave piece has been produced in response to a request for bespoke analysis generated using parameters selected and/or entered by:</p><p>Insert name here &lt;name&gt;</p><p>on &lt;date&gt;</p><p>at &lt;time&gt;</p><p>Executive summary</p><p>The summary below outlines the key results however, more detail can be found in sections 1-10 below.</p><p>· The model estimated the expected budget impact of the introduction of Basaglar to &lt;country&gt;.</p><p>· Basaglar market share was defined as the percentage of new initiators on long-acting insulin that might potentially be managed on Basaglar.</p><p>· The model assumed there were xxx patients with T1DM &amp; T2DM. This was calculated applying a xxx% prevalence rate. The split between T1DM &amp; T2DM is10% and 90%, respectively.</p><p>· Of T1DM patients, xxx were considered eligible for Basaglar in year 1.</p><p>· In T1DM the expected uptake of Basaglar in new initiators from years 1-5 was estimated at x%, x%, x%, x% and x%, respectively.</p><p>· In the T1DM population the model estimated that Basaglar patients increase from x in year 1 to x by year 5.</p><p>· Drug costs were based on an annual costs of x for Basaglar and x for Lantus.</p><p>· Based on current assumptions, the model predicts potential 5 year savings in the region of xxx through the introduction of Basaglar.</p><p><img width="409" height="228" src="file://localhost/Users/vaughanbarwood/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image006.gif"/></p><p><a name="_Ref444858392"><strong>1. </strong><strong>Introduction</strong></a><strong></strong></p><p>The Basaglar<sup>®</sup> budget impact model enables users to estimate the population of new initiators to basal insulin glargine and the financial impactof introducing Basaglar<sup>®</sup> biosimilar.</p><p>The model allows the user to define a population of interest based on region and prevalence of type 1 or type 2 diabetes mellitus (T1DM or T2DM) andduration since diagnosis. Model parameters were estimated using regional data from published sources where available, and validated using expert localopinion. Outcomes are estimated based on default or user-configured inputs for population characteristics and drug prices. Results for the budget impactfollowing the introduction of Basaglar<sup>®</sup> are estimated over a period of up to 5 years.</p><p><strong>2. </strong><strong>Terms and conditions of use</strong></p><p>The model estimates the expected budget impact of the introduction of Basaglar based on drug costs. Other factors such as clinical long term outcomes arenot considered given that the overall clinical profile of Basaglar<sup>®</sup> is similar to that of Lantus. Default values may be overwritten by thecustomer if preferred.</p><p>All analyses within the model incorporating future prices are assumptions and may not provide an accurate reflection of the cost of therapies in thefuture. <a></a><a>Lilly have taken reasonable care in developing the Basaglar<sup>®</sup> budget impact model but exclude responsibility for any loss, liability or costsarising in connection with the outputs of the model to the full extent permitted by law.</a><a id="_anchor_1" href="#_msocom_1" name="_msoanchor_1">[AR1]</a><a id="_anchor_2" href="#_msocom_2" name="_msoanchor_2">[A.H.2]</a></p><p><strong>3. </strong><strong>Basaglar®</strong></p><p>Basaglar<sup>®</sup> is Boehringer Ingelheim-Lilly’s alliance biosimilar version of Sanofi’s Lantus (insulin glargine molecule). A biosimilar is atherapeutic protein molecule with an identical amino acid sequence to that of a previously marketed biological reference product, with no clinicallymeaningful difference in safety or efficacy.</p><p>Basaglar<sup>®</sup> was granted European marketing authorisation in September 2014 and is indicated to treat diabetes mellitus in adults, adolescents andchildren aged 2 years and above – please see Prescribing Information in Appendix 1 for more detail. Basaglar<sup>®</sup> is available in the Lillyprefilled KwikPen™ and in cartridges for use in the reusable Lilly HumaPen Savvio<sup>®</sup>.</p><p><strong>4. </strong><strong>Basaglar® Clinical Efficacy</strong></p><p><strong></strong></p><p>· The Basaglar pharmacokinetic (PK) and pharmacodynamic (PD) profile are similar to that of Lantus®</p><p>· Basaglar and Lantus provide similar HbA<sub>1c </sub>(glycated haemoglobin) reductions in T1DM and T2DM</p><p>· Basaglar and Lantus provide similar Fasting Blood Glucose (FBG) control in T1DM and FBG reductions in T2DM</p><p>· Weight change and mean daily insulin dose are similar with Basaglar and Lantus in T1DM and T2DM</p><ul><li>HbA<sub>1c </sub>reductions are similar for Basaglar and Lantus in T2DM, in insulin naïve patients and also in patients previously treated with Lantus</li></ul><p>· Insulin glargine has an established safety profile in T1DM and T2DM</p><p><strong></strong></p><p><strong>5. </strong><strong>Basaglar® Patient Experience</strong></p><p>The Basaglar initiation experience is designed to provide emotional support to healthcare providers and patients by:</p><p>· Improving patient education</p><p>· Reducing resistance</p><p>· Engaging patients</p><p>· Supporting patients</p><p>· Empowering patients</p><p>· Simplifying treatment initiation</p><p><strong></strong></p><p><strong>6. </strong><strong>Basaglar® Model Assumptions</strong></p><p>The following assumptions were applied to the model and calculations:</p><p>· Lilly is making a new insulin glargine biosimilar available to physicians and patients. The model assumes that the long-acting insulin market will beimpacted as a proportion of patients starting on long-acting insulin (new initiators) may use Basaglar.</p><p>· Proportion of new initiators is estimated based on a function of the number of T1 and T2 patients, the proportion of patients on long acting insulinglargine, and the proportion of this market considered new initiators.</p><p>· Population estimates are based on local country data. Where published estimates of country-specific population data are unavailable, estimates from asurvey of local physicians have been applied in the model.</p><p>· Basaglar market share predictions are defined by the user on the data input screen (defined as the percent of new initiators expected to use Basaglar ina given year).</p><p>· The budget impact is estimated by comparing the potential market in the absence of Basaglar (patients would be managed on existing long acting insulins)with a market where Basaglar is available (patients would be managed on Basaglar).</p><p>· The current market of <a></a><a>long acting insulin glargine’s </a><a id="_anchor_3" href="#_msocom_3" name="_msoanchor_3">[AR3]</a> <a id="_anchor_4" href="#_msocom_4" name="_msoanchor_4">[DJ(L4]</a> is limited to Lantus in the included countries but placeholders are included for newproducts including Merck Serono’s new insulin glargine biosimilar due to launch in 2017.</p><p>· In the current market Basaglar is not expected to take market share from Toujeo.</p><p>· The model includes drug costs only. The model estimates annual and cumulative cost for both markets (with and without Basaglar). The cost in a given yearincludes new initiators plus initiators from previous years (who are assumed to remain on treatment). The budget impact is estimated as the difference incost between these two market estimates.</p><p>· Lantus prices have been estimated using an average weighted price across available formulations using country-specific sales volume data from the IMSMIDAS dataset.</p><p>· In the case of Basaglar, where the price of cartridges have not been provided, the prices for pens has been applied instead.</p><p>· The user can select default prices including public prices (the price at which the consumer buys product from a pharmacy or the final price reimbursed bythe government) or Net Wholesale Price (the list price or invoice price charged by a manufacturer to distributors or other third parties that take legalownership of the product and resell it to pharmacies or hospitals. This price is also commonly referred to as the "ex-manufacturer" price). Alternativelythe user can over-write country level data and input an expected daily cost.</p><p><strong>7. </strong><strong>Data Inputs</strong></p><p>The following base case data input were selected for the purpose of generating budget impact results across 5 years.</p><p>· Country: &lt;Malaysia, Egypt, Saudi Arabia, South Africa&gt;</p><p>· Comparators: &lt;Lantus, Toujeo, Merck insulin glargine, Biocon insulin glargine&gt;</p><ul><li>Population selected: &lt;T1DM, T2DM, T1DM &amp;T2DM&gt;</li></ul><p>· Duration since diagnosis selected: &lt;All, 5 years, 5-10 years, &gt;10 years&gt;</p><p>User defined or default inputs applied in the analysis are shown below for the selected population.</p><p><strong>Population &lt;either table 1 or 2 will be displayed based on the yes/no selection of “Do you know your eligible population of interest&gt;</strong></p><p>Table 1. Population inputs (Malaysia, T1DM)</p><table border="1" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td width="83%" valign="top"><p><strong>Overall population </strong></p></td><td width="16%" valign="top"><p><strong>Input</strong></p></td></tr><tr><td width="83%" valign="top"><p>Total population</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%" valign="top"><p>Growth rate</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%" valign="top"><p><strong>Overall diabetes population </strong></p></td><td width="16%" valign="top"><p><strong></strong></p></td></tr><tr><td width="83%" valign="top"><p>% population with diabetes</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%" valign="top"><p>% of patients with T1DM</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%" valign="top"><p>% of patients with T2DM</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%" valign="top"><p><strong>T1DM population </strong></p></td><td width="16%" valign="top"><p><strong></strong></p></td></tr><tr><td width="83%"><p>% of patients treated with basal/long-acting insulin glargine</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%"><p>% of basal insulin market who are new initiators (eligible market)</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%" valign="top"><p><strong>T1DM market share</strong></p></td><td width="16%" valign="top"><p><strong></strong></p></td></tr><tr><td width="83%" valign="top"><p>Basaglar market share forecast</p></td><td width="16%" valign="top"></td></tr><tr><td width="83%" valign="top"><p>% of basaglar uptake from Lantus</p></td><td width="16%" valign="top"></td></tr></tbody></table><p>Table 2. Eligible population, T1DM, years 1-5</p><table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td width="76" valign="top"><p><strong></strong></p></td><td width="75" valign="top"><p align="center"><strong>2016</strong></p></td><td width="75" valign="top"><p align="center"><strong>2017</strong></p></td><td width="75" valign="top"><p align="center"><strong>2018</strong></p></td><td width="75" valign="top"><p align="center"><strong>2019</strong></p></td><td width="75" valign="top"><p align="center"><strong>2020</strong></p></td></tr><tr><td width="76" valign="top"><p>Current eligible market</p></td><td width="75"></td><td width="75"></td><td width="75"></td><td width="75"></td><td width="75"></td></tr><tr><td width="76" valign="top"><p>User defined eligible market</p></td><td width="75" valign="top"></td><td width="75" valign="top"></td><td width="75" valign="top"></td><td width="75" valign="top"></td><td width="75" valign="top"></td></tr></tbody></table><p><strong>Drug costs</strong></p><p>· Basaglar price inputs selected: &lt;Net wholesale price, Public price, user defined&gt;</p><p>· Lanuts price inputs selected: &lt;Net wholesale price, Public price, user defined&gt;</p><p>· Percentage of patients on pens and cartridges</p><p>Table 3. Percentage split</p><table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td width="150" valign="top"><a name="_Toc445725387"></a><p><strong></strong></p></td><td width="150" valign="top"><p><strong>Pens</strong></p></td><td width="150" valign="top"><p><strong>Cartridges</strong></p></td></tr><tr><td width="150" valign="top"><p>Basaglar</p></td><td width="150" valign="top"><p>%</p></td><td width="150" valign="top"><p>%</p></td></tr><tr><td width="150" valign="top"><p>Lantus</p></td><td width="150" valign="top"><p>%</p></td><td width="150" valign="top"><p>%</p></td></tr></tbody></table><p>Table 4. Drug cost inputs</p><table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td width="92" valign="top"><p><strong>Treatment </strong></p></td><td width="92" valign="top"><p align="center"><strong>Pack price</strong></p></td><td width="92" valign="top"><p align="center"><strong>Daily dose</strong></p></td><td width="92" valign="top"><p align="center"><strong>Daily cost</strong></p></td><td width="92" valign="top"><p align="center"><strong>Annual cost</strong></p></td></tr><tr><td width="92" valign="top"><p>Lantus</p></td><td width="92" valign="top"></td><td width="92" valign="top"></td><td width="92" valign="top"></td><td width="92" valign="top"></td></tr><tr><td width="92" valign="top"><p>Basaglar</p></td><td width="92" valign="top"></td><td width="92" valign="top"></td><td width="92" valign="top"></td><td width="92" valign="top"></td></tr></tbody></table><p><strong>8. </strong><strong>Base Case Results</strong></p><p>The following results show a tabular and graphic representation of the budget impact of Basaglar in terms of treatment cost for all patients within thepopulation group(s) selected.</p><p>Table 5. Budget impact results, years 1-5</p><table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td width="77" valign="top"><p align="center"><strong></strong></p></td><td width="77" valign="top"><p align="center"><strong>2016</strong></p></td><td width="77" valign="top"><p align="center"><strong>2017</strong></p></td><td width="77" valign="top"><p align="center"><strong>2018</strong></p></td><td width="77" valign="top"><p align="center"><strong>2019</strong></p></td><td width="77" valign="top"><p align="center"><strong>2020</strong></p></td></tr><tr><td width="77"><p>Annual cost – market including Basaglar</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Total cost of Basaglar</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Total cost of Lantus</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Annual cost - alternative market</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Expected annual savings</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Cumulative budget impact</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr></tbody></table><p>Figure 1. Cost over 5 years</p><p><img width="442" height="250" src="file://localhost/Users/vaughanbarwood/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image008.gif"/></p><p>Figure 2. Savings and cumulative market share</p><p><img width="442" height="250" src="file://localhost/Users/vaughanbarwood/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image010.gif"/></p><p><a><strong>9. </strong><strong>Drug Price </strong></a><a><strong>Scenarios</strong></a><a id="_anchor_5" href="#_msocom_5" name="_msoanchor_5">[AR5]</a><a id="_anchor_6" href="#_msocom_6" name="_msoanchor_6">[A.H.6]</a><strong></strong></p><p>In these two scenarios, the user is able to vary the drug price to assess the effect on budget impact. Drug prices were varied with the following discountsacross all years.</p><p>Table 6. Drug price scenario inputs</p><table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td width="225" valign="top"><p><strong>Price </strong></p></td><td width="225" valign="top"><p align="center"><strong>Input</strong></p></td></tr><tr><td width="225" valign="top"><p>Lantus base case price</p></td><td width="225" valign="top"></td></tr><tr><td width="225" valign="top"><p>Discount applied</p></td><td width="225" valign="top"><p align="center">Year 1:%</p><p align="center">Year 2:%</p><p align="center">Year 3:%</p><p align="center">Year 4:%</p><p align="center">Year 5:%</p></td></tr></tbody></table><p><strong></strong></p><p>Table 7: Drug price scenario, Budget impact results, years 1-5<strong></strong></p><table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td width="77" valign="top"><p align="center"><strong></strong></p></td><td width="77" valign="top"><p align="center"><strong>2016</strong></p></td><td width="77" valign="top"><p align="center"><strong>2017</strong></p></td><td width="77" valign="top"><p align="center"><strong>2018</strong></p></td><td width="77" valign="top"><p align="center"><strong>2019</strong></p></td><td width="77" valign="top"><p align="center"><strong>2020</strong></p></td></tr><tr><td width="77"><p>Annual cost – market including Basaglar</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Total cost of Basaglar</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Total cost of Lantus</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Annual cost - alternative market</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Expected annual savings</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr><tr><td width="77"><p>Cumulative budget impact</p></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td><td width="77"></td></tr></tbody></table><p><strong></strong></p><p>Figure 3. Drug price scenario results vs. base case, years 1-5</p><p><img width="441" height="246" src="file://localhost/Users/vaughanbarwood/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image012.gif"/></p><p><strong><br clear="all"/></strong></p><p><strong></strong></p><p><a name="_Ref444858599"></a><a name="_Ref444858399"><strong>10.</strong><strong>Sensitivity Analysis</strong></a><strong></strong></p><p>The tornado diagram below shows the top five variables having the greatest effect on budget impact.</p><p><img width="369" height="242" src="file://localhost/Users/vaughanbarwood/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image014.gif"/><br clear="all"/></p><p><strong>Appendix 1: Prescribing Information</strong></p><p>To be added in final version</p><div><div><div id="_com_6"></div></div></div><div><div><div id="_com_6"></div></div></div><div><div><div id="_com_6"></div></div></div>';
		
		var email_dialogue = Titanium.UI.createEmailDialog();
		email_dialogue.subject = "Basaglar";
		email_dialogue.html = true;
		email_dialogue.messageBody = message;
	    email_dialogue.open();
		
		email_dialogue.addEventListener('complete',function(e){
	    	if(e.success) {
	    		print("Mail Sent");		
	    	} else {
	    		print(e.error);//"system can't send email" means no account on device"
	    		alert( "No mail account setup on device." );
	    	}
   		});
   	
   }
*/		
	
	function proceed_function() {
		
		screen_controller.switch_screen_state_function( 'Assumptions' );
		
	}		


////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	return self;
	
}

module.exports = this_class;