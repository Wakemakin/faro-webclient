/**
 * FaroModel
 * 
 * FaroModel provides a structure to save, update, load and remove 
 * model data. This class is meant to be extended.  The subclass
 * needs to set the url {string} property to the resource it plans to 
 * use/modify. In addition, there are several success and error functions 
 * that need to be overridden for the save, update, load and remove methods.
 * 
 * @constructor
 */
function FaroModel() {
	
	/******************************************************************
	 *                       Private Properties
	 ******************************************************************/
	var self = this;
	var isNew = true;
	
	/******************************************************************
	 *                       Public Properties
	 ******************************************************************/
	
	/** 
	 * Url of resource. 
	 */
	self.url = '';
	
	/**
	 * Primary key of data model in database.
	 */
	self.key = '';

	/**
	 * Data changed flag. 
	 */
	self.isDirty = true;
	
	/**
	 * KO json object.
	 */
	self.data = '';
		
	/**
	 * Add call functions to arrays for server action
	 * done events.
	 * 
	 * Functions can have the following arguments
	 * passed to them:
	 * 
	 * function(data, textStatus, request) { }
	 * 
	 * @param {object}       data: data returned from server
	 * @param {string} textStatus: status of request
	 * @param {object}    request: jqXHR object
	 */
	 
	self.saveDone   = new Array();
	self.updateDone = new Array();
	self.loadDone   = new Array();
	self.removeDone = new Array();
	
	/**
	 * Add call functions to arrays for server action
	 * fail events.
	 * 
	 * Functions can have the following arguments
	 * passed to them:
	 * 
	 * function(jqXHR, textStatus, errorThrown) { }
	 * 
	 * @param {object}       jqXHR: jqXHR object
	 * @param {string}  textStatus: error status
	 * @param {string} errorThrown: optional exception object
	 */
	self.saveFail   = new Array();
	self.updateFail = new Array();
	self.loadFail   = new Array();
	self.removeFail = new Array();
	
	/******************************************************************
	 *                       Public Methods
	 ******************************************************************/
	
	/**
	 * Saves model into database.
	 */
	self.save = function() {
		if (isNew) { // save
			var jqXHR = $.ajax({ 
				type: 'POST', 
				url: self.url, 
				data: ko.toJSON(self.data),
				contentType: 'text/plain'
			});
			parseDone(jqXHR, self.saveDone);
			parseFail(jqXHR, self.saveFail);
			parseDone(jqXHR, function() { isNew = false; });		
		} 
		
		if (isDirty) { // update
			var jqXHR = $.ajax({
				type: 'PUT',
				url: self.url + '/' + self.key,
				data: self.json,
				contentType: 'text/plain'
			});
			parseDone(jqXHR, self.updateDone);
			parseFail(jqXHR, self.updateFail);
		}
	};
	
	/**
	 * Loads model from database.
	 * 
	 * @param {string} id: id of data model in database
	 */
	self.load = function(id) {
		var jqXHR = $.ajax({
			type: 'GET',
			url: self.url + '/' + self.id,
			contentType: 'text/plain',
			dataType: 'json'
		});
		parseDone(jqXHR, self.loadDone);
		parseFail(jqXHR, self.loadFail);
	};
	
	/**
	 * Removes model from database.
	 */
	self.remove = function() {
		$.ajax({
			type: 'DELETE',
			url: self.url + '/' + self.key
		});
		parseDone(jqXHR, self.removeDone);
		parseFail(jqXHR, self.reomveFail);
	};
	
	/******************************************************************
	 *                       Private Methods
	 ******************************************************************/
	
	function parseDone(jqXHR, dones) {
		for (var i = 0; i < dones.length; i++) {
			jqXHR.done(dones[i]);
		}
	}
	
	function parseFail(jqXHR, fails) {
		for (var i = 0; i < fails.length; i++) {
			jqXHR.fail(fails[i]);
		}
	}
	
	/******************************************************************
	 *                       Done and Fail Functions
	 ******************************************************************/
	 
	 self.saveDone.Push(function() {
	 	isNew = false;
	 	self.isDirty = false;
	 });
	 
	 self.updateDone.Push(function() {
	 	self.isDirty = false;		
	 });
}


// CLEAN ME UP!
function UserM() {
	var self = this;
	
	// Inheritance
	FaroModel.call(self);
	
	self.id = ko.observable();
	self.date = ko.observable();
    	self.username = ko.observable();
   	self.firstname = ko.observable();
   	self.lastname = ko.observable();
    	self.events = ko.observableArray([]);
  
	// overrides
    	self.data = ko.computed( function() { 
    		self.isDirty = true;
    		return {
		    	username : self.username, 
		    	first_name : self.firstname,
		    	last_name : self.lastname 
    		};
    	};
	self.key = self.id();
	self.url = 'http://api.jibely.com/users';
	var saveError = function() { console.log("Save Error!"); };
	self.saveFail.push(saveError);
	var saveSuccess = function (object) { console.log(object); };
	self.saveDone.push(saveSuccess);
}
// Inheritance
UserM.prototype = Object.create(FaroModel.prototype);
UserM.prototype.constructor = UserM;


