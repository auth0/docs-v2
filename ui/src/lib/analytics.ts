import { config } from './config';

interface Heap {
  track: (event: string, properties?: object) => void;
  identify: (identity: string) => void;
  resetIdentity: () => void;
  addUserProperties: (properties: object) => void;
  addEventProperties: (properties: object) => void;
  removeEventProperty: (property: string) => void;
  clearEventProperties: () => void;
  appid: string;
  userId: string;
  identity: string | null;
  config: unknown;
}

declare global {
  interface Window {
    heap: Heap;
  }
}

export function heap(heapId: string): void {
  // load heap analytics script
  const script = document.createElement('script');
  script.innerHTML = `window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],
  heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},
  window.heap.clientConfig.shouldFetchServerConfig=!1;
  var a=document.createElement("script");
  a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";
  var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);
  var n=["init",
  "startTracking",
  "stopTracking",
  "track","resetIdentity",
  "identify","identifyHashed",
  "getSessionId","getUserId","getIdentity",
  "addUserProperties","addEventProperties",
  "removeEventProperty","clearEventProperties",
  "addAccountProperties",
  "addAdapter",
  "addTransformer",
  "addTransformerFn",
  "onReady",
  "addPageviewProperties",
  "removePageviewProperty",
  "clearPageviewProperties",
  "trackPageview"],
  i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);
  window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};
  for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};
  heap.load("${heapId}");`;

  script.id = 'heap-script';
  // Important: Set type to 'text/plain' to prevent immediate execution
  // The actual execution will be controlled by OneTrust based on user consent
  script.type = 'text/plain';
  script.classList.add('consent-required:C0002'); // needed for one-trust
  script.async = true;

  document.body.append(script);
}

export function loadHeapScript(): void {
  if (typeof window === 'undefined') return;

  if (!config.heapAnalytics.enabled || !config.heapAnalytics.appId) {
    console.log('Heap analytics is disabled or appId is missing.');
    return;
  }

  heap(config.heapAnalytics.appId);
}
