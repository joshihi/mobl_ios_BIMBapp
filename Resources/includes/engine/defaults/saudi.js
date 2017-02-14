function init() {
	var _default = {};
	 
	_default.id = 'saudi';
	_default.title = 'Saudi Arabia';
	_default.title_local = 'Saudi Arabian';
	_default.days_per_year = 365.25;
	_default.base_year = 2016;
	_default.cur = 'SAR';
	
	//Market Share Prediction
	_default.t1dm_market_share_prediction_1 = 0.00;
	_default.t1dm_market_share_prediction_2 = 5.00;
	_default.t1dm_market_share_prediction_3 = 8.00;
	_default.t1dm_market_share_prediction_4 = 10.00;
	_default.t1dm_market_share_prediction_5 = 15.00;
	_default.t2dm_market_share_prediction_1 = 5.00;
	_default.t2dm_market_share_prediction_2 = 8.00;
	_default.t2dm_market_share_prediction_3 = 10.00;
	_default.t2dm_market_share_prediction_4 = 15.00;
	_default.t2dm_market_share_prediction_5 = 20.00;
	
	//PRODUCTS
	_default.product_list = [ 'lantus', 'toujeo', 'merck ludsuna', 'biocon insulin glargine', 'basaglar' ];
	_default.comparator_list = [ 'lantus', 'toujeo', 'merck ludsuna', 'biocon insulin glargine' ];
	_default.toujeo_warning_message = 'Please note: Toujeo is indicated for adults only. Toujeo is not a biosimilar, it is an upgraded version expected to replace Lantus (basal insulin glargine).';
	_default.comparator_options = [ 'lantus', 'toujeo' ];
	_default.product_type = [ 'pens', 'cartridges' ];
	//_default.price_category = [ 'manufacturer', 'wholesaler', 'public' ];
	_default.price_category = [ 'manufacturer', 'public' ];
	
	
	_default.toujeo_product_message = 'Please note: Toujeo is indicated for adults only.';
	
	//OVERALL POPULATION
	_default.total_population = 30890000;
	_default.total_population_ref = 'http://data.worldbank.org';
	_default.growth_rate = 2.20;
	_default.growth_rate_ref = 'http://data.worldbank.org/indicator/SP.POP.GROW';
	
	//OVERALL DIABETES POPULATION
	_default.percentage_of_population_with_diabetes = 20.52;
	_default.percentage_of_population_with_diabetes_ref = 'https://www.idf.org/sites/default/files/Atlas-poster-2014_EN.pdf';
	_default.percentage_of_patients_with_t1dm = 10.00;
	_default.percentage_of_patients_with_t1dm_ref = 'IDF Diabetes Atlas, 6th Edition, International Diabetes Federation, 2014';
	_default.percentage_of_patients_with_t2dm = 90.00;
	_default.percentage_of_patients_with_t2dm_ref = 'IDF Diabetes Atlas, 6th Edition, International Diabetes Federation, 2014';
	
	//DURATION OF DIABETES
	_default.duration_of_diabetes_t1dm_5 = 72.50;
	_default.duration_of_diabetes_t1dm_5_10 = 13.75;
	_default.duration_of_diabetes_t1dm_10 = 13.75;
	//_default.duration_of_diabetes_t1dm_all = 100.00;
	
	_default.duration_of_diabetes_t2dm_5 = 3.00;
	_default.duration_of_diabetes_t2dm_5_10 = 22.00;
	_default.duration_of_diabetes_t2dm_10 = 75.00;
	//_default.duration_of_diabetes_t2dm_all = 100.00;		
				
	//T1DM POPULATION
	_default.t1dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine = 96.00;
	_default.t1dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine_ref = 'Basaglar IMS Physician Survey 2015, Data on File';			
	//WORLD WITHOUT BASAGLAR
	_default.t1dm_percentage_of_basal_insulin_market_who_are_new_initiators = 20.00;
	_default.t1dm_percentage_of_basal_insulin_market_who_are_new_initiators_ref = 'Basaglar IMS Physician Survey 2015, Data on File';
	
	//WORLD WITH BASAGLAR
	_default.t1dm_lantus_market_share_split = 100.00;
	_default.t1dm_lantus_market_share_split_ref = 'Basaglar IMS Physician Survey 2015, Data on File';
	_default.t1dm_toujeo_market_share_split = 0.00;
	_default.t1dm_toujeo_market_share_split_ref = 'Currently unavailable';
	_default.t1dm_toujeo_market_share_split_i = 'Please note: in the current market Basaglar is not expected to take market share from Toujeo.';
	_default.t1dm_merck_insulin_glargine_market_share_split = 0.00;
	_default.t1dm_merck_insulin_glargine_market_share_split_ref = 'Currently unavailable';
	_default.t1dm_biocon_insulin_glargine_market_share_split = 0.00;
	_default.t1dm_biocon_insulin_glargine_market_share_split_ref = 'Currently unavailable';
				
	//T2DM POPULATION
	_default.t2dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine = 29.00;	
	_default.t2dm_percentage_of_patients_treated_with_basal_long_acting_insulin_glargine_ref = 'Basaglar IMS Physician Survey 2015, Data on File';			
	//WORLD WITHOUT BASAGLAR
	_default.t2dm_percentage_of_basal_insulin_market_who_are_new_initiators = 14.00;
	_default.t2dm_percentage_of_basal_insulin_market_who_are_new_initiators_ref = 'Basaglar IMS Physician Survey 2015, Data on File';
	
	//WORLD WITH BASAGLAR
	_default.t2dm_lantus_market_share_split = 100.00;
	_default.t2dm_lantus_market_share_split_ref = 'Basaglar IMS Physician Survey 2015, Data on File';
	_default.t2dm_toujeo_market_share_split = 0.00;
	_default.t2dm_toujeo_market_share_split_ref = 'Currently unavailable';
	_default.t2dm_toujeo_market_share_split_i = 'Please note: in the current market Basaglar is not expected to take market share from Toujeo';
	_default.t2dm_merck_insulin_glargine_market_share_split = 0.00;
	_default.t2dm_merck_insulin_glargine_market_share_split_ref = 'Currently unavailable';
	_default.t2dm_biocon_insulin_glargine_market_share_split = 0.00;	
	_default.t2dm_biocon_insulin_glargine_market_share_split_ref = 'Currently unavailable';	
				
	//DRUG COSTS
	//PRICE
	_default.price_lantus_discount_percentage = 0.00;
	//LANTUS PENS
	_default.price_lantus_wholesaler_pens = 258.00;
	_default.price_lantus_public_pens = 296.00;
	_default.price_lantus_manufacturer_pens = 231.00;
	//LANTUS CARTRIDGES
	_default.price_lantus_wholesaler_cartridges = 275.00;
	_default.price_lantus_public_cartridges = 316.00;
	_default.price_lantus_manufacturer_cartridges = 246.00;
	
	//TOUJEO PENS
	_default.price_toujeo_wholesaler_pens = 0.00;
	_default.price_toujeo_public_pens = 0.00;
	_default.price_toujeo_manufacturer_pens = 0.00;
	//TOUJEO CARTRIDGES
	_default.price_toujeo_wholesaler_cartridges = 0.00;
	_default.price_toujeo_public_cartridges = 0.00;
	_default.price_toujeo_manufacturer_cartridges = 0.00;
	
	//MERCK INSULINE GARLINE PENS
	_default.price_merck_insulin_glargine_wholesaler_pens = 0.00;
	_default.price_merck_insulin_glargine_public_pens = 0.00;
	_default.price_merck_insulin_glargine_manufacturer_pens = 0.00;
	//MERCK INSULINE GARLINE CARTRIDGES
	_default.price_merck_insulin_glargine_wholesaler_cartridges = 0.00;
	_default.price_merck_insulin_glargine_public_cartridges = 0.00;
	_default.price_merck_insulin_glargine_manufacturer_cartridges = 0.00;
	
	//biocon INSULINE GARLINE PENS
	_default.price_biocon_insulin_glargine_wholesaler_pens = 0.00;
	_default.price_biocon_insulin_glargine_public_pens = 0.00;
	_default.price_biocon_insulin_glargine_manufacturer_pens = 0.00;
	//biocon INSULINE GARLINE CARTRIDGES
	_default.price_biocon_insulin_glargine_wholesaler_cartridges = 0.00;
	_default.price_biocon_insulin_glargine_public_cartridges = 0.00;
	_default.price_biocon_insulin_glargine_manufacturer_cartridges = 0.00;
	
	//BASAGLAR PENS
	_default.price_basaglar_wholesaler_pens = 41.00;
	_default.price_basaglar_public_pens = 50.00;
	_default.price_basaglar_manufacturer_pens = 41.00;
	//BASAGLAR CARTRIDGES
	_default.price_basaglar_wholesaler_cartridges = 41.00;
	_default.price_basaglar_public_cartridges = 50.00;
	_default.price_basaglar_manufacturer_cartridges = 41.00;
					
	
					
	//TREATMENT
		//LANTUS
	_default.price_lantus_pack_contents = 1500;
	_default.price_lantus_daily_dose = 40.00;
	_default.price_lantus_unit = 'UI';
	_default.price_lantus_source_pack_price = 'IMS MIDAS';
	_default.price_lantus_source_daily_dose = 'TBC';
	//TOUJEO
	_default.price_toujeo_pack_contents = 1500;
	_default.price_toujeo_pack_price = 0.00;
	_default.price_toujeo_daily_dose = 0.00;
	_default.price_toujeo_source_pack_price = 'TBD';
	_default.price_toujeo_source_daily_dose = 'TBC';
	//merck_insulin_glargine
	_default.price_merck_insulin_glargine_pack_contents = 1500;
	_default.price_merck_insulin_glargine_pack_price = 0.00;
	_default.price_merck_insulin_glargine_daily_dose = 0.00;
	_default.price_merck_insulin_glargine_source_pack_price = 'TBD';
	_default.price_merck_insulin_glargine_source_daily_dose = 'TBC';
	//biocon_insulin_glargine
	_default.price_biocon_insulin_glargine_pack_contents = 1500;
	_default.price_biocon_insulin_glargine_pack_price = 0.00;
	_default.price_biocon_insulin_glargine_daily_dose = 0.00;
	_default.price_biocon_insulin_glargine_source_pack_price = 'TBD';
	_default.price_biocon_insulin_glargine_source_daily_dose = 'TBC';
		//BASAGLAR
	_default.price_basaglar_pack_contents = 1500;
	_default.price_basaglar_daily_dose = 40.00;
	_default.price_basaglar_unit = 'UI';		
	_default.price_basaglar_source_pack_price = 'Eli Lilly';
	_default.price_basaglar_source_daily_dose = 'Eli Lilly';
	
	return _default;
};

exports.init = init;