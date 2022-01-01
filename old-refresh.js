let manifest = {
  name: "Getting Started Example",
  description: "Build an Extension!",
  version: "1.0",
  manifest_version: 3,
  background: {
    service_worker: "refresh.js",
  },
  permissions: ["storage", "windows", "tabs", "activeTab"],
  host_permissions: ["https://fm4.orf.at/player/"],
};

let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

console.log("chrome", chrome);
console.log("chrome.windows", chrome.windows);
console.log("chrome.tabs", chrome.tabs);
console.log("chrome.activeTab", chrome.activeTab);
let counter = 0;
// const intervalId = setInterval(() => {
//   counter += 1;
//   console.log("counter", counter);
// }, 1000);

// clearInterval(intervalId);

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  tabs.forEach((tab) => {
    console.log("tab", tab);
    console.log("tab.url", tab.url);
  });
});

chrome.windows.getAll(null, (windows) => {
  windows.forEach((window) => {
    console.log("window.url", window);
  });
});
