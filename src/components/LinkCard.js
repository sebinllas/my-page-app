import React, { Component, useRef } from 'react';
import './css/LinkCard.css';

export default function LinkCard(props) {
	const deleteBtnRef = useRef()
	const handleMouseOver = e => {
		if (props.deleteLink) {
			deleteBtnRef.current.style.display = "block"
		}
		
	}
	const handleMouseOut = e => {
		deleteBtnRef.current.style.display = "none"
	}
	const handleDeleteClick = e => {
		e.preventDefault()
		if (props.deleteLink) {
			props.deleteLink(props.i)
		}
		return
	}
	return (
		<a
			target="_blank"
			rel="noreferrer"
			className="LinkCard"
			href={props.url}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<img src={props.logoUrl} alt="logo" className="icon" />
			<div>
				<h3 className="LinkTitle">{props.title}</h3>
				<p className="LinkDescription">{props.description}</p>

			</div>
			<button className="deleteBtn" ref={deleteBtnRef} onClick={handleDeleteClick}>✖</button>

		</a>

	);
}
