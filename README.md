# Marker

Marker is a simple self‑hosted bookmark server that lets you store and manage bookmarks from any browser, all in a single unified location.

## Installation

### Install the bookmark server

Run this command on your server or local machine (Linux or WSL):

```
curl -fsSL https://raw.githubusercontent.com/hwisnu222/marker/main/install.sh | sudo bash
```

### Start the server

Once installed, simply run:

```
marker
```

Server is now running

## Add the browser client (userscript)

To save bookmarks directly from your browser, you will need to install the Marker userscript.

First, install the Violentmonkey extension in your browser.
Then add the Marker script by visiting this URL:

```
https://raw.githubusercontent.com/hwisnu222/marker/main/userscript/marker.js
```

## How it works

After installing the userscript, you will see a bookmark icon in the top‑right corner of every website you visit.

Click the icon to save any page to your Marker server.
You can then access all your bookmarks from any browser or device in one central place.

## Notes

Marker server currently supports Linux and Windows Subsystem for Linux (WSL).
