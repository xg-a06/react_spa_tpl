import { connect, actions } from '@/redux';

import View from './overview';

const stateFn = (state) => {
  const { resultType } = state.app;
  return {
    resultType,
  };
};

const actionFn = () => {
  const { setResultType } = actions.app;

  return { setResultType };
};

export default connect(stateFn, actionFn)(View);
