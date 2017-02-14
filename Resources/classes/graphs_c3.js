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
		
		var c3_obj = get_detailed_results_c3_obj( animation_bool, type );
			
		var html='';
		
		html += '<html>\
					<head>\
						<meta charset="utf-8">\
						<link href="includes/d3/style.css" rel="stylesheet" type="text/css">\
						<link href="includes/d3/c3.css" rel="stylesheet" type="text/css">\
						<script src="includes/d3/d3.v3.js"></script>\
    					<script src="includes/d3/c3.js"></script>';
		
		html += '</head>\
				<body>\
				<div id="chart" style="left:5%; width:92%;height:88%;"></div>';
		
		html += '<script type="text/javascript">\
					window.onload = function() {\
					var chart = c3.generate(';
					
		html += JSON.stringify( c3_obj.script );
		
		html += ');';
		
		html += 'setTimeout(function () { chart.load({  columns: ' + JSON.stringify( c3_obj.data ) + '}); }, 500);';
		html += 'var names = { Total: "Total cost if Basaglar™ not available", Lantus: "Total cost Lantus®", Basaglar: "Total cost Basaglar™" };';
		
		html += 'd3.select(".c3").insert("div",".chart").attr("class","legend").selectAll("span").data(["Total","Basaglar","Lantus"]).enter().append("span").append("li").attr("data-id",function(t){return t}).html(function(t){return"<span class=\'bullet\' style=\'background-color:"+chart.color(t)+"\'>&nbsp;</span>"+names[t]}).on("click",function(t){chart.toggle(t),this.classList.toggle("inactive")}),document.getElementById("chart").onclick=function(){chart.tooltip.hide()};';
		
		html += '};\
				</script>\
				</body>\
				</html>';		

		console.log( html );
		
		return html;
		
	};
	
	//TORNANDO GRAPH
	self.get_tornando_graph_html = function ( options_array ) { 
		
		var data_obj = get_tornando_amcharts_obj( options_array );
		
		var html = '';
		
		html += '<html>\
					<head>\
						<meta charset="utf-8">\
						<link href="includes/d3/style.css" rel="stylesheet" type="text/css">\
						<link href="includes/d3/c3.css" rel="stylesheet" type="text/css">\
						<script src="includes/d3/d3.v3.js"></script>';
		
		html += '</head>\
				<body>';
		
		html += '<script type="text/javascript">';
					
		html += 'var normal_value = ' + data_obj[0].higher + ';\
				var jsonData = '+ JSON.stringify( data_obj ) + ';\
				var data = jsonData;var padding_scale = 1.05;';
		
		html += 'function type(t){return t.higher=+t.higher,t}var margin={top:20,right:20,bottom:30,left:200},width=800-margin.left-margin.right,height=500-margin.top-margin.bottom,y=d3.scale.ordinal().rangeRoundBands([0,height],.1),x=d3.scale.linear().range([width,0]),yAxis=d3.svg.axis().scale(y).orient("left"),xAxis=d3.svg.axis().scale(x).ticks(6).orient("bottom"),svg=d3.select("body").append("svg").attr("width",width+margin.left+margin.right).attr("height",height+margin.top+margin.bottom).append("g").attr("transform","translate("+margin.left+","+margin.top+")");y.domain(data.map(function(t){return t.y_category})),x.domain([d3.max(data,function(t){return t.higher})*padding_scale,d3.min(data,function(t){return t.lower})/padding_scale]),svg.append("g").attr("class","y axis").call(yAxis),svg.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(xAxis),svg.selectAll(".bar").data(data).enter().append("rect").attr("class","bar").attr("y",function(t){return y(t.y_category)}).attr("height",y.rangeBand()).attr("x",function(t){return x(t.lower)}).attr("width",function(t){return x(t.higher)-x(t.lower)}).style("fill",function(t){return t.color}),svg.append("line").style("stroke","black").attr("x1",function(t){return x(normal_value)}).attr("y1",0).attr("x2",function(t){return x(normal_value)}).attr("y2",height);';		
		
		html += 'svg.select("g").attr("class", "y axis").attr("transform", "translate(0,0)").call(yAxis).selectAll(".tick text").attr("transform", "translate(-10,0)").call(wrap, 150);';
		html += "function wrap(text, width) {text.each(function() {var text = d3.select(this),words = text.text().split(/\\s+/).reverse(),word,line = [],lineNumber = 0,lineHeight = 1.1,y = text.attr('y'),dy = parseFloat(text.attr('dy')),tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');while (word = words.pop()) {line.push(word);tspan.text(line.join(' '));if (tspan.node().getComputedTextLength() > width) {line.pop();tspan.text(line.join(' '));line = [word];tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);}}});}";

		html += '</script>\
				</body>\
				</html>';		

		console.log( html );
		
		return html;
		
	};
	
	function get_detailed_results_c3_obj ( animation_bool, type ) {
		
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
		
		var years_array = engine.get_years_array();
			
		var columns_array = new Array();
		
		years_array.unshift( "x" );
		alternative_market_array.unshift( "Total" );
		total_cost_lantus_array.unshift( "Lantus" );
		total_cost_basaglar_array.unshift( "Basaglar" );
		
		columns_array.push( years_array );
		columns_array.push( alternative_market_array );	
		columns_array.push( total_cost_lantus_array );
		columns_array.push( total_cost_basaglar_array );
		
		var c3_obj = {};
		c3_obj.script = 
			{
	           "bindto": "#chart",
	            	"data": {
	                "x": "x",
	                "columns": columns_array,
	                "type": "bar",
	                "names": {
	                    "Total": "Total cost if Basaglar™ not available",
	                    "Lantus": "Total cost Lantus®",
	                    "Basaglar": "Total cost Basaglar™"
	                },
	                "groups": [ 
						[ "Lantus", "Basaglar" ]
					]
	            },
	            "zoom": {
	                "enabled": false
	            },
	            "subchart": {
	                "show": false
	            },
	            "color": {
	                "pattern": ["#DDDDB2", "#ABA714", "#B83D88" ]
	            },
	            "grid": {
	                "x": {
	                    "show": false
	                },
	                "y": {
	                    "show": true,
	                    "lines": []
	                }
	            },
	            "axis": {
	                "x": {
	                    "label": "",
	                    "type": "category"
	                },
	                "y": {
	                    "label": {
							"text" : "Cost (" + _default.cur + ")",
							"position": "outer-middle"
						}
	                }
	            },
	            "legend": {
					"show": false
				}
	      };
      	
		c3_obj.data = columns_array;
										
		return c3_obj;
		
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
					
					console.log( 'RESULTS IDS ' + base_case_row_id + " / " + base_case_col_id );
					
					temp_obj.spread = temp_obj.high - temp_obj.low;
					
//					console.log( options_array[i].title );
//					console.log( temp_obj.spread + ' / ' + temp_obj.high  + ' / ' + temp_obj.low );
					
					//if ( temp_obj.spread != 0 ) {
						temp_array.push( temp_obj );				
						temp_obj = null;
					//}
				}
				
			}
			
			temp_array.sort(function (a, b) {
			  if (a.spread > b.spread) {
			    return -1;
			  }
			  if (a.spread < b.spread) {
			    return 1;
			  }
			  return 0;
			});
			
			if ( temp_array.length > 5 ) temp_array = temp_array.splice(0,5);
						
			engine.re_calculate();
/*	 STRUCTURE NEEDED	
			var jsonData=[
			 {"y_category": "A", "higher": 50,"lower": 2, "color": "#ABA714"  },
			 {"y_category": "A", "higher": 55,"lower": 50, "color": "#B83D88"  },
			 {"y_category": "B", "higher": 60,"lower": 50, "color": "#B83D88"  },
			 {"y_category": "C", "higher": 100,"lower": 50, "color": "#B83D88"  },
			
			]
*/			
			var jsonData = new Array();
			
			console.log( temp_array );
		
			
			for( var i=0; i<temp_array.length; i++ ) {
				jsonData.push( { y_category: temp_array[i].category, lower: temp_array[i].low, higher: base_case_value, color: "#ABA714" } );
				jsonData.push( { y_category: temp_array[i].category, lower: base_case_value, higher: temp_array[i].high, color: "#B83D88" } );
			};
	
		console.log( 'TORNANDO' );
		console.log( jsonData );
	
		return jsonData;
		
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
						<meta charset="utf-8">\
						<link href="includes/d3/style.css" rel="stylesheet" type="text/css">\
						<link href="includes/d3/c3.css" rel="stylesheet" type="text/css">\
						<script src="includes/d3/d3.v3.js"></script>\
    					<script src="includes/d3/c3.js"></script>';
		
		html += '</head>\
				<body>\
				<div id="chart" style="margin-left:-20px; width:98%;height:88%;"></div>';
		
		html += '<script type="text/javascript">\
					window.onload = function() {\
					var chart = c3.generate(';
					
		html += JSON.stringify( graph_obj.script );
		
		html += ');';
		
		html += 'setTimeout(function () { chart.load({  columns: ' + JSON.stringify( graph_obj.data ) + '}); }, 500);';
		
		html += 'var names = { Savings: "Savings", Cumulative: "Cumulative budget impact®" };';
		
		html += 'd3.select(".c3").insert("div", ".chart").attr("class", "legend").selectAll("span").data(["Savings", "Cumulative"]).enter().append("span").append("li").attr("data-id", function(id) { return id; }).html(function(id) { return "<span class=\'bullet\' style=\'background-color:" + chart.color(id) + "\'>&nbsp;</span>" + names[id]; }).on("click", function(id) { chart.toggle(id); this.classList.toggle("inactive"); });';
		
		html += 'chart.toggle("Cumulative");\
				document.querySelectorAll(\'[data-id="Cumulative"]\')[0].classList.toggle("inactive");';
			
		html += '};\
				</script>\
				</body>\
				</html>';	

		
		return html;							
		
	};
	
	
	function get_saving_graph_obj ( years_array, array_one, array_two ){
			
		var columns_array = new Array();
		
		years_array.unshift( "x" );
		array_one.unshift( "Savings" );
		array_two.unshift( "Cumulative" );
		
		columns_array.push( years_array );
		columns_array.push( array_one );	
		columns_array.push( array_two );
		
		var c3_obj = {};
		c3_obj.script = {
            "bindto": "#chart",
            "data": {
                "x": "x",
                "columns": columns_array,
                "type": "bar",
				"types": {
					"Cumulative": "line"
				},
                "names": {
                    "Savings": "Savings",
                    "Cumulative": "Cumulative budget impact®"
                },
                "groups": [ 
					[ "Savings", "Cumulative" ]
				]
            },
            "zoom": {
                "enabled": false
            },
            "subchart": {
                "show": false
            },
            "color": {
                "pattern": ["#B83D88", "#000000" ]
            },
            "grid": {
                "x": {
                    "show": false
                },
                "y": {
                    "show": true,
                    "lines": []
                }
            },
            "axis": {
                "x": {
                    "label": "",
                    "type": "category"
                },
                "y": {
                    "label": {
						"text" : "Saving (" + _default.cur + ")",
						"position": "outer-middle"
					}
                }
            },
            "legend": {
				"show": false
			},
/*			"legend": {
				"position": "inset",
				"inset": {
					 "anchor": 'top-right',
					  "x": 10,
					  "y": -25,
					  "step": 1
				  }
			},
*/			"padding": {
				"top": 20
				//"left": 60
			}
       };
		c3_obj.data = columns_array;
		
		return c3_obj;
		
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