# Assignment #9 - Giphy API

Open index.html with Live Server. Create a key at https://developers.giphy.com/ and enter it in the Giphy API key field. The page does not save the key.

Click Fetch a GIF to load 12 running GIFs, or enter a keyword to search for something else. Each search replaces the previous results.

The project uses fetch(), async/await and an images array. It also handles missing keys, empty results and failed requests. The API key is sent directly to Giphy from the browser.

Verified with a real Giphy API key: the default search and a swimming search each returned 12 GIFs. The local .env file is excluded from Git; enter the key in the page to use it.

