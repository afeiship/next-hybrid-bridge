# next-hybrid-bridge
> Another hybrid bridge based on next.

## usage:
```javascript
import NxHybridBridge from 'next-hybrid-bridge';

NxHybridBridge.setup((bridge)=>{
  //register for naitve:
  bridge.registerHandler();

  //call native:
  bridge.callHandler();
});

```

## resources:
+ https://github.com/marcuswestin/WebViewJavascriptBridge
+ https://juejin.im/post/5b7efb2ee51d45388b6af96c
