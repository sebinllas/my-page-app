import React, { Component } from 'react';
import './css/NewLinkForm.css'
import SelectLogo from './SelectLogo';
import images from '../assets/images';
import loading from '../assets/images/autorenew_black_24dp.svg';

class NewLinkForm extends Component {
	timeout;
	state = images;

	fetchLogo() {
		var myHeaders = new Headers();
		myHeaders.append('x-api-key', '2pO9qw57ZY7Fs2zG2Wv4032kDc9a7YvxBe45v9J5');
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			domain: this.props.values.url,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		if (this.props.values.url !== '' && this.props.values.url.length > 5) {
			console.log('fetching', this.props.values.url, ' logo');
			fetch('https://api.brandfetch.io/v1/logo', requestOptions)
				.then((response) => response.text())
				.then((result) => {
					console.log(result);
					let nextState = this.state;
					if (JSON.parse(result).response.icon) {
						nextState.logos.fetched = JSON.parse(result).response.icon.image;
						nextState.fetching= false;
					} else if (JSON.parse(result).response.logo) {
						nextState.logos.fetched = JSON.parse(result).response.logo.image;
						nextState.fetching= false;
					} else {
						nextState.logos.fetched = loading;
						nextState.fetching= true;
					}

					this.setState({ nextState });
					console.log('state: ', this.state);
				})
				.catch((error) => console.log('error', error));
		}
	}
	hadleStopWriting = (e) => {
		console.log('typing');
		let nextState = this.state;
		nextState.logos.fetched = loading;
		nextState.fetching= true;
		if(e.target.value === ''){
			delete nextState.logos.fetched;
			nextState.fetching= false;
		}
		this.setState(nextState);
		clearInterval(this.timeout);
		this.timeout = setTimeout(() => {
			console.log(' stop typing');
			this.fetchLogo();
			clearTimeout(this.timeout);
		}, 1000);

	};
	render() {
		return (
			<div className='NewLinkForm'>
				<form onSubmit={this.props.onSubmit}>
					<input
						required={true}
						type="text"
						name="title"
						id="title"
						value={this.props.values.title}
						placeholder="Título"
						onChange={this.props.onChange}
						maxLength={24}
						autoComplete='off'
					/>
					<br />
					<input
						required={true}
						type="text"
						name="url"
						id="url"
						value={this.props.values.url}
						placeholder="Dirección URL"
						onChange={this.props.onChange}
						onInput={this.hadleStopWriting}
						autoComplete='off'
						
					/>
					<br />
					<input
						type="text"
						placeholder="Descripción"
						name="description"
						id="description"
						onChange={this.props.onChange}
						value={this.props.values.description}
						maxLength={80}
						autoComplete='off'
					/>
					<br />
					<SelectLogo logos={this.state.logos} fetching={this.state.fetching} onImageClick={this.props.onImageClick} />
					<br />
				</form>
			</div>
		);
	}
}

export default NewLinkForm;
