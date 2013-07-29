/**
 * FaroModel
 * 
 * FaroModel provides a structure to save, update, load and remove 
 * model data. This class is meant to be extended.  The subclass
 * needs to set the url {string} property to the resource it plans to 
 * use. In addition, there are several success and error functions 
 * that need to be overridden for the save, load and remove methods.
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
	 * Saves the model data.
	 * 
	 * @param {string} json: json string
	 */
	self.save = function(json) {
		$.ajax({
			type: 'POST',
			url: self.url,
			data: json,
			contentType: 'text/plain', 
			success: self.saveSuccess(data, textStatus, request),
		    error: self.saveError(request, textStatus)
		});
	};
	
	/**
	 * Loads the model data.
	 * 
	 * @param {string} uuid: uuid of model
	 */
	self.load = function(uuid) {
		$.ajax({
			type: 'GET',
			url: self.url + '/' + uuid,
			contentType: 'text/plain',
			dataType: 'json',
			success: self.loadSuccess(data, textStatus, request),
			error: self.loadError(request, textStatus)
		});
	};
	
	/**
	 * Removes the model data.
	 * 
	 * @param {string} uuid: uuid of model
	 */
	self.remove = function(uuid) {
		$.ajax({
			type: 'DELETE',
			url: self.url + '/' + uuid,
			success: self.removeSucess(data, textStatus, request),
			error: self.removeError(request, textStatus)
		});
	};
	
	/**
	 * 
	 * @param {object} data:
	 * @param {string} textStatus:
	 * @param {object} request:
	 */
	self.saveSuccess = function(data, textStatus, request) { };
	
	/**
	 * 
	 * @param {object} request:
	 * @param {string} textStatus:
	 */
	self.saveError = function(request, textStatus) { };
	
	/**
	 * 
	 * @param {object} data:
	 * @param {string} textStatus:
	 * @param {object} request:
	 */
	self.loadSuccess = function(data, textStatus, request) { };
	
	/**
	 * 
	 * @param {object} request:
	 * @param {string} textStatus:
	 */
	self.loadError = function(request, textStatus) { };
	
	/**
	 * 
	 * @param {object} data:
	 * @param {string} textStatus:
	 * @param {object} request:
	 */
	self.removeSuccess = function(data, textStatus, request) { };
	
	/**
	 * 
	 * @param {object} request:
	 * @param {string} textStatus:
	 */
	self.removeError = function(request, textStatus) { };
}
