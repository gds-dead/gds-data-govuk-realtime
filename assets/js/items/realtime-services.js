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

$(function() {
  loadRealtime.reloadUsers();

  // set up a "wobble"
  var wobble = window.setInterval(loadRealtime.wobbleDisplays, 10*1000);
  // poll gov.uk once every 5 mins(?)
  var update = window.setInterval(loadRealtime.reloadUsers, 5*60*1000);

});
