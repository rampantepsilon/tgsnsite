function getReleases(){
  var title = [], date = [], platform = [];
  var title1 = [], date1 = [], platform1 = [];

  var start = document.getElementById('startYear').value + '-' + document.getElementById('startMonth').value + '-' + document.getElementById('startDate').value;
  var offset = document.getElementById('offset').value;
  var numReleases = results(api, start);
  var t1 = `<tr><td id='name'>`;
  var t2 = `</td><td id='date' align='center'>`;
  var t3 = `</td></tr><tr><td id='platform' colspan='2'>`;
  var t4 = `</td></tr><tr><td>=========================================================</td></tr>`;

  $.ajax({
    datatype: 'json',
    url: 'https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/releases/?api_key=' + api + '&offset=' + offset +'&sort=release_date:asc&filter=release_date:' + start + '&format=json',
    success: function(data)
    {
      var offsetCheck = offset;
      var results = parseInt(data.number_of_total_results, 10);
      var max = results - offsetCheck;
      console.log(max);
      if (max < 100){
        for (i = 0; i < max; i ++ ){
          if (data.results[i].region == 'North America'){
            if (data.results[i].platform != 'PC'){
              if (data.results[i].platform != 'Macintosh'){
                if (data.results[i].platform != 'Linux'){
                  title1[i] = data.results[i].name;
                  date1[i] = data.results[i].release_date.substring(5,10) + '-' + data.results[i].release_date.substring(0,4);
                  platform1[i] = data.results[i].platform;
                }
              }
            }
          }
        };
      } else {
        for (i = 0; i < 100; i ++ ){
          if (data.results[i].region == 'North America'){
            if (data.results[i].platform != 'PC'){
              if (data.results[i].platform != 'Macintosh'){
                if (data.results[i].platform != 'Linux'){
                  title1[i] = data.results[i].name;
                  date1[i] = data.results[i].release_date.substring(5,10) + '-' + data.results[i].release_date.substring(0,4);
                  platform1[i] = data.results[i].platform;
                }
              }
            }
          }
        };
      }
      var z = 0;
      for (k = 0; k < title1.length; k++){
        if (title1[k] != null){
          title[z] = title1[k];
          date[z] = date1[k];
          platform[z] = platform1[k];
          z += 1;
        }
      }
      for (j = 0; j < title.length; j++){
        document.getElementById('releases').innerHTML += t1 + title[j] + " (" + platform[j] + ")" + t2 + date[j] + t4;
      }
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
}

function results(api, start){
  $.ajax({
    datatype: 'json',
    url: 'https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/releases/?api_key=' + api + '&sort=release_date:asc&filter=release_date:' + start + '&format=json',
    success: function(channel)
    {
      console.log(channel.number_of_total_results);
      document.getElementById('results').innerHTML = 'Results: ' + channel.number_of_total_results;
      return channel.number_of_total_results;
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
}

function addDay(){
  var currentMonth = document.getElementById('startMonth').value;
  var currentDay = document.getElementById('startDate').value;
  var currentYear = document.getElementById('startYear').value;
  currentMonth = parseInt(currentMonth, 10);
  currentDay = parseInt(currentDay, 10);
  currentYear = parseInt(currentYear, 10);

  if (currentMonth < 12){
    if (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10){
      if (currentDay != 31){
        document.getElementById('startDate').value = currentDay + 1;
      } else if (currentDay = 31){
        document.getElementById('startDate').value = 1;
        document.getElementById('startMonth').value = currentMonth + 1;
      }
    } else if (currentMonth == 2){
      if ((currentYear % 4) == 0){
        if (currentDay != 29){
          document.getElementById('startDate').value = currentDay + 1;
        } else if (currentDay == 29){
          document.getElementById('startDate').value = 1;
          document.getElementById('startMonth').value = currentMonth + 1;
        }
      } else {
        if (currentDay != 28){
          document.getElementById('startDate').value = currentDay + 1;
        } else if (currentDay == 28){
          document.getElementById('startDate').value = 1;
          document.getElementById('startMonth').value = currentMonth + 1;
        }
      }
    } else {
      if (currentDay != 30){
        document.getElementById('startDate').value = currentDay + 1;
      } else if (currentDay == 30){
        document.getElementById('startDate').value = 1;
        document.getElementById('startMonth').value = currentMonth + 1;
      }
    }
  } else {
    if (currentDay != 31){
      document.getElementById('startDate').value = currentDay + 1;
    } else if (currentDay = 31){
      document.getElementById('startDate').value = 1;
      document.getElementById('startMonth').value = 1;
      document.getElementById('startYear').value = currentYear + 1;
    }
  }
}

function goToday(){
  var d = new Date();
  document.getElementById('startMonth').value = (d.getMonth() + 1);
  document.getElementById('startDate').value = d.getDate();
  document.getElementById('startYear').value = d.getFullYear();
}

function add100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current += 100;
  document.getElementById('offset').value = current;
}

function rem100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current -= 100;
  document.getElementById('offset').value = current;
}
