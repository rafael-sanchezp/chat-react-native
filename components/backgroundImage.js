import React, { Component } from 'react';
import {Dimensions, ImageBackground} from 'react-native';
const {height,width} = Dimensions.get('window');

export default class BackgroundImage extends Component {
	render () {
		const {source, children,imageStyle,containerStyle} = this.props;
		return (
			<ImageBackground
				source={source}
				style={containerStyle}
                imageStyle={imageStyle}
			>
				{children}
			</ImageBackground>
		)
	}
}