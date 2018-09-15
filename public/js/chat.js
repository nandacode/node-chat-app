var socket = io();

function scrollToBottom () {
    // selector
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var lastMessage = newMessage.prev();
    // height
    var scrollHeight = messages.prop('scrollHeight');
    var scrollTop = messages.prop('scrollTop');
    var clientHeight = messages.prop('clientHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = lastMessage.innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
});

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    }); 
});

var sendLocationButton = jQuery('#send-location');
sendLocationButton.on('click', function (e) {
    e.preventDefault();

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    sendLocationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        sendLocationButton.removeAttr('disabled').text('Send location');
    }, function () {
        alert('Unable to fetch location');
        sendLocationButton.removeAttr('disabled').text('Send location');
    });

});