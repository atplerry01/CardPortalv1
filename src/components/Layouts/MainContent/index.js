import React, { Component } from 'react'

export default class index extends Component {
    render() {
        const { children } = this.props
        return (
            
        <main className="app-main">

        <div className="wrapper">

          <div className="page">

            <div className="page-inner">
                { children }

            </div>
          </div>
        </div>
      </main>
    
        )
    }
}
