# emory_maps

An website designed to provide a streamlined experience in navigating Emory University's campus. 
Designed with GoogleMapsAPI, and other API's associated with such, i.e. PlacesAPI, this website picks the most optimal routes from one place to another on Emory's campus.

The current deployed website is [here](https://eaglemaps.link).

## Documentation of app:

This website is comprised a main `index.html`, that is deployed through AWS services, AWS Amplify. The backend is run by `app.js`, through NodeJS. `app.js` is deployed by Heroku, and it retrieves its information from our database MongoDB, which contains information about buildings on campus. Furthermore, information about current events is also scraped from the [Hub](https://emory.campuslabs.com/engage/), Emory's website containing current events through `scraper.java`.


Created by Dijkstra's Disciples for CS370, Fall 2022.
