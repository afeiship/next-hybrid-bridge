(function () {

  var global = global || window || self || this;

  var nx = global.nx || require('next-js-core2');
  var ANDROID_BRIDGE ='__NX_ANDROID_BRIDGE__';

  var NxHybridBridge = nx.declare('nx.HybridBridge', {
    methods:{
      setupIOS: function(inCallback){
        if (window.WebViewJavascriptBridge) {
          return inCallback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(inCallback);
        }
        window.WVJBCallbacks = [inCallback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
          document.documentElement.removeChild(WVJBIframe)
        }, 0);
      },
      setupAndroid: function(inCallback){
        try {
          if (window[ANDROID_BRIDGE]) {
            this.normalizeAndroidBridge(window[ANDROID_BRIDGE]);
            inCallback(window[ANDROID_BRIDGE]);
          }
        } catch (_) {}
      },
      normalizeAndroidBridge:function(inBridge) {
        inBridge.registerHandler = function (inName, inCallback) {
          inBridge[inName] = inCallback;
        };

        inBridge.callHandler = function (inName, inData, inCallback) {
          var response, _response;
          var callback = inCallback || nx.noop;
          response = inData == null ? inBridge[inName]() : inBridge[inName](nx.stringify(inData));
          _response = nx.parse(response);
          callback(_response);
        };
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxHybridBridge;
  }

}());
