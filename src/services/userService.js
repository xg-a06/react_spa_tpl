const checkLogin = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({ role: 'admin' });
    }, 4000)
  );

export default {
  checkLogin,
};
