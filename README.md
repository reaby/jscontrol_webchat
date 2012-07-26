#WebChat for JsControl

Webchat interface for ManiaPlanet server using [JsControl](https://github.com/Tgys/JsControl)

##Requirements

Node.JS installed.
Web server with PHP 5.3 configured and accessible from the web.
Free port for Node.JS at port 8081 and accessible from the web.

##Installation instructions for webchat

1. [Install Node.JS](http://nodejs.org/)
2. type at terminal / windows console: "npm install socket.io" without quotes
3. Install JsControl
4. Setup the plugin by inserting this line to config.js
    " config.plugins.push('webchat.js'); "
5. Copy contents of *apache*-folder to some good place at your webserver 
6. Start JsControl
7. Open web-browser and visit your webserver where you placed the contents of *apache* folder..

##Please note

that for now the webserver and the dedicated server must be at same machine and same ip to work.

##Notice

due of a feature of dedicated server all ChatSendServerMessageToLogin() calls, ie personalized chatmessages will be also shown at the webchat!
