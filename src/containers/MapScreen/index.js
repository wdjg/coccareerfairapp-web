import React, { Component } from 'react';
import './MapScreen.css';

import { connect } from 'react-redux'
import ReactImageZoom from 'react-image-zoom'
import DefaultImage from '../../resources/def-image.svg'

class MapScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {file: '', imagePreviewUrl: ''};
	}

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="defaultImage"><img src={DefaultImage} alt=""/></div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
        </form>
        <div className="imgPreview">
          {imagePreview}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
	user: state.user,
	width: 750,
	height: 550,
	zoomWidth: 100,
	img: this.imagePreview,
});

export default connect(mapStateToProps)(MapScreen);