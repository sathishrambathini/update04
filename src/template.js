// TODO: Templates class will be removed after we get template from server
/**
 * @class Templates
 */
export default class Templates {

    /**
     * Build Installed plugins template
     * @param {Array} pluginsData - Installed plugins array
     */
    static installedPluginsTemplate(pluginsData) {

        if (!(pluginsData && pluginsData.length > 0)) {
            // Return html if plugins are not available
            return innerHtml = `<p>No Plugins are available</p>`;
        }

        // Return installed plugins template
        //return `<div style='border: 1px solid #ddd;background:"${window._Plugins.widgetData.properties.background_check}";height: 100%;width: 100%;background-repeat: no-repeat;background-size: cover;overflow: auto;background-position: center;padding-top: 20px;padding-bottom: 20px;\'>              
        return `<div style='border: 1px solid #ddd;background:"c";height: 100%;width: 100%;background-repeat: no-repeat;background-size: cover;overflow: auto;background-position: center;padding-top: 20px;padding-bottom: 20px;\'>
          <div class="d-flex">
                        <div class="flex-grow-1 pl-4" >
                            <span style="font-size: 25px;color: #847971db;font-family: monospace;">Plugins</span>
                        </div>
                    <div>
                <span class="mr-4" data-toggle="tooltip" data-placement="top" title="Add from marketplace" style="cursor:pointer;" onclick="window._Plugins.widget.showMarketplacePlugins()"><i class="fa fa-plus" aria-hidden="true"></i></span>
                </div>
            </div>
            <div id="mainbox">
            {{#each data}}
                <div style="cursor:pointer;" class="card" data-toggle="tooltip" data-placement="top" title="{{app_name}}" onclick="window._Plugins.isPluginConfigured({{app_id}},'{{app_name}}','{{app_name}}','{{auth_typ}}')">
                <div style="height: 100%;"><img src="{{app_logo_url}}" style="height: 100%;width: 70%;border-radius: 50% !important;">{{app_name}}</div>
                </div>
            {{/each}}
            </div>
            </div>`
    }

    /**
     * Build marketplace plugins template
     * @param {Array} marketplacePlugins - marketplace plugins array 
     */
    static marketplacePluginsTemplate(marketplacePlugins) {
        if (!(marketplacePlugins && marketplacePlugins.length > 0)) {

            // Return html if marketplace plugins are not available
            return `<p>No Plugins are available</p>`;
        }

        // Return marketplace plugins template
        //return `<div style='border: 1px solid #ddd;background:"${window._Plugins.widgetData.properties.background_check}";height: 100%;width: 100%;background-repeat: no-repeat;background-size: cover;overflow: auto;background-position: center;padding-top: 20px;padding-bottom: 20px;\'>
        return `<div style='border: 1px solid #ddd;background:"";height: 100%;width: 100%;background-repeat: no-repeat;background-size: cover;overflow: auto;background-position: center;padding-top: 20px;padding-bottom: 20px;\'>  
        <div id="modalFields"></div>
                        <div class="d-flex">
                            <div class="flex-grow-1 pl-4">
                            <span style="font-size: 25px;color: #847971db;font-family: monospace;">Marketplace</span>
                        </div>
                        <div>
                        <span class="mr-4" style="cursor:pointer;" data-toggle="tooltip" data-placement="top" title="Close"
                            onclick="window._Plugins.widget.showInstalledPlugins()"><i class="fa fa-times"
                                aria-hidden="true"></i></span>
                        </div>
                    </div>
                    <div id="mainbox">
                        {{#each data}}
                            <div style="cursor:pointer;" class="card">
                                <div style="height: 70%;" data-toggle="tooltip" data-placement="top" title="{{app_name}}"><img src="{{app_logo_url}}"
                                style="height: 100%;width: 70%;border-radius: 50% !important;"></div>
                                <div style="text-align: center;margin-top: 22px;background:" #e6e2e27a";padding: 12px;margin-left:-10px;margin-right: -10px;color: #000;cursor: pointer;" onclick="window._Plugins.isPluginConfigured({{app_id}},'{{status}}','{{app_name}}','{{auth_type}}')">{{app_name}}</div>
                            </div>
                        {{/each}}
                        </div>
                    </div>`
    }

    /** 
     * Build authorization modal template
     * @param {Object} fields - plugin authorization fields
     */
    static authorizationModalTemplate(fields) {
        if (!(fields && fields.length > 0)) {

            // Return html if fileds are empty
            return `<p>No form available</p>`;
        }

        // Return authorization modal template
        return `<div id="_500plugins_modalid" class="_500plugins_modal">
        <div class="_500plugins_modal-content">
          <span class="_500plugins_close" onclick="window._Plugins.widget.closeModal()">&times;</span>
                <div style='background:"${window._Plugins.widgetData.properties.background_check}";height: 100%;width: 100%;background-repeat: no-repeat;background-size: cover;overflow: auto;background-position: center;padding-top: 20px;padding-bottom: 20px;\'>
                    <div style="left: 3.2%;"><span style="font-size: 30px;color: #676363db;">${window._Plugins.pluginName}</span></div>
                    <div class="form-style-2" style="margin: auto;">
                            <form action="" id="widgetApp">
                                {{#each data}}
                                    <div><label for="field2"><span>{{label}}<span class="required"> *</span></span>
                                        <input type="{{type}}" class="input-field" name="{{name}}" value="" />
                                    </label></div>
                                    {{/each}}
                                </form>
                            </div>
                        </div>
                            <div class="modal-footer">
                                <button style="display: inline-block;padding: 5px 17px; font-size: 15px;cursor: pointer;text-align: center;text-decoration: none;outline: none;color: #fff;background-color: deepskyblue;border: none;border-radius: 15px;margin-left: 377px;" onclick="window._Plugins.addPlugin(${window._Plugins.pluginId},'widgetApp')">Add</button>
                                <button style="display: inline-block;padding: 5px 17px;font-size: 15px;cursor: pointer;text-align: center;text-decoration: none;outline: none;color: #000;background-color: #fff;border: 1px solid #ddd;border-radius: 15px;margin-left: 10px;background: #f9f7f7;" onclick="window._Plugins.widget.closeModal()">Cancel</button>
                            </div>
                        </div>
                    </div>`
    }

    /**
     * Build plugin card template
     * @param {Array} pluginCards - - plugin cards array
     */
    static pluginCardsTemplate(pluginCards) {
        if (!(pluginCards && pluginCards.length > 0)) {

            // return html if no cards are available
            return `<p>No cards are available</p>`;
        }

        // Return plugin cards template
        return `<div style='border: 1px solid #ddd;background:"${window._Plugins.widgetData.properties.background_check}";height: 100%;width: 100%;background-repeat: no-repeat;background-size: cover;overflow: auto;background-position: center;padding-top: 20px;padding-bottom: 20px;\'>
                        <div>
                            <span style="font-size: 51px;cursor: pointer;color: deepskyblue;"
                                onclick="window._Plugins.downloadPlugins()">&larr;</span>
                            <span style="font-size: 20px;color: #847971db;font-family: monospace;">${window._Plugins.pluginName}
                                Cards</span>
                        </div>
                        <div id='mainbox'>
                            {{#each data}}
                            <div style="text-align: center;font-size: 18px; color: #777264;">
                                <div class="round_card">
                                    <div style="height: 100%;cursor: pointer;"
                                        onclick="window._Plugins.getPluginCardDetails({{card_id}},{{id}})"><img
                                            src="{{card_desc}}" style="height: 100%;width: 100%;"></div>
                                </div>
                                <div>{{card_name}}</div>
                            </div>
                            {{/each}}
                        </div>
                </div>
                <div style='padding:25px;margin:20px' id='view_div'>
                </div>`
    }

    /**
     * Build plugin card details template 
     * @param {Array} resObj - plugin card details array 
     */
    static cardDetailsTemplate(resObj) {
        if (!(resObj && resObj.length > 0)) {

            // Return html if no cards details are available
            return `No data available`
        }

        // Return plugin card details template
        return `<div style='display: -webkit-box;'>
                    <div style='text-align:center;font-size: 20px;color: #099ffd;font-weight: bold;padding: 10px;width: 90%;'>Plugin
                        preview</div>
                    <div id="panel"
                        style="display: none !important;z-index: 100;position: absolute;margin: auto;left: 1110px;top: 338px;display: block;">
                    </div>
                    <div></div>
                </div>
            <div
                style='border: 1px solid #ddd;background:"${window._Plugins.widgetData.properties.background_check}";height: 100%;width: 100%;background-repeat: no-repeat;background-size: cover;overflow: auto;background-position: center;'>
            </div>
            <table class="table table-bordered">
                {{#each data}}
                {{#if @first}}
                <thead>
                    <tr>
                        {{#each .}}
                        <th scope="col">{{@key}}</th>
                        {{/each}}</tr>
                </thead>
                <tbody>
                    {{/if}}
                    <tr>
                        {{#each .}}
                        <td>{{this}}</td>
                        {{/each}}
                    </tr>
                    {{/each}}
                    {{#if @last}}</tbody>{{/if}}
            </table>
        </div>`
    }
}