# Backend

Within our backend root folder the two main files are index and server

index is what setups our Mongo connection and server is what runs our server, calls express, and connects to our api route.

## API

In our API folder is where our controller and route files exist.

Our controller setups the structure for our post and get operations.
Along with this it contains our code for the filters, which on the frontend are our search functions.

Our router is straightfoward creating a route for our CRUD operations along with two separate routes needed for our dropdown searches for venue type and genre.
