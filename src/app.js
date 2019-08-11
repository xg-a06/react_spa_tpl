import { hot } from 'react-hot-loader';
import React, { PureComponent, Fragment } from 'react';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        app
      </Fragment>
    );
  }
}


export default hot(module)(TodoList);
