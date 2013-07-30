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
	var self = this;
	
	/******************************************************************
	 *                       Public Properties
	 ******************************************************************/
	
	/** 
	 * The url of the resource. 
	 * */
	self.url = '';
	
	/**
	 * Primary key of data model in database.
	 */
	self.key = '';
		
	/**
	 * Add functions to call for done events.
	 * 
	 * Functions can have the following arguments
	 * passed to them:
	 * 
	 * function(data, textStatus, request) { }
	 * @param {object}       data: data returned from server
	 * @param {string} textStatus: status of request
	 * @param {object}    request: jqXHR object
	 */
	 
	self.saveDone   = new Array();
	self.updateDone = new Array();
	self.loadDone   = new Array();
	self.removeDone = new Array();
	
	/**
	 * Add functions to call for fail events.
	 * 
	 * Functions can have the following arguments
	 * passed to them:
	 * 
	 * function(jqXHR, textStatus, errorThrown) { }
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
	 * 
	 * @param {string} json: json string
	 */
	self.save = function(json) {
		var jqXHR = $.ajax({ 
			type: 'POST', 
			url: self.url, 
			data: json,
			contentType: 'text/plain'
		});	
		parseDone(jqXHR, self.saveDone);
		parseFail(jqXHR, self.saveFail);
	};
		
	/**
	 * Updates model in database.
	 * 
	 * @param {string} json: json string
	 */
	self.update = function(json) {
		var jqXHR = $.ajax({
			type: 'PUT',
			url: self.url + '/' + self.key,
			data: json,
			contentType: 'text/plain'
		});
		parseDone(jqXHR, self.updateDone);
		parseFail(jqXHR, self.updateFail);
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
		$.ajax({
			type: 'DELETE',
			url: self.url + '/' + key
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
}


// CLEAN ME UP!
function UserModel() {
	var self = this;
	
	FaroModel.call(self);
	
	self.id = 'yo';
    	self.username = 'denneh';
    	self.first_name = 'dennis';
    	self.last_name = 'jor';
    	self.date_created = '';
    	self.events = new Array();
    
	// overrides
	self.key = self.id;
	self.url = 'http://api.jibely.com/users';
	var one = function() { alert("Save Error 1!"); };
	var two = function() { alert("Save Error 2!"); };
	self.saveFail.push(one);
	self.saveFail.push(two);
} 

UserModel.prototype = Object.create(FaroModel.prototype);
UserModel.prototype.constructor = UserModel;


