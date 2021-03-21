/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
// 类get请求正则匹配
const getReg = /^(GET|DELETE|HEAD)$/i;

// 请求的基础配置
const baseOptions = {
  url: '',
  method: 'get',
  baseUrl: '',
  headers: {},
  data: {},
  withCredentials: true,
  responseType: 'json',
  timeout: 150000,
  async: true,
  cache: true,
  auto: true,
};

class AJAX {
  constructor(config) {
    const { auto } = config;
    this.config = config;
    if (auto) {
      return this.request();
    }
  }

  init() {
    let { method, data, cache, baseUrl, url } = this.config;
    // 处理请求
    this.config.method = method.toUpperCase();
    // 处理数据
    if (!/^http/.test(url)) {
      url = baseUrl + url;
    }
    if (getReg.test(method)) {
      const arr = Object.entries(data).reduce((tmp, [k, v]) => {
        tmp.push(`${k}=${encodeURIComponent(v)}`);
        return tmp;
      }, []);
      let dataStr = arr.join('&');
      if (!cache) {
        dataStr += `${dataStr ? '&' : ''}_=${Math.random()}`;
      }
      dataStr = dataStr ? `?${dataStr}` : '';
      this.config.url = url + dataStr;
      this.config.data = null;
    } else {
      this.config.data = JSON.stringify(data);
      if (!this.config.headers['content-type']) {
        this.config.headers['content-type'] = 'application/json';
      }
      this.config.url = url;
    }
  }

  open(xhr) {
    const { method, url, async } = this.config;
    xhr.open(method, url, async);
  }

  set(xhr, reject) {
    const { headers, responseType, timeout } = this.config;
    Object.entries(headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v);
    });
    xhr.responseType = responseType;
    xhr.timeout = timeout;
    // 超时处理
    xhr.ontimeout = (e) => {
      reject(e);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
  }

  send(xhr) {
    const { data } = this.config;
    xhr.send(data);
  }

  load(xhr, resolve) {
    xhr.onload = () => {
      resolve({
        code: xhr.status,
        data: xhr.response,
        statusText: xhr.statusText,
        // responseText: xhr.responseText
      });
    };
  }

  request() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      this.init();
      this.open(xhr);
      this.set(xhr, reject);
      this.send(xhr);
      this.load(xhr, resolve);
    });
  }
}

const ajax = (options) => {
  const config = { ...baseOptions, ...options };
  return new AJAX(config);
};

ajax.create = (options = {}) => {
  const config = { ...baseOptions, ...options, auto: false };
  return new AJAX(config);
};

export default ajax;
