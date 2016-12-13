import React from 'react';
import * as style from './ImageUpload.scss';
export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''};
  }

  _handleSubmit(ee) {
    ee.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(ee) {
    ee.preventDefault();

    const reader = new FileReader();
    const file = ee.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl}/>);
    } else {
      $imagePreview = (<div className={style.previewText}>Please select an Image for Preview</div>);
    }

    return (
      <div className={style.previewComponent}>
        <form onSubmit={(ee) => this._handleSubmit(ee)}>
          <input className={style.fileInput} type="file" onChange={(ee) => this._handleImageChange(ee)}/>
          <button className={style.submitButton} type="submit" onClick={(ee) => this._handleSubmit(ee)}>Upload Image</button>
        </form>
        <div className={style.imgPreview}>
          {$imagePreview}
        </div>
      </div>
    );
  }
}
