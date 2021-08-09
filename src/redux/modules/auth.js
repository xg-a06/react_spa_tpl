import userService from '../../services/userService';

const model = {
  key: 'auth',
  state: {},
  reducers: {
    update(state, payload) {
      return payload;
    },
  },
  effects: {
    async checkLogin() {
      const res = await userService.checkLogin();
      this.update(res);
    },
  },
};

export default model;
