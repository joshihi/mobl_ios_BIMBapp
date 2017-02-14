function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Prescribing Information" } );
	
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
						width:700, height:50,
						font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: 'Prescribing information'.toUpperCase(),
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
			
			var button = Ti.UI.createButton({
				left: 0, top: 0,
				width: '100%', height: 60,
				backgroundColor: '#69c083',
				borderColor: '#76cc90',
				borderWidth: 6
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
				text: 'Launch Prescribing Information',
				left: 50, right: 10,
				width: Ti.UI.FILL, height: Ti.UI.FILL
			});
			button.add( button_image, button_text );
			main_container.add( button );	
			button.addEventListener( 'click', function() {
				
				var docViewer = Ti.UI.iOS.createDocumentViewer({
					url:'bibliography/PI.pdf'
				});
				docViewer.show({
				    animated: true
				});
				
			});	
			
			
		
/*			
		var html = settings.get_css();
		html += '<div class="pi">';
			html += '<div class="column left">';
				html += '<p>';
					html += '<strong>Presentation:</strong> Basaglar™▼ is a clear, colourless, sterile solution of 100 units/ml (equivalent to 3.64mg) insulin glargine (rDNA origin), available as either 3ml cartridge or 3ml KwikPen. Each cartridge/pen contains 300 units of insulin glargine in 3ml solution. Uses Treatment of diabetes mellitus in adults, adolescents, and children aged 2 years and above. <strong>Dosage and Administration:</strong> The dose regimen (dose and timing) should be individually adjusted. In patients with Type 2 diabetes mellitus, Basaglar™ can also be given together with orally active anti-diabetic medication. Basaglar™ has a prolonged duration of action, and should be administered once daily at any time, but at the same time each day. It should only be given by subcutaneous injection and should not be administered intravenously. Injection sites must be rotated within a given injection area from one injection to the next. Basaglar™ must not be mixed with any other insulin or diluted. When changing from another intermediate or long-acting insulin treatment regimen to Basaglar™, a change of the dose of the basal insulin may be required and the concomitant anti-diabetic treatment may need to be adjusted (dose and timing of additional regular insulins or fast-acting insulin analogues, or the dose of oral anti-diabetic medicinal products). Contra-indications Hypersensitivity to insulin glargine or any of the excipients. <strong>Warnings and Special Precautions:</strong> Basaglar™ is not the insulin of choice for the treatment of diabetic ketoacidosis. In case of insufficient glucose control, or tendency to hyper- or hypoglycemic episodes, other relevant factors must be reviewed before dose adjustment is considered. Transferring a patient to another type or brand of insulin should be done under strict medical supervision. Changes in strength, brand, type, origin, and/or method of manufacture may result in the need for a change in dose. In rare cases, insulin antibodies may necessitate dose adjustment. The time of occurrence of hypoglycemia may change when the insulin regimen is changed, depending on the action profile of the insulins used. Caution and intensified glucose monitoring are advised in patients for whom hypoglycemia might be of particular clinical relevance. Patients should be aware that warning symptoms of hypoglycemia may be changed, less pronounced, or absent in certain circumstances, including: markedly improved glycemic control; when hypoglycemia develops gradually; in the elderly; after transfer from animal to human insulin; autonomic neuropathy; long history of diabetes; psychiatric illness; use of certain medications such as beta-blockers. This may result in severe hypoglycemia. The prolonged effect of insulin glargine may delay recovery from hypoglycemia. If HbA1c is low, consider possibility of recurrent, unrecognised hypoglycemia. Adherence of the patient to the dose and dietary regimen, correct insulin administration, and awareness of hypoglycemia symptoms are essential to reduce risk of hypoglycemia. Factors increasing risk of hypoglycemia require particularly close monitoring and may necessitate dose adjustment. Intercurrent illness requires intensified monitoring. Testing for ketones and dose adjustment may be necessary. Patients with Type 1 diabetes must continue to consume at least small amounts of carbohydrate and must never omit insulin entirely. The cartridges should only be used in a pen recommended for the use with Lilly insulin cartridges. The insulin label must always be checked before each injection to avoid medication errors. Cases of cardiac failure have been reported when pioglitazone was used in combination with insulin. If the combination is used, patients should be observed for signs and symptoms of heart failure and pioglitazone discontinued if any deterioration occurs.';
				html += '</p>';
			html += '</div>';
			html += '<div class="column right">';
				html += '<p>';
					html += '<strong>Pregnancy and Lactation: </strong>No clinical data from controlled studies are available. Data from >1,000 pregnancy outcomes indicate no specific adverse effects of insulin glargine on pregnancy and no specific malformative nor feto/neonatal toxicity. The use of Basaglar™ may be considered during pregnancy, if necessary. Insulin requirements may decrease during the first trimester and generally increase during the second and third trimesters. Immediately after delivery, insulin requirements decline rapidly. Careful monitoring of glucose control is essential. <strong>Driving, etc:</strong> The patient’s ability to concentrate and react may be impaired as a result of hypo- or hyperglycemia, or visual impairment. This may constitute a risk in situations where these abilities are of special importance (eg, driving a car or operating machines). <strong>Undesirable Effects: </strong>Hypoglycemia is very common. Injection site reactions and lipohypertrophy are common. Immediate-type allergic reactions are rare, but may be life-threatening.';
				html += '</p>';
				html += '<p>';
					html += 'For full details of these and other side-effects, please see the <br/><span class="blue-text">Summary of Product Characteristics</span>';
				html += '</p>';
				html += '<p>';
					html += '<strong>Legal Category:</strong> POM<br/>';
					html += '<strong>Marketing Authorisation Numbers:</strong> EU/1/14/944/003 EU/1/14/944/007<br/>';
					html += '<strong>Basic NHS Cost:</strong> £35.28 - 5 X 3ml cartridges £35.28 - 5 X 3ml KwikPens<br/>';
					html += '<strong>Date of Preparation or Last Review:</strong> May 2015'; 
				html += '</p>';
				html += '<p>';
					html += '<strong>Full Prescribing Information is Available From:</strong> Eli Lilly and Company Limited, Lilly House, Priestley Road, Basingstoke, Hampshire, RG24 9NL <br/><strong>Telephone:</strong> Basingstoke (01256) 315 000 <br/><strong>E-mail:</strong> <a href="mailto:ukmedinfo@lilly.com">ukmedinfo@lilly.com</a> <br/><strong>Website:</strong> <a href="http://www.lillypro.co.uk">www.lillypro.co.uk</a>';
				html += '</p>';
				html += '<p>';
					html += 'Basaglar™ (insulin glargine) is a trademark of Eli Lilly and Company. <br/>KWIKPEN™ is a trademark of Eli Lilly and Company.';
				html += '</p>';
				html += '<div class="bottom_box">';
					html += '<p>';
						html += 'Adverse events should be reported. Reporting forms and further information can be found at: <br/><a href="http://www.mhra.gov.uk/yellowcard">www.mhra.gov.uk/yellowcard</a>';
					html += '</p>';
					html += '<p>';
						html += 'Adverse events and product complaints should also be reported to Lilly: Please call Lilly UK on <strong>01256 315 000.</strong>';
					html += '</p>';
				html += '</div>';
			html += '</div>';
		html += '</div>';
		
		var webview = Ti.UI.createWebView({
			width: "100%", height: "100%",		
			backgroundColor: "transparent", disableBounce: true, touchEnabled: false,
			html: html
		});	
		main_container.add (webview);
*/			
			
					
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	


////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	return self;
	
}

module.exports = this_class;