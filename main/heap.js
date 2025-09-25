//use innerhtml for this and just copy the script tags into this
function heap(heapId) {
    console.log("Loading Heap with ID:", heapId);
  // load one-trust-script
  const script = document.createElement("script");
  script.innerHTML = `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};
    var r=document.createElement("script"); r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js",
    r.onload=function(){window.analyticsScripts = { ...window.analyticsScripts, heap: 'loaded'};window.dispatchEvent(new CustomEvent('ANALYTICS_SCRIPT_STATE_CHANGE', { detail: { id: 'heap', state: 'loaded' } }));},
    r.onerror=function(){window.analyticsScripts = { ...window.analyticsScripts, heap: 'failed'};window.dispatchEvent(new CustomEvent('ANALYTICS_SCRIPT_STATE_CHANGE', { detail: { id: 'heap', state: 'failed' } }));};
    var a=document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(r,a);
    for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
    heap.load(${heapId});`
  script.id = "heap-script";
  script.type = "text/plain";
  console.log("Adding consent-required class to Heap script");
  script.classList.add('consent-required:C0002');  
  script.async = true;
  document.body.append(script);
  console.log("Heap script added to the document");
}
document.addEventListener("readystatechange", () => {
    heap("2269341915");
    console.log("Heap function executed on readystatechange");
});

//try logging more