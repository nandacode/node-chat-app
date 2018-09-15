var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li>', {'text': `${message.from}: ${message.text}`});
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li>');
    var a = jQuery('<a target="blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
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