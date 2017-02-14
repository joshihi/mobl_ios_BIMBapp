function this_class() {
	

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	var self = {};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////
	
	self.get_graph_data = function ( graph_type, category_array, first_data_array, second_data_array, graph_title, size_type ) {
	
		var amcharts_graph_obj = get_graph_obj( graph_type, category_array, first_data_array, second_data_array, graph_title, size_type );
		
		var html = self.get_html_graph( amcharts_graph_obj );
	
		return html; 
		
	};
	
	//DETAILED RESULTS GRAPH
	self.get_detailed_results_html = function ( animation_bool, type ) { 
		
		var graph_obj = get_detailed_results_amcharts_obj( animation_bool, type );
			
		var html='';
		
		html += '<html>\
					<head>\
						<link rel="stylesheet" href="includes/css/style.css" type="text/css">\
						<script src="includes/amcharts/js/amcharts.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/plugins/responsive.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/serial.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/xy.js" type="text/javascript"></script>';
		
		html += '<script type="text/javascript">\
					AmCharts.makeChart("chart_div",';
				
		html += JSON.stringify(graph_obj);
	
		html += ');\
					</script>\
				</head>\
				<body>\
					<div id="chart_div" ></div>\
				</body>\
				</html>';		

		
		console.log( html );
		
		return html;
		
	};
	
	//TORNANDO GRAPH
	self.get_tornando_graph_html = function ( options_array ) { 
		
		var graph_obj = get_tornando_amcharts_obj( options_array );
			
		var html='';
		
		html += '<html>\
					<head>\
						<link rel="stylesheet" href="includes/css/style.css" type="text/css">\
						<script src="includes/amcharts/js/amcharts.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/plugins/responsive.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/serial.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/xy.js" type="text/javascript"></script>';
		
		html += '<script type="text/javascript">\
					AmCharts.makeChart("chart_div",';
				
		html += JSON.stringify(graph_obj);
	
		html += ');\
					</script>\
				</head>\
				<body>\
					<div id="chart_div" ></div>\
				</body>\
				</html>';		

		
		return html;
		
	};
	
	function get_detailed_results_amcharts_obj ( animation_bool, type ) {
		
		console.log( 'type ' + type );
		
		if ( type == 'detailed' ) {
			
			var total_cost_basaglar_id = 250;
			var total_cost_lantus_id = 251;
			var alternative_market_id = 252;
			
		} else if ( type == 'drug_scenario' ) {
			
			var total_cost_basaglar_id = 262;
			var total_cost_lantus_id = 263;
			var alternative_market_id = 264;
			
		}
		
		
		var total_cost_basaglar_array = engine.get_multiple_values( [{ row: total_cost_basaglar_id, col:4 }, { row: total_cost_basaglar_id, col:5 }, { row: total_cost_basaglar_id, col:6 }, { row: total_cost_basaglar_id, col:7 }, { row: total_cost_basaglar_id, col:8 } ] );
		var total_cost_lantus_array = engine.get_multiple_values( [{ row: total_cost_lantus_id, col:4 }, { row: total_cost_lantus_id, col:5 }, { row: total_cost_lantus_id, col:6 }, { row: total_cost_lantus_id, col:7 }, { row: total_cost_lantus_id, col:8 } ] );
		var alternative_market_array = engine.get_multiple_values( [{ row: alternative_market_id, col:4 }, { row: alternative_market_id, col:5 }, { row: alternative_market_id, col:6 }, { row: alternative_market_id, col:7 }, { row: alternative_market_id, col:8 } ] );
		
		var graph_obj = {};

			graph_obj.type = "serial";
			graph_obj.fontFamily = "GothamRounded-Bold";
			graph_obj.fontSize =  15;
			//graph_obj.marginLeft = 200;
			//graph_obj.marginRight = 50;
			graph_obj.startDuration = 1;
			graph_obj.columnSpacing = -50;
			if ( animation_bool == false ) graph_obj.startDuration = 0;
			graph_obj.categoryField = "category";
			//graph_obj.rotate = true;
			//graph_obj.colors = [ "#8cd0a7", "#d172aa" ];
/*			graph_obj.responsive = {
			    enabled: true
			};
*/
			graph_obj.categoryAxis = {
				gridPosition: "start",
				autoWrap: true,
				axisAlpha: 0,
				axisThickness: 0,
				gridAlpha: 0,
				gridColor: "",
				tickLength: 0
			};
			graph_obj.valueAxes = [
				{
					autoWrap: true,
					id: "ValueAxis-1",
					stackType: "3d",
					axisThickness: 0,
					tickLength: 0,
					title: "Cost ("+ _default.cur +")",
					//ignoreAxisWidth: true,
					titleBold: false,
					axisTitleOffset: 400
				}
			];
			
			graph_obj.legend = {
				enabled: true,
				position: "top",
				equalWidths: false,
				valueWidth: 0,
				labelWidth: 0


//				useGraphSettings: true
			};
			graph_obj.balloon = {
				disableMouseEvents: false
			};
			graph_obj.graphs = [
				{
					balloonText: "[[title]] [[value]]",
					//columnWidth: 0.95,
					fillAlphas: 1,
					fillColors: "#DDDDB2",
					id: "AmGraph-1",
					lineAlpha: 0,
					periodSpan: 9,
					title: "Total cost if Basaglar™ not available",
					type: "column",
					valueField: "alternative"
				},
				{
					balloonText: "[[title]] [[value]]",
					//columnWidth: 0.5,
					fillAlphas: 1,
					fillColors: "#ABA714",
					id: "AmGraph-2",
					lineAlpha: 0,
					minDistance: 0,
					newStack: true,
					title: "Total cost Lantus®",
					type: "column",
					valueField: "lantus"
				},
				{
					balloonText: "[[title]] [[value]]",
					//columnWidth: 0.5,
					fillAlphas: 1,
					fillColors: "#B83D88",
					id: "AmGraph-4",
					lineAlpha: 0,
					title: "Total cost Basaglar™",
					type: "column",
					valueField: "basaglar"
				}
			];
			
			var years_array = engine.get_years_array();
			
			var temp_array = new Array();
			
			for ( var i=0; i<years_array.length; i++ ) {
				
				var temp_obj = {
					category: years_array[i],
					basaglar: Math.round( total_cost_basaglar_array[i] ),
					lantus: Math.round( total_cost_lantus_array[i] ),
					alternative: Math.round( alternative_market_array[i] )			
				};
				
				temp_array.push( temp_obj );
					
			}
						
			graph_obj.dataProvider = temp_array;
			
			//print( graph_obj );
									
		return graph_obj;
		
	};

	
	function get_tornando_amcharts_obj ( options_array ) {
		
		var base_case_value;
		var base_case_row_id;
		var base_case_col_id; 
		if ( data_store.tornando_outcome == 1 ) {
			base_case_row_id = 248;
			base_case_col_id = 8; 
		} else if ( data_store.tornando_outcome == 2 ) {
			base_case_row_id = 252;
			base_case_col_id = 8;
		} else if ( data_store.tornando_outcome == 3 ) {
			base_case_row_id = 254;
			base_case_col_id = 8;
		} else if ( data_store.tornando_outcome == 4 ) {
			base_case_row_id = 255;
			base_case_col_id = 8;
		}
		
		base_case_value = engine.get_value( base_case_row_id, base_case_col_id );
		
		print( "base_case_value " + base_case_value );
				
		var graph_obj = {};
			graph_obj.type = "serial";
			graph_obj.fontFamily = "GothamRounded-Bold";
			//graph_obj.usePrefixes = true;
			//graph_obj.autoMargins = true;
			//graph_obj.autoMarginOffset = 20;
			graph_obj.marginLeft = 200;
			graph_obj.marginRight = 50;
			graph_obj.startDuration = 1;
			graph_obj.categoryField = "category";
			graph_obj.rotate = true;
			graph_obj.colors = [ "#b83d88", "#aba714" ];
			graph_obj.categoryAxis = {
				autoWrap: true,
				gridPosition: "start",
				ignoreAxisWidth: true,
				centerLabels: true,
				axisColor: "#D1D1D1",
				axisThickness: 2,
				labelOffset: -5
				//tickLength: 0
			};
			graph_obj.valueAxes = [
				{
					id: "ValueAxis-1",
					stackType: "regular",
					minHorizontalGap: 150,
					axisColor: "#D1D1D1",
					axisThickness: 2,
					tickLength: 0
				}
			];
			
			graph_obj.legend = {
				enabled: true
			};
			graph_obj.balloon = {
				disableMouseEvents: false
			};
			graph_obj.graphs = [
				{
					balloonText: "[[title]]\n[[high]]",
					openField: "base",
					closeField: "high",
					fillAlphas: 1,
					id: "AmGraph-1",			
					type: "column",
					title:"High"
				},
				{
					balloonText: "[[title]]\n[[low]]",
					openField: "base",
					closeField: "low",
					fillAlphas: 1,
					id: "AmGraph-3",				
					type: "column",
					title:"Low"
				}
			];
			graph_obj.guides = [
				{
					above: true,
					id: "Guide-1",
					lineAlpha: 1,
					lineColor: "#000000",
					value: base_case_value
				}
			];
			
			var temp_array = new Array();
			var percentage = data_store.tornando_percentage / 100;
						
			for ( var i=0; i<options_array.length; i++ ) {
				
				if ( options_array[i].active ) {
					
					var this_base = engine.get_value( options_array[i].base_row, options_array[i].base_col );
					var this_low_value = this_base * ( 1 - percentage );
					var this_high_value = this_base * ( 1 + percentage );						
							
					var temp_obj = {
						category: options_array[i].title,
						base: base_case_value,
						low_per: this_low_value,
						low: engine.get_tornando_data( this_low_value, options_array[i].base_row, options_array[i].edit_col, base_case_row_id, base_case_col_id ),
						high_per: this_high_value,
						high: engine.get_tornando_data( this_high_value, options_array[i].base_row, options_array[i].edit_col, base_case_row_id, base_case_col_id )						 
					};
					
					temp_obj.spread = temp_obj.high - temp_obj.low;
					
					print( temp_obj.spread + ' / ' + temp_obj.high  + ' / ' + temp_obj.low );
					
					if ( temp_obj.spread != 0 ) {
						temp_array.push( temp_obj );				
						temp_obj = null;
					}
				}
				
			}
			
			temp_array.sort(function (a, b) {
			  if (a.spread > b.spread) {
			    return -1;
			  }
			  if (a.spread < b.spread) {
			    return 1;
			  }
			  // a must be equal to b
			  return 0;
			});
			
			if ( temp_array.length > 5 ) temp_array = temp_array.splice(0,5);
						
			graph_obj.dataProvider = temp_array;
			
			print( temp_array );
			
			engine.re_calculate();
			
		return graph_obj;
		
	};
	
	//SAVINGS GRAPH
	self.get_savings_graph = function ( ) {
		
		var year_array = engine.get_years_array();

		var annual_budget_impact = engine.get_multiple_values( [{ row: 265, col: 4 }, { row: 265, col: 5 }, { row: 265, col: 6 }, { row: 265, col: 7 }, { row: 265, col: 8 } ] );
		var cumulative_budget_impact = engine.get_multiple_values( [{ row: 266, col: 4 }, { row: 266, col: 5 }, { row: 266, col: 6 }, { row: 266, col: 7 }, { row: 266, col: 8 } ] );

		annual_budget_impact = engine.array_abs( annual_budget_impact );
		cumulative_budget_impact = engine.array_abs( cumulative_budget_impact );
		
		var amcharts_graph_obj = get_saving_graph_obj( year_array, annual_budget_impact, cumulative_budget_impact );
		
		var html = self.get_html_graph( amcharts_graph_obj );
	
		return html; 
		
	};
	
	self.get_html_graph = function ( graph_obj ) {
		
		var html='';
		
		html += '<html>\
					<head>\
						<link rel="stylesheet" href="includes/css/style.css" type="text/css">\
						<script src="includes/amcharts/js/amcharts.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/serial.js" type="text/javascript"></script>\
						<script src="includes/amcharts/js/xy.js" type="text/javascript"></script>';
		
		html += '<script type="text/javascript">\
					AmCharts.makeChart("chart_div",';
		
		
		html += JSON.stringify(graph_obj);
	
		html = html.replace( '"label_actual_function"', 'label_actual_function' );
		
		html += ');\
					</script>\
				</head>\
				<body>\
					<div id="chart_div" ></div>\
				</body>\
				</html>';		

		
		return html;							
		
	};
	
	
	function get_saving_graph_obj ( year_array, array_one, array_two ){
		
		var obj = {};
		
		obj.type = "serial";
		obj.categoryField = "category";
		obj.sequencedAnimation = false;
		obj.tapToActivate = false;
		obj.fontFamily = "GothamRounded-Bold";
		obj.usePrefixes = true;
		obj.plotAreaBorderColor = "#CCCCCC";	
		
		obj.categoryAxis = {
			axisColor: '#CCCCCC',
			axisAlpha: 0,
			gridAlpha: 0,
			color: '#362C28',
			gridThickness: 0,
			titleColor: '#362C28'
		};
		
		obj.legend = {
			enabled: true,
			color: "#362C28",
			top: 0,
			useGraphSettings: true,
			valueWidth: 0,
			equalWidths: false,
			position: 'top',
			align: 'right'
		};
		
		obj.valueAxes = [{		
			axisTitleOffset: 0,
			id: "ValueAxis-1",
			stackType: "3d",
			axisColor: "#CCCCCC",
			color: "#362C28",
			gridCount: 4,
			gridThickness: 2,
			tickLength: 0,
			title: "Savings (" + _default.cur + ")",
			titleBold: false,
			minVerticalGap: 20
		}];
		
		obj.graphs = [
			{
				balloonText: "[[value]]",
				columnWidth: 0.53,
				fillAlphas: 1,
				fillColors: "#B83D88",
				lineColor: "#B83D88",				
				lineAlpha: 1,
				lineThickness: 3,
				valueField: "column_1",
				type: 'column',
				title: 'Savings'
			},
			{
				balloonText: "[[value]]",
				columnWidth: 0.53,
				fillAlphas: 0,
				fillColors: "#B83D88",
				lineColor: "#382f2d",
				balloonColor: "#382f2d",
				bullet: "round",
				bulletBorderAlpha: 1,
				bulletBorderColor: "#FFFFFF",
				bulletColor: "#382f2d",
				bulletSize: 10,
				lineAlpha: 1,
				lineThickness: 3,
				valueField: "column_2",
				type: 'line',
				hidden: true,				
				title: 'Cumulative budget impact'
			}
		];
		
		var data_provider_array = create_data_provider_array( year_array, array_one, array_two );
				
		obj.dataProvider = data_provider_array;
		
		return obj;
		
	};
	
	function get_graph_obj ( graph_type, category_array, first_data_array, second_data_array, graph_title, size_type ) {
		
		var obj = {};
		
/*		obj.titles = [
			{
				id: "Title-1",
				size: 15,
				text: graph_title,
				color: '#362C28'
			}
		];
*/	
		obj.type = "serial";
		obj.categoryField = "category";
		obj.sequencedAnimation = false;
		obj.tapToActivate = false;
		obj.fontFamily = "GothamRounded-Bold";
		obj.usePrefixes = true;
		obj.plotAreaBorderColor = "#CCCCCC";	
		
		obj.categoryAxis = {
			axisColor: '#CCCCCC',
			axisAlpha: 0,
			gridAlpha: 0,
			color: '#362C28',
			gridThickness: 0,
			titleColor: '#362C28'
		};
		
		obj.legend = {
			enabled: true,
			color: "#362C28",
			top: 0,
			useGraphSettings: true,
			valueWidth: 0,
			equalWidths: false,
			position: 'top',
			align: 'right'
		};
		
		obj.valueAxes = [{		
			axisTitleOffset: 0,
			id: "ValueAxis-1",
			stackType: "3d",
			axisColor: "#CCCCCC",
			color: "#362C28",
			gridCount: 4,
			gridThickness: 2,
			tickLength: 0,
			title: "",
			titleBold: false,
			minVerticalGap: 20
		}];
		
		
		
		obj.graphs = [
			{
				balloonText: "[[value]]",
				columnWidth: 0.53,
				fillAlphas: 1,
				fillColors: "#D19C07",
				lineColor: "#D19C07",				
				lineAlpha: 1,
				lineThickness: 3,
				valueField: "column_1",
				type: graph_type
			},
			{
				balloonText: "[[value]]",
				columnWidth: 0.53,
				fillAlphas: 1,
				fillColors: "#B83D88",
				lineColor: "#B83D88",
				lineAlpha: 1,
				lineThickness: 3,
				valueField: "column_2",
				type: graph_type
			}
		];
		
		if ( graph_title == 'Market Scenario' ) {
			
			obj.graphs[1].newStack = true;
			
		}
			
		for ( var i=0; i< obj.graphs.length; i++ ) {
			
			if ( graph_type == 'column' ) {
				
				obj.graphs[i].lineAlpha = 0;
				obj.graphs[i].lineThickness = 3;
				
			} else {
				
				obj.graphs[i].fillAlphas = 0;
				
			}
			
		}
		
		if ( graph_type == 'column' ) {
				
			obj.graphs[0].title = "Total cost (competitors only)";
			obj.graphs[1].title = "Total cost (Basaglar)";
			
			if ( graph_title == 'Market Scenario' ) {
				obj.graphs[0].title = "Scenario: Annual budget imapct";
				obj.graphs[1].title = "Base case: Annual budget imapct";
			}
			
		} else {
			
			obj.graphs[0].title = "Lantus "+ graph_title;
			obj.graphs[1].title = "Basaglar "+ graph_title;
			
		}
		
		if ( size_type == 'small' ) {
			obj.valueAxes[0].fontSize = 4;
			obj.categoryAxis.fontSize = 4;
			obj.legend.enabled = false;
		}
					
		var data_provider_array = create_data_provider_array( category_array, first_data_array, second_data_array );
				
		obj.dataProvider = data_provider_array;
		
		return obj;
		
	};
	
	function create_data_provider_array ( category_array, first_data_array, second_data_array ) {
		
		var data_provider_array = new Array();
		
		for ( var i=0; i<category_array.length; i++ ) {
			
			var obj = {};
			
			obj.category = category_array[i];
			obj.column_1 = Math.round( first_data_array[i] );
			obj.column_2 = Math.round( second_data_array[i] );
					
			data_provider_array.push( obj );
					
		}
		
		return data_provider_array;
		
	};
	
	return self;
}

module.exports = this_class;