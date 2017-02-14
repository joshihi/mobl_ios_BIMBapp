
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	
	var days = 365.25;
	
	var engine_data = new Array();
	
	var print_count = 228;
	
////////////////////////////////////////////////////
//FUNCTIONS PUBLIC
////////////////////////////////////////////////////
/*
 * UPDATES A VALUE AT THE CHOSEN ROW AND COL POSITION
 */		
	exports.update_value = function ( row, col, value ) {
		print( 'Update value [' + row + ',' + col +'] =: ' + value );
		engine_data[ row ][ col ] = value;	
	};

/*
 * GET VALUE USES TWO ARRAY KEYS TO GET VALUES SIMILAR TO A ROW ID AND COL ID
 */
	
	exports.get_value = function ( row, col ) {
		//print( 'Get value [' + row + ',' + col +'] =: ' + engine_data[ row ][ col ] );
		return engine_data[ row ][ col ];	
	};


/*
 * GET MULTIPLE VALUE ACCEPTS AN ARRAY OF OBJECTS THAT HOLD A ROW AND COL PROPERTY: [ { row: 1, col: 1 }, { row: 20, col: 4 } ]
 */	
	exports.get_multiple_values = function ( array ) {
		var new_array = new Array();
		for ( var i=0; i<array.length; i++ ) {
			var value = exports.get_value( array[i].row, array[i].col );
			new_array.push( value );
		}
		return new_array;	
	};
/*
 * FOR GRAPHING SOME OF THE VALUES ARE NEGATIVES, THIS VALUE CONVERST NEGATIVE VALUES TO POSITIVE VALUES
 */	
	exports.array_abs = function ( array ) {
		for ( var i=0; i<array.length; i++ ) {
			array[i] = Math.abs( array[i] );
		}
		return array;	
	};
	
	exports.check_if_saving = function ( row_id ) {
		
		if ( typeof row_id == 'undefined' ) row_id = 255;
		
		console.log( row_id );
		
		if ( engine.get_value( row_id, 8 ) < 0 ) {
			return 'saving';
		} else {
			return 'budget impact';
		}
		
	};
	
	exports.check_if_pens_and_carts = function ( product ) {
		
		var obj = {};
			obj.pens = false;
			obj.carts = false;
		
		if ( product == 'basaglar' ) {
			var pens_id = 83;
			var carts_id = 82;
		} else if ( product == 'lantus' ) {
			var pens_id = 81;
			var carts_id = 80;
		}
		
		if ( exports.get_value( pens_id, 1 ) > 0 ) obj.pens = true;
		if ( exports.get_value( carts_id, 1 ) > 0 ) obj.carts = true;
		
		return obj;
		
	};
	
/*
 * THIS FUNCTION RUNS ALL THE FUNCTIONS THAT GENERATE THE VALUES WITHIN THE ARRAY
 * EACH ROW IN THE ARRAY / EXCEL ENGINE HAS ITS OWN FUNCTION SO HOPEFULLY EASIER TO DEBUG
 * ALL FUNCTIONS NEED TO REMAIN IN THE SAME ORDER AS THEY ALL DEPEND ON ONE ANOTHER TO BE UPDATED BEFORE THEY ARE REFERENCED
 * 
 */
	
	exports.re_calculate = function() {
		
		var start = new Date().getTime();
		
		f0_total_population();
		f1_growth_rate();
		
		f2_population_with_diabetes();
		f3_patients_with_t1dm();
		f4_patients_with_t2dm();
		f5_check();
		
		f6_duration_of_diabetes_t1dm_5();
		f7_duration_of_diabetes_t1dm_5_10();
		f8_duration_of_diabetes_t1dm_10();
		f9_duration_of_diabetes_t1dm_all();
		f10_check();
		
		f11_duration_of_diabetes_t2dm_5();
		f12_duration_of_diabetes_t2dm_5_10();
		f13_duration_of_diabetes_t2dm_10();
		f14_duration_of_diabetes_t2dm_all();			
		f15_check();
		
		f16_patients_treated_with_basal();
		
		f17a_Basal_insulin_market_eligible_for_Basaglar_DEFAULT();		
		f17_Basal_insulin_market_eligible_for_Basaglar_ACTIVE();
		
		f18_Total_market_new_initiators_plus_initiators_in_previous_years();
		
		f19_market_share_predictions_basaglar();
		f20_potential_basaglar_market_new_initiators();
		f20a_Basaglar_market_share_T1DM();
		
		
		f21_potential_basaglar_market_total_initiators();
		f21a_Basaglar_market_share_cumulative();
		f21b_Non_basaglar_market_share_cumulative();
		
		f22_lantus_market_share_split();
		f23_toujeo_market_share_split();
		f24_merck_market_share_split();
		f25_biocon_market_share_split();
		f26_check();
		
		f27_market_share_predictions_lantus();
		f28_market_share_predictions_toujeo();
		f29_market_share_predictions_merck();
		f30_market_share_predictions_biocon();
		
		f31_patients_treated_with_basal();
		f33_Basal_insulin_market_eligible_for_Basaglar_DEFAULT();
		f32_Basal_insulin_market_eligible_for_Basaglar_ACTIVE();
		
		f33a_Total_market_new_initiators_plus_initiators_in_previous_years();
		
		f34_market_share_predictions_basaglar();
		f35_potential_basaglar_market_new_initiators();
		f35a_Basaglar_market_share_T2DM();
		
		f36_potential_basaglar_market_total_initiators();
		f36a_Basaglar_market_share_cumulative();
		f36b_Non_basaglar_market_share_cumulative();
		
		f37_lantus_market_share_split();
		f38_toujeo_market_share_split();
		f39_merck_market_share_split();
		f40_biocon_market_share_split();
		f41_check();
		
		f42_pens_cost_lantus();
		f43_pens_cost_toujeo();
		f44_pens_cost_merck();
		f45_pens_cost_biocon();
		f46_pens_cost_basaglar();
		
		f47_cartidges_cost_lantus();
		f48_cartidges_cost_toujeo();
		f49_cartidges_cost_merck();
		f50_cartidges_cost_biocon();
		f51_cartidges_cost_basaglar();
		
		f52_pens_annual_cost_lantus();
		f53_pens_annual_cost_toujeo();
		f54_pens_annual_cost_merck();
		f55_pens_annual_cost_biocon();
		f56_pens_annual_cost_basaglar();
		
		f57_cartridges_annual_cost_lantus();
		f58_cartridges_annual_cost_toujeo();
		f59_cartridges_annual_cost_merck();
		f60_cartridges_annual_cost_biocon();
		f61_cartridges_annual_cost_basaglar();
				
		f62_weighted_annual_cost_lantus();
		f63_weighted_annual_cost_toujeo();
		f64_weighted_annual_cost_merck();
		f65_weighted_annual_cost_biocon();
		f66_weighted_annual_cost_basaglar();

		f67_Potential_Basaglar_patients();
		f68_Non_Basaglar_patients();
		
		f69_Lantus_markey_split();
		f70_toujeo_markey_split();
		f71_merck_markey_split();
		f72_biocon_markey_split();
		f73_total_markey_split();
		
		f74_basaglar_market_including_bas();
		f75_Non_Basaglar_patients_including_bas();
		f76_Total_cost_market_including_basaglar_including_bas();
		f77_Alternative_market_including_bas();
		
		f78_ANNUAL_budget_impact();
		f79_Cumulative_budget_impact();
		
		f80_Price_of_Lantus_after_discount();
		
		f81_basaglar_market_including_bas();
		f82_Non_Basaglar_patients_including_bas();
		f83_Total_cost_market_including_basaglar_including_bas();
		f84_Alternative_market_including_bas();
		
		f85_ANNUAL_budget_impact();
		f86_Cumulative_budget_impact();
			
		f87_Potential_Basaglar_patients();
		f88_Non_Basaglar_patients();
		
		f89_Lantus_markey_split();
		f90_toujeo_markey_split();
		f91_merck_markey_split();
		f92_biocon_markey_split();
		f93_total_markey_split();
	
		f94_basaglar_market_including_bas();
		f95_Non_Basaglar_patients_including_bas();
		f96_Total_cost_market_including_basaglar_including_bas();
		f97_Alternative_market_including_bas();
		
		f98_ANNUAL_budget_impact();
		f99_Cumulative_budget_impact();
			
		f100_Price_of_Lantus_after_discount();
		
		f101_basaglar_market_including_bas();
		f102_Non_Basaglar_patients_including_bas();
		f103_Total_cost_market_including_basaglar_including_bas();
		f104_Alternative_market_including_bas();
		
		f105_ANNUAL_budget_impact();
		f106_Cumulative_budget_impact();
	
		f107_Annual_cost_market_including_basaglar_base_case();
		f108_Cumulative_cost_market_including_basaglarr_base_case();
		f109_Basaglarr_base_case();
		f110_Non_Basaglar_patientsr_base_case();
		f111_Annual_cost_alternative_marketr_base_case();
		f112_Cumulative_cost_alternative_marketr_base_case();
		f113_Expected_annual_savingsr_base_case();
		f114_Cumulative_budget_impactr_base_case();
		
		f115_Annual_cost_market_including_basaglar_scenario();
		f116_Basaglar_scenario();
		f117_Non_Basaglar_patients_scenario();
		f118_Annual_cost_alternative_market_scenario();
		f119_Expected_annual_savings_scenario();
		f120_Cumulative_budget_impact_scenario();
	
			
		var end = new Date().getTime();
		var time = end - start;
		print( 'RE-CALCULATION RAN --------------------------------------- Time to complete: ' + time );

/*
 * FIRING TI EVENT 'ENGINE_REFRESH' WILL UPDATE OBJECTS THAT DEPEND ON VALUES FROM THE ENGINE, EG TABLES THAT HAVE ALREADY BEEN DRAWN.
 * 
 */
		
		Ti.App.fireEvent( 'engine_refresh' );
		
	};

/*
 * PRINTS ENTIRE ROW
 */		
	exports.print_row = function ( row_id ) {
		
		print( '--------------------' );
		var row = '';
		for ( var k=0; k<engine_data[ row_id ].length; k++ ) {
			row += ' | ' + engine_data[ row_id ][k];
		}
		row += ' | ';
		print( '--------------------' );		
		print( row );
		
	};
/*
 * PRINTS THE WHOLE ARRAY INCLUDING ALL OF ITS ROWS AND COLS
 */		
	exports.print_everything = function () {
		
		print( '//////////////////////////////////////////////////////////////////////////////////////////////' );
		print( '--------print_everything-----------' );
		print( '//////////////////////////////////////////////////////////////////////////////////////////////' );
		for ( var i=0; i<engine_data.length; i++ ) {
		//for ( var i=0; i<print_count; i++ ) {	
			var row = '';
			for ( var k=0; k<engine_data[i].length; k++ ) {
				row += ' | ' + engine_data[i][k];
			}
			row += ' | ';
			print( '--------------------' );		
			print( row );
		}
		
	};
	
	exports.reset_data = function() {
		
		engine_data = null;
		engine_data = new Array();
		set_engine_data();
		
	};
		
	exports.get_years_array = function () {
		
		var array = new Array();
		
		var base_year = _default.base_year;
			
		for ( var i=0; i<5; i++ ) {
			
			array[i] = base_year + i;
			
		}
		
		return array;
		
	};
	
	exports.combine_arrays = function ( array_one, array_two ) {
		var new_array = new Array();
		for ( var i=0; i<array_one.length; i++ ) {
			new_array.push( array_one[i] + array_two[i] );
		}
		return new_array;
	};
	
	exports.get_tornando_data = function ( value, row_to_edit, col_to_edit, result_row, results_col ) {
		
		exports.print_row( 35 );
		exports.print_row( 36 );
			
//		exports.print_everything();
		
		var original_edit_value = exports.get_value( row_to_edit, col_to_edit );
		
		exports.update_value( row_to_edit, col_to_edit, value );
		
		exports.re_calculate();
		
//		console.log( 'original_edit_value ' + original_edit_value );		
//		console.log( 'original_result ' + exports.get_value( result_row, results_col ) );		
//		console.log( result_row + ' result_row  ' + results_col );		
//		exports.print_everything();
		
		exports.print_row( 35 );
		exports.print_row( 36 );
		
		
//		console.log( data_store );
		
//		console.log( 'new_edit_value ' + value );		

		
		var new_results_value = exports.get_value( result_row, results_col );

		exports.update_value( row_to_edit, col_to_edit, original_edit_value );
		
		exports.re_calculate();
		
		
//		console.log( 'new_results_value ' + new_results_value );		
		
		return new_results_value;
		
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
////////////////////////////////////////////////////
//FUNCTIONS PRIVATE
////////////////////////////////////////////////////

/*
 * THE EXCEL ENGINE EXISTS AS A SINGLE ARRAY THAT HOLDS ALL OF THE VALUES. PRINT TO CONSOLE TO SEE THE STRUCTURE
 * THE FIRST POSITION IN THE ARRAY REFERS TO IT'S KEY SO HOPEFULLY A BIT EASIER TO EDIT
 * IT ALSO SHOWS WHAT THAT ROW IS CALLED IN THE MODEL 
 * IT IS BUILT OF ARRAYS WITHIN ARRAYS TO REPLICATE THE ROW AND COLUMN MODEL THAT EXCEL USES
 */
		
	function set_engine_data () {
		
		engine_data = [
			[ '0 POPULATION' ],			
			[ '1' ],								
			[ '2' ],			
			[ '3' ],
			
			[ '4 OVERALL POPULATION' ],
			[ '5 Total Population', 0, _default.total_population, 'VALUE_TO USE' ],
			[ '6 Growth rate', 0, _default.growth_rate, 'VALUE_TO USE', 0, 0, 0, 0 ],		
			[ '7' ],					
			[ '8' ],					
			
			[ '9 DIABETES POPULATION' ],
			[ '10 % of population with diabetes', 0, _default.percentage_of_population_with_diabetes, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '11 % of patients with T1DM', 0, _default.percentage_of_patients_with_t1dm, 'VALUE_TO USE', 0, 0, 0, 0, 0  ],
			[ '12 % of patients with T2DM', 0, _default.percentage_of_patients_with_t2dm, 'VALUE_TO USE', 0, 0, 0, 0, 0  ],
			[ '13 Check', 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ '14' ],					
			[ '15' ],
			
			[ '16 DURATION OF DIABETES' ],
			[ '17 Duration of diabetes population T1DM' ],
			[ '18 <5 years', '', _default.duration_of_diabetes_t1dm_5, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '19 5-10 years', '', _default.duration_of_diabetes_t1dm_5_10, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '20 10+ years', '', _default.duration_of_diabetes_t1dm_10, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '21 All (Default)', '', 0, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '22 Check', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '23' ],					
			[ '24' ],
			
			[ '25 Duration of diabetes population T2DM' ],
			[ '26 <5 years', '', _default.duration_of_diabetes_t2dm_5, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '27 5-10 years', '', _default.duration_of_diabetes_t2dm_5_10, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '28 10+ years', '', _default.duration_of_diabetes_t2dm_10, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '29 All (Default)', '', 0, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '30 Check', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '31' ],					
			
			[ '32 T1DM POPULATION' ],			
			[ '33 Basal insulin market eligible for Basaglar, CUSTOM (ran out of rows)', 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ '34 % of patients treated with basal/long-acting insulin glargine', 0, _default.t1dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],			
			[ '35 Basal insulin market eligible for Basaglar, ACTIVE', 0, _default.t1dm_percentage_of_basal_insulin_market_who_are_new_initiators, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],		
			[ '36 Basal insulin market eligible for Basaglar, DEFAULT', 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ '37 Total market (new initiators plus initiators in previous years)', '', 0, 0, 0, 0, 0, 0, 0 ],					
			[ '38 Basaglar market share T1DM (is line 35 in the excel Model)', '', '', '', 0, 0, 0, 0, 0 ],
			
			[ '39 Market share predictions: Basaglar', '', '', '', 5, 6, 7, 8, 9 ],
			[ '40 Potential Basaglar market (new initiators)', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '41 Potential Basaglar market (total patients)', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '42 Basaglar market share (cumulative %)', 0, 0, 0, 0, 0, 0, 0, 0  ],				
			[ '43 Non basaglar market share (cumulative %)', 0, 0, 0, 0, 0, 0, 0, 0  ],
			
			[ '44 ALTERNATIVE MARKET' ],
			[ '45 Lantus market share split', 0, _default.t1dm_lantus_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '46 Toujeo market share split', 0, _default.t1dm_toujeo_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '47 Merck insulin glargine market share split', 0, _default.t1dm_merck_insulin_glargine_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '48 Biocon insulin glargine market share split', 0, _default.t1dm_biocon_insulin_glargine_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '49 Check', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '50' ],					
			[ '51' ],
			
			[ '52 Market share WITH BASAGLAR (to inform summary graph)' ],
			[ '53 Market share predictions: Lantus', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '54 Market share predictions: Toujeo', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '55 Market share predictions: Merck insulin glargine', 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ '56 Market share predictions: Biocon insulin glargine', 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ '57 Check', 0, 0, 0, 0, 0, 0, 0, 0  ],					
			
			
			[ '58 T2DM POPULATION' ],					
			[ '59 Basal insulin market eligible for Basaglar, CUSTOM (ran out of rows)', 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ '60 % of patients treated with basal/long-acting insulin glargine', 0, _default.t2dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],							
			[ '61 Basal insulin market eligible for Basaglar, ACTIVE', 0, _default.t2dm_percentage_of_basal_insulin_market_who_are_new_initiators, 'VALUE_TO USE', 0, 0, 0, 0, 0  ],									
			[ '62 Basal insulin market eligible for Basaglar, DEFAULT', 0, 0, 0, 0, 0, 0, 0, 0   ],
			[ '63 Total market (new initiators plus initiators in previous years)', '', 0, 0, 0, 0, 0, 0, 0 ],						
			
			[ '64 Basaglar market share T1DM (is line 55 in the excel Model)', '', '', '', 0, 0, 0, 0, 0 ],				
			[ '65 Market share predictions: Basaglar', '', '', '', 5, 6, 7, 8, 9 ],
			[ '66 Potential Basaglar market (new initiators)', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '67 Potential Basaglar market (total patients)', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '68 Basaglar market share (cumulative %)', 0, 0, 0, 0, 0, 0, 0, 0  ],					
			[ '69 Non basaglar market share (cumulative %)', 0, 0, 0, 0, 0, 0, 0, 0  ],
			
			[ '70 ALTERNATIVE MARKET' ],			
			[ '71 Lantus market share split', 0, _default.t2dm_lantus_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '72 Toujeo market share split', 0, _default.t2dm_toujeo_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '73 Merck insulin glargine market share split', 0, _default.t1dm_merck_insulin_glargine_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '74 Biocon insulin glargine market share split', 0, _default.t1dm_biocon_insulin_glargine_market_share_split, 'VALUE_TO USE', 0, 0, 0, 0, 0 ],
			[ '75 Check', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '76' ],					
			[ '77' ],
			[ '78' ],					
			[ '79' ],
			
			[ '80 LANTUS CARTRIDGE DISCOUNT', 67 ],			
			[ '81 LANTUS PENS DISCOUNT', 33 ],			
			[ '82 BASAGLAR CARTRIDGE DISCOUNT', 32 ],			
			[ '83 BASAGLAR PENS DISCOUNT', 68 ],			
			
			[ '84' ],					
			[ '85' ],
			[ '86' ],					
			[ '87' ],
			
			[ '88 DRUG COST DEFAULTS PENS' ],				
			[ '89 Lantus', _default.price_lantus_wholesaler_pens, _default.price_lantus_public_pens, _default.price_lantus_manufacturer_pens, 0 ],
			[ '90 Toujeo', _default.price_toujeo_wholesaler_pens, _default.price_toujeo_public_pens, _default.price_toujeo_manufacturer_pens, 0 ],
			[ '91 Merck insulin glargine', _default.price_merck_insulin_glargine_wholesaler_pens, _default.price_merck_insulin_glargine_public_pens, _default.price_merck_insulin_glargine_manufacturer_pens, 0 ],
			[ '92 Biocon insulin glargine', _default.price_biocon_insulin_glargine_wholesaler_pens, _default.price_biocon_insulin_glargine_public_pens, _default.price_biocon_insulin_glargine_manufacturer_pens, 0 ],
			[ '93 Basaglar ', _default.price_basaglar_wholesaler_pens, _default.price_basaglar_public_pens, _default.price_basaglar_manufacturer_pens, 0 ],
			[ '94' ],					
			[ '95' ],
			[ '96' ],					
			[ '97' ],
			
			[ '98 DRUG COST DEFAULTS CARTRIDGES' ],				
			[ '99 Lantus', _default.price_lantus_wholesaler_cartridges, _default.price_lantus_public_cartridges, _default.price_lantus_manufacturer_cartridges, 0 ],
			[ '100 Toujeo', _default.price_toujeo_wholesaler_cartridges, _default.price_toujeo_public_cartridges, _default.price_toujeo_manufacturer_cartridges, 0 ],
			[ '101 Merck insulin glargine', _default.price_merck_insulin_glargine_wholesaler_cartridges, _default.price_merck_insulin_glargine_public_cartridges, _default.price_merck_insulin_glargine_manufacturer_cartridges, 0 ],
			[ '102 Biocon insulin glargine', _default.price_biocon_insulin_glargine_wholesaler_cartridges, _default.price_biocon_insulin_glargine_public_cartridges, _default.price_biocon_insulin_glargine_manufacturer_cartridges, 0 ],
			[ '103 Basaglar ', _default.price_basaglar_wholesaler_cartridges, _default.price_basaglar_public_cartridges, _default.price_basaglar_manufacturer_cartridges, 0 ],
			[ '104' ],					
			[ '105' ],
			[ '106' ],					
			
			[ '107 DRUG COST PENS' ],
			[ '108 Lantus', _default.price_lantus_pack_contents, 'USER_VALUE', _default.price_lantus_daily_dose, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '109 Toujeo', _default.price_toujeo_pack_contents, 'USER_VALUE', _default.price_toujeo_pack_price, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '110 Merck insulin glargine', _default.price_merck_insulin_glargine_pack_contents, 'USER_VALUE', _default.price_merck_insulin_glargine_pack_price, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '111 Biocon insulin glargine', _default.price_biocon_insulin_glargine_pack_contents, 'USER_VALUE', _default.price_biocon_insulin_glargine_pack_price, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '112 Basaglar ', _default.price_basaglar_pack_contents, 'USER_VALUE', _default.price_basaglar_daily_dose, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '113' ],					
			[ '114' ],
			[ '115' ],
								
			[ '116 DRUG COST CARTRIDGES' ],			
			[ '117 Lantus', _default.price_lantus_pack_contents, 'USER_VALUE', _default.price_lantus_daily_dose, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '118 Toujeo', _default.price_toujeo_pack_contents, 'USER_VALUE', _default.price_toujeo_pack_price, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '119 Merck insulin glargine', _default.price_merck_insulin_glargine_pack_contents, 'USER_VALUE', _default.price_merck_insulin_glargine_pack_price, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '120 Biocon insulin glargine', _default.price_biocon_insulin_glargine_pack_contents, 'USER_VALUE', _default.price_biocon_insulin_glargine_pack_price, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '121 Basaglar ', _default.price_basaglar_pack_contents, 'USER_VALUE', _default.price_basaglar_daily_dose, 'USER_VALUE', 0, 0, 'USER_VALUE' ],
			[ '122' ],					
			[ '123' ],
			[ '124' ],					
			[ '125' ],
			
			[ '126 WEIGHTED ANNUAL COST (PENS/CARTRIDGES)' ],			
			[ '127 Lantus', 0 ],
			[ '128 Toujeo', 0 ],
			[ '129 Merck insulin glargine', 0 ],
			[ '130 Biocon insulin glargine', 0 ],
			[ '131 Basaglar ', 0 ],
			[ '132' ],					
			[ '133' ],
			[ '134' ],					
			[ '135' ],
			
			[ '136 BUDGET IMPACT CALCULATIONS' ],			
			[ '137 T1DM COST IMPACT' ],			
			[ '138 Potential Basaglar patients', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '139 Non Basaglar patients ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '140' ],					
			[ '141' ],
			[ '142' ],					
			[ '143' ],
			
			[ '144 Alternative market split (no basaglar)' ],						
			[ '145 Lantus ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '146 Toujeo ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '147 Merck ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '148 Biocon ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '149 Total ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '150' ],					
			[ '151' ],
			[ '152' ],					
			[ '153' ],
			
			[ '154 Market including basaglar' ],						
			[ '155 Basaglar  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '156 Non Basaglar patients ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '157 Total cost - market including basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '158 Alternative market ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '159' ],					
			[ '160' ],
			[ '161' ],					
			[ '162' ],
			
			[ '163 ANNUAL budget impact ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '164 Cumulative budget impact  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '165' ],					
			[ '166' ],
			[ '167' ],					
			[ '168' ],
			
			[ '169 Price scenarios (Lantus discount)' ],						
			[ '170 Lantus price discount scenario' ],						
			[ '171 % discount applied across years 1-5 ', 0, 0, 0, 0, 10, 20, 30, 40  ],
			[ '172 Price of Lantus after discount  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '173' ],					
			[ '174' ],
			[ '175' ],					
			[ '176' ],
									
			[ '177 Market including basaglar' ],						
			[ '178 Basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '179 Non Basaglar patients', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '180 Total cost - market including basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '181 Alternative market', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '182' ],					
			[ '183' ],
			[ '184' ],					
			[ '185' ],
			
			[ '186 ANNUAL budget impact ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '187 Cumulative budget impact  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '188' ],					
			[ '189' ],
			[ '190' ],					
			[ '191' ],
			
			[ '192 T2DM COST IMPACT' ],			
			[ '193 Potential Basaglar patients', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '194 Non Basaglar patients ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '195' ],					
			[ '196' ],
			[ '197' ],					
			[ '198' ],
			
			[ '199 Alternative market split (no basaglar)' ],						
			[ '200 Lantus ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '201 Toujeo ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '202 Merck ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '203 Biocon ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '204 Total ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '205' ],					
			[ '206' ],
			[ '207' ],					
			[ '208' ],
		
			[ '209 Market including basaglar' ],						
			[ '210 Basaglar  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '211 Non Basaglar patients ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '212 Total cost - market including basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '213 Alternative market ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '214' ],					
			[ '215' ],
			[ '216' ],					
			[ '217' ],
			
			[ '218 ANNUAL budget impact ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '219 Cumulative budget impact  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '220' ],					
			[ '221' ],
			[ '222' ],					
			[ '223' ],
				
			[ '224 Price scenarios (Lantus discount)' ],						
			[ '225 Lantus price discount scenario' ],						
			[ '226 % discount applied across years 1-5 DO NOT USE THIS ROW'  ],
			[ '227 Price of Lantus after discount  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '228' ],					
			[ '229' ],
			[ '230' ],					
			[ '231' ],
									
			[ '232 Market including basaglar' ],						
			[ '233 Basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '234 Non Basaglar patients', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '235 Total cost - market including basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '236 Alternative market', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '237' ],					
			[ '238' ],
			[ '239' ],					
			[ '240' ],
			
			[ '241 ANNUAL budget impact ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '242 Cumulative budget impact  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '243' ],					
			[ '244' ],
			[ '245' ],					
			[ '246' ],
	
	
	//NEW DAY		
			
			[ '247 INDEX FOR SUMMARY RESULT TABELS - BASE CASE' ],						
			[ '248 Annual cost - market including basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '249 Cumulative cost - market including basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '250 - Basaglar  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '251 - Non Basaglar patients', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '252 Annual cost - alternative market ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '253 Cumulative cost - alternative market ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '254 Expected annual savings ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '255 Cumulative budget impact ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '256' ],					
			[ '257' ],
			[ '258' ],					
			[ '259' ],
			
			[ '260 INDEX FOR SUMMARY RESULT TABELS - SCENARIO' ],						
			[ '261 Annual cost - market including basaglar ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '262 - Basaglar  ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '263 - Non Basaglar patients', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '264 Annual cost - alternative market', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '265 Expected annual savings', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '266 Cumulative budget impact ', 0, 0, 0, 0, 0, 0, 0, 0  ],
			[ '267' ],					
			[ '268' ],
			[ '269' ],					
			[ '270' ],
			
			
			
			[ 'END' ]
			
		];

		
	};
			
	//Total Population
	function f0_total_population () {
		var this_row = 5;			
		check_if_user_value_exists( this_row );			
	};
	
	function f1_growth_rate () {			
		var this_row = 6;
		check_if_user_value_exists( this_row );	
		engine_data[ this_row ][ 4 ] = engine_data[ 5 ][ 3 ];			
		var count = 0;
		for ( var i=5; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 4+count ] + ( engine_data[ this_row ][ 4+count ] * ( engine_data[ this_row ][ 3 ]/100 ) );
			count++;
		}		
	};
	
	function f2_population_with_diabetes () {
		var this_row = 10;
		check_if_user_value_exists( this_row );
		var count = 0;
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 6 ][ 4+count ] * ( engine_data[ this_row ][ 3 ] /100 );
			count++;
		}
	};
	
	function f3_patients_with_t1dm () {
		var this_row = 11;
		check_if_user_value_exists( this_row );
		var count = 0;
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 10 ][ 4+count ] * ( engine_data[ this_row ][ 3 ] /100 );
			count++;
		}	
	};
	
	function f4_patients_with_t2dm () {
		var this_row = 12;
		check_if_user_value_exists( this_row );
		var count = 0;
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 10 ][ 4+count ] * ( engine_data[ this_row ][ 3 ] /100 );
			count++;
		}	
	};
	
	function f5_check () {
		var this_row = 13;
		for ( var i=1; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 11 ][ i ] + engine_data[ 12 ][ i ];							
		}	
	};
	
	function f6_duration_of_diabetes_t1dm_5 () {
		var this_row = 18;
		check_if_user_value_exists( this_row );
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 11 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );				
		}	
	};
	
	function f7_duration_of_diabetes_t1dm_5_10 () {
		var this_row = 19;
		check_if_user_value_exists( this_row );
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 11 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );				
		}	
	};
	
	function f8_duration_of_diabetes_t1dm_10 () {
		var this_row = 20;
		check_if_user_value_exists( this_row );
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 11 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );				
		}	
	};
	
	function f9_duration_of_diabetes_t1dm_all () {
		var this_row = 21;
		for ( var i=2; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 18 ][ i ] + engine_data[ 19 ][ i ] + engine_data[ 20 ][ i ];				
		}	
	};
	
	function f10_check () {
		var this_row = 22;
		for ( var i=4; i < 9; i++ ) {
			if ( engine_data[ 11 ][ i ] == engine_data[ 21 ][ i ] ) {
				engine_data[ this_row ][ i ] = true;				
			} else { 
				engine_data[ this_row ][ i ] = false;
			}			
		}	
	};
	
	function f11_duration_of_diabetes_t2dm_5 () {
		var this_row = 26;
		check_if_user_value_exists( this_row );
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 12 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );				
		}	
	};
	
	function f12_duration_of_diabetes_t2dm_5_10 () {
		var this_row = 27;
		check_if_user_value_exists( this_row );
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 12 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );				
		}	
	};
	
	function f13_duration_of_diabetes_t2dm_10 () {
		var this_row = 28;
		check_if_user_value_exists( this_row );
		for ( var i=4; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 12 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );				
		}	
	};
	
	function f14_duration_of_diabetes_t2dm_all () {
		var this_row = 29;
		for ( var i=2; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 26 ][ i ] + engine_data[ 27 ][ i ] + engine_data[ 28 ][ i ];				
		}	
	};
	
	function f15_check () {
		var this_row = 30;
		for ( var i=4; i < 9; i++ ) {
			if ( engine_data[ 12 ][ i ] == engine_data[ 29 ][ i ] ) {
				engine_data[ this_row ][ i ] = true;				
			} else { 
				engine_data[ this_row ][ i ] = false;
			}			
		}	
	};
	
	function f16_patients_treated_with_basal () {
		var this_row = 34;
		check_if_user_value_exists( this_row );
		var value_row_id = 0;
		if ( data_store.duration_of_diabetes == 1 ) {
			value_row_id = 18;
		} else if ( data_store.duration_of_diabetes == 2 ) {
			value_row_id = 19;
		} else if ( data_store.duration_of_diabetes == 3 ) {
			value_row_id = 20;
		} else {
			value_row_id = 21;
		}
		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ value_row_id ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}
	};
	
	function f17a_Basal_insulin_market_eligible_for_Basaglar_DEFAULT(){
		var this_row = 36;		
		var reference_row = 35;
		check_if_user_value_exists( reference_row );
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 34 ][ i ] * ( engine_data[ reference_row ][ 3 ] / 100 );	
		}
	};
	
	function f17_Basal_insulin_market_eligible_for_Basaglar_ACTIVE () {
		var this_row = 35;
		var reference_row = 36;
		var custom_row = 33;
		check_if_user_value_exists( this_row );
		for ( var i=4; i<9; i++ ) {
			if ( engine_data[ custom_row ][ i ] != "" || engine_data[ custom_row ][ i ] != 0 ) {
				engine_data[ this_row ][ i ] = engine_data[ custom_row ][ i ];
			} else {
				engine_data[ this_row ][ i ] = engine_data[ reference_row ][ i ];
			}
						
		}
	};
		
	function f18_Total_market_new_initiators_plus_initiators_in_previous_years () {
		var this_row = 37;
		for ( var i=4; i<9; i++ ) {
			if ( i > 0 ) engine_data[ this_row ][ i ] = engine_data[ this_row ][ i-1 ];
			engine_data[ this_row ][ i ] += engine_data[ 35 ][ i ];			
		}
	};
	
	function f19_market_share_predictions_basaglar () {
//VB NOTHING
		
	};
	
	function f20_potential_basaglar_market_new_initiators () {
		var this_row = 40;
		var reference_row = 35;	
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ reference_row ][ i ] * ( engine_data[ 39 ][ i ] / 100 );	
		}		
	};
	
	function f20a_Basaglar_market_share_T1DM() {
		var this_row = 38;	
		var row_id_one = 41;	
		var row_id_two = 34;	
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( engine_data[ row_id_one ][ i ] / engine_data[ row_id_two ][ i ] ) * 100;	
			engine_data[ this_row ][ i ] = dp_2( engine_data[ this_row ][ i ] );
		}
		
	};
	
	function f21_potential_basaglar_market_total_initiators () {
		var this_row = 41;	
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 40 ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];	
		}		
	};
	
	function f21a_Basaglar_market_share_cumulative(){
		var this_row = 42;
		var reference_row_one = 41;
		var reference_row_two = 37;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = 100 * (engine_data[ reference_row_one ][ i ] / engine_data[ reference_row_two ][ i ]);
		}
	};
	
	function f21b_Non_basaglar_market_share_cumulative() {
		var this_row = 43;
		var reference_row_one = 42;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = 100 - engine_data[ reference_row_one ][ i ];	
		}
	};
		
		
	function f22_lantus_market_share_split () {
		var this_row = 45;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 41 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f23_toujeo_market_share_split () {
		var this_row = 46;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 41 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f24_merck_market_share_split () {
		var this_row = 47;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 41 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f25_biocon_market_share_split () {
		var this_row = 48;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 41 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f26_check () {
		var this_row = 49;
		for ( var i=2; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 45 ][ i ] + engine_data[ 46 ][ i ] + engine_data[ 47 ][ i ] + engine_data[ 48 ][ i ];							
		}	
	};
	
	function f27_market_share_predictions_lantus () {
		var this_row = 53;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( ( 100 - engine_data[ 39 ][ i ] ) / 100 ) * ( engine_data[ 45 ][ 3 ] );	
		}		
	};
	
	function f28_market_share_predictions_toujeo () {
		var this_row = 54;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( ( 100 - engine_data[ 39 ][ i ] ) / 100 ) * ( engine_data[ 46 ][ 3 ] );	
		}		
	};
	
	function f29_market_share_predictions_merck () {
		var this_row = 55;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( ( 100 - engine_data[ 39 ][ i ] ) / 100 ) * ( engine_data[ 47 ][ 3 ] );	
		}		
	};
	
	function f30_market_share_predictions_biocon () {
		var this_row = 56;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( ( 100 - engine_data[ 39 ][ i ] ) / 100 ) * ( engine_data[ 48 ][ 3 ] );	
		}		
	};
	
	function f31_patients_treated_with_basal () {
		var this_row = 60;
		check_if_user_value_exists( this_row );
		var value_row_id = 0;
		if ( data_store.duration_of_diabetes == 1 ) {
			value_row_id = 26;
		} else if ( data_store.duration_of_diabetes == 2 ) {
			value_row_id = 27;
		} else if ( data_store.duration_of_diabetes == 3 ) {
			value_row_id = 28;
		} else {
			value_row_id = 29;
		}
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ value_row_id ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}
	};
	
	function f33_Basal_insulin_market_eligible_for_Basaglar_DEFAULT () {
		var this_row = 62;
		var reference_row = 61;
		check_if_user_value_exists( reference_row );
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 60 ][ i ] * ( engine_data[ reference_row ][ 3 ] / 100 );	
		}
	};
	
	function f32_Basal_insulin_market_eligible_for_Basaglar_ACTIVE () {
		var this_row = 61;
		var reference_row = 62;
		var custom_row = 59;
		check_if_user_value_exists( this_row );
		for ( var i=4; i<9; i++ ) {
			if ( engine_data[ custom_row ][ i ] != "" || engine_data[ custom_row ][ i ] != 0 ) {
				engine_data[ this_row ][ i ] = engine_data[ custom_row ][ i ];
			} else {
				engine_data[ this_row ][ i ] = engine_data[ reference_row ][ i ];
			}
						
		}		
	};
	
	function f33a_Total_market_new_initiators_plus_initiators_in_previous_years () {
		var this_row = 63;
		for ( var i=4; i<9; i++ ) {
			if ( i > 0 ) engine_data[ this_row ][ i ] = engine_data[ this_row ][ i-1 ];
			engine_data[ this_row ][ i ] += engine_data[ 62 ][ i ];			
		}
	};

	
	function f34_market_share_predictions_basaglar () {
//VB NOTHING
		
	};
	
	function f35_potential_basaglar_market_new_initiators () {
		var this_row = 66;	
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 61 ][ i ] * ( engine_data[ 65 ][ i ] / 100 );	
		}		
	};
	
	function f35a_Basaglar_market_share_T2DM() {
		var this_row = 64;	
		var row_id_one = 67;	
		var row_id_two = 60;	
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( engine_data[ row_id_one ][ i ] / engine_data[ row_id_two ][ i ] ) * 100;	
			engine_data[ this_row ][ i ] = dp_2( engine_data[ this_row ][ i ] );
		}
		
	};
	
	function f36_potential_basaglar_market_total_initiators () {
		var this_row = 67;	
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 66 ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];	
		}		
	};
	
	function f36a_Basaglar_market_share_cumulative(){
		var this_row = 68;	
		var reference_row_one = 67;
		var reference_row_two = 63;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = 100 * (engine_data[ reference_row_one ][ i ] / engine_data[ reference_row_two ][ i ]);
		}
	};
	
	function f36b_Non_basaglar_market_share_cumulative(){
		var this_row = 69;
		var reference_row_one = 68;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = 100 - engine_data[ reference_row_one ][ i ];	
		}
	};
	
	function f37_lantus_market_share_split () {
		var this_row = 71;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 67 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f38_toujeo_market_share_split () {
		var this_row = 72;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 67 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f39_merck_market_share_split () {
		var this_row = 73;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 67 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f40_biocon_market_share_split () {
		var this_row = 74;
		check_if_user_value_exists( this_row );			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 67 ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f41_check () {
		var this_row = 75;
		for ( var i=2; i < 9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ 71 ][ i ] + engine_data[ 72 ][ i ] + engine_data[ 73 ][ i ] + engine_data[ 74 ][ i ];							
		}	
	};
	
	
	function f42_pens_cost_lantus () {
		var this_row = 89;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f43_pens_cost_toujeo () {
		var this_row = 90;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f44_pens_cost_merck () {
		var this_row = 91;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f45_pens_cost_biocon () {
		var this_row = 92;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f46_pens_cost_basaglar () {
		var this_row = 93;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f47_cartidges_cost_lantus () {
		var this_row = 99;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f48_cartidges_cost_toujeo () {
		var this_row = 100;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f49_cartidges_cost_merck () {
		var this_row = 101;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f50_cartidges_cost_biocon () {
		var this_row = 102;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f51_cartidges_cost_basaglar () {
		var this_row = 103;
		var	column_id = data_store.drug_prices;
		engine_data[ this_row ][ 4 ] = engine_data[ this_row ][ column_id ];				
	};
	
	function f52_pens_annual_cost_lantus () {
		var this_row = 108;	
		var data_row = 89;		
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;						
	};
	
	function f53_pens_annual_cost_toujeo () {
		var this_row = 109;
		var data_row = 90;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f54_pens_annual_cost_merck () {
		var this_row = 110;			
		var data_row = 91;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f55_pens_annual_cost_biocon () {
		var this_row = 111;			
		var data_row = 92;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f56_pens_annual_cost_basaglar () {
		var this_row = 112;			
		var data_row = 93;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f57_cartridges_annual_cost_lantus () {
		var this_row = 117;			
		var data_row = 99;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f58_cartridges_annual_cost_toujeo () {
		var this_row = 118;			
		var data_row = 100;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f59_cartridges_annual_cost_merck () {
		var this_row = 119;			
		var data_row = 101;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f60_cartridges_annual_cost_biocon () {
		var this_row = 120;			
		var data_row = 102;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f61_cartridges_annual_cost_basaglar () {
		var this_row = 121;			
		var data_row = 103;			
		engine_data[ this_row ][ 5 ] = ( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * engine_data[ this_row ][ 3 ];					
		var daily_dose = engine_data[ this_row ][ 3 ];
		if ( exists( engine_data[ this_row ][ 2 ] ) ) daily_dose = engine_data[ this_row ][ 2 ];
		var daily_cost = (( engine_data[ data_row ][ 4 ] / engine_data[ this_row ][ 1 ] ) * daily_dose);
		if ( exists( engine_data[ this_row ][ 4 ] ) ) daily_cost = engine_data[ this_row ][ 4 ];
		engine_data[ this_row ][ 6 ] = daily_cost * days;
	};
	
	function f62_weighted_annual_cost_lantus() {
		var this_row = 127;			
		var discount_row_cartridges = 80;
		var discount_row_pens = 81;
		var data_row_one = 108;			
		var data_row_two = 117;			
		
		var discount_pens = engine_data[ discount_row_pens ][ 1 ] / 100;
		var discount_cartridges = engine_data[ discount_row_cartridges ][ 1 ] / 100;
		
		engine_data[ this_row ][ 1 ] = ( engine_data[ data_row_one ][ 6 ] * discount_pens ) + ( engine_data[ data_row_two ][ 6 ] * discount_cartridges );		
	};
	
	function f63_weighted_annual_cost_toujeo(){
		var this_row = 128;
		engine_data[ this_row ][ 1 ] = 0;
	};
	
	function f64_weighted_annual_cost_merck(){
		var this_row = 129;
		engine_data[ this_row ][ 1 ] = 0;
	};
	
	function f65_weighted_annual_cost_biocon(){
		var this_row = 130;
		engine_data[ this_row ][ 1 ] = 0;
	};
	
	function f66_weighted_annual_cost_basaglar(){
		var this_row = 131;			
		var discount_row_cartridges = 82;
		var discount_row_pens = 83;
		var data_row_one = 112;			
		var data_row_two = 121;			
		
		var discount_pens = engine_data[ discount_row_pens ][ 1 ] / 100;
		var discount_cartridges = engine_data[ discount_row_cartridges ][ 1 ] / 100;
		
		engine_data[ this_row ][ 1 ] = ( engine_data[ data_row_one ][ 6 ] * discount_pens ) + ( engine_data[ data_row_two ][ 6 ] * discount_cartridges );		
	};
	
	function f67_Potential_Basaglar_patients(){
		var this_row = 138;			
		var data_row = 41;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row ][ i ];	
		}
		
	};
	
	function f68_Non_Basaglar_patients(){
		var this_row = 139;			
		var data_row_one = 37;			
		var data_row_two = 41;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] - engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f69_Lantus_markey_split(){
		var this_row = 145;			
		var data_row_one = 127;			
		var data_row_two = 71;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f70_toujeo_markey_split(){
		var this_row = 146;			
		var data_row_one = 128;			
		var data_row_two = 72;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f71_merck_markey_split(){
		var this_row = 147;			
		var data_row_one = 129;			
		var data_row_two = 73;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}
	};
	
	function f72_biocon_markey_split(){
		var this_row = 148;			
		var data_row_one = 130;			
		var data_row_two = 74;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}
	};
	
	function f73_total_markey_split(){
		var this_row = 149;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row - 4 ][ i ] + engine_data[ this_row - 3 ][ i ] + engine_data[ this_row - 2 ][ i ] + engine_data[ this_row - 1 ][ i ];	
		}
	};
	
	function f74_basaglar_market_including_bas(){
		var this_row = 155;		
		var data_row_one = 131;		
		var data_row_two = 138;		
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = 100;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ data_row_two ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 ) );	
		}		
	};
	
	function f75_Non_Basaglar_patients_including_bas(){
		var this_row = 156;		
		var data_row_one = 139;		
		var data_row_two = 149;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] * engine_data[ data_row_two ][ i ];	
		}
	};
	
	function f76_Total_cost_market_including_basaglar_including_bas(){
		var this_row = 157;				
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row-2 ][ i ] + engine_data[ this_row-1 ][ i];	
		}
	};
	
	function f77_Alternative_market_including_bas(){
		var this_row = 158;
		var data_row_one = 138;		
		var data_row_two = 139;
		var data_row_three = 149;						
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( engine_data[ data_row_one ][ i ] + engine_data[ data_row_two ][ i ] ) * engine_data[ data_row_three ][ i];	
		}	
	};
	
	function f78_ANNUAL_budget_impact(){
		var this_row = 163;		
		var data_row_one = 157;		
		var data_row_two = 158;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] - engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f79_Cumulative_budget_impact(){
		var this_row = 164;		
		var data_row_one = 163;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];
		}
	};
	
	function f80_Price_of_Lantus_after_discount() {
		var this_row = 172;		
		var data_row_one = 171;		
		var data_row_two = 145;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_two ][ 2 ] - ( engine_data[ data_row_two ][ 2 ] * ( engine_data[ data_row_one ][ i ] / 100 ) );			
		}		
	};
	
	
	function f81_basaglar_market_including_bas(){
		var this_row = 178;	
		var ref_row = 155;
		var data_row_one = 138;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ ref_row ][ 2 ] * ( engine_data[ data_row_one ][ i ] * ( engine_data[ ref_row ][ 3 ] / 100 ) );	
		}	
	};
	
	function f82_Non_Basaglar_patients_including_bas(){
		var this_row = 179;
		var data_row_one = 139;		
		var data_row_two = 172;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] * engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f83_Total_cost_market_including_basaglar_including_bas(){
		var this_row = 180;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row-2 ][ i ] + engine_data[ this_row-1 ][ i];	
		}
	};
	
	function f84_Alternative_market_including_bas(){
		var this_row = 181;
		var data_row_one = 138;		
		var data_row_two = 139;
		var data_row_three = 172;						
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( engine_data[ data_row_one ][ i ] + engine_data[ data_row_two ][ i ] ) * engine_data[ data_row_three ][ i];	
		}
	};
	
	function f85_ANNUAL_budget_impact(){
		var this_row = 186;		
		var data_row_one = 180;		
		var data_row_two = 181;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] - engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f86_Cumulative_budget_impact(){
		var this_row = 187;		
		var data_row_one = 186;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];
		}
	};
	
	//T2DM
	
	function f87_Potential_Basaglar_patients(){
		var this_row = 193;			
		var data_row = 67;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row ][ i ];	
		}
		
	};
	
	function f88_Non_Basaglar_patients(){
		var this_row = 194;			
		var data_row_one = 63;			
		var data_row_two = 67;			
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] - engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f89_Lantus_markey_split(){
		var this_row = 200;			
		var data_row_one = 127;			
		var data_row_two = 71;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f90_toujeo_markey_split(){
		var this_row = 201;			
		var data_row_one = 128;			
		var data_row_two = 72;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}		
	};
	
	function f91_merck_markey_split(){
		var this_row = 202;			
		var data_row_one = 129;			
		var data_row_two = 73;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}
	};
	
	function f92_biocon_markey_split(){
		var this_row = 203;			
		var data_row_one = 130;			
		var data_row_two = 74;			
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = engine_data[ data_row_two ][ 3 ];
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ this_row ][ 3 ] / 100 );	
		}
	};
	
	function f93_total_markey_split(){
		var this_row = 204;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row - 4 ][ i ] + engine_data[ this_row - 3 ][ i ] + engine_data[ this_row - 2 ][ i ] + engine_data[ this_row - 1 ][ i ];	
		}
	};
	
	function f94_basaglar_market_including_bas(){
		var this_row = 210;		
		var data_row_one = 131;		
		var data_row_two = 193;		
		engine_data[ this_row ][ 2 ] = engine_data[ data_row_one ][ 1 ];
		engine_data[ this_row ][ 3 ] = 100;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row ][ 2 ] * ( engine_data[ data_row_two ][ i ] * ( engine_data[ this_row ][ 3 ] / 100 ) );	
		}		
	};
	
	function f95_Non_Basaglar_patients_including_bas(){
		var this_row = 211;		
		var data_row_one = 194;		
		var data_row_two = 204;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] * engine_data[ data_row_two ][ i ];	
		}
	};
	
	function f96_Total_cost_market_including_basaglar_including_bas(){
		var this_row = 212;				
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row-2 ][ i ] + engine_data[ this_row-1 ][ i];	
		}
	};
	
	function f97_Alternative_market_including_bas(){
		var this_row = 213;
		var data_row_one = 193;		
		var data_row_two = 194;
		var data_row_three = 204;						
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( engine_data[ data_row_one ][ i ] + engine_data[ data_row_two ][ i ] ) * engine_data[ data_row_three ][ i];	
		}	
	};
	
	function f98_ANNUAL_budget_impact(){
		var this_row = 218;		
		var data_row_one = 212;		
		var data_row_two = 213;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] - engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f99_Cumulative_budget_impact(){
		var this_row = 219;		
		var data_row_one = 218;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];
		}
	};
	
	function f100_Price_of_Lantus_after_discount() {
		var this_row = 227;		
		var data_row_one = 171;		
		var data_row_two = 145;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_two ][ 2 ] - ( engine_data[ data_row_two ][ 2 ] * ( engine_data[ data_row_one ][ i ] / 100 ) );			
		}		
	};	
	
	function f101_basaglar_market_including_bas(){
		var this_row = 233;	
		var ref_row = 210;
		var data_row_one = 193;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ ref_row ][ 2 ] * ( engine_data[ data_row_one ][ i ] * ( engine_data[ ref_row ][ 3 ] / 100 ) );	
		}	
	};
	
	function f102_Non_Basaglar_patients_including_bas(){
		var this_row = 234;
		var data_row_one = 194;		
		var data_row_two = 227;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] * engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f103_Total_cost_market_including_basaglar_including_bas(){
		var this_row = 235;
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ this_row-2 ][ i ] + engine_data[ this_row-1 ][ i];	
		}
	};
	
	function f104_Alternative_market_including_bas(){
		var this_row = 236;
		var data_row_one = 193;		
		var data_row_two = 194;
		var data_row_three = 227;						
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = ( engine_data[ data_row_one ][ i ] + engine_data[ data_row_two ][ i ] ) * engine_data[ data_row_three ][ i];	
		}
	};
	
	function f105_ANNUAL_budget_impact(){
		var this_row = 241;		
		var data_row_one = 235;		
		var data_row_two = 236;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ] - engine_data[ data_row_two ][ i ];	
		}	
	};
	
	function f106_Cumulative_budget_impact(){
		var this_row = 242;		
		var data_row_one = 241;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];
		}
	};
	
	
	function f107_Annual_cost_market_including_basaglar_base_case(){
		var this_row = 248;		
		var type_1_row = 157;
		var type_2_row = 212;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}
	};
	
	function f108_Cumulative_cost_market_including_basaglarr_base_case(){
		var this_row = 249;		
		var data_row_one = 248;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];
		}	
	};
	
	function f109_Basaglarr_base_case(){
		var this_row = 250;		
		var type_1_row = 155;
		var type_2_row = 210;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}			
	};
	
	function f110_Non_Basaglar_patientsr_base_case(){
		var this_row = 251;		
		var type_1_row = 156;
		var type_2_row = 211;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}			
	};
	
	function f111_Annual_cost_alternative_marketr_base_case(){
		var this_row = 252;		
		var type_1_row = 158;
		var type_2_row = 213;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}
	};
	
	function f112_Cumulative_cost_alternative_marketr_base_case(){
		var this_row = 253;		
		var data_row_one = 252;		
		for ( var i=4; i<9; i++ ) {
			engine_data[ this_row ][ i ] = engine_data[ data_row_one ][ i ];
			if ( i > 4 ) engine_data[ this_row ][ i ] += engine_data[ this_row ][ i-1 ];
		}		
	};
	
	function f113_Expected_annual_savingsr_base_case(){
		var this_row = 254;		
		var type_1_row = 163;
		var type_2_row = 218;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = Math.abs( engine_data[ type_1_row ][ i ] );
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = Math.abs( engine_data[ type_2_row ][ i ] );
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = Math.abs( engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ] );
			}
		}
	};
	
	function f114_Cumulative_budget_impactr_base_case(){
		var this_row = 255;		
		var type_1_row = 164;
		var type_2_row = 219;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] =  engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}
	};
	
	
	function f115_Annual_cost_market_including_basaglar_scenario(){
		var this_row = 261;		
		var type_1_row = 180;
		var type_2_row = 235;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}
	};
	
	function f116_Basaglar_scenario(){
		var this_row = 262;		
		var type_1_row = 178;
		var type_2_row = 233;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}
	};
	
	function f117_Non_Basaglar_patients_scenario(){
		var this_row = 263;		
		var type_1_row = 179;
		var type_2_row = 234;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}	
	};
	
	function f118_Annual_cost_alternative_market_scenario(){
		var this_row = 264;		
		var type_1_row = 181;
		var type_2_row = 236;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}	
	};
	
	function f119_Expected_annual_savings_scenario(){
		var this_row = 265;		
		var type_1_row = 186;
		var type_2_row = 241;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}	
	};
	
	function f120_Cumulative_budget_impact_scenario(){
		var this_row = 266;		
		var type_1_row = 187;
		var type_2_row = 242;
		if ( data_store.diabetes_type == 1 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ];
			}
		} else if ( data_store.diabetes_type == 2 ) {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_2_row ][ i ];
			}
		} else {
			for ( var i=4; i<9; i++ ) {
				engine_data[ this_row ][ i ] = engine_data[ type_1_row ][ i ] + engine_data[ type_2_row ][ i ];
			}
		}
	};
	
	
	
	






	
	
	function check_if_user_value_exists( this_row ) {
		if ( engine_data[ this_row ][ 1 ] != 0 || engine_data[ this_row ][ 1 ] != '' ) {
			engine_data[ this_row ][ 3 ] = engine_data[ this_row ][ 1 ];
		} else {
			engine_data[ this_row ][ 3 ] = engine_data[ this_row ][ 2 ];
		}	
	};	
		
	function exists ( value ) {
		if ( value != 0 && value != 'USER_VALUE' && value != '' ) {
			return true;
		} else {
			return false;
		}
		
	}
