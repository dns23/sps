//
// TODO #1: Document Synchronous Publish Subscriber Manager
//
var SPS_Manager = function () 
{
   var _dispatchFuncMap = {};
   var self = this;

   // TODO #1: Document the publish method  
   this.publish = function(signal, data)
   {
      if (_dispatchFuncMap[signal])
      {
         for (var i = 0; i < _dispatchFuncMap[signal].length; i++)
         {
            _dispatchFuncMap[signal][i](data);
         }
      }
   };

   // TODO #1: Document the subscribe method  
   this.subscribe = function(signal, func)
   {
      SPS_REQUIRE(typeof func === 'function');

      if (!_dispatchFuncMap[signal])
      {
         _dispatchFuncMap[signal] = [];
      }
      _dispatchFuncMap[signal].push(func);
   };

   // TODO #1: Document the unsubscribe method  
   this.unsubscribe = function(signal, func)
   {
      SPS_REQUIRE(typeof func === 'function');

      if (!_dispatchFuncMap[signal]) 
      {
         _dispatchFuncMap[signal] = [];
         return;
      }
      var index = _dispatchFuncMap[signal].indexOf(func);
      if (index > -1)
      {
         _dispatchFuncMap[signal].splice(index, 1);
      }
   };
};

// TODO #2: Example API protection parameters.
function SPS_REQUIRE(condition)
{
   if (!condition)
   {
      alert("SPS API error.");
   }
}

