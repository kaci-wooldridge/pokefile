## Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) (which comes with npm) installed on your computer.

### Clone the Repository

From your command line:

```bash
# Clone this repository
$ git clone git@github.com:kaci-wooldridge/pokefile.git

# Go into the client directory
$ cd poke-client
```


### Start the Application

```bash
# Start the application
$ npm start
```

## Database

Pokefile uses a JSON database to store user data. Run the following command to start the database server:

```bash
# Go into the database directory
$ cd poke-api

# Start the database server
$ json-server database.json -p 8088 -w
```
