import Templates from './template';
const Handlebars = require('handlebars');
const _500Client = require('@500apps/500apps-web');
/**
 * @class Widgets - Which will show plugins and plugin details in the UI
 */
export default class Widgets {

    /**
     * Append template to Selector
     * @param {String} template - Handlebars template
     * @param {Array} data - template data
     * @param {String} selector - div tag id
     */
    renderHtml(innerHtml, data, selector) {

        // Compile handlebar template
        let template = Handlebars.compile(innerHtml);

        // Send data array to compiled template  
        let resultTemplate = template({ "data": data });
        
        if (document.getElementById(selector)) {
            document.getElementById(selector).innerHTML = resultTemplate;
        }
    }

    /**
     * To show  plugins that are installed by the user from maketplace
     * @param {Array} pluginsData - Installed plugins array
     */
    showInstalledPlugins(pluginsData) {

        // To Check whether pluginsData parameter is available or not
        pluginsData = pluginsData ? pluginsData : window._Plugins.InstalledPlugins;

        // Store html to show installed plugins
        let innerHtml = Templates.installedPluginsTemplate(pluginsData);

        // Call renderHtml method to append Installed plugins html to selector
        return window._Plugins.widget.renderHtml(innerHtml, pluginsData, '_500plugins_widget')
    }

    /**
     * To show marketplace plugins
     * 
     */
    showMarketplacePlugins() {

        // Store html to show marketplace plugins 
        let innerHtml = Templates.marketplacePluginsTemplate(window._Plugins.configurePlugins);

        // Call renderHtml method to append marketplace plugins html to selector
        return window._Plugins.widget.renderHtml(innerHtml, window._Plugins.configurePlugins, '_500plugins_widget')
    }

    /**
    * Open Oauth child window to get authorization from user
    * @param {Object} widgetData
    */
    pluginAuthorization(widgetData) {

        //window.open(url,'popUpWindow','height=300,width=700,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
        window.open(`${window._Plugins.serverUrl}/Oauth?pluginId=${widgetData.pluginId}&apiKey=${_500Client.api.getApiKey()}&name=${widgetData.pluginName}&token=${_Plugins.userKey}`,'popUpWindow','height=500,width=700,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    
    }
 
    /**
     * To show plugin authorization fields in a modal
     * @param {Object} pluginFields - plugin authorization fields
     */
    showModal(pluginFields) {

        // Store plugin authorization fields 
        let fields = pluginFields ? JSON.parse(pluginFields.app_fields).fields : [];

        // Store html for modal
        let innerHtml  = Templates.authorizationModalTemplate(fields)

        // Call renderHtml method to show plugin authorization form in a modal
        return window._Plugins.widget.renderHtml(innerHtml, fields, 'modalFields')
    }

    /**
     * Close modal 
     */
    closeModal() {

        // Get modal by id and change style
        let modal = document.getElementById("_500plugins_modalid");
        modal.style.display = "none";
    }

    /**
     * To show plugin cards 
     * @param {Array} pluginCards - plugin cards array
     */
    showPluginCards(pluginCards) {

        // Store html for plugin cards
        let innerHtml = Templates.pluginCardsTemplate(pluginCards);

        // Call renderHtml method to append html to selector
        return window._Plugins.widget.renderHtml(innerHtml, pluginCards, '_500plugins_widget')
    }

    /**
     * To show plugin card data
     * @param {Array} resObj - Plugins card data
     */
    showPluginCardDetails(resObj) {
        
        // Store html table for plugins card data
        let innerHtml = Templates.cardDetailsTemplate(resObj);

        // Call renderHtml method to append html to selector
        return window._Plugins.widget.renderHtml(innerHtml, resObj, 'view_div')
    }
}