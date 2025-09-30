//use innerhtml for this and just copy the script tags into this
// function heap(heapId) {
//     console.log("Loading Heap with ID:", heapId);
//   // load one-trust-script
//   const script = document.createElement("script");
//   script.innerHTML = `window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],
//   heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},window.heap.clientConfig.shouldFetchServerConfig=!1;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);var n=["init","startTracking","stopTracking","track","resetIdentity","identify","identifyHashed","getSessionId","getUserId","getIdentity","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"],i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};
//   heap.load(${heapId});`
//   script.id = "heap-script";
//   script.type = "text/plain";
//   console.log("Adding consent-required class to Heap script");
//   script.classList.add('consent-required:C0002');  
//   script.async = true;
//   document.body.append(script);
//   console.log("Heap script added to the document");
// }
// document.addEventListener("readystatechange", () => {
//     heap("2269341915");
//     console.log("Heap function executed on readystatechange");
// });
