
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	exports.images = new Array();
	
////////////////////////////////////////////////////
//FUNCTIONS PUBLIC
////////////////////////////////////////////////////

	
	exports.save_image = function( view, id ) {
		
		if (  view != null ) {
			var blob  = view.toImage();
				
			// generate filename
			var filename = id+'.png';
			var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename );
		   
		   	file.write( blob );
			
			exports.images.push( { filename: filename, id: id } );
			console.log( 'Added to report: ' + id + " / " + filename );
			
			return filename;
		
		}
		
	};
	
	function get_base64_image(filename) {
		var file = Ti.Filesystem.getFile( Ti.Filesystem.applicationDataDirectory, filename );
		return file.exists() ? Ti.Utils.base64encode(file.read()) : '';
	};
	
	function check_which_graphs_exist() {
		
		var obj = make_image_obj();
		
		var message = "The following sections have not been viewed, to include them in the report please view the following sections.\n\n";
		
		var count = 0;
		
		if ( !obj.detailed_result ) {
			count++;
			message += " Detatailed results";
		}		
		if ( !obj.drug_scenario ) {			
			if ( count > 0 ) message += ",";
			message += " Drug price scenario";
			count++;
		}
		if ( !obj.saving ) {		
			if ( count > 0 ) message += ",";
			message += " Savings graph";
			count++;
		}
		if ( !obj.tornado ) {			
			if ( count > 0 ) message += ",";
			message += " Sensitivity analysis";
			count++;
		}
		
		if ( count > 0 ) {
						
			var dialog = Ti.UI.createAlertDialog({
				title: 'Sections not viewed',
			    message: message,
			    ok: 'Create PDF',
			    cancel: 1,
			    buttonNames: ['Create PDF', 'Cancel'],
			    title: ''
			});
			dialog.show();
			dialog.addEventListener('click', function(e){
			    if (e.index === e.source.cancel){
			     	//exports.create_pdf(); // Ti.API.info('The cancel button was clicked');
			    } else {
			    	exports.create_pdf( obj );	
			    }
		    });
		} else {
			
			exports.create_pdf( obj );	
			
		}
		
		return obj;
		
	};
	
	function make_image_obj () {
		
		var array = exports.images;
		var obj = {};
		
		for ( var i=0; i<array.length; i++ ) {
			obj[ array[i].id ] = array[i].filename;
		}
		
		return obj;
		
	};
	
	exports.test_html = function (  ) {
		
		var img_obj = check_which_graphs_exist();
		
/*		var html = exports.create_html();
		var top_window = layers.top_layer_function();
		
		var web_view = Ti.UI.createWebView({
			top: 0,
			width: '100%', height: '100%',
			html : html, opacity: 0.5
		});
		
		top_window.add( web_view );
*/		
//		exports.create_pdf();
		
	};
	
	exports.create_pdf = function ( ) {
			
		var html2pdf = require('com.lvc.html2pdf');
	
		var css = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'includes/css', 'style_pdf.css').read().text;
	
		var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><style>' + css + '</style></head><body >';       
		
			html += exports.create_html();		
			
		html2pdf.addEventListener('pdfready', function(e) {  
			var email_dialogue = Ti.UI.createEmailDialog();
			// email_dialogue.subject = "IMS - Data Visualiser PDF Summary";
			// email_dialogue.html = true;
			email_dialogue.addAttachment(Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Report.pdf'));		        
			// email_dialogue.messageBody = Alloy.Globals.app_data.emailWording;
			email_dialogue.open();
			email_dialogue.addEventListener('complete',function(e){
			    	console.log(e);
			    	if(e.success) {
						// message.type  				= 'popup';
						// message.title 				= 'Alert';
						// message.message    			= 'Do you want to clear your summary?';
						// message.buttons = [];
						// var button = { title: "YES", click: clear_summary }; 
						// message.buttons.push(button);
						// var button = { title: "NO", click: Alloy.Globals.popup_close }; 
						// message.buttons.push(button);
						// message.show($);	
						exports.images = null;
						exports.images = new Array();
								
				    } else {
				    		// message.type  				= 'popup';
							// message.title 				= 'Alert';
							// message.message    			= 'Unable to send PDF. No mail account setup on device.';
							// message.buttons = [];
							// var button = { title: "OK", click: Alloy.Globals.popup_close }; 
							// message.buttons.push(button);
							// message.show($);
				    	// }
				    }
		   		});
	   	
		});
	
		html2pdf.setHtmlString(html, 'Report.pdf');
						
	};
	
	
	exports.create_html = function (  ) {
		
		var image_obj = make_image_obj();
				
		var years_array = engine.get_years_array();
		
		var users_name = "Awaiting name";
		var date = new Date();
		var current_date = date.toLocaleDateString();
		var current_time = (date.getHours()<10?'0':'') + date.getHours();//, date.getHours(); 
			current_time += ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();// //":" + date.getMinutes();
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
		
		var comparators_list = ""; 
			if ( data_store.lantus ) comparators_list += "Lantus";
			if ( data_store.toujeo ){
				if ( comparators_list.length > 0 ) comparators_list += ", ";
				comparators_list += "Toujeo";
			}
			if ( data_store.merck_insulin_glargine ){
				if ( comparators_list.length > 0 ) comparators_list += ", ";
				comparators_list += "Merck Insulin Glargine";
			}
			if ( data_store.biocon_insulin_glargine ){
				if ( comparators_list.length > 0 ) comparators_list += ", ";
				comparators_list += "Biocon Insulin Glargine";
			}
		
		var disease_duration = "";
		if ( data_store.duration_of_diabetes == 1 ) disease_duration = "<5 years";
		if ( data_store.duration_of_diabetes == 2 ) disease_duration = "5-10 years";
		if ( data_store.duration_of_diabetes == 3 ) disease_duration = "10+ years";
		if ( data_store.duration_of_diabetes == 4 ) disease_duration = "All";
		//_default.cur
		
		var price_input_type;
		if ( data_store.drug_prices == 2 ) price_input_type = "Public";
		if ( data_store.drug_prices == 3 ) price_input_type = "Net Wholesale";
		
		var table_count = 1;
		
		var html = "";
			
			html +=     "<div class='page'>";
				
			html += 	"<p>This leave piece has been produced in response to a request for bespoke analysis generated using parameters selected and/or entered:</p>\
						<p>on " + current_date + "</p>\
						<p>at " + current_time + "</p>";
			
			//Executive Summary		
			html += 	"<p><b>Executive summary</b></p>\
						<p>The budget impact analysis estimates the cost impact of introducing Basaglar to the basal insulin glargine market in " + country_name + " over a 5 year period. </p>\
						<p>The analysis compares a market scenario where a proportion of eligible " + diabetes_type_name + " patients are managed on Basaglar to an alternative market scenario where Basaglar is not available and patients are managed on Lantus.</p>";
			
			var basaglar_pens_carts_exist = engine.check_if_pens_and_carts( 'basaglar' );
			var lantus_pens_carts_exist = engine.check_if_pens_and_carts( 'lantus' );
			
			console.log( JSON.stringify( basaglar_pens_carts_exist ) );
			console.log( JSON.stringify( lantus_pens_carts_exist ) );
											
			var price_statement = "Costs are estimated based on a daily price of";
		
			if ( basaglar_pens_carts_exist.pens ) price_statement += " " + daily_price_basaglar_pens + " for Basaglar";
			if ( basaglar_pens_carts_exist.pens && lantus_pens_carts_exist.pens ) price_statement += " and";
			if ( lantus_pens_carts_exist.pens ) price_statement += " " + daily_price_lantus_pens + " for Lantus";
			if ( basaglar_pens_carts_exist.pens || lantus_pens_carts_exist.pens ) price_statement += " per pen and";
			if ( basaglar_pens_carts_exist.carts ) price_statement += " " + daily_price_basaglar_carts + " for Basaglar";
			if ( basaglar_pens_carts_exist.carts && lantus_pens_carts_exist.carts ) price_statement += " and";
			if ( lantus_pens_carts_exist.carts ) price_statement += " " + daily_price_lantus_carts + " for Lantus";
			if ( basaglar_pens_carts_exist.pens || lantus_pens_carts_exist.pens ) price_statement += " per cartridge.";
			
			html +=		"<p>" + price_statement + "</p>";
						
			html +=		"<p>The total basal insulin glargine market for " + diabetes_type_name + " in the first year of introduction is estimated at " + market_first_year + ", respectively with " + new_init_percentage + "</p>\
						<p>Basaglar market share is defined as the percentage of new initiators of basal insulin glargine likely to be managed on Basaglar once it becomes available.</p>\
						<p>The analysis assumes that over the 5 year period, Basaglar uptake would increase from " + market_first_year_share + " of basal insulin glargine new initiators in year 1 to " + market_fifth_year_share + " in year 5, resulting in a total of " + total_basaglar_patients_year_5 + " Basaglar patients by the end of year 5 for " + diabetes_type_name + ", respectively.</p>\
						<p>The " + saving_or_impact_text + " expected over the 5 year time horizon are estimated at " + budget_saving_year_5 + " indicating that introduction of Basaglar would result in substantial net savings for the " + country_name_local + " market.</p>";
			
			if ( image_obj.detailed_result ) {	
				var graph_one = get_base64_image( image_obj.detailed_result );				
				html += 	"<p><img src='data:image/png;base64,"+graph_one+"' width='100%' /></p>\
							<br />";
			}
			
			html +=     "</div>";
			html +=     "<div class='page'>";
			
			//Introduction
			html +=		"<p><b>1. Introduction</b></a></p>\
						<p>The Basaglar™ budget impact model enables users to estimate the population of new initiators to basal insulin glargine and the financial impact of introducing Basaglar™ biosimilar.</p>\
						<p>The model allows the user to define a population of interest based on region and prevalence of type 1 or type 2 diabetes mellitus (T1DM or T2DM) and duration since diagnosis. Model parameters were estimated using regional data from published sources where available, and validated using expert local opinion. Outcomes are estimated based on default or user-configured inputs for population characteristics and drug prices. Results for the budget impact following the introduction of Basaglar™ are estimated over a period of up to 5 years. </p>";	
			
			//Terms and conditions of use
			html +=		"<p><b>2. Terms and conditions of use</b></p>\
						<p>The model estimates the expected budget impact of the introduction of Basaglar based on drug costs. Other factors such as clinical long term outcomes are not considered given that the overall clinical profile of Basaglar™ is similar to that of Lantus. Default values may be overwritten by the customer if preferred.</p>\
						<p>All analyses within the model incorporating future prices are assumptions and may not provide an accurate reflection of the cost of therapies in the future. Lilly have taken reasonable care in developing the Basaglar™ budget impact model but exclude responsibility for any loss, liability or costs arising in connection with the outputs of the model to the full extent permitted by law.</p>";		
			
			//Basaglar									
			html +=		"<p><b>3. Basaglar™</b></p>\
						<p>Basaglar™ is Boehringer Ingelheim-Lilly’s alliance biosimilar version of Sanofi’s Lantus (insulin glargine molecule). A biosimilar is a therapeutic protein molecule with an identical amino acid sequence to that of a previously marketed biological reference product, with no clinically meaningful difference in safety or efficacy.</p>\
						<p>Basaglar™ was granted European marketing authorisation in September 2014 and is indicated to treat diabetes mellitus in adults, adolescents and children aged 2 years and above – please see Prescribing Information in Appendix 1 for more detail. Basaglar™ is available in the Lilly prefilled KwikPen™ and in cartridges for use in the reusable Lilly HumaPen Savvio<sup>®</sup>.</p>";
			
			//Basaglar™ Clinical Efficacy									
			html +=		"<p><b>4. Basaglar™ Clinical Efficacy</b></p>\
						<ul><li>The Basaglar pharmacokinetic (PK) and pharmacodynamic (PD) profile are similar to that of Lantus®</li>\
						<li>Basaglar and Lantus provide similar HbA<sub>1c </sub>(glycated haemoglobin) reductions in T1DM and T2DM</li>\
						<li>Basaglar and Lantus provide similar Fasting Blood Glucose (FBG) control in T1DM and FBG reductions in T2DM</li>\
						<li>Weight change and mean daily insulin dose are similar with Basaglar and Lantus in T1DM and T2DM</li>\
						<li>HbA<sub>1c </sub>reductions are similar for Basaglar and Lantus in T2DM, in insulin naïve patients and also in patients previously treated with Lantus</li>\
						<li>Insulin glargine has an established safety profile in T1DM and T2DM</ul>";	
			
			html +=     "</div>";
			html +=     "<div class='page'>";
						
			//Basaglar™ Patient Experience									
			html +=		"<p><b>5. Basaglar™ Patient Experience</b></p>\
						<p>The Basaglar initiation experience is designed to provide emotional support to healthcare providers and patients by:</p>\
						<ul>\
						<li>· Improving patient education</li>\
						<li>· Reducing resistance</li>\
						<li>· Engaging patients</li>\
						<li>· Supporting patients</li>\
						<li>· Empowering patients</li>\
						<li>· Simplifying treatment initiation</li>\
						</ul>";	
						
			//Basaglar™ Model Assumptions									
			html +=		'<p><b>6. Basaglar™ Model Assumptions</b></p>\
						<p>The following assumptions were applied to the model and calculations:</p>\
						<ul>\
						<li>· Lilly is making a new insulin glargine biosimilar available to physicians and patients. The model assumes that the basal insulin glargine market will be impacted as a proportion of patients starting on basal insulin glargine (new initiators) may use Basaglar.</li>\
						<li>· Proportion of new initiators is estimated based on a function of the number of T1 and T2 patients, the proportion of patients on basal insulin glargine, and the proportion of this market considered new initiators.</li>\
						<li>· Population estimates are based on local country data. Where published estimates of country-specific population data are unavailable, estimates from a survey of local physicians have been applied in the model.</li>\
						<li>· Basaglar market share predictions are defined by the user on the data input screen (defined as the percent of new initiators expected to use Basaglar in a given year).</li>\
						<li>· The budget impact is estimated by comparing the potential market in the absence of Basaglar (patients would be managed on existing basal insulin glargines) with a market where Basaglar is available (patients would be managed on Basaglar).</li>\
						<li>· The current market of basal insulin glargine is limited to Lantus in the included countries but placeholders are included for new products including Merck Serono’s new insulin glargine biosimilar due to launch in 2017.</li>\
						<li>· In the current market Basaglar is not expected to take market share from Toujeo.</li>\
						<li>· The model includes drug costs only. The model estimates annual and cumulative cost for both markets (with and without Basaglar). The cost in a given year includes new initiators plus initiators from previous years (who are assumed to remain on treatment). The budget impact is estimated as the difference in cost between these two market estimates.</li>\
						<li>· Lantus prices have been estimated using an average weighted price across available formulations using country-specific sales volume data from the IMS MIDAS dataset.</li>\
						<li>· In the case of Basaglar, where the price of cartridges have not been provided, the prices for pens has been applied instead.</li>\
						<li>· The user can select default prices including public prices (the price at which the consumer buys product from a pharmacy or the final price reimbursed by the government) or Net Wholesale Price (the list price or invoice price charged by a manufacturer to distributors or other third parties that take legal ownership of the product and resell it to pharmacies or hospitals. This price is also commonly referred to as the "ex-manufacturer" price). Alternatively the user can over-write country level data and input an expected daily cost.</li>\
						</ul>';
			
			html +=     "</div>";
			html +=     "<div class='page'>";
												
			//Data Inputs									
			html +=		'<p><b>7. Data Inputs</b></p>\
						<p>The following base case data input were selected for the purpose of generating budget impact results across 5 years.</p>\
						<ul>\
						<li>· Country: ' + country_name + '</li>\
						<li>· Comparators: ' + comparators_list + '</li>\
						<li>· Population selected: ' + diabetes_type_name + '</li>\
						<li>· Duration since diagnosis selected: ' + disease_duration + '</li>\
						</ul>';
			
			
			
			html +=		'<p>User defined or default inputs applied in the analysis are shown below for the selected population.</p>\
						<p><b>Population</b></p>';				
			
			if ( data_store.know_population ) {
							
				//Table 1. Population inputs									
				html +=		'<p>Table '+table_count+'. Population inputs (' + country_name + ', ' + diabetes_type_name + ')</p>\
							<table border="1" cellspacing="0" cellpadding="0" width="100%" >\
							<tbody>\
							<tr class="header">\
							<td  width="83%" valign="top" ><p><b>Overall population </b></p></td>\
							<td  width="16%" valign="top" ><p><b>Input</b></p></td>\
							</tr>\
							<tr>\
							<td width="83%" valign="top" ><p>Total population </p></td>\
							<td width="16%" valign="top" >' + with_commas( Math.round( engine.get_value( 5, 3 ) )) + '</td>\
							</tr>\
							<tr>\
							<td width="83%" valign="top" ><p>Growth rate</p></td>\
							<td width="16%" valign="top" >' + engine.get_value( 6, 3 ) + '%</td>\
							</tr>\
							<tr class="header">\
							<td  width="83%" valign="top" ><p><b>Overall diabetes population </b></p></td>\
							<td  width="16%" valign="top" > </td>\
							</tr>\
							<tr>\
							<td width="83%" valign="top" ><p>% population with diabetes</p></td>\
							<td width="16%" valign="top" >' + engine.get_value( 10, 3 )  + '%</td>\
							</tr>\
							<tr>\
							<td width="83%" valign="top" ><p>% of patients with T1DM</p></td>\
							<td width="16%" valign="top" >' + engine.get_value( 11, 3 )  + '%</td>\
							</tr>\
							<tr>\
							<td width="83%" valign="top" ><p>% of patients with T2DM</p></td>\
							<td width="16%" valign="top" >' +engine.get_value( 12, 3 )  + '%</td>\
							</tr>';
							
					if ( data_store.diabetes_type == 1 || data_store.diabetes_type == 3 ) {
								
						html +=		'<tr class="header">\
									<td  width="83%" valign="top" ><p><b>T1DM population </b></p></td>\
									<td  width="16%" valign="top" > </td>\
									</tr>\
									<tr>\
									<td width="83%" ><p>% of patients treated with basal insulin glargine</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 34, 3 )  + '%</td>\
									</tr>\
									<tr>\
									<td width="83%" ><p>% of basal insulin glargine market who are new initiators (eligible market)</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 35, 3 )  + '%</td>\
									</tr>\
									<tr class="header" >\
									<td  width="83%" valign="top" ><p><b>T1DM market share</b></p></td>\
									<td  width="16%" valign="top" > </td>\
									</tr>\
									<tr>\
									<td width="83%" valign="top" ><p>Basaglar market share forecast</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 39, 4 ) + '%</td>\
									</tr>\
									<tr>\
									<td width="83%" valign="top" ><p>% of basaglar uptake from Lantus</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 45, 3 ) + '%</td>\
									</tr>';
					
					}
					
					if ( data_store.diabetes_type == 2 || data_store.diabetes_type == 3 ) {
									
						html +=		'<tr class="header">\
									<td  width="83%" valign="top" ><p><b>T2DM population </b></p></td>\
									<td  width="16%" valign="top" > </td>\
									</tr>\
									<tr>\
									<td width="83%" ><p>% of patients treated with basal insulin glargine</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 60, 3 )  + '%</td>\
									</tr>\
									<tr>\
									<td width="83%" ><p>% of basal insulin glargine market who are new initiators (eligible market)</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 61, 3 )  + '%</td>\
									</tr>\
									<tr class="header">\
									<td  width="83%" valign="top" ><p><b>T2DM market share</b></p></td>\
									<td  width="16%" valign="top" > </td>\
									</tr>\
									<tr>\
									<td width="83%" valign="top" ><p>Basaglar market share forecast</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 65, 4 ) + '%</td>\
									</tr>\
									<tr>\
									<td width="83%" valign="top" ><p>% of basaglar uptake from Lantus</p></td>\
									<td width="16%" valign="top" >' + engine.get_value( 71, 3 ) + '%</td>\
									</tr>';
					
					}
						
				html +=		'</tbody>\
							</table>';				
							table_count++;	
					
			} else {				
				
				if ( data_store.diabetes_type == 1 || data_store.diabetes_type == 3 ) {
				
					//Table 2. Eligible population									
					html +=		'<p>Table '+table_count+'. Eligible population, T1DM, years 1-5</p>\
								<table border="1" cellspacing="0" cellpadding="0" width="100%">\
								<tbody>\
								<tr class="header">\
								<td  valign="top" > </td>\
								<td  valign="top" ><p><b>' + years_array[0] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[1] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[2] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[3] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[4] + '</b></p></td>\
								</tr>\
								<tr>\
								<td valign="top" ><p>Current eligible market</p></td>\
								<td>' + with_commas( Math.round( engine.get_value( 35, 4 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 35, 5 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 35, 6 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 35, 7 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 35, 8 ) )) + '</td>\
								</tr>\
								<tr>\
								<td valign="top" ><p>User defined eligible market</p></td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 35, 4 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 35, 5 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 35, 6 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 35, 7 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 35, 8 ) )) + '</td>\
								</tr>\
								</tbody>\
								</table>';
								table_count++;
				
				}
				
				if ( data_store.diabetes_type == 2 || data_store.diabetes_type == 3 ) {
				
					//Table 2. Eligible population									
					html +=		'<p>Table '+table_count+'. Eligible population, T2DM, years 1-5</p>\
								<table border="1" cellspacing="0" cellpadding="0" width="100%" >\
								<tbody>\
								<tr class="header">\
								<td  valign="top" > </td>\
								<td  valign="top" ><p><b>' + years_array[0] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[1] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[2] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[3] + '</b></p></td>\
								<td  valign="top" ><p><b>' + years_array[4] + '</b></p></td>\
								</tr>\
								<tr>\
								<td valign="top" ><p>Current eligible market</p></td>\
								<td>' + with_commas( Math.round( engine.get_value( 61, 4 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 61, 5 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 61, 6 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 61, 7 ) )) + '</td>\
								<td>' + with_commas( Math.round( engine.get_value( 61, 8 ) )) + '</td>\
								</tr>\
								<tr>\
								<td valign="top" ><p>User defined eligible market</p></td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 61, 4 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 61, 5 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 61, 6 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 61, 7 ) )) + '</td>\
								<td valign="top" >' + with_commas( Math.round( engine.get_value( 61, 8 ) )) + '</td>\
								</tr>\
								</tbody>\
								</table>';
								table_count++;
				}
			
			}
			
			html +=     "</div>";
			html +=     "<div class='page'>";
						
			//Drug costs									
			html +=		'<p><b>Drug costs</b></p>\
						<ul>\
						<li>· Basaglar price inputs selected: ' + price_input_type + '</li>\
						<li>· Lanuts price inputs selected: ' + price_input_type + '</li>\
						</ul>\
						<p>Table '+table_count+'. Percentage split - Pens vs. cartridges</p>\
						<table border="1" cellspacing="0" cellpadding="0" width="100%" > \
						<tbody>\
						<tr class="header">\
						<td  valign="top" ></td>\
						<td  valign="top" ><p><b>Pens</b></p></td>\
						<td  valign="top" ><p><b>Cartridges</b></p></td>\
						</tr>\
						<tr>\
						<td valign="top" ><p>Basaglar</p></td>\
						<td valign="top" ><p>' + engine.get_value( 83, 1 ) + '%</p></td>\
						<td valign="top" ><p>' + engine.get_value( 82, 1 ) + '%</p></td>\
						</tr>\
						<tr>\
						<td valign="top" ><p>Lantus</p></td>\
						<td valign="top" ><p>' + engine.get_value( 81, 1 ) + '%</p></td>\
						<td valign="top" ><p>' + engine.get_value( 80, 1 ) + '%</p></td>\
						</tr>\
						</tbody>\
						</table>';
						table_count++;				
						
			//Table 4. Drug cost inputs
			var lantus_daily_dose = ( engine.get_value( 108, 4 ) && engine.get_value( 108, 4 ) != 'USER_VALUE' ) ? engine.get_value( 108, 4 ) : engine.get_value( 108, 3  );
			var lantus_annual_cost = ( engine.get_value( 108, 7 ) && engine.get_value( 108, 7 ) != 'USER_VALUE' ) ? engine.get_value( 108, 7 ) : engine.get_value( 108, 6 );
			
			var basaglar_daily_dose = ( engine.get_value( 112, 4 ) && engine.get_value( 112, 4 ) != 'USER_VALUE' ) ? engine.get_value( 112, 4 ) : engine.get_value( 112, 3 );
			var basaglar_annual_cost = ( engine.get_value( 112, 7 ) && engine.get_value( 112, 7 ) != 'USER_VALUE' ) ? engine.get_value( 112, 7 ) : engine.get_value( 112, 6 );

//JUST PENS ATM			
			html +=		'<p>Table '+table_count+'. Drug cost inputs</p>\
						<table border="1" cellspacing="0" cellpadding="0" width="100%"> \
						<tbody>\
						<tr class="header">\
						<td  valign="top" ><p><b>Treatment </b></p></td>\
						<td  valign="top" ><p><b>Pack price</b></p></td>\
						<td  valign="top" ><p><b>Daily dose</b></p></td>\
						<td  valign="top" ><p><b>Daily cost</b></p></td>\
						<td  valign="top" ><p><b>Annual cost</b></p></td>\
						</tr>\
						<tr>\
						<td valign="top" ><p>Lantus</p></td>\
						<td valign="top" >' + engine.get_value( 89, 4 ) + '</td>\
						<td valign="top" >' + lantus_daily_dose + '</td>\
						<td valign="top" >' + dp_2( engine.get_value( 108, 5 ) ) + '</td>\
						<td valign="top" >' + lantus_annual_cost + '</td>\
						</tr>\
						<tr>\
						<td valign="top" ><p>Basaglar</p></td>\
						<td valign="top" >' + engine.get_value( 93, 4 ) + '</td>\
						<td valign="top" >' + basaglar_daily_dose + '</td>\
						<td valign="top" >' + dp_2( engine.get_value( 112, 5 ) ) + '</td>\
						<td valign="top" >' + basaglar_annual_cost + '</td>\
						</tr>\
						</tbody>\
						</table>';
						table_count++;			
			var annual_cost_inc_basaglar_id = 248;
			var total_cost_basaglar_id = 250;
			var total_cost_lantus_id = 251;
			var alternative_market_id = 252;
			var expected_annual_saving_id = 254;
			var cumaltive_budget_impact_id = 255;
			
			var annual_cost_inc_basaglar_array = engine.get_multiple_values( [{ row: annual_cost_inc_basaglar_id, col:4 }, { row: annual_cost_inc_basaglar_id, col:5 }, { row: annual_cost_inc_basaglar_id, col:6 }, { row: annual_cost_inc_basaglar_id, col:7 }, { row: annual_cost_inc_basaglar_id, col:8 } ] );				
			var total_cost_basaglar_array = engine.get_multiple_values( [{ row: total_cost_basaglar_id, col:4 }, { row: total_cost_basaglar_id, col:5 }, { row: total_cost_basaglar_id, col:6 }, { row: total_cost_basaglar_id, col:7 }, { row: total_cost_basaglar_id, col:8 } ] );
			var total_cost_lantus_array = engine.get_multiple_values( [{ row: total_cost_lantus_id, col:4 }, { row: total_cost_lantus_id, col:5 }, { row: total_cost_lantus_id, col:6 }, { row: total_cost_lantus_id, col:7 }, { row: total_cost_lantus_id, col:8 } ] );
			var alternative_market_array = engine.get_multiple_values( [{ row: alternative_market_id, col:4 }, { row: alternative_market_id, col:5 }, { row: alternative_market_id, col:6 }, { row: alternative_market_id, col:7 }, { row: alternative_market_id, col:8 } ] );
			var expected_annual_saving_array = engine.get_multiple_values( [{ row: expected_annual_saving_id, col:4 }, { row: expected_annual_saving_id, col:5 }, { row: expected_annual_saving_id, col:6 }, { row: expected_annual_saving_id, col:7 }, { row: expected_annual_saving_id, col:8 } ] );
			var cumaltive_budget_impact_array = engine.get_multiple_values( [{ row: cumaltive_budget_impact_id, col:4 }, { row: cumaltive_budget_impact_id, col:5 }, { row: cumaltive_budget_impact_id, col:6 }, { row: cumaltive_budget_impact_id, col:7 }, { row: cumaltive_budget_impact_id, col:8 } ] );
			
						
			//8. Base Case Results
			html +=		'<p><b>8. Base Case Results</b></p>\
						<p>The following results show a tabular and graphic representation of the budget impact of Basaglar in terms of treatment cost for all patients within the population group(s) selected.</p>\
						<p>Table '+table_count+'. Budget impact results, years 1-5</p>\
						<table border="1" cellspacing="0" cellpadding="0" width="100%"> \
						<tbody>\
						<tr class="header">\
						<td  valign="top" > </td>\
						<td  valign="top" ><p><b>' + years_array[0] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[1] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[2] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[3] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[4] + '</b></p></td>\
						</tr>\
						<tr>\
						<td><p>Annual cost – market including Basaglar</p></td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[0] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[1] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[2] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[3] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Total cost of Basaglar</p></td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[0] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[1] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[2] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[3] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Total cost of Lantus</p></td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Annual cost - alternative market</p></td>\
						<td>' +with_commas( Math.round(alternative_market_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Expected annual ' + saving_or_impact_text + '</p></td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Cumulative budget impact </p></td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[4] ))+ '</td>\
						</tr>\
						</tbody>\
						</table>\
						<br />';
						table_count++;								
			
			html +=     "</div>";
			html +=     "<div class='page'>";
			
			if ( image_obj.detailed_result ) {	
				var figure_1 = get_base64_image( image_obj.detailed_result );				
				//Figure 1. Cost over 5 years
				html +=		'<p>Figure 1. Annual cost</p>\
							<p><img src="data:image/png;base64,'+figure_1+'" width="100%" /></p>\
							<br />';	
			}
			
			if ( image_obj.detailed_result ) {	
				var figure_2 = get_base64_image( image_obj.saving );				
				//Figure 1. Cost over 5 years
				html +=		'<p>Figure 2. Annual ' + saving_or_impact_text + ' and market share</p>\
							<p><img src="data:image/png;base64,'+figure_2+'" width="100%" /></p>\
							<br />';	
			}
			
			html +=     "</div>";
			html +=     "<div class='page'>";
						
			//9. Drug Price Scenarios
			html +=		'<p><b>9. Drug Price Scenarios</b></p>\
						<p>In these two scenarios, the user is able to vary the drug price to assess the effect on budget impact. Drug prices were varied with the following discounts across all years.</p>\
						<p>Table 6. Drug price scenario yearly Lantus discount</p>\
						<table border="1" cellspacing="0" cellpadding="0" width="100%"> \
						<tbody>\
						<tr class="header">\
						<td  valign="top" ><p><b>Price </b></p></td>\
						<td  valign="top" ><p><b>Input</b></p></td>\
						</tr>\
						<tr>\
						<td valign="top" ><p>Lantus base case price</p></td>\
						<td valign="top" >' + _default.cur + engine.get_value( 127, 1 ) + '</td>\
						</tr>\
						<tr>\
						<td valign="top" ><p>Discount applied </p></td>\
						<td valign="top" ><p>Year 1: ' + engine.get_value( 171, 4 ) + '%</p>\
						<p>Year 2: ' + engine.get_value( 171, 5 ) + '%</p>\
						<p>Year 3: ' + engine.get_value( 171, 6 ) + '%</p>\
						<p>Year 4: ' + engine.get_value( 171, 7 ) + '%</p>\
						<p>Year 5: ' + engine.get_value( 171, 8 ) + '%</p></td>\
						</tr>\
						</tbody>\
						</table>';	
			
			var annual_cost_inc_basaglar_id = 261;
			var total_cost_basaglar_id = 262;
			var total_cost_lantus_id = 263;
			var alternative_market_id = 264;
			var expected_annual_saving_id = 265;
			var cumaltive_budget_impact_id = 266;
			
			var annual_cost_inc_basaglar_array = engine.get_multiple_values( [{ row: annual_cost_inc_basaglar_id, col:4 }, { row: annual_cost_inc_basaglar_id, col:5 }, { row: annual_cost_inc_basaglar_id, col:6 }, { row: annual_cost_inc_basaglar_id, col:7 }, { row: annual_cost_inc_basaglar_id, col:8 } ] );				
			var total_cost_basaglar_array = engine.get_multiple_values( [{ row: total_cost_basaglar_id, col:4 }, { row: total_cost_basaglar_id, col:5 }, { row: total_cost_basaglar_id, col:6 }, { row: total_cost_basaglar_id, col:7 }, { row: total_cost_basaglar_id, col:8 } ] );
			var total_cost_lantus_array = engine.get_multiple_values( [{ row: total_cost_lantus_id, col:4 }, { row: total_cost_lantus_id, col:5 }, { row: total_cost_lantus_id, col:6 }, { row: total_cost_lantus_id, col:7 }, { row: total_cost_lantus_id, col:8 } ] );
			var alternative_market_array = engine.get_multiple_values( [{ row: alternative_market_id, col:4 }, { row: alternative_market_id, col:5 }, { row: alternative_market_id, col:6 }, { row: alternative_market_id, col:7 }, { row: alternative_market_id, col:8 } ] );
			var expected_annual_saving_array = engine.get_multiple_values( [{ row: expected_annual_saving_id, col:4 }, { row: expected_annual_saving_id, col:5 }, { row: expected_annual_saving_id, col:6 }, { row: expected_annual_saving_id, col:7 }, { row: expected_annual_saving_id, col:8 } ] );
			var cumaltive_budget_impact_array = engine.get_multiple_values( [{ row: cumaltive_budget_impact_id, col:4 }, { row: cumaltive_budget_impact_id, col:5 }, { row: cumaltive_budget_impact_id, col:6 }, { row: cumaltive_budget_impact_id, col:7 }, { row: cumaltive_budget_impact_id, col:8 } ] );
			
			
			//Table 7: Drug price scenario, Budget impact results
			html +=		'<p>Table 7: Drug price scenario, Budget impact results, years 1-5</p>\
						<table border="1" cellspacing="0" cellpadding="0" width="100%"> \
						<tbody>\
						<tr class="header">\
						<td valign="top" > </td>\
						<td valign="top" ><p><b>' + years_array[0] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[1] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[2] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[3] + '</b></p></td>\
						<td  valign="top" ><p><b>' + years_array[4] + '</b></p></td>\
						</tr>\
						<tr>\
						<td><p>Annual cost – market including Basaglar</p></td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[0] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[1] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[2] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[3] ))+ '</td>\
						<td>' + with_commas( Math.round(annual_cost_inc_basaglar_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Total cost of Basaglar</p></td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[0] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[1] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[2] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[3] ))+ '</td>\
						<td>' + with_commas( Math.round(total_cost_basaglar_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Total cost of Lantus</p></td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(total_cost_lantus_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Annual cost - alternative market</p></td>\
						<td>' +with_commas( Math.round(alternative_market_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(alternative_market_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Expected annual ' + saving_or_impact_text + '</p></td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(expected_annual_saving_array[4] ))+ '</td>\
						</tr>\
						<tr>\
						<td><p>Cumulative budget impact </p></td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[0] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[1] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[2] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[3] ))+ '</td>\
						<td>' +with_commas( Math.round(cumaltive_budget_impact_array[4] ))+ '</td>\
						</tr>\
						</tbody>\
						</table>\
						<br />';
						table_count++;	
			
			html +=     "</div>";
			html +=     "<div class='page'>";
			
			if ( image_obj.drug_scenario ) {	
				var figure_3 = get_base64_image( image_obj.drug_scenario );				
				//Figure 3. Drug price scenario results
				html +=		'<p>Figure 3. Drug price scenario annual cost</p>\
							<p><img src="data:image/png;base64,'+figure_3+'" width="100%" /></p>\
							<br />';	
			}
					
			if ( image_obj.tornado ) {	
				var figure_4 = get_base64_image( image_obj.tornado );				
				//10.Sensitivity Analysis
				html +=		'<p><b>10. Sensitivity Analysis</b></p>\
							<p>The tornado diagram below shows the top five variables having the greatest effect on budget impact.</p>\
							<p><img src="data:image/png;base64,'+figure_4+'" width="100%" /></p>\
							<p><br />\
							</p>';	
			}
			
			html +=     "</div>";
			html +=     "<div class='page'>";
			
			//PI
			html +=		'<p><b>Appendix: Prescribing Information</b></p>\
						<p><a href="http://www.ema.europa.eu/docs/en_GB/document_library/EPAR_-_Product_Information/human/002835/WC500175381.pdf">http://www.ema.europa.eu/docs/en_GB/document_library/EPAR_-_Product_Information/human/002835/WC500175381.pdf</a></p>';	
						
								
		return html;
		
	};

////////////////////////////////////////////////////
//FUNCTIONS PRIVATE
////////////////////////////////////////////////////
		
	
	function temp(  ) {
		
	};	
	