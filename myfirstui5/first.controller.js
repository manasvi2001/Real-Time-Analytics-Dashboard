sap.ui.controller("myfirstui5.first", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf myfirstui5.first
	 */
	onInit : function() {
		var oData = {
			"sensorDataChart" : [],
			"sensorDataTile" : {
				HumidityChange: "Up",
				HColor: "Good",
				Humidity: 0,
				MaxHumidity: Math.max(),
				MinHumidity: Math.min()
			}
		};
		
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(oData);
		sap.ui.getCore().setModel(oModel, "line");
		
		var pubnub = new PubNub({
			subscribeKey : "sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe"
		});

		pubnub.subscribe({
			channels : [ "pubnub-sensor-network" ]
		});

		pubnub.addListener({
			message : function(message) {
				var message = message.message;
//				console.log(message);
				if(oData.sensorDataChart.length>0) {
					if(message.timestamp == oData.sensorDataChart[oData.sensorDataChart.length-1].Timestamp) {
						return;
					}
				}
				oData.sensorDataChart.push({
					Temperature: message.ambient_temperature,
					Timestamp: message.timestamp
				});
				if(oData.sensorDataChart.length > 10) {
					oData.sensorDataChart.shift();
				}
				oData.sensorDataTile["HumidityChange"] = message.humidity>=oData.sensorDataTile["Humidity"] ? "Up" : "Down";
				oData.sensorDataTile["HColor"] = message.humidity>=oData.sensorDataTile["Humidity"] ? "Critical" : "Good";
				oData.sensorDataTile["Humidity"] = message.humidity;
				oData.sensorDataTile["MaxHumidity"] = message.humidity>=oData.sensorDataTile["MaxHumidity"] ? message.humidity : oData.sensorDataTile["MaxHumidity"];
				oData.sensorDataTile["MinHumidity"] = message.humidity<=oData.sensorDataTile["MinHumidity"] ? message.humidity : oData.sensorDataTile["MinHumidity"];
				oModel.refresh();
//				sap.ui.getCore().getModel('line').setData(sap.ui.getCore().getModel('line').getData().sensorData);
			}
		});
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf myfirstui5.first
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf myfirstui5.first
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf myfirstui5.first
 */
// onExit: function() {
//
// }
});