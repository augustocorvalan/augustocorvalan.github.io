import React from 'react';
import 'styles/header.css';
//components
import HeaderItem from 'components/HeaderItem';
//icons
import { FaGithub, FaEnvelopeO } from 'react-icons/lib/fa';

const Header = () => {
	return (
		<div className='headerWrapper'>
			<HeaderItem>
				<a href="https://github.com/augustocorvalan/" target="_blank">
					<FaGithub />
				</a>
			</HeaderItem>
			<HeaderItem isBig={true}><p>Augusto Corvalan</p></HeaderItem>
			<HeaderItem>
				<a href="mailto:augustocorvalan@gmail.com">
					<FaEnvelopeO />
				</a>
			</HeaderItem>
		</div>
	)
}

export default Header;