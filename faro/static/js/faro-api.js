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
	 * Root url. 
	 */
	self.rootUrl = 'http://api.jibely.com';
	
	/**
	 * Primary key of data model in database.
	 */
	self.key = '';
	
	/**
	 * Data is new flag.
	 */
	self.isNew = '';
	
	/**
	 * Data was loaded from DB flag.
	 */
	self.isLoad = '';

	/**
	 * Data has changed flag. 
	 */
	self.isDirty = '';
	
	/**
	 * KO json object.
	 */
	self.koData = '';
		
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
	 *                          Setup
	 ******************************************************************/
	
	initialize();
	
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
				url: self.rootUrl + self.url, 
				data: ko.toJSON(self.koData),
				contentType: 'text/plain'
			});
			parseDone(jqXHR, self.saveDone);
			parseFail(jqXHR, self.saveFail);	
		} 
		else if (self.isDirty) {
			var jqXHR = $.ajax({
				type: 'PUT',
				url: self.rootUrl + self.url + '/' + self.key,
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
			url: self.rootUrl + self.url + '/' + id,
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
			url: self.rootUrl + self.url + '/' + self.key
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
	
	function initialize() {
		self.isNew = true;
		self.isDirty = true;
		self.isLoad = false;
	}
	
	/******************************************************************
	 *                    Done and Fail Functions
	 ******************************************************************/
	 
	 self.saveDone.push( function(data, textStatus, jqXHR) {
		 self.isNew = false;
		 self.isDirty = false;
		 self.isLoad = false;
		 console.log("Save " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.saveFail.push( function(jqXHR, textStatus, errorThrown) {
		 console.log("Save " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.updateDone.push( function(data, textStatus, jqXHR) {
		 self.isNew = false;
		 self.isDirty = false;
		 self.isLoad = false;
		 console.log("Update " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.updateFail.push( function(jqXHR, textStatus, errorThrown) {
		 console.log("Update " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.loadDone.push( function(data, textStatus, jqXHR) {
		 self.isNew = false;
		 self.isDirty = false;
		 self.isLoad = true;
		 console.log("Load " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.loadFail.push( function(jqXHR, textStatus, errorThrown) {
		 console.log("Load " + textStatus + " (code " + jqXHR.status + ")");
	 });
	 
	 self.removeDone.push( function(data, textStatus, jqXHR) {
		 self.isNew = true;
		 self.isDirty = true;
		 self.isLoad = false;
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
	
	/******************************************************************
	 *                          Setup
	 ******************************************************************/
	
	FaroModel.call(self); // Faro model inheritance
	initialize();
		
	/******************************************************************
	 *                     Property Overrides
	 ******************************************************************/

	self.url = '/users';
	
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
	 *                     Property Subscriptions
	 ******************************************************************/
    
   	self.userName.subscribe(makeDirty);
    self.firstName.subscribe(makeDirty);
    self.lastName.subscribe(makeDirty);
    
    self.koData = {
		username : self.userName, 
    	first_name : self.firstName,
    	last_name : self.lastName 		
    };
	
	/******************************************************************
	 *                    Done and Fail Functions
	 ******************************************************************/

	self.saveDone.push( function (data) { 
		self.id(data.id);
		self.date(data.date_created);	
		self.key = self.id();
	});
	
	self.loadDone.push( function(data) {
		item = data.object;
		self.id(item.id);
		self.date(item.date_created);
		self.userName(item.display_name);
	   	self.firstName(item.first_name);
	   	self.lastName(item.last_name);
	});	
	
	self.updateDone.push( function(data) {
		self.userName(data.display_name);
	   	self.firstName(data.first_name);
	   	self.lastName(data.last_name);
	});	
	
	self.removeDone.push( function() {
		self.id(undefined);
		self.date(undefined);
		self.userName(undefined);
	   	self.firstName(undefined);
	   	self.lastName(undefined);
	   	self.events.Clear();
	});	
	
	/******************************************************************
	 *                    Private Methods/Calls
	 ******************************************************************/
	
	if (self.id() !== undefined) {
		self.key = self.id();
	}
	
	if (data.display_name !== undefined) {
		self.userName(data.display_name);
	}
	
	function makeDirty() {
		if (self.isLoad === false) {
			self.isDirty = true;
		}
	}
	
	function initialize() {
		if (data === undefined)
			data = {};
	}
}
// Faro model inheritance
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
	
	/******************************************************************
	 *                          Setup
	 ******************************************************************/
	
	FaroModel.call(self);  // Faro model inheritance
	initialize();
	
	/******************************************************************
	 *                     Property Overrides
	 ******************************************************************/

	self.url = '/events';
	
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
	 *                     Property Subscriptions
	 ******************************************************************/
    
	self.name.subscribe(makeDirty);
	self.description.subscribe(makeDirty);
	self.ownerId.subscribe(makeDirty);
	
	self.koData = {
		name : self.name,
		description : self.description,
		owner_id : self.ownerId
	}
	
	/******************************************************************
	 *                    Done and Fail Functions
	 ******************************************************************/

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
		self.ownerId(data.owner_id);
	});	
	
	/******************************************************************
	 *                    Private Methods/Calls
	 ******************************************************************/
	
	if (self.id() != undefined) {
		self.key = self.id();
	}
	
	function makeDirty() {
		self.isDirty = true;
	}
	
	function initialize() {
		if (data === undefined)
			data = {};
	}
}
// Faro model inheritance
Event.prototype = Object.create(FaroModel.prototype);
Event.prototype.constructor = Event;


