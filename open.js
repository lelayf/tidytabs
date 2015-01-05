// Copyright (c) 2015 François Le Lay. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
var menuToWindow = {} ;
var childrenEntries = [] ;

function genericOnClick(info, tab) {
  chrome.tabs.create({url:info.linkUrl,windowId:menuToWindow[info.menuItemId],active:true})
  chrome.windows.update(menuToWindow[info.menuItemId],{focused:true})
}

var parentEntry = chrome.contextMenus.create({"title": "Open Link in Existing Window","contexts":["link"]})

chrome.windows.getAll({ populate: true }, function(windowList) {
  for (var i = 0; i < windowList.length; i++) {
    if( windowList[i].tabs.length > 0 ) { 
      var firstTab = windowList[i].tabs[0];
      var childItem = chrome.contextMenus.create({"title": firstTab.title, "contexts":["link"], "parentId": parentEntry, "onclick": genericOnClick}); 
      menuToWindow[childItem] = firstTab.windowId
    } else {
      var childItem = chrome.contextMenus.create({"title": windowList[i].title, "contexts":["link"], "parentId": parentEntry, "onclick": genericOnClick});      
      menuToWindow[childItem] = windowList[i].id
    }
  }
});


