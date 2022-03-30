sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,Filter, FilterOperator) {
		"use strict";

		return Controller.extend("sap.demo.demo.controller.View1", {
			onInit: function () {
				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("RouteView1").attachPatternMatched(this.onRouteMatched, this);
			
			},		
			
			onRouteMatched: function (oEvent) {
				let ocartmodel = this.getOwnerComponent().getModel("CartCount");
			},
			selectionChange: function (oEvt) {
				let item = oEvt.getParameter('listItem'); // get the selected item
				let cxt = item.getBindingContext();
				let obj = cxt.getObject();
 				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);	
				oRouter.navTo("RouteView2", { ProductId: obj.ProductID} );
			},

			onCart: function() {
				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);				
				oRouter.navTo("RouteView3" );
			},
			onSearch: function(oEvent){
				let aFilters = [];
				let sQuery = oEvent.getSource().getValue();
				if (sQuery && sQuery.length > 0) {
					let filter = new Filter("ProductName", FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
	
				// update list binding
				let oList = this.byId("tableId");
				let oBinding = oList.getBinding("items");
				oBinding.filter(aFilters, "Application");
			}
	
		});
	});
