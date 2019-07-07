/**
 * The main class for handling the Shouts feed.
 */
import { getEl, createEl, wpUrl } from '../helpers';
import { token as loginToken } from '../config';
import ShoutForm from './ShoutForm';
import LoginForm from './LoginForm';
import Cookies from 'js-cookie';
import axios from 'Axios';

class Feed {
	constructor( container ) {
		this.container = container;
	}

	init() {
		this.loadFeedView();
		this.addEventListeners();
	}

	addEventListeners() {
		getEl( 'into-the-void-logout' ).addEventListener( "click", this.endSession );
	}

	endSession() {
		Cookies.set( loginToken, null );
		new LoginForm( getEl( 'the-void' ) ).init();
	}

	loadFeedView() {
		this.loadLogout();
		this.loadShoutInput();
		this.loadFeed();
	}

	loadLogout() {
		this.container.innerHTML = `
			<button id="into-the-void-logout">Logout</button>
		`;
	}

	loadShoutInput() {
		new ShoutForm( this.container ).init();
	}

	loadFeed() {
		axios( {
			url: `${wpUrl()}/wp-json/the-void/v1/shout/`,
			method: "GET"
		} ).then( response => {
			const shoutContainer = createEl( 'div' );

			this.container.append( shoutContainer );

			let count = response.data.length;
			let markup = '';
			const shouts = response.data;

			shouts.forEach((shout) => {
				markup += `
					<div class="shout-${shout.id}">
						<p>${shout.status}</p>
					</div>
				`;
			});



			shoutContainer.innerHTML = `
				<div class="shouts">
					${markup}
				</div>
			`;
		} ).catch( error => {
			console.table( error );
		} )
	}
};

export default Feed;
