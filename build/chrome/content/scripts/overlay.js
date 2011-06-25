var MAD = {
   onLoad: function()
   {
      // initialization code
      this.initialized = true;
      this.gfiltersimportexportBundle = Components.classes["@mozilla.org/intl/stringbundle;1"]
                                                  .getService(Components.interfaces.nsIStringBundleService);
      this.mystrings = this.gfiltersimportexportBundle
                           .createBundle("chrome://MAD/locale/overlay.properties");

      var myButtonId = "mad-toolbar-button"; // ID of button to add
      var afterId = "urlbar-container";    // ID of element to insert after
      var navBar  = document.getElementById("nav-bar");
      var curSet  = navBar.currentSet.split(",");

      if(curSet.indexOf(myButtonId) == -1)
      {
         var pos = curSet.indexOf(afterId) - 1 || curSet.length;
         var set = curSet.slice(0, pos).concat(myButtonId).concat(curSet.slice(pos));

         navBar.setAttribute("currentset", set.join(","));
         navBar.currentSet = set.join(",");
         document.persist(navBar.id, "currentset");

         try
         {
            BrowserToolboxCustomizeDone(true);
         }
         catch(e)
         {
            Application.console.log(e);
         }
      }
   },

   onToolbarButtonCommand: function(event)
   {
      if(event.button == 0)
      {
         window.open("chrome://MAD/content/window.xul", "", "chrome,titlebar,toolbar,centerscreen,resizable=no,modal");
      }
      else if(event.button == 2)
      {
         // TODO: for rightclick, open a contextmenue to show an option-entry
         // to open the M.A.D. options.
      }
   },

   onMenuItemCommand: function(event)
   {
      window.open("chrome://MAD/content/window.xul", "", "chrome,titlebar,toolbar,centerscreen,resizable=no,modal");
   }
};

window.addEventListener("load", function(e)
{
   MAD.onLoad(e);
}, false);