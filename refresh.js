(function () {
  var browserAction,
    interval,
    onClick,
    reloadTabs,
    tabs,
    windows,
    refreshInterval;

  (browserAction = chrome.browserAction),
    (windows = chrome.windows),
    (tabs = chrome.tabs);

  interval = 600000;
  refreshInterval = null;

  reloadTabs = function ($tabs) {
    console.log("tabs", tabs);
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

  onClick = function ($double) {
    return windows.getCurrent(
      {
        populate: true,
      },
      function ($window) {
        var item, pinnedList, unpinnedList;
        pinnedList = (function () {
          var _i, _len, _ref, _results;
          _ref = $window.tabs;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            if (item.pinned) {
              _results.push(item);
            }
          }
          return _results;
        })();
        unpinnedList = $window.tabs.slice(pinnedList.length);
        if (pinnedList.length) {
          return reloadTabs($double ? unpinnedList : pinnedList);
        } else {
          return reloadTabs(unpinnedList);
        }
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
    } else {
      refreshInterval = setInterval(function () {
        counter += 1;
        var leftTime = (600 - counter) / 60;
        var minutes = Math.floor(leftTime);
        var seconds = 600 - minutes * 60 - counter;
        console.log(`Refresh in ${minutes}:${seconds}`);
        if (counter > interval) {
          onClick(true);
          counter = 0;
        }
      }, 1000);
    }
  });
}.call(this));
