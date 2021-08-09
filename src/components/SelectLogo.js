import React, { Component } from 'react';
import './css/SelectLogo.css';
import leftArrow from '../assets/images/chevron_left_black_48dp.svg';
import rightArrow from '../assets/images/chevron_right_black_48dp.svg';

export default class SelectLogo extends Component {
	state = { images: {} };
	logosContainer = React.createRef();
	scrollDivLeft = (e) => {
		e.preventDefault();
		let i = 0;
		let interval = setInterval(()=>{
			i++;
			this.logosContainer.current.scrollLeft -= 2;
			if(i === 50){
				clearInterval(interval);
			}

		}, 5)
	}
	scrollDivRight = (e) => {
		e.preventDefault();
		let i = 0;
		let interval = setInterval(()=>{
			i++;
			this.logosContainer.current.scrollLeft += 2;
			if(i === 50){
				clearInterval(interval);
			}

		}, 5)
		
	}
	render() {
		return (
			<div className="SelectLogo">
				<button onClick={this.scrollDivLeft} >
					<img src={leftArrow} alt="left arrow" id='leftArrow' />	
				</button>
				<div className="LogosContainer" ref={this.logosContainer}>
					{Object.getOwnPropertyNames(this.props.logos).reverse().map((value, index) => {

						return (
							<img
								id={this.props.fetching && index === 0 ? 'loadingIcon' : 'icon'}
								className='icon'
								src={this.props.logos[value]}
								alt={value + ' icon'}
								key={index}
								onClick={this.props.onImageClick}
							/>
						);
					})}
				</div>
				<button onClick={this.scrollDivRight} ><img src={rightArrow} alt="right arrow" id='rightArrow'/></button>
			</div>
		);
	}
}
