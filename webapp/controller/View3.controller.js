sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("sap.demo.demo.controller.View3", {
			onInit: function () {
				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("RouteView3").attachPatternMatched(this.onRouteMatched, this);
			},

			onRouteMatched: function (oEvent) {
				var oModel = this.getView().getModel("CartData");
				console.log("Tip: this is the cart data from privious screen: ", oModel)
	
			},


			onNavBack: function()
			{
				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1", true);
			}
	
		});
	});
