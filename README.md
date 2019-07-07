# Into the Void Client
This is a work-in-progress front-end app to interact with the
[Into the Void](https://github.com/jmichaelward/into-the-void) WordPress plugin.
It requires a separately-running instance of WordPress with both the Into the Void
and [JWT Authentication for WP-API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
plugins installed, configured, and activated.

## Installation
1. Clone this repo.
2. `cp .env.example .env` and fill out the pertinent environment variables.
3. Run `npm install`
4. Run `npm run start` to fire up the local development environment.

## Usage
Once everything is up and running, you should be able to access the client
site at https://localhost:3000. From there, you can log in to WordPress
and begin posting. The client app will display the 10 previous shouts on
page refresh (for now – this is just a proof-of-concept at the moment,
but nice things such as user-specific feeds, auto-updating of the feed,
and the ability to see more shouts than 10 are in development).
