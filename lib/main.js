var pageMod = require("sdk/page-mod");
var self = require("sdk/self");


pageMod.PageMod({
  include: "*",
  contentScriptFile: [self.data.url("jquery-1.10.1.min.js"),self.data.url("prism.js")],
  contentScriptWhen: 'ready'
});

