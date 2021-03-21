const model = {
  key: 'app',
  state: {
    resultType: 'test',
  },
  reducers: {
    setResultType(state, payload) {
      state.resultType = payload;
    },
  },
};

export default model;
