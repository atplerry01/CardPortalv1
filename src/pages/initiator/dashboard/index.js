import React, { Component } from 'react';
import ContentHeader from '../../../components/AppComponent/ContentHeader';
import Authorize from '../../../components/LayoutComponents/Authorize';

export default class index extends Component {
  render() {
    return <Authorize roles={['']} redirect to="/">
      <ContentHeader />
      <div className="page-section">
        <div className="section-block">
          <p>Hello world!</p>
        </div>
      </div>
      Initiator Dashboard
      </Authorize>
  }
}
