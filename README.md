# obs-http
Start a local http server to control OBS in your network

---------------
## Install
1. [OBS-websockets](https://obsproject.com/forum/resources/obs-websocket-remote-control-obs-studio-from-websockets.466/) plugin needs to be installed in the OBS client.

2. Download this repository and start the executable file or open the .js file in node. Enter the IP, port and password of your OBS websocket server. (If OBS is running on the same PC enter localhost)

3. The http server should now be reachable at localhost:3000

------------------
## Usage
Right now there is only the http `/setitemvisible` GET route to change the visiblity of scene items.

Query parameter | Description
------------ | -------------
scene | Scene Name (required)
item | Name of the item / source inside the scene (required)
visible | Either true or false

Example to make the source of "SoundAlerts" in scene "SceneName" visible: `localhost:3000/setitemvisible?scene=SceneName&item=SoundAlerts&visible=true`



------------------
## Add more
Feel free to add more express routes and OBS remote options. Git clone this repository and start the app in node.



OBS-websocket protocol: https://github.com/Palakis/obs-websocket/blob/4.x-current/docs/generated/protocol.md
