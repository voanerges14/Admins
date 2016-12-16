import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    // const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us"/>

        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1530.1493831893697!2d24.01079420257433!3d49.83504903945617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add799fb83c41%3A0xe4f50a6accc5c42a!2z0LLRg9C70LjRhtGPINCh0YLQtdC_0LDQvdCwINCR0LDQvdC00LXRgNC4LCDQm9GM0LLRltCyLCDQm9GM0LLRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0Yw!5e0!3m2!1suk!2sua!4v1479797844219"
            width="600" height="450">
        </iframe>

        <h3>Mini Bar <span style={{color: '#aaa'}}>(not that kind)</span></h3>

        <p>Hey! You found the mini info bar! The following component is display-only. Note that it shows the same
          time as the info bar.</p>

        <MiniInfoBar/>

        <h3>Video</h3>

        <p>
          Psst! Would you like to see a video?

          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}</button>
        </p>

        {showKitten &&
        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/Cau8SZpO6m4"></iframe>
          {/* <img src={kitten}/>*/}
        </div>}
      </div>
    );
  }
}
