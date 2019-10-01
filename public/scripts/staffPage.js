//Inital Load Resources
var loop = 1;
function getFollowers(){setInterval("api()",60000)}
function getFollowers2(){setInterval("api2()",60000)}
function getLive(){setInterval('live()', 60000)}
function getLiveTVS(){setInterval('liveTVS()', 60000)}
function getDash(){setInterval('dashboardGet()', 60000)}
function getDash2(){setInterval('dashboardGetTVS()', 60000)}
function init(){
  api();
  api2();
  live();
  liveTVS();
  showTGSN();
  dashboardGetTVS();
  getFollowers();
  getFollowers2();
  getLive();
  getLiveTVS();
  getDash();
  getDash2();
}

//API for Followers
function api(){
  //console.log("Begin Script");
  $.ajax({
    datatype: 'json',
    url: 'https://api.twitch.tv/helix/users/follows?to_id=43584807',
    headers: {
      "Client-ID": 'o118lfy65junb52nuye0weh4xbvn11',
    },
    success: function(channel)
    {
      //console.log("Results:");
      //console.log(channel);
      var title = channel.total;
      var latest = channel.data[0].from_name;
      $("#videos").html('TGSN Follower Goal: ' + title + '/200 (Or Affiliate)');
      $("#latestFollower").html('Latest TGSN Follower: ' + latest);
      //console.log(channel.total);
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
  //console.log("End Script");
};

//API for Followers
function api2(){
  //console.log("Begin Script");
  $.ajax({
    datatype: 'json',
    url: 'https://api.twitch.tv/helix/users/follows?to_id=268637223',
    headers: {
      "Client-ID": 'o118lfy65junb52nuye0weh4xbvn11',
    },
    success: function(channel)
    {
      //console.log("Results:");
      //console.log(channel);
      var title = channel.total;
      var latest = channel.data[0].from_name;
      $("#videos2").html('TVS Follower Goal: ' + title + '/20');
      $("#latestFollower2").html('Latest TVS Follower: ' + latest);
      //console.log(channel.total);
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
  //console.log("End Script");
};

//API for Channel Live
function live(){
      //console.log("Begin Script");
    $.ajax({
      datatype: 'json',
      //url: 'https://api.twitch.tv/helix/streams?user_login=BackgroundGaming_',
      url: 'https://api.twitch.tv/helix/streams?user_login=TheGamingSaloonNetwork',
      headers: {
        "Client-ID": 'o118lfy65junb52nuye0weh4xbvn11',
      },
      success: function(channel)
      {
        //console.log("Results:");
        //console.log(channel);
        var livestatus = '';

        if (typeof channel.data[0] === 'undefined'){
          liveStatus = "";
        } else {
          liveStatus = channel.data[0].type;
        }
        if (liveStatus == 'live'){
          liveStatus = '<a href="https://twitch.tv/TheGamingSaloonNetwork"><font color="red">TGSN LIVE</font></a>';
          $('#chatBox').show();
        } else {
          liveStatus = 'TGSN OFFLINE';
        }
        $("#liveStatus").html(liveStatus);
        /*if (typeof channel.data[0] === 'undefined'){
          console.log('offline');
        } else {
          console.log(channel.data[0].type);
        }*/
      },
      error: function(){
        console.log("The Request Failed");
      }
    });
    //console.log("End Script");
}

//API for Channel Live
function liveTVS(){
      //console.log("Begin Script");
    $.ajax({
      datatype: 'json',
      //url: 'https://api.twitch.tv/helix/streams?user_login=BackgroundGaming_',
      url: 'https://api.twitch.tv/helix/streams?user_login=TheVoicelessSaloon',
      headers: {
        "Client-ID": 'o118lfy65junb52nuye0weh4xbvn11',
      },
      success: function(channel)
      {
        //console.log("Results:");
        //console.log(channel);
        var livestatus = '';

        if (typeof channel.data[0] === 'undefined'){
          liveStatus = "";
        } else {
          liveStatus = channel.data[0].type;
        }
        if (liveStatus == 'live'){
          liveStatus = '<a href="https://twitch.tv/TheGamingSaloonNetwork"><font color="red"> TVS LIVE</font></a>';
          $('#chatBox').show();
        } else {
          liveStatus = 'TVS OFFLINE';
        }
        $("#liveStatusTVS").html(liveStatus);
        /*if (typeof channel.data[0] === 'undefined'){
          console.log('offline');
        } else {
          console.log(channel.data[0].type);
        }*/
      },
      error: function(){
        console.log("The Request Failed");
      }
    });
    //console.log("End Script");
}

//Dashboard Posting
function dashboardPut(){
  const db = firebase.firestore();
  const prefix = db.collection('stream').doc('prefix');
  var streamPre = '';

  prefix.onSnapshot(doc => {
    //Get Information from Firebase for Prefix
    const data = doc.data();
    streamPre = data.TGSN;
    document.getElementById('streamPrefix').innerHTML = '"' + streamPre + '"';

    //Attach Prefix and Send to Twitch
    var titleStr = streamPre + document.getElementById('titleChange').value;
    var game = document.getElementById('gameChange').value;
    var token = 'a2kb4vzvesmn5vt0e2btw622eez0a1';
    $.ajax({
      url: 'https://api.twitch.tv/kraken/channels/TheGamingSaloonNetwork',
      headers: {
        'Authorization': 'OAuth ajdvk6gl2gqx034sg5eyvcdz1dvdjy',
      },
      type: 'PUT',
      contentType: 'application/json',
      data: '{"channel": {"status": "' + titleStr + '", "game": "' + game + '"}}',
      success: function(data) {
        //console.log(data.status);
        //console.log(data.game);
        dashboardGet();
      }
    });
  })
}

//Dashboard Posting
function dashboardPutTVS(){
  //Attach Prefix and Send to Twitch
  var titleStr = document.getElementById('titleChange').value;
  var game = document.getElementById('gameChange').value;
  var token = 'a2kb4vzvesmn5vt0e2btw622eez0a1';
  $.ajax({
    url: 'https://api.twitch.tv/kraken/channels/TheVoicelessSaloon',
    headers: {
      'Authorization': ['OAuth ' + token],
    },
    type: 'PUT',
    contentType: 'application/json',
    data: '{"channel": {"status": "' + titleStr + '", "game": "' + game + '"}}',
    success: function(data) {
      //console.log(data.status);
      //console.log(data.game);
      dashboardGetTVS();
    }
  });
}

//Get Current Dashboard Info
function dashboardGet(){
  const db = firebase.firestore();
  const prefix = db.collection('stream').doc('prefix');

  prefix.onSnapshot(doc => {
    const data = doc.data();
    const streamPre = data.TGSN
    document.getElementById('streamPrefix').innerHTML = '"' + streamPre + '"';
  })

  var token = 'a2kb4vzvesmn5vt0e2btw622eez0a1';
  var title = document.getElementById('streamTitle');
  var game = document.getElementById('streamGame');
  $.ajax({
    url: 'https://api.twitch.tv/kraken/channels/TheGamingSaloonNetwork',
    headers: {
      'Authorization': ['OAuth ' + token],
    },
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      title.innerHTML = data.status;
      game.innerHTML = data.game;
      //console.log(data.status);
      //console.log(data.game);
    }
  });
}

//Get Current Dashboard Info
function dashboardGetTVS(){
  var token = 'a2kb4vzvesmn5vt0e2btw622eez0a1';
  var title = document.getElementById('streamTitleTVS');
  var game = document.getElementById('streamGameTVS');
  $.ajax({
    url: 'https://api.twitch.tv/kraken/channels/TheVoicelessSaloon',
    headers: {
      'Authorization': ['OAuth ' + token],
    },
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      title.innerHTML = data.status;
      game.innerHTML = data.game;
      //console.log(data.status);
      //console.log(data.game);
    }
  });
}

//Code to update Stats on change
function statChange() {
  //Initalize all IDs
  var lengthw2d = document.getElementById("ltw");
  var lengthlw = document.getElementById("llw");
  var lengthChange = document.getElementById("lchange");
  var minw2d = document.getElementById("mtw");
  var minlw = document.getElementById("mlw");
  var minChange = document.getElementById("mchange");
  var avgw2d = document.getElementById("atw");
  var avglw = document.getElementById("alw");
  var avgChange = document.getElementById("achange");
  var maxw2d = document.getElementById("maxtw");
  var maxlw = document.getElementById("maxlw");
  var maxChange = document.getElementById("maxchange");
  var uniqw2d = document.getElementById("utw");
  var uniqlw = document.getElementById("ulw");
  var uniqChange = document.getElementById("uchange");
  var neww2d = document.getElementById("ntw");
  var newlw = document.getElementById("nlw");
  var newChange = document.getElementById("nchange");
  var followsw2d = document.getElementById("ftw");
  var followslw = document.getElementById("flw");
  var followsChange = document.getElementById("fchange");

  //Get all data
  var ltw = lengthw2d.innerHTML;
  var llw = lengthlw.innerHTML;
  var mtw = parseFloat(minw2d.innerHTML);
  var mlw = parseFloat(minlw.innerHTML);
  var atw = parseFloat(avgw2d.innerHTML);
  var alw = parseFloat(avglw.innerHTML);
  var maxtw = parseFloat(maxw2d.innerHTML);
  var maxlw = parseFloat(maxlw.innerHTML);
  var utw = parseFloat(uniqw2d.innerHTML);
  var ulw = parseFloat(uniqlw.innerHTML);
  var ntw = parseFloat(neww2d.innerHTML);
  var nlw = parseFloat(newlw.innerHTML);
  var ftw = parseFloat(followsw2d.innerHTML);
  var flw = parseFloat(followslw.innerHTML);

  //Split length values into minutes and hours for calculation
  ltw.split(":");
  llw.split(":");

  //Convert to minutes
  var ltwMin = parseInt(ltw[0] * 60) + parseInt(ltw[2] + ltw[3]);
  //console.log(ltwMin);
  var llwMin = parseInt(llw[0] * 60) + parseInt(llw[2] + llw[3]);
  //console.log(llwMin);

  //Calculate Length Change
  var lchangeHour = 0;
  var lchangeMin = ltwMin - llwMin;
  while (lchangeMin >= 60){
    lchangeHour += 1;
    lchangeMin -= 60;
  }
  while (lchangeMin <= -60){
    lchangeHour += 1;
    lchangeMin += 60;
  }
  if (lchangeMin < 0 && lchangeMin >= -60){
    lchangeMin += (lchangeMin * -2);
    lchangeHour.toString()
    lchangeHour = '-' + lchangeHour;
  }

  //Return Values
  if (lchangeMin < 10){
    lengthChange.innerHTML = lchangeHour + ':0' + lchangeMin;
  } else {
    lengthChange.innerHTML = lchangeHour + ':' + lchangeMin;
  }
  minChange.innerHTML = (mtw - mlw).toFixed(0);
  avgChange.innerHTML = (atw - alw).toFixed(1);
  maxChange.innerHTML = (maxtw - maxlw).toFixed(1);
  uniqChange.innerHTML = (utw - ulw).toFixed(1);
  newChange.innerHTML = (ntw - nlw).toFixed(0);
  followsChange.innerHTML = (ftw - flw).toFixed(0);

  //Format
  if (lengthChange.innerHTML.includes('-')){
    lengthChange.innerHTML = '<font color="red">' + lengthChange.innerHTML + '</font>';
  }
  if (minChange.innerHTML.includes('-')){
    minChange.innerHTML = '<font color="red">' + minChange.innerHTML + '</font>';
  }
  if (avgChange.innerHTML.includes('-')){
    avgChange.innerHTML = '<font color="red">' + avgChange.innerHTML + '</font>';
  }
  if (maxChange.innerHTML.includes('-')){
    maxChange.innerHTML = '<font color="red">' + maxChange.innerHTML + '</font>';
  }
  if (uniqChange.innerHTML.includes('-')){
    uniqChange.innerHTML = '<font color="red">' + uniqChange.innerHTML + '</font>';
  }
  if (newChange.innerHTML.includes('-')){
    newChange.innerHTML = '<font color="red">' + newChange.innerHTML + '</font>';
  }
  if (followsChange.innerHTML.includes('-')){
    followsChange.innerHTML = '<font color="red">' + followsChange.innerHTML + '</font>';
  }
}

//Clear dialog box for TGS Articles
function clearTGSArticles(){
  document.getElementById('tgsArticleLink').value = "";
}
