
function getMessages(){
  setInterval("api()",30000)
}

function init(){
  api();
  getMessages();
}

function api(){
  //console.log("Begin Script");
  var token = "MzgwNTM3MzkzNjMzMDM0MjUx.XoqMaw.zTPJNSi0YKv69_3zR4UA2VWOmFs";
  $.ajax({
    datatype: 'json',
    url: 'https://discordapp.com/api/channels/487679359566741504/messages',
    headers: {
      "Authorization": 'Bot ' + token,
    },
    success: function(messages)
    {
      document.getElementById('test').innerHTML = '';
      var i, author, message;
      for (i=0; i < messages.length; i++){
        author = messages[i].author.username + ' #' + messages[i].author.discriminator;
        message = messages[i].content;
        console.log(message.substring(0,4));

        if (message.substring(0,4) == 'img '){
          message = message.substring(4,1000);
          document.getElementById('test').innerHTML += `<table width='100%'><tr><td align='center' style='font-size:30px'>` + author + `</td></tr><td align='center'><img src='` + message + `' style='max-width: 100%; height: auto;'></td></tr></table>`;
        }
      }
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
  //console.log("End Script");
};
