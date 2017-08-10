(function () {

  var global = global || window || self || this;

  var nx = global.nx || require('next-js-core2');
  var ANDROID_BRIDGE ='__NX_ANDROID_BRIDGE__';
  var USER_AGENT = navigator.userAgent;

  //supports:
  var deviceIsWindowsPhone = USER_AGENT.indexOf("Windows Phone") >= 0;
  var deviceIsAndroid = USER_AGENT.indexOf('Android') > 0 && !deviceIsWindowsPhone;

  var NxHybridBridge = nx.declare('nx.HybridBridge', {
    statics:{
      setup: function(inString,inCallback){
        var bridge = new NxHybridBridge(inString);
        return new Promise(function(resolve){
          bridge.setup(resolve);
        });
      }
    },
    methods:{
      init: function(inAndroidBridgeStr){
        this.androidBridge = inAndroidBridgeStr || ANDROID_BRIDGE;
      },
      setup: function(inCallback){
        if(deviceIsAndroid){
          this.setupAndroid(inCallback);
        }else{
          this.setupIOS(inCallback);
        }
      },
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
          var androidBridge = window[this.androidBridge];
          if (androidBridge) {
            androidBridge.registerHandler = function (inName, inCallback) {
              inBridge[inName] = inCallback;
            };

            androidBridge.callHandler = function (inName, inData, inCallback) {
              var response, _response;
              var callback = inCallback || nx.noop;
              //todo: string OR JSON?
              response = inData == null ? inBridge[inName]() : inBridge[inName](nx.stringify(inData));
              _response = nx.parse(response);
              callback(_response);
            };
            inCallback(androidBridge);
          }
        } catch (_) {}
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxHybridBridge;
  }

}());
