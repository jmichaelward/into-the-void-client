/**
 * The main class for the Into the Void client app.
 */

import Feed from './components/Feed';
import LoginForm from './components/LoginForm';
import { getEl }  from './helpers';
import { token as loginToken } from './config';
import Cookies from 'js-cookie';

/**
 *
 */
class App {
	/**
	 *
	 */
	constructor() {
		this.props = {
			container: getEl( 'the-void' ),
			handler: null,
		}
	}

	/**
	 *
	 */
	init() {
		this.loadInitialView();
	}

	/**
	 *
	 */
	loadInitialView() {
		const container = this.props.container;

		this.props.handler = 'undefined' !== Cookies.get( loginToken ) ? new Feed( container ) : new LoginForm( container );
		this.props.handler.init();
	}
}

export default App;
