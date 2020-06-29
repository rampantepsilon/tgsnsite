//On Load
document.addEventListener('DOMContentLoaded', event =>{
    //Initialize Constants
    const app = firebase.app();
    const db = firebase.firestore();
    const schedule = db.collection('schedule').doc('new');

    //Setup New Layout
    layout();

    //Calculate dates
    dates();

    //Load Information
    schedule.onSnapshot(doc => {
      const day = doc.data();

      //Fill Monday Fields
      $('#mTime').html(day.monday[0]);
      $('#mPShow').html(day.monday[1]);
      $('#mShow').html(day.monday[2] + "<br>(" + day.monday[3] + ")");

      //Fill Tuesday Fields
      $('#tuTime').html(day.tuesday[0]);
      $('#tuPShow').html(day.tuesday[1]);
      $('#tuShow').html(day.tuesday[2] + "<br>(" + day.tuesday[3] + ")");

      //Fill Wednesday Fields
      $('#wTime').html(day.wednesday[0]);
      $('#wPShow').html(day.wednesday[1]);
      $('#wShow').html(day.wednesday[2] + "<br>(" + day.wednesday[3] + ")");

      //Fill Thursday Fields
      $('#thTime').html(day.thursday[0]);
      $('#thPShow').html(day.thursday[1]);
      $('#thShow').html(day.thursday[2] + "<br>(" + day.thursday[3] + ")");

      //Fill Friday Fields
      $('#fTime').html(day.friday[0]);
      $('#fPShow').html(day.friday[1]);
      $('#fShow').html(day.friday[2] + "<br>(" + day.friday[3] + ")");

      //Fill Saturday Fields
      $('#saTime').html(day.saturday[0]);
      $('#saPShow').html(day.saturday[1]);
      $('#saShow').html(day.saturday[2] + "<br>(" + day.saturday[3] + ")");

      //Fill Sunday Fields
      $('#suTime').html(day.sunday[0]);
      $('#suPShow').html(day.sunday[1]);
      $('#suShow').html(day.sunday[2] + "<br>(" + day.sunday[3] + ")");
    })
    setTimeout(`highlightToday();`,1700);
})

//Highlight Current Day on schedule
function highlightToday(){
  //Highlight Current Day
  var d = new Date();
  var month = (d.getMonth() + 1);
  var date = d.getDate();
  var fullDate = month + '/' + date;
  var hDay = d.getDay();

  if (hDay == 0){
    if (fullDate == document.getElementById('suDate').innerHTML){
      document.getElementById('sunday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 1){
    if (fullDate == document.getElementById('mDate').innerText){
      document.getElementById('monday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 2){
    if (fullDate == document.getElementById('tuDate').innerText){
      document.getElementById('tuesday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 3){
    if (fullDate == document.getElementById('wDate').innerText){
      document.getElementById('wednesday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 4){
    if (fullDate == document.getElementById('thDate').innerText){
      document.getElementById('thursday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 5){
    if (fullDate == document.getElementById('fDate').innerText){
      document.getElementById('friday').style.backgroundColor = 'gold';
    }
  }
  if (hDay == 6){
    if (fullDate == document.getElementById('saDate').innerText){
      document.getElementById('saturday').style.backgroundColor = 'gold';
    }
  }
}

function layout(){
  $('#monday').html(`
    <b><u>Monday <span id='mDate'></span></u></b>
    <div id='mTime'>&nbsp;</div>
    <div id='mPShow'>&nbsp;</div>
    <div id='mShow'>&nbsp;<br>&nbsp;</div>`);
  $('#tuesday').html(`
    <b><u>Tuesday <span id='tuDate'></span></u></b>
    <div id='tuTime'>&nbsp;</div>
    <div id='tuPShow'>&nbsp;</div>
    <div id='tuShow'>&nbsp;<br>&nbsp;</div>`);
  $('#wednesday').html(`
    <b><u>Wednesday <span id='wDate'></span></u></b>
    <div id='wTime'>&nbsp;</div>
    <div id='wPShow'>&nbsp;</div>
    <div id='wShow'>&nbsp;<br>&nbsp;</div>`);
  $('#thursday').html(`
    <b><u>Thursday <span id='thDate'></span></u></b>
    <div id='thTime'>&nbsp;</div>
    <div id='thPShow'>&nbsp;</div>
    <div id='thShow'>&nbsp;<br>&nbsp;</div>`);
  $('#friday').html(`
    <b><u>Friday <span id='fDate'></span></u></b>
    <div id='fTime'>&nbsp;</div>
    <div id='fPShow'>&nbsp;</div>
    <div id='fShow'>&nbsp;<br>&nbsp;</div>`);
  $('#saturday').html(`
    <b><u>Saturday <span id='saDate'></span></u></b>
    <div id='saTime'>&nbsp;</div>
    <div id='saPShow'>&nbsp;</div>
    <div id='saShow'>&nbsp;<br>&nbsp;</div>`);
  $('#sunday').html(`
    <b><u>Sunday <span id='suDate'></span></u></b>
    <div id='suTime'>&nbsp;</div>
    <div id='suPShow'>&nbsp;</div>
    <div id='suShow'>&nbsp;<br>&nbsp;</div>`);
}

function dates(){
  const app = firebase.app();
  const db = firebase.firestore();
  const schedule = db.collection('schedule').doc('new');

  schedule.onSnapshot(doc => {
    const field = doc.data();

    var startMonth = field.week[0];
    var startDay = field.week[1];
    var endMonth = field.week[2];
    var endDay = field.week[3];
    var weekDays = [];
    var dayCalc;
    var newMonthCounter = 0;

    if (startMonth == endMonth){
      for (i=0; i < 7; i++){
        weekDays[i] = (parseInt(startDay)+parseInt(i));
      }
      //Add Dates to schedule
      $('#mDate').html(startMonth + '/' + weekDays[0]);
      $('#tuDate').html(startMonth + '/' + weekDays[1]);
      $('#wDate').html(startMonth + '/' + weekDays[2]);
      $('#thDate').html(startMonth + '/' + weekDays[3]);
      $('#fDate').html(startMonth + '/' + weekDays[4]);
      $('#saDate').html(startMonth + '/' + weekDays[5]);
      $('#suDate').html(startMonth + '/' + weekDays[6]);
    }
    if (startMonth != endMonth){
      if (parseInt(startMonth) == 4 || parseInt(startMonth) == 6 || parseInt(startMonth) == 9 || parseInt(startMonth) == 11){
        //Get Amount of Days before month change
        dayCalc = 31 - parseInt(startDay);

        //Add Current Month
        for (i = 0; i < dayCalc; i++){
          weekDays[i] = startMonth + '/' + (parseInt(startDay)+parseInt(i));
        }

        //Add New Month
        for (j = weekDays.length; j < 7; j++){
          weekDays[j] = endMonth + '/' + (1 + parseInt(newMonthCounter));
          newMonthCounter++;
        }

        //Add Dates to schedule
        $('#mDate').html(weekDays[0]);
        $('#tuDate').html(weekDays[1]);
        $('#wDate').html(weekDays[2]);
        $('#thDate').html(weekDays[3]);
        $('#fDate').html(weekDays[4]);
        $('#saDate').html(weekDays[5]);
        $('#suDate').html(weekDays[6]);
      }

      if (parseInt(startMonth) == 1 || parseInt(startMonth) == 3 || parseInt(startMonth) == 5 || parseInt(startMonth) == 7 || parseInt(startMonth) == 8 || parseInt(startMonth) == 10 || parseInt(startMonth) == 12){
        //Get Amount of Days before month change
        dayCalc = 32 - parseInt(startDay);

        //Add Current Month
        for (i = 0; i < dayCalc; i++){
          weekDays[i] = startMonth + '/' + (parseInt(startDay)+parseInt(i));
        }

        //Add New Month
        for (j = weekDays.length; j < 7; j++){
          weekDays[j] = endMonth + '/' + (1 + parseInt(newMonthCounter));
          newMonthCounter++;
        }

        //Add Dates to schedule
        $('#mDate').html(weekDays[0]);
        $('#tuDate').html(weekDays[1]);
        $('#wDate').html(weekDays[2]);
        $('#thDate').html(weekDays[3]);
        $('#fDate').html(weekDays[4]);
        $('#saDate').html(weekDays[5]);
        $('#suDate').html(weekDays[6]);
      }

      if (parseInt(startMonth) == 2){
        //Get Amount of Days before month change
        dayCalc = 29 - parseInt(startDay);

        //Add Current Month
        for (i = 0; i < dayCalc; i++){
          weekDays[i] = startMonth + '/' + (parseInt(startDay)+parseInt(i));
        }

        //Add New Month
        for (j = weekDays.length; j < 7; j++){
          weekDays[j] = endMonth + '/' + (1 + parseInt(newMonthCounter));
          newMonthCounter++;
        }

        //Add Dates to schedule
        $('#mDate').html(weekDays[0]);
        $('#tuDate').html(weekDays[1]);
        $('#wDate').html(weekDays[2]);
        $('#thDate').html(weekDays[3]);
        $('#fDate').html(weekDays[4]);
        $('#saDate').html(weekDays[5]);
        $('#suDate').html(weekDays[6]);
      }
    }
  })
}
