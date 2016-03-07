var https = require('https');
var config = require('../config/config.js');
var querystring = require('qs');

var telegram = {

    sendMessage: function(chat_id, text) {
        // Send the chat id, message to reply to, and the message to send
        var telegramRequestData = querystring.stringify({
            chat_id: chat_id,
            text: text,
        });

        // Define the POST request
        var telegramRequestOptions = {
            host: 'api.telegram.org',
            port: 443,
            path: '/bot' + config.telegramToken + '/sendMessage',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': telegramRequestData.length
            }
        };

        // Execute the request
        var telegramRequest = https.request(telegramRequestOptions, function(telegramResponse) {
            telegramResponse.setEncoding('utf8');

            // Read the response (not used right now, but you can log this to see what's happening)
            var output = '';
            telegramResponse.on('data', function (chunk) {
                output += chunk;
                console.log(output);
            });

            // Log the response status code
            telegramResponse.on('end', function() {
                console.log('Telegram - received response code: ' + telegramResponse);
            });
        });

        // Log errors
        telegramRequest.on('error', function(err) {
            console.error('Telegram API error: ' + err.message);
        });

        // Send the data
        telegramRequest.write(telegramRequestData);

        // Done
        telegramRequest.end();

    },

};

module.exports = telegram;
