This directory contains the contents of an export from the Avenza MAPublisher Web Author tool.  Avenza 
MAPublisher Web Author flash maps are designed to be deployed into a single directory on a web server.  
Copy this folder into the directory on your server that contains the html file that you plan to embed 
the map into.  It is possible to host different content types at different domains.  Please refer 
to the Avenza MAPublisher Web Author documentation for more details.

- avenza.js

This is the Avenza MAPublisher JavaScript API implementation file.  In order to use any of the methods 
or classes in AVENZA namespace this file must be distributed with the map and included with a <script>
element.


- swfobject.js

This is the implementation file for the swfobject JavaScript library (http://code.google.com/p/swfobject/),
which the Avenza MAPublisher JavaScript API is built on.  It must be distributed and included in the same
way as avenza.js.


- expressInstall.swf

This the Adobe Flash Player Express Install swf.  It is used to upgrade systems with older versions of 
flash player.  See http://kb2.adobe.com/cps/253/6a253b75.html for details.  If the map is embedded using
the AVENZA.embedViewer API then this file must be deployed with the map.


- MAPublisherViewer-local.swf and MAPublisherViewer.swf

These are the Avenza map viewer implementation files.  MAPublisherViewer.swf must be distributed with the 
map.  MAPublisherViewer-local.swf is compiled to allow for access to local files without security warnings. 
If the AVENZA.embedViewer API is used to embed the map, then MAPublisherViewer-local.swf will be used when 
the browser is opening a local file.  This is a convenience for working with maps that are not deployed over 
a network. If the map will not be used this way, they MAPublisherViewer-local.swf does not need to be 
included with the map.


- map_LN.swf (where N is 1, 2, 3, ...)

These are the exported map layer files.  They must be deployed with the map.


- map.png

This is an image of the map in its default state.  If the AVENZA.embedMap API is used to embed the map 
this image will be used as default map content until flash is finished loading.  If the map is not embedded
this way, or the background image behaviour is not used, this file does not need to be deployed.


- map.xml.zip (or map.xml)

This is the data file for the map.  It must be deployed with the map.


- viewer_parameters.txt

This file is used by MAPublisherViewer.swf to load parameters when it is opened in the Flash Projector
application.  
