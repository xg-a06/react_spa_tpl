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

function getCom(BUILD_ENV) {
  return BUILD_ENV === 'local' ? hot(module)(TodoList) : TodoList;
}

export default getCom(process.env.BUILD_ENV);
