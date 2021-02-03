const socket = io('http://localhost:3000');
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msgForm');
socket.on('message', data => {
  console.log(data)
  appendMessages(data)
})
socket.on('output-messages', data => {
  console.log(data)
  if (data.length) {
    data.forEach(message => {
      appendMessages(message.msg+" "+message.memId)
    });

    var objDiv = document.getElementById("msg-wrapper");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
})

$('#input').keyup(function () {
  var charCount = $(this).val();
  charCount = charCount.trim().length;
  if (charCount >= 1) {
    $('.send-btn').addClass('active-send-btn');
  } else {
    $('.send-btn').removeClass('active-send-btn');
  }
});


msgForm.addEventListener('submit', e => {
  e.preventDefault()
  var typed_msg = msgForm.msg.value.length;
  if (typed_msg > 0) {
    var mymessage = msgForm.msg.value.trim();
    $('.send-btn').removeClass('active-send-btn');
    socket.emit('chatmessage', mymessage)
    console.log('submit from msgfrom', mymessage)
    msgForm.msg.value = '';
  }
})

function appendMessages(message) {
  var currentTime = "11:44 pm";
  const html = "<div class='bx chat-wrapper user'><div class='chat-bubble'><p>" + message + "</p><span class='bx time'>" + currentTime + "</span></div></div>";
  messages.innerHTML += html
  var objDiv = document.getElementById("msg-wrapper");
  objDiv.scrollTop = objDiv.scrollHeight;
}