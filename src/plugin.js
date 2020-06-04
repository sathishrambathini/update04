
import Widget from './widget.js';
const _500Client = require('@500apps/500apps-web');

/**
 * @class Plugins - Which will download plugins and plugin details
 */
class Plugins {

    /**
     * Constructor 
     */
    constructor() { 
        this.userId = 2600;        // Store user id
        this.widgetCardDetails = {}; // Store plugin cards datails
        this.widgetData = {};   // Store plugins configuration data from apikey
        this.installedPlugins = [];// Store installed plugins
        this.configurePlugins = [];// Store market place plugins
        this.serverUrl = 'https://plugin.500apps.com/pv1'; // Store server url
        this.userKey = '';// Store user key to identify user
        this.userJSON = {}; // Store user JSON
    }

    /**
     * Initialization method (starting point)
     * @param {String} apiKey - Developer api key
     * @param {Object} userJSON - App login user details including name and email 
     */
    init(apiKey, userJSON) {
         
        if (document.getElementById('_500plugins_widget')) {
            // Append loader to DOM
            document.getElementById('_500plugins_widget').innerHTML = "<div style='border: 1px solid #ddd;height: 100%;width: 100%;text-align: center;padding-top: 30px;padding-bottom: 30px;'><div><img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' style='width: 75px;'></div></div>";
        }

        // Call 500apps utility setApiKey method to set api key
        _500Client.api.setApiKey(apiKey);
        
        // Call 500apps utility setServerURL method to set server url
        _500Client.rest.setServerURL(this.serverUrl);

         userJSON = JSON.stringify(userJSON);
        // Call 500apps utility data method to get userkey 
        return _500Client.rest.data(`getUserKey/${apiKey}?user_obj=${userJSON}`, {}, this.identifyUser, this.restFailure)
    }

    /**
     * Sets user key to identify at our side 
     * @param {String} key - User key
     */
    identifyUser(key) {
        // Store user key 
        _Plugins.userKey = key;

        // Get API key
        let apiKey = _500Client.api.getApiKey();

        // Call downloadPlugins method to get all plugins
        
        _Plugins.downloadPlugins(apiKey);
    }

    /**
     * Sets user json 
     * @param {Object} userJSON 
     */
    setUserJSON(userJSON) {

        // Store user JSON like name and email
        this.userJSON = userJSON;
    }

    /**
     * To download plugins that are configured by the developer in plugins.ly
     * @param {String} apiKey
     */
    downloadPlugins(apiKey) {

        // Rest call URL
        let url = `getActiveApps/${apiKey}`; 

        // Call 500apps utility data method to get developer configured plugins
        return _500Client.rest.data(url, {
            headers: {
                'Content-Type': 'application/json',
                'token' : _Plugins.userKey
              }
        }, this.filterPlugins, this.restFailure)
    }

    /**
     * Filter plugins by plugin status
     * @param {Array} widgetData 
     */
    filterPlugins(widgetData) {

        if (!(widgetData && widgetData.length > 0)) {

            // Return showInstalledPlugins method to render installed plugins in the UI
            return window._Plugins.widget.showInstalledPlugins(widgetData)
        }

        // Filter plugins to store installed plugins by the user
        window._Plugins.InstalledPlugins = widgetData.filter(plugins => {
            return plugins.status === 'Manage' 
        });

        // Filter plugins to store marketplace plugins
        window._Plugins.configurePlugins = widgetData.filter(plugins => {
            return plugins.status != 'Manage'
        });

        // Return showInstalledPlugins method to render installed plugins in the UI
        return window._Plugins.widget.showInstalledPlugins(window._Plugins.InstalledPlugins)
    }

    /**
     * To check plugin has been configured by user or not and call respective callbacks
     * @param {Number} pluginId -Plugin id
     * @param {String} status - Plugin status
     * @param {String} pluginName - Plugin name
     * @param {String} appType - Plugin app type
     */
    isPluginConfigured(pluginId, status, pluginName, appType) {
       
        if (status == 'Manage') {

            // Return initPlugin method to get plugin related cards 
            return this.initPlugin(pluginId);
        }
        if (appType !== "Oauth") { 

            // Rest call URL
            let url = `get/${pluginId}`;

            // Return 500apps utility data method to get plugin fields
            return _500Client.rest.data(url, {}, window._Plugins.widget.showModal, this.restFailure);
        }

        // Create object for user authorization
        let widgetData = {
            "pluginId": pluginId,
            "pluginName": pluginName,
            "apiKey": "_Plugins.apiKey"
        }

        // Return pluginAuthorization method to get authorization from the user
        return window._Plugins.widget.pluginAuthorization(widgetData);
    }

    /**
     * Add plugin to the user 
     * @param {Number} pluginId - Plugin Id
     * @param {String} formId - plugin fields form Id
     */
    addPlugin(pluginId, formId) {

        // Get plugin fields form by formId 
        let form = document.getElementById(formId)

        // To store fields values
        let fields = {};  
        for (let i = 0; i < form.length; i++) {
            fields[form.elements[i].value] = form.elements[i].value;
        }

        // If user Install the plugin then status is 'Manage'
        fields['status'] = 'Manage';

        // Rest call information
        let options = {
            "method": 'PUT',
            "headers": {
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify(fields)
        }

        // Rest call URL
        let url = `updateFields/${pluginId}/${window._Plugins.userId}`;

        // Call closeModal method to close a modal
        window._Plugins.widget.closeModal();

        // Call 500apps utility data method to add plugin to user
        return _500Client.rest.data(url, options, this.downloadPlugins, this.restFailure)
    }

    /**
     * Get plugin cards from server
     * @param {Number} pluginId
     */
    initPlugin(pluginId) {

        // Rest call URL to get plugin cards
        let url = `get_cards/${pluginId}`;

        // Call 500apps utility data method to get plugin cards 
        return _500Client.rest.data(url, {}, window._Plugins.widget.showPluginCards, this.restFailure)
    }

    /**
     * Get plugin card details from server 
     * @param {Number} pluginCardId
     * @param {Number} pluginId
     */
    getPluginCardDetails(pluginCardId, pluginId) {

        // Rest call URL
        let url = `get_data/${pluginCardId}/${window._Plugins.userId}/${pluginId}`;

        // Call 500apps utility data method to get plugin card details 
        return _500Client.rest.data(url, {}, this.filterPluginCardDetails, this.restFailure)
    }

    /**
     * Filter plugin card details to render in the DOM
     * @param {Object} widgetCardData
     */
    filterPluginCardDetails(widgetCardData) {

        if (widgetCardData) {
            let isStr = widgetCardData.is_str; // Store is string value

            // Store table or card headers into array 
            let pathArray = widgetCardData.path_array.split(",");//['first_name', 'last_name', 'email'];

            //{ 'properties': 'properties' };
            let objPath = (Object.entries(widgetCardData.obj_path).length === 0) && (widgetCardData.obj_path.constructor === Object) ? {} : JSON.parse(widgetCardData.obj_path.replace(/'/g, '"'));

            let pathObj = widgetCardData.path_obj;//[{ "properties.0.name": "properties.0.value" }, { "properties.1.name": "properties.1.value" }, { "properties.2.name": "properties.2.value" }];
            
            // Store is key value 
            let isKey = widgetCardData.is_key;

            // Parse plugin card details
            widgetCardData.json_obj = JSON.parse(widgetCardData.json_obj);
            
            // Store plugin card data
            let cardData = [];
            if (Array.isArray(widgetCardData.json_obj)) {

                // If card details are array assign to cardData
                cardData = widgetCardData.json_obj;
            } else {
                for (let h in objPath) l = h
                let t = " json." + h
                if (objPath[h] == "") {

                    // Store card data with [key,value] using loadash module
                    cardData = _(eval(t)).flatMap().value();
                }
                else {
                    // Store card data with [key,value] using loadash module
                    cardData = _(eval(t)).flatMap(_.property(objPath[h])).value();
                }
            }

            // Store card data after modifiations
            let finalCardData = [];
            for (let i = 0; i < cardData.length; i++) {
                let obj = {}
                if (isStr == 1) {
                    for (let k = 0; k < pathArray.length; k++) {

                        // Store card data with key value pair
                        obj[pathArray[k]] = cardData[i][pathArray[k]];
                    }
                } else {
                    for (let k = 0; k < pathArray.length; k++) {

                        // Store header key from pathObj
                        let pathKey;

                        for (var v in pathObj[k]) pathKey = v
                        // Store header key for checking purpose using loadash methods
                        let checkKey = _(cardData).flatMap(_.property(pathKey)).value();

                        // Store card details value by checking header key
                        obj[pathArray[k]] = (checkKey[i] === pathArray[k] || isKey) ? _(cardData).flatMap(_.property(pathObj[k][v])).value()[i] : "";
                    }
                }

                // Push modified object into finalCardData array
                finalCardData.push(obj)
            }

            return window._Plugins.widget.showPluginCardDetails(finalCardData);
        }
    }

    /**
     * Rest call failure
     * @param {*} response 
     */
    restFailure(response) {
        console.log('Rest call failed', response);
    }

}
(() => {
    window._Plugins = new Plugins();
    // Create instance for Widget class
    window._Plugins.widget = new Widget();

})();