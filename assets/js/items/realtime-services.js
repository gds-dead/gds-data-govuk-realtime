var list = {
  govuk: {
    urlUsers: '/gov-users',
    usersCount: [],
    cssClass: '.gov'
  },
};


var loadRealtime = {

  loadUsers: function(obj) {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: obj.urlUsers,
      success: function(d) {
        // clear the users array (on success)
        obj.usersCount.length = 0;
        var i, _i;
        for (i=0, _i=d.data.length; i<_i; i++) {
          obj.usersCount.push(d.data[i].unique_visitors)
        }
        // update the display
        loadRealtime.updateUsersDisplay(obj);
      }
    });
  },

  reloadUsers: function() {
    for (var item in list) {
      loadRealtime.loadUsers(list[item]);
    }
  },

  updateUsersDisplay: function(obj) {
    var r = getRandomInt(0, obj.usersCount.length-1);
    $(obj.cssClass + ' .figure').text(addCommas(obj.usersCount[r]));
  },

  wobbleDisplays: function() {
    for (var item in list) {
      loadRealtime.updateUsersDisplay(list[item]);
    }
  }

};

var loadOffline = {

  startCounter: 0,

  initDisplay: function() {

    var now = new Date;
    now.setTime(Date.now());
    var hour = now.getHours();
    var min = now.getMinutes();
    var tempDate = new Date;

    // loop through the data set and match the time as closely as possible.
    for (var i = 0; i < d.length; i++) {
      tempDate.setTime(Date.parse(d[i]._timestamp));
      tempHour = tempDate.getHours();

      if (tempHour === hour) {
        tempMin = tempDate.getMinutes();
        if (tempMin === min) {
          loadOffline.startCounter = i;
          break;
        }
        // catch and go back 1 if we've shot over the nearest minutes
        if (tempMin > min) {
          loadOffline.startCounter = i-1;
          break;
        }
      }
    }

    // display the figure
    loadOffline.updateUsersDisplay(d[loadOffline.startCounter].unique_visitors);

  },

  incrementUsers: function() {
    if (loadOffline.startCounter === d.length) {
      loadOffline.startCounter = 0;
    } else {
      loadOffline.startCounter++;
    }
    // display the updated figure
    loadOffline.updateUsersDisplay(d[loadOffline.startCounter].unique_visitors);
  },

  updateUsersDisplay: function(txt) {
    $('.figure').text(addCommas(txt));
  }

};

$(function() {

  if (typeof offline !== 'undefined') {

    d = realtime_json.data;

    loadOffline.initDisplay(d);

    // ...and simply increment once every 2 mins to (almost) match JSON data
    var update = window.setInterval(loadOffline.incrementUsers, 2*60*1000);

  } else {

    loadRealtime.reloadUsers();

    // set up a "wobble"
    var wobble = window.setInterval(loadRealtime.wobbleDisplays, 10*1000);
    // poll gov.uk once every 5 mins(?)
    var update = window.setInterval(loadRealtime.reloadUsers, 5*60*1000);

  }

});
