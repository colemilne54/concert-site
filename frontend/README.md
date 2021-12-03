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

The components folder contains the following files:
* add-concert.js
* concerts-list.js
* login.js
