WebChat for JsControl
=========
Webchat interface for ManiaPlanet server using [JsControl](https://github.com/Tgys/JsControl)

Requirements
=========
Node.JS installed.
Web server with PHP 5.3 configured at port 80 and accessible from the web.
Free port for Node.JS at port 8080 and accessible from the web.

Installation instructions for webchat
=========
1. [Install Node.JS](http://nodejs.org/)
2. Install JsControl
3. Setup the plugin by inserting this line to config.js
    " config.plugins.push('webchat.js'); "
4. Copy contents of *web*-folder to some good place at your webserver 
5. Start JsControl
6. Open web-browser and visit your webserver where you placed the contents of *web* folder..

*note*, for now the webserver and the dedicated server must be at same machine and same ip to work.

