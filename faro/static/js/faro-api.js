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
	
	/** 
	 * The url of the resource. 
	 * 
	 * @define {string} 
	 * */
	self.url = '';
	
	/**
	 * The primary key of the data model in
	 * the database.
	 * 
	 * @define {string}
	 */
	self.key = '';
		
	/**
	 * Add functions to call when save is done.
	 */
	self.saveDone = new Array();
	
	/**
	 * Add functions to call when save fails.
	 */
	self.saveFail = new Array();
	
	/**
	 * Saves the model into the database with the
	 * specified json string.
	 * 
	 * @param {string} json: json string
	 */
	self.save = function(json) {
		var jqXHR = $.ajax({
			type: 'POST',
			url: self.url,
			data: json,
		//	contentType: 'text/plain', 
		//	success: self.saveSuccess,
		//  error: self.saveError
		});
		parseDone(jqXHR, self.saveDone);
		parseFail(jqXHR, self.saveFail);
	};
		
	/**
	 * Updates the model in the database with the
	 * specified json string.
	 * 
	 * @param {string} json: json string
	 */
	self.update = function(json) {
		$.ajax({
			type: 'PUT',
			url: self.url + '/' + self.key,
			data: json,
			contentType: 'text/plain', 
			success: self.updateSuccess(data, textStatus, request),
		    error: self.updateError(request, textStatus)
		});
	};
	
	/**
	 * Loads the model from the database with the 
	 * specified id.
	 * 
	 * @param {string} id: id of data model in database
	 */
	self.load = function(id) {
		$.ajax({
			type: 'GET',
			url: self.url + '/' + id,
			contentType: 'text/plain',
			dataType: 'json',
			success: self.loadSuccess,
			error: self.loadError
		});
	};
	
	/**
	 * Removes the model from the database.
	 */
	self.remove = function() {
		$.ajax({
			type: 'DELETE',
			url: self.url + '/' + key,
			success: self.removeSucess(data, textStatus, request),
			error: self.removeError(request, textStatus)
		});
	};
	
	/**
	 * Override to provide an action on save success.
	 * 
	 * @param {object}       data: data returned from server
	 * @param {string} textStatus: status of request
	 * @param {object}    request: jqXHR object
	 */
	self.saveSuccess = function(data, textStatus, request) { };
	
	/**
	 * Override to provide an action on save error.
	 *  
	 * @param {object}       jqXHR: jqXHR object
	 * @param {string}  textStatus: error status
	 * @param {string} errorThrown: optional exception object
	 */
	self.saveError = function(request, textStatus, errorThrown) { };
	
	/**
	 * Override to provide an action on load success.
	 *  
	 * @param {object}       data: data returned from server
	 * @param {string} textStatus: status of request
	 * @param {object}    request: jqXHR object
	 */
	self.loadSuccess = function(data, textStatus, request) { };
	
	/**
	 * Override to provide an action on load error.
	 *  
	 * @param {object}       jqXHR: jqXHR object
	 * @param {string}  textStatus: error status
	 * @param {string} errorThrown: optional exception object
	 */
	self.loadError = function(request, textStatus, errorThrown) { };
	
	/**
	 * Override to provide an action on remove success.
	 *  
	 * @param {object}       data: data returned from server
	 * @param {string} textStatus: status of request
	 * @param {object}    request: jqXHR object
	 */
	self.removeSuccess = function(data, textStatus, request) { };
	
	/**
	 * Override to provide an action on remove error.
	 * 
	 * @param {object}       jqXHR: jqXHR object
	 * @param {string}  textStatus: error status
	 * @param {string} errorThrown: optional exception object
	 */
	self.removeError = function(request, textStatus, errorThrown) { };
	
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


