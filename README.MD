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


## todos:
- [ ] unit test case
