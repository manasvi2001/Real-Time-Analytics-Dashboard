sap.ui.jsview("myfirstui5.first", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstui5.first
	 */
	getControllerName : function() {
		return "myfirstui5.first";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstui5.first
	 */
	createContent : function(oController) {
		var oVizFramLine = new sap.viz.ui5.controls.VizFrame("idVizLine");
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [ {
				axis : 1,
				name : 'Timestamp',
				value : "{line>Timestamp}"
			} ],
			measures : [ {
				name : 'Temperature',
				value : "{line>Temperature}"
			} ],
			data : {
				path : "line>/sensorDataChart"
			}
		});
		
		var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			'uid':"valueAxis",
			'type':"Measure",
			'values':["Temperature"]
		});
		var oFeedCataAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			'uid':"categoryAxis",
			'type':"Dimension",
			'values':["Timestamp"]
		});
		
		oVizFramLine.addFeed(oFeedValueAxis);
		oVizFramLine.addFeed(oFeedCataAxis);
		oVizFramLine.setDataset(oDataset);
		oVizFramLine.setVizType('line');

//		var oChart = new sap.viz.ui5.Line({
//			width : "700px",
//			height : "500px",
//			animation : new sap.viz.ui5.types.Line_animation({
//				dataLoading : false,
//				dataUpdating : false
//			}),
//			title : {
//				visible : false,
//				text : 'Real Time Board'
//			},
//			legend : {
//				visible : false
//			},
//			dataset : oDataset
//		});
//
//		oChart.setModel('line');
		
		var oHumContent = new sap.suite.ui.commons.NumericContent("idHum",{
            indicator: "{line>/sensorDataTile/HumidityChange}",
            animateTextChange: false,
            value: "{line>/sensorDataTile/Humidity}",
            valueColor: "{line>/sensorDataTile/HColor}"
        });
		
		var oHumidityT = new sap.suite.ui.commons.GenericTile({
            header: "Humidity",
            tileContent: [
                new sap.suite.ui.commons.TileContent({
                    footer: "(in %)",
                    content: [
                    	oHumContent
                    ]
                })
            ]
        });
		
		var oRadContent = new sap.suite.ui.commons.NumericContent({
            indicator: "{line>/sensorDataTile/RadiationChange}",
            animateTextChange: false,
            value: "{line>/sensorDataTile/Radiation}",
            valueColor: "{line>/sensorDataTile/RColor}"
        });
		
        var oRadiationT = new sap.suite.ui.commons.GenericTile({
            header: "Radiation",
            tileContent: [
                new sap.suite.ui.commons.TileContent({
                    footer: "(in millirads/hr)",
                    content: [
                    	oRadContent
                    ]
                })
            ]
        });
        
        var oHumidity = new sap.m.CustomTile({
            content: [
                oHumidityT
            ]
        });
        var oRadiation = new sap.m.CustomTile({
            content: [
                oRadiationT
            ]
        });
        var oTileContainer = new sap.m.TileContainer({
            tiles: [
            	oHumidity,
            	oRadiation
            ]

        });
		
//		ambient_temperature
//		:
//		"21.39"
//		humidity
//		:
//		"85.8774"
//		photosensor
//		:
//		"846.02"
//		radiation_level
//		:
//		"199"
//		sensor_uuid
//		:
//		"probe-4383727d"
//		timestamp
//		:
//		1488441906

		var oPage = new sap.m.Page({
			title : "Line chart",
			content : [ oVizFramLine, oTileContainer ]
		});
		return oPage;
	}

});