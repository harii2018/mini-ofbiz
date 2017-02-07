define("bui/select",["bui/common","jquery","bui/picker","bui/overlay","bui/list","bui/data"],function(t,e,i){var a=t("bui/common"),n=a.namespace("Select");a.mix(n,{Select:t("bui/select/select"),Combox:t("bui/select/combox"),Suggest:t("bui/select/suggest")}),i.exports=n}),define("bui/select/select",["jquery","bui/common","bui/picker","bui/overlay","bui/list","bui/data"],function(t,e,i){"use strict";function a(t){if(n.isPlainObject(t)){var e=[];return u.each(t,function(t,i){e.push({value:i,text:t})}),e}var i=[];return u.each(t,function(t){i.push(u.isString(t)?{value:t,text:t}:t)}),i}var n=t("jquery"),u=t("bui/common"),l=t("bui/picker").ListPicker,r=u.prefix,s=u.Component,c=l,o=r+"select-input",g=s.Controller.extend({initializer:function(){var t,e,i=this,n=i.get("multipleSelect"),l=i.get("picker");l?i.get("valueField")&&l.set("valueField",i.get("valueField")):(t=n?"listbox":"simple-list",e=i.get("list")||{},e=u.mix(e,{xclass:t,elCls:r+"select-list",store:i.get("store"),items:a(i.get("items"))}),l=new c({children:[e],valueField:i.get("valueField")}),i.set("picker",l)),n&&l.set("hideEvent","")},renderUI:function(){var t=this,e=t.get("picker"),i=t._getTextEl();e.set("trigger",t.getTrigger()),e.set("triggerEvent",t.get("triggerEvent")),e.set("autoSetValue",t.get("autoSetValue")),e.set("textField",i),e.render(),t.set("list",e.get("list"))},bindUI:function(){{var t=this,e=t.get("picker"),i=e.get("list");i.get("store")}e.on("selectedchange",function(e){e.item&&t.fire("change",{text:e.text,value:e.value,item:e.item})}),t.get("autoSetValue")&&i.on("itemsshow",function(){t._syncValue()}),e.on("show",function(){t.get("forceFit")&&e.set("width",t.get("el").outerWidth())})},containsElement:function(t){var e=this,i=e.get("picker");return s.Controller.prototype.containsElement.call(this,t)||i.containsElement(t)},getTrigger:function(){return this.get("el")},_uiSetItems:function(t){if(t){var e=this,i=e.get("picker"),n=i.get("list");n.set("items",a(t)),e._syncValue()}},_syncValue:function(){var t=this,e=t.get("picker"),i=t.get("valueField");i&&e.setSelectedValue(n(i).val())},_uiSetName:function(t){var e=this,i=e._getTextEl();t&&i.attr("name",t)},_uiSetWidth:function(t){var e=this;if(null!=t){if(e.get("inputForceFit")){var i=e._getTextEl(),a=e.get("el").find(".x-icon"),n=i.outerWidth()-i.width(),u=t-a.outerWidth()-n;i.width(u)}if(e.get("forceFit")){var l=e.get("picker");l.set("width",t)}}},_uiSetDisabled:function(t){var e=this,i=e.get("picker"),a=e._getTextEl();i.set("disabled",t),a&&a.attr("disabled",t)},_getTextEl:function(){var t=this,e=t.get("el");return e.is("input")?e:e.find("input")},destructor:function(){var t=this,e=t.get("picker");e&&e.destroy()},_getList:function(){var t=this,e=t.get("picker"),i=e.get("list");return i},getSelectedValue:function(){return this.get("picker").getSelectedValue()},setSelectedValue:function(t){var e=this,i=e.get("picker");i.setSelectedValue(t)},getSelectedText:function(){return this.get("picker").getSelectedText()}},{ATTRS:{picker:{},list:{},valueField:{},store:{},focusable:{value:!0},autoSetValue:{value:!0},multipleSelect:{value:!1},inputForceFit:{value:!0},name:{},items:{sync:!1},inputCls:{value:o},forceFit:{value:!0},events:{value:{change:!1}},tpl:{view:!0,value:'<input type="text" readonly="readonly" class="'+o+'"/><span class="x-icon x-icon-normal"><i class="icon icon-caret icon-caret-down"></i></span>'},triggerEvent:{value:"click"}}},{xclass:"select"});i.exports=g}),define("bui/select/combox",["jquery","bui/common","bui/picker","bui/overlay","bui/list","bui/data"],function(t,e,i){var a=t("jquery"),n=t("bui/common"),u=t("bui/select/select"),l=t("bui/select/tag"),r=n.prefix+"combox-input",s=u.extend([l],{renderUI:function(){var t=this,e=t.get("picker");e.set("autoFocused",!1)},_uiSetItems:function(t){for(var e=this,i=0;i<t.length;i++){var a=t[i];n.isString(a)&&(t[i]={value:a,text:a})}s.superclass._uiSetItems.call(e,t)},bindUI:function(){var t=this,e=t.get("picker"),i=e.get("list"),n=e.get("textField");a(n).on("keyup",function(){var t=i.getSelected();t&&i.clearItemStatus(t)}),e.on("show",function(){i.clearSelected()})},_uiSetValueField:function(){},getTrigger:function(){return this._getTextEl()}},{ATTRS:{tpl:{view:!0,value:'<input type="text" class="'+r+'"/>'},inputCls:{value:r},autoSetValue:{value:!1}}},{xclass:"combox"});i.exports=s}),define("bui/select/tag",["jquery","bui/common","bui/list","bui/data"],function(t,e,i){function a(t){var e="";return 0==t.length?"":(e=t.replace(/>/g,"&gt;"),e=e.replace(/</g,"&lt;"))}var n=t("jquery"),u=t("bui/common"),l=t("bui/list"),r=u.KeyCode,s="warn",c=function(){};c.ATTRS={showTag:{value:!1},tagItemTpl:{value:"<li>{text}<button>\xd7</button></li>"},tagList:{value:null},limit:{value:null},forbitInput:{value:!1},tagPlaceholder:{value:"\u8f93\u5165\u6807\u7b7e"},tagFormatter:{value:null},separator:{value:";"}},u.augment(c,{__renderUI:function(){var t=this,e=t.get("showTag"),i=t.get("tagPlaceholder"),a=t.getTagInput();e&&!a.attr("placeholder")&&(a.attr("placeholder",i),t.set("inputForceFit",!1))},__bindUI:function(){function t(){var t=e.get("tagList"),i=t.getLastItem();i&&t.hasStatus(i,s)&&t.setItemStatus(i,s,!1);var n=a.val();n&&e._addTag(n)}var e=this,i=e.get("showTag"),a=e.getTagInput();if(i){a.on("keydown",function(t){if(!a.val()){var i=e.get("tagList"),n=i.getLastItem(),u=e.get("picker");t.which==r.DELETE||t.which==r.BACKSPACE?(i.hasStatus(n,s)?e._delTag(n):i.setItemStatus(n,s,!0),u.hide()):i.setItemStatus(n,s,!1)}});var n;e.get("forbitInput")||a.on("change",function(){n=setTimeout(function(){t(),n=null},50)}),e.on("change",function(){setTimeout(function(){n&&clearTimeout(n),t()})})}},__syncUI:function(){var t=this,e=t.get("showTag"),i=t.get("valueField");e&&i&&t._setTags(n(i).val())},_setTags:function(t){var e=this,i=e.get("tagList"),a=e.get("separator"),n=e.get("tagFormatter"),l=t.split(a);i||(i=e._initTagList()),t&&u.each(l,function(t){var e=t;n&&(e=n(e)),i.addItem({value:t,text:e})})},_addTag:function(t){t=a(t);var e=this,i=e.get("tagList"),n=e.getTagInput(),u=e.get("limit"),l=e.get("tagFormatter"),r=i.getItem(t);if(!(u&&i.getItemCount()>=u)){if(r)e._blurItem(i,r);else{var s=t;l&&(s=l(s)),i.addItem({value:t,text:s}),e._synTagsValue()}n.val("")}},_blurItem:function(t,e){t.setItemStatus(e,"active",!0),setTimeout(function(){t.setItemStatus(e,"active",!1)},400)},_delTag:function(t){var e=this,i=e.get("tagList");i.removeItem(t),e._synTagsValue()},getTagsValue:function(){var t=this,e=t.get("tagList"),i=e.getItems(),a=[];return u.each(i,function(t){a.push(t.value)}),a.join(t.get("separator"))},_initTagList:function(){var t=this,e=t.getTagInput(),i=new l.SimpleList({elBefore:e,itemTpl:t.get("tagItemTpl"),idField:"value"});return i.render(),t._initTagEvent(i),t.set("tagList",i),i},_initTagEvent:function(t){var e=this;t.on("itemclick",function(t){var i=n(t.domTarget);i.is("button")&&e._delTag(t.item)})},getTagInput:function(){var t=this,e=t.get("el");return e.is("input")?e:e.find("input")},_synTagsValue:function(){var t=this,e=t.get("valueField");e&&n(e).val(t.getTagsValue())}}),i.exports=c}),define("bui/select/suggest",["jquery","bui/common","bui/picker","bui/overlay","bui/list","bui/data"],function(t,e,i){"use strict";var a=t("jquery"),n=t("bui/common"),u=t("bui/select/combox"),l=200,r="",s=u.extend({bindUI:function(){var t=this,e=t.get("el").find("input"),i="keyup"===t.get("triggerEvent")?"keyup":"keyup click";e.on(i,function(){t._start()})},_start:function(){var t=this;t._timer=t.later(function(){t._updateContent()},l)},_updateContent:function(){var t,e=this,i=e.get("data"),a=e.get("el").find("input");if((i||a.val()!==e.get("query"))&&(e.set("query",a.val()),t=a.val(),i||t)){var n=e.get("cacheable"),u=e.get("store"),l=e.get("url"),r=e.get("data");if(n&&(l||u)){var s=e.get("dataCache");void 0!==s[t]?e._handleResponse(s[t]):e._requestData()}else l||u?e._requestData():r&&e._handleResponse(r,!0)}},_getStore:function(){var t=this,e=t.get("picker"),i=e.get("list");return i?i.get("store"):void 0},_requestData:function(){var t=this,e=t.get("el").find("input"),i=t.get("callback"),n=t.get("store"),u={};u[e.attr("name")]=e.val(),n?(u.start=0,n.load(u,i)):a.ajax({url:t.get("url"),type:"post",dataType:t.get("dataType"),data:u,success:function(e){t._handleResponse(e),i&&i(e)}})},_handleResponse:function(t,e){var i=this,a=e?i._getFilterItems(t):t;i.set("items",a),i.get("cacheable")&&(i.get("dataCache")[i.get("query")]=a)},_getItemText:function(t){var e=this,i=e.get("picker"),a=i.get("list");return a?a.getItemText(t):""},_getFilterItems:function(t){function e(t,e){u.push(n.isString(e)?t:e)}var i=this,u=[],l=i.get("el").find("input"),r=l.val(),s=i.get("data");return t=t||[],n.each(t,function(t){var u=n.isString(t)?t:i._getItemText(t);s?-1!==u.indexOf(a.trim(r))&&e(u,t):e(u,t)}),u},later:function(t,e,i){e=e||0;var a=i?setInterval(t,e):setTimeout(t,e);return{id:a,interval:i,cancel:function(){this.interval?clearInterval(a):clearTimeout(a)}}}},{ATTRS:{data:{value:null},query:{value:r},cacheable:{value:!1},dataCache:{shared:!1,value:{}},dataType:{value:"jsonp"},url:{},callback:{},triggerEvent:{valueFn:function(){return this.get("data")?"click":"keyup"}},autoSetValue:{value:!1}}},{xclass:"suggest"});i.exports=s});