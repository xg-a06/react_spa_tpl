const checkLogin = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({ role: 'admin' });
    },2000)
  );

export default {
  checkLogin,
};
