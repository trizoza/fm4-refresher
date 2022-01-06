(function () {
  var browserAction,
    interval,
    onClick,
    reloadTabs,
    tabs,
    windows,
    leftTime,
    minutes,
    seconds,
    refreshInterval;

  (browserAction = chrome.browserAction),
    (windows = chrome.windows),
    (tabs = chrome.tabs);

  interval = 360;
  refreshInterval = null;

  reloadTabs = function ($tabs) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = $tabs.length; _i < _len; _i++) {
      item = $tabs[_i];
      if (item.url.indexOf("fm4") >= 0) {
        _results.push(tabs.reload(item.id));
      }
    }
    return _results;
  };

  onClick = function () {
    return windows.getCurrent(
      {
        populate: true,
      },
      function ($window) {
        return reloadTabs($window.tabs);
      },
    );
  };

  browserAction.onClicked.addListener(function () {
    var counter = 0;
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
      counter = 0;
      console.log("Timer is off");
      onClick(false);
    } else {
      refreshInterval = setInterval(function () {
        console.log("counter", counter);
        leftTime = (interval - counter) / 60;
        minutes = Math.floor(leftTime);
        seconds = interval - minutes * 60 - counter;
        console.log(
          `Refresh in ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`,
        );
        counter += 1;
        if (counter > interval) {
          counter = 0;
          onClick(false);
        }
      }, 1000);
    }
  });
}.call(this));
