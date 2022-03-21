let color = "#3aa757";

const filter = {
  url: [
    {
      urlMatches: "https://fm4.orf.at/player/live",
    },
  ],
};

chrome.webNavigation.onCompleted.addListener((test) => {
  console.log("test", test);
  console.info("The user has loaded my favorite website!");
  // const document = chrome.d

  console.log("chrome.documents", chrome.dom);
  // const audio = document.querySelector("audio");
  // console.log("audio", audio);
}, filter);

chrome.runtime.onInstalled.addListener(async () => {
  let tabs = await chrome.tabs.query({
    url: "https://fm4.orf.at/player/live",
  });
  console.log("tabs", tabs);

  chrome.action.onClicked.addListener((tab) => {
    console.log("clicked tab", tab);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"],
    });
  });

  // tabs.forEach(async (tab, index) => {
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     files: ["content-script.js"],
  //   });
  //   console.log("tab", tab);
  //   console.log("index", index);
  //   let windows = await chrome.windows.get(tab.windowId);
  //   console.log("windows", windows);
  //   // tab.addListener(function () {
  //   console.log("clicked");
  //   // const audio = tab.document.querySelector("audio");
  //   // console.log("audio", audio);
  //   // audio.addEventListener("stalled", (event) => {
  //   //   console.log("stalled", event);
  //   //   audio.load();
  //   // });
  //   // });
  // });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

// (function () {
//   var browserAction,
//     interval,
//     onClick,
//     reloadTabs,
//     tabs,
//     windows,
//     refreshInterval;

//   (browserAction = chrome.browserAction),
//     (windows = chrome.windows),
//     (tabs = chrome.tabs);

//   interval = 240;
//   refreshInterval = null;

//   reloadTabs = function ($tabs) {
//     var item, _i, _len, _results;
//     _results = [];

//     return _results;
//   };

//   onClick = function () {
//     return windows.getCurrent(
//       {
//         populate: true,
//       },
//       function ($window) {
//         return reloadTabs($window.tabs);
//       },
//     );
//   };

//   browserAction.onClicked.addListener(function () {
//     console.log("clicked");
//     const audio = document.querySelector("audio");
//     audio.addEventListener("stalled", (event) => {
//       console.log("stalled", event);
//       audio.load();
//     });
//   });
// }.call(this));
