/**********************************************************************
 *                           FARO MODEL
 **********************************************************************
 *
 * FaroModel provides a structure to save, update, load and remove 
 * model data. This class is meant to be extended.  The subclass
 * needs to set the url {string} property to the resource it plans to 
 * use/modify. In addition, the done and fail call back functions need
 * to be added for subclasses.
 * 
 * Dependencies: 
 * 	- jQuery <http://code.jquery.com/jquery-latest.min.js>
 * 	- knockout <http://knockoutjs.com/>
 * 
 **********************************************************************/
function FaroModel() {
	var self = this;
		
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
	 * Data is new flag.
	 */
	self.isNew = '';

	/**
	 * Data has changed flag. 
	 */
	self.isDirty = '';
	
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
	 * function(data, textStatus, jqXHR) { }
	 * 
	 * @param {object}       data: data returned from server
	 * @param {string} textStatus: status of request
	 * @param {object}      jqXHR: jqXHR object
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
	 *                       Constructor
	 ******************************************************************/
	
	constructor = function(that) {
		that.isNew = true;
		that.isDirty = true;
	}(this)
	
	/******************************************************************
	 *                      Public Methods
	 ******************************************************************/
	
	/**
	 * Saves model into database.
	 */
	self.save = function() {
		if (self.isNew) {
			var jqXHR = $.ajax({ 
				type: 'POST', 
				url: self.url, 
				data: ko.toJSON(self.data),
				contentType: 'text/plain'
			});
			parseDone(jqXHR, self.saveDone);
			parseFail(jqXHR, self.saveFail);	
		} 
		else if (self.isDirty) {
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
			url: self.url + '/' + id,
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
		var jqXHR = $.ajax({
			type: 'DELETE',
			url: self.url + '/' + self.key
		});
		parseDone(jqXHR, self.removeDone);
		parseFail(jqXHR, self.removeFail);
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
	 *                    Done and Fail Functions
	 ******************************************************************/
	 
	 self.saveDone.push( function(data, textStatus, jqXHR) {
		 self.isNew = false;
		 self.isDirty = false;
		 console.log("Save " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.saveFail.push( function(jqXHR, textStatus, errorThrown) {
		 console.log("Save " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.updateDone.push( function(data, textStatus, jqXHR) {
		 self.isDirty = false;
		 console.log("Update " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.updateFail.push( function(jqXHR, textStatus, errorThrown) {
		 console.log("Update " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.loadDone.push( function(data, textStatus, jqXHR) {
		 self.isNew = false;
		 self.isDirty = false;
		 console.log("Load " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.loadFail.push( function(jqXHR, textStatus, errorThrown) {
		 console.log("Load " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.removeDone.push( function(data, textStatus, jqXHR) {
		 self.isDirty = false;
		 console.log("Remove " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.removeFail.push( function(jqXHR, textStatus, errorThrown) {
		 console.log("Remove " + textStatus + " (code " + jqXHR.status + ")");
	 });
}

/**********************************************************************
 *                           USER MODEL
 **********************************************************************
 *
 * Represents a user object from the database.
 * 
 * @param {object} data: object with user properties
 * 
 **********************************************************************/
function User(data) {
	var self = this;
	
	// inheritance
	FaroModel.call(self);
	
	/******************************************************************
	 *                     Property Overrides
	 ******************************************************************/

	self.url = 'http://api.jibely.com/users';
	
	/******************************************************************
	 *                    Observable Properties
	 ******************************************************************/
	
	self.id = ko.observable(data.id);
	self.date = ko.observable(data.date_created);
	self.userName = ko.observable(data.username);
   	self.firstName = ko.observable(data.first_name);
   	self.lastName = ko.observable(data.last_name);
   	self.events = ko.observableArray([]);
	
	/******************************************************************
	 *                      Observable Flag
	 *
	 * When these properties change, they flag the isDirty property so
	 * that save() actually updates (PUT) the data.
	 *                      
	 ******************************************************************/
    
	self.data = ko.computed( function() { 
		self.isDirty = true;
		return {
	    	username : self.userName, 
	    	first_name : self.firstName,
	    	last_name : self.lastName 
		};
	});
	
	/******************************************************************
	 *                    Done and Fail Functions
	 ******************************************************************/

	self.saveDone.push( function (data) { 
		self.id(data.id);
		self.date(data.date_created);	
		self.key = self.id();
	});
	
	self.loadDone.push( function(data) {
		self.id(data.id);
		self.date(data.date_created);
		self.userName(data.display_name);
	   	self.firstName(data.first_name);
	   	self.lastName(data.last_name);
	});	
	
	self.updateDone.push( function(data) {
		self.userName(data.display_name);
	   	self.firstName(data.first_name);
	   	self.lastName(data.last_name);
	});	
	
	/******************************************************************
	 *                    Private Methods/Calls
	 ******************************************************************/
	
	if (self.id() != undefined) {
		self.key = self.id();
	}
	
	if (data.display_name != undefined) {
		self.userName(data.display_name);
	}
}
// inheritance
User.prototype = Object.create(FaroModel.prototype);
User.prototype.constructor = User;

/**********************************************************************
 *                           EVENT MODEL
 **********************************************************************
 *
 * Represents an event object from the database.
 * 
 * @param {object} data: object with event properties
 * 
 **********************************************************************/
function Event(data) {
	var self = this;
	
	// inheritance
	FaroModel.call(self);
	
	/******************************************************************
	 *                     Property Overrides
	 ******************************************************************/

	self.url = 'http://api.jibely.com/events';
	
	/******************************************************************
	 *                    Observable Properties
	 ******************************************************************/
	
	self.parentId = ko.observable(data.parent_id);
	self.ownerId = ko.observable(data.owner_id);
	self.isTemplate = ko.observable(data.is_template);
	self.name = ko.observable(data.name);
	self.description = ko.observable(data.description);
	self.id = ko.observable(data.id);
	self.date = ko.observable(data.date_created);
	self.owner = data.owner;
	
	/******************************************************************
	 *                      Observable Flag
	 *
	 * When these properties change, they flag the isDirty property so
	 * that save() method actually updates (PUT) the data.
	 *                      
	 ******************************************************************/
    
	self.data = ko.computed( function() { 
		self.isDirty = true;
		return {
			name : self.name,
			description : self.description,
			is_template : self.isTemplate,
			owner_id : self.ownerId
		};
	});
	
	/******************************************************************
	 *                    Done and Fail Functions
	 ******************************************************************/

	// add properties created from save action to user
	self.saveDone.push( function (data) { 
		self.parentId(data.id);
		self.id(data.id);
		self.date(data.date_created);
		self.key = self.id();
	});
	
	self.loadDone.push( function(data) {
		self.parentId(data.parent_id);
		self.ownerId(data.owner_id);
		self.isTemplate(data.is_template);
		self.name(data.name);
		self.description(data.description);
		self.id(data.id);
		self.date(data.date_created);
	});	
	
	self.updateDone.push( function(data) {
		self.name(data.name);
		self.description(data.description);
		self.isTemplate(data.is_template);
		self.ownerId(data.owner_id);
	});	
	
	/******************************************************************
	 *                    Private Methods/Calls
	 ******************************************************************/
	
	if (self.id() != undefined) {
		self.key = self.id();
	}
}
// inheritance
Event.prototype = Object.create(FaroModel.prototype);
Event.prototype.constructor = Event;


