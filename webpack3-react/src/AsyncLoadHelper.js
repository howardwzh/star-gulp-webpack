import React, { Component } from 'react';

const AsyncLoadHelper = (importComponent) => {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        Component: null
      }
    }

    async componentDidMount () {
      const { default: Component } = await importComponent()
      this.setState({
        Component
      })
    }

    render() {
      const {Component} = this.state
      return (
        Component ? <Component {...this.props} /> : <div>loading</div>
      )
    }
  }
  return AsyncComponent
}

export default AsyncLoadHelper