/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import ajax from './ajax';

// 后续配合错误码封装通用错误处理
const client = async (options = {}) => {
  options.baseUrl = process.env.API_PATH;
  const res = await ajax(options);
  // res.code
  if (res.data?.errorCode) {
    console.error(res.data.errorMsg);
    return new Promise(() => {});
  }

  return res.data;
};

export default client;
