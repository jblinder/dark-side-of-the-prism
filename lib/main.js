var self    = require("sdk/self");
var pageMod = require("sdk/page-mod");
var widgets = require("sdk/widget");
var tabs    = require("sdk/tabs");
var bPlayAudio = true;

pageMod.PageMod({
  	include: ["*"],
  	contentScriptFile: [self.data.url("jquery-1.10.1.min.js"),self.data.url("prism.js")],
 	onAttach: function(worker) {
    	worker.port.emit("ready", bPlayAudio);
 	 }
});

var widget = widgets.Widget({
  id: "darksideoftheprism-link",
  label: "Dark Side of the Prism",
  contentURL: self.data.url("dsotp.png"),
  onClick: function() {
  	bPlayAudio = !(bPlayAudio);
    worker = tabs.activeTab.attach({
      contentScriptFile: [self.data.url("jquery-1.10.1.min.js"),self.data.url("prism.js")],
    });
    worker.port.emit("click", bPlayAudio);
  }
});



