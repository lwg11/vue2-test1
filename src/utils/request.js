import Vue from 'vue';

// 创建一个错误处理函数
export const handleError = (error, options = {}) => {
  const { showMessage = true } = options;
  
  if (showMessage) {
    Vue.prototype.$message.error(error.message || '请求失败，请稍后重试');
  }
  
  return Promise.reject(error);
};

// 请求配置
const requestConfig = {
  baseURL: process.env.VUE_APP_BASE_API || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// 创建请求实例
const request = async (url, options = {}) => {
  // 合并配置
  const config = {
    ...requestConfig,
    ...options,
    headers: {
      ...requestConfig.headers,
      ...options.headers
    }
  };

  // 构建完整URL
  const fullURL = config.baseURL + url;

  // 设置请求超时
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    // 添加认证token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 发送请求
    const response = await fetch(fullURL, {
      ...config,
      signal: controller.signal,
      credentials: config.withCredentials ? 'include' : 'omit'
    });

    // 清除超时定时器
    clearTimeout(timeoutId);

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析响应数据
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // 处理业务逻辑错误
    if (data.code !== undefined && data.code !== 0) {
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    // 清除超时定时器
    clearTimeout(timeoutId);

    // 处理超时错误
    if (error.name === 'AbortError') {
      return handleError(new Error('请求超时'), options);
    }

    return handleError(error, options);
  }
};

// 封装常用请求方法
export const get = (url, params = {}, options = {}) => {
  // 构建查询参数
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  const fullURL = queryString ? `${url}?${queryString}` : url;

  return request(fullURL, {
    method: 'GET',
    ...options
  });
};

export const post = (url, data = {}, options = {}) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options
  });
};

export const put = (url, data = {}, options = {}) => {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options
  });
};

export const del = (url, data = {}, options = {}) => {
  return request(url, {
    method: 'DELETE',
    body: data ? JSON.stringify(data) : undefined,
    ...options
  });
};

export const upload = (url, formData, options = {}) => {
  return request(url, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...options
  });
};

// 导出默认请求方法
export default {
  get,
  post,
  put,
  delete: del,
  upload,
  request
};