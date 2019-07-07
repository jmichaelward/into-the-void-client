/**
 * The main handler for the Login Form.
 */
import { getEl } from '../helpers';
import { form, token as loginToken } from '../config';
import Feed from './Feed';
import axios from 'Axios';
import Cookies from 'js-cookie';

class LoginForm {
	constructor( container ) {
		this.container  = container;
		this.formMarkup = this.getFormMarkup();
	}

	init() {
		this.container.innerHTML = this.formMarkup;
		this.addEventListeners();
	}

	getFormMarkup() {
		return `
			<form id="${form.id}">
				<input type="text" name="username" class="${form.id}__username" placeholder="Enter your username."/>
				<input type="password" name="password" class="${form.id}__password" placeholder="Enter your password."/>
				<input type="submit" class="${form.id}__submit" value="Login"/>
			</form>
		`;
	}

	addEventListeners() {
		getEl( form.id ).addEventListener( "submit", this.attemptLogin );
	}

	attemptLogin( event ) {
		event.preventDefault();

		const submission = event.target;
		const username = submission.querySelector(form.username).value;
		const password = submission.querySelector(form.password).value;

		axios({
			method: 'POST',
			url: 'https://the-void.localhost/wp-json/jwt-auth/v1/token',
			data: {
				username: username,
				password: password
			}
		}).then(response => {
			Cookies.set( loginToken, response.data.token, {
				expires: 1,
				secure: true,
			});
			new Feed( getEl( 'the-void' ) ).init();
		}).catch(error => {
			console.error('User credentials invalid.');
			console.table(error);
		});
	}
}

export default LoginForm;
