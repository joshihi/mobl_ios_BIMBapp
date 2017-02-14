function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"References" } );
	
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
						text: 'References'.toUpperCase(),
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );			
		
		//MAIN
			
		var main_container = Ti.UI.createScrollView({
			width: 912,
			height: Ti.UI.FILL,
			left:56,
			top:130,
			backgroundColor: settings.get_color( 'white' ),
			layout: 'vertical'
		});
		self.container.add( main_container );
		
		var buttons = [
					{'id':  1, title: 'Biosimilars FDA 2015', document: '2015_Biosimilars_FDA.pdf' },
					{'id':  1, title: 'Belvins 2015', document: 'Belvins_2015.pdf' },
					{'id':  1, title: 'Blevins et al 2015 Diabetes, Obesity and Metabolism', document: 'Blevins_et_al-2015-Diabetes,_Obesity_and_Metabolism.pdf' },
					{'id':  1, title: 'Declerck 2012', document: 'Declerck_2012.pdf' },
					{'id':  1, title: 'EMA assessment report 2014', document: 'EMA_assessment_report_2014.pdf' },
					{'id':  1, title: 'EMA draft guideline on similar biological medicinal products 2013', document: 'EMA_draft_guideline_on_similar_biological_medicinal_products_2013.pdf' },
					{'id':  1, title: 'Wilkins 2014', document: 'Wilkins_2014.pdf' },
					{'id':  1, title: 'Sharma 2007', document: 'Sharma.pdf' },
					{'id':  1, title: 'Schellekens 2002', document: 'Schellekens.pdf' },
					{'id':  1, title: 'Rosenstock 2015', document: 'Rosenstock_et_al-2015-Diabetes,_Obesity_and_Metabolism.pdf' },
					{'id':  1, title: 'Rosenstock 2000', document: 'Rosenstock_2000.pdf' },
					{'id':  1, title: 'Ratner 2000', document: 'Ratner_2000.pdf' },
					{'id':  1, title: 'Raskin 2000', document: 'Raskin_2000.pdf' },
					{'id':  1, title: 'Porcellati 2003', document: 'Porcellati_2003.pdf' },
					{'id':  1, title: 'Pieber 2000', document: 'Pieber_2000.pdf' },
					{'id':  1, title: 'Owens 2012', document: 'Owens_2012.pdf' },
					{'id':  1, title: 'Mellstedt 2007', document: 'Mellstedt_2007.pdf' },
					{'id':  1, title: 'Hollander EASD 2014', document: 'Hollander_EASD_2014.pdf' },
					{'id':  1, title: 'Hershon 2004', document: 'Hershon_2004.pdf' },
					{'id':  1, title: 'EMA guideline devt insulin', document: 'EMA_guideline_devt_insulin.pdf' },
					{'id':  1, title: 'EMA guideline biotechnology', document: 'EMA_guideline_biotechnology.pdf' }
			  ];
		
		buttons.sort(function(a, b) {
		  var nameA = a.title.toUpperCase(); // ignore upper and lowercase
		  var nameB = b.title.toUpperCase(); // ignore upper and lowercase
		  if (nameA < nameB) {
		    return -1;
		  }
		  if (nameA > nameB) {
		    return 1;
		  }
		
		  // names must be equal
		  return 0;
		});
		
		for ( var i=0; i< buttons.length; i++ ) {
			buttons.id = i;
		}
			  
		var top = -62;
		for(var i = 0, x = buttons.length; i < x; i++) {
			//top = i % 2 == 0 ? top + 68 : top;  
			top = 10;
			left = '8%';
//			left = i % 2 == 0 ? 0 + 77 : 388 + 77;
//			Ti.API.info('i: ' + i + ' id: ' + buttons[i].id + ' top: ' + top + ' left: ' + left);
			var button = Ti.UI.createButton({
				left: left, top: top,
				width: '82%', height: 60,
				backgroundColor: '#69c083',
				borderColor: '#76cc90',
				borderWidth: 6,
				id: i,
				document: buttons[i].document
			});
			var button_image = Ti.UI.createImageView({
				width: 14, height: 18,
				left: 20,
				image: 'includes/images/doc_icon_white.png'
			});
			var button_text = Ti.UI.createLabel({
				font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Medium' ) },
				color: settings.get_color( 'white' ),
				//text: buttons[i].id + ' ->' + buttons[i].title,
				text: buttons[i].title,
				left: 50, right: 10,
				width: Ti.UI.FILL, height: Ti.UI.FILL
			});
			button.add( button_image, button_text );
			main_container.add( button );	
			button.addEventListener( 'click', button_clicked );	
		}
		
		var spacer = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: 40,
			left:0,
			top:0
		});
		main_container.add( spacer );
				
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function button_clicked (e) {
		Ti.API.info(e.source.id);
		Ti.API.info(e.source.document);
		docViewer = Ti.UI.iOS.createDocumentViewer({
			url:'bibliography/' + e.source.document
		});
		docViewer.show({
		    	//view:navButton, 
		    	animated: true
		    });
/*
		navButton.addEventListener('click', function(){
		    docViewer.show({
		    	view:navButton, 
		    	animated: true
		    });
		});
		docViewer.show();
*/
	}

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	return self;
	
}

module.exports = this_class;