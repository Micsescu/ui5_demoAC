sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"

],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,History) {
		"use strict";

		return Controller.extend("sap.demo.demo.controller.View2", {
			onInit: function () {

				this.cartcount = 0;
				this.oCurrent = this.byId("CurrentValue");				
				this.oButton = this.byId("BadgedButton");			
				this.cartList = []	 
				
				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("RouteView2").attachPatternMatched(this.onRouteMatched, this);

			},		
		 
			onRouteMatched: function (oEvent) {
				let oArgs = oEvent.getParameter("arguments");
                let id = oArgs.ProductId; 
				let oModel = this.getOwnerComponent().getModel();
			
				this.oCurrent.setValue(0) 				 

				this.byId("smartForm")
				.bindElement({
					path: "/Products(" + id + ")" 
				 
				});
	
			},

			registerCart: function(){

				console.log("registerCart")
				this.cartcount = parseInt(this.oButton.getBadgeCustomData().getValue());

				console.log("cart items: ", this.cartcount)

				//model for count

				let ocartModel = new sap.ui.model.json.JSONModel({"CartCount": this.cartcount});
				this.getOwnerComponent().setModel(ocartModel, "CartCount");

				//store items
				let spath = this.byId("smartForm").getBindingContext().getPath() 
                let itemModel = this.getOwnerComponent().getModel().getProperty(spath);
				
				let cartobj = {}
				cartobj.item =  itemModel
				cartobj.no = this.oCurrent.getValue()
				if (cartobj.no > 0) {
					this.cartList.push(cartobj)
					console.log("cartList =", this.cartList)	 			
				}

			},
				

			onNavBack: function (oEvent) {				
			
				let oHistory = History.getInstance();
				let sPreviousHash = oHistory.getPreviousHash();
	
				if (sPreviousHash !== undefined) {
					this.registerCart();
					window.history.go(-1);
				} else {
				
					let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("RouteView1", true);
				}
			},

			currentChangeHandler: function() {
				let iCurrent = this.oCurrent.getValue(),
					oButtonBadgeCustomData = this.oButton.getBadgeCustomData(),
					sValue = iCurrent.toString();
	
				if (!oButtonBadgeCustomData) {
					return;
				}
				 
				 let value = iCurrent + this.cartcount					
				oButtonBadgeCustomData.setValue( value);
			},

			onCart: function() {

				this.registerCart()

				var oModel = new sap.ui.model.json.JSONModel(this.cartList);
				this.getOwnerComponent().setModel(oModel, "CartData");

				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				
				oRouter.navTo("RouteView3" );

			}
				
		});
	});
