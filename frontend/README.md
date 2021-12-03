# Frontend

This is our frontend code which is built using Reactjs.

## Public

Our public folder contains our index.html and any other files that need to be accessed by our other React code in the src folder.
The reason for things like our logo and favicon being placed here is that the way React references files.
They can't be in some random folder structure to be accessed, it wants these files only in the public folder

## Src

Our source folder is what contains the heart of our frontend.
Within the base of the src folder the only files we modified (from those React generates) was App.js in which we created out navbar and added small bits of code relating to the login

### Services

Services contains concert.js

This file has our ConcertDataService class which is used in our components to connect the frontend to our backend.
It accomplishes this by using the http-common module to add get and put functionality that was used to accomplish various tasks that are outlined in the components section

### Components

For our project each React component serves as a page on our site.

The components folder contains the following files:

* add-concert.js

Add concerts is our form page where logged in users go to submit concert data to our Mongo database. 

* concerts-list.js

Concerts list is our hompage. This is the view users would go to view concerts.
Each concert is a card containing relevant information to the given concert, a flyer image (if submitted), a button that takes them to the venues ticket/ details page, and a view map button that opens up a Google Maps page with the location of the concert.

For search functionality you are able to find conerts via 5 different search methods.
In a traditonal search bar you are able to search by the name of the band, venue name, or city of the venue. 
Dropdown search functionality exists for venue type and the band's genre.

* login.js
