/**
 * The handler for the Shout submission form.
 */
import { getEl, createEl, wpUrl } from '../helpers';
import axios from 'Axios';
import Cookies from 'js-cookie';
import { token as loginToken } from '../config';

class ShoutForm {
	constructor( container ) {
		this.container = container;
	}

	init() {
		this.createForm();
		this.addEventListeners();
	}

	createForm() {
		const form = createEl( 'div' );

		this.container.append( form );

		form.innerHTML = `
			<form id="into-the-void">
				<textarea name="shout" class="shout" placeholder="Shout into the void."></textarea>
				<input type="submit" value="Shout!"/>
			</form>
		`;
	}

	addEventListeners() {
		getEl( 'into-the-void' ).addEventListener( "submit", this.postShout );
	}

	postShout( event ) {
		event.preventDefault();

		const form = this;

		axios( {
			url: `${wpUrl()}/wp-json/the-void/v1/shout/`,
			method: "POST",
			data: {
				headers: {
					Authorization: `Bearer ${Cookies.get( loginToken )}`,
					"Content-Type": "application/json"
				},
				data: {
					content: event.target[ 0 ].value,
					status: 'publish'
				},
			}
		} )
			.then( response => {
				form[0].value = '';
			} ).catch( error => {
			console.table( error );
		} );
	}
}

export default ShoutForm;
