
function getMessages(){
  setInterval("api()",5000)
}

function init(){
  api();
  getMessages();
}

function api(){
  //console.log("Begin Script");
  var token = "
  $.ajax({
    datatype: 'json',
    url: 'https://discord.com/api/channels/487679359566741504/messages',
    headers: {
      "Authorization": 'Bot ' + token,
    },
    success: function(messages)
    {
      document.getElementById('test').innerHTML = '';
      var i, id, message;
      for (i=0; i < messages.length; i++){
        message = messages[i].content;
        console.log(message.substring(0,4));

        if (message.substring(0,4) == 'img '){
          message = message.substring(4,1000);
          document.getElementById('test').innerHTML += `<div align='center'><img src='` + message + `' style='max-width: 100%; height: auto;'></div>`;
        }
      }
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
  //console.log("End Script");
};
