/**
 * BitableAI - 飞书多维表格 API 客户端
 * 
 * 文档：https://open.feishu.cn/document/ukTMukTMukTM/uATNz4SO1MjL5UzM
 */

const axios = require('axios');

class BitableClient {
  constructor(appId, appSecret) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.baseUrl = 'https://open.feishu.cn/open-apis';
    this.token = null;
    this.tokenExpire = 0;
  }

  /**
   * 获取访问令牌
   */
  async getToken() {
    if (this.token && Date.now() < this.tokenExpire) {
      return this.token;
    }

    try {
      const response = await axios.post(`${this.baseUrl}/auth/v3/tenant_access_token/internal`, {
        app_id: this.appId,
        app_secret: this.appSecret
      });

      if (response.data.code !== 0) {
        throw new Error(`获取 token 失败：${response.data.msg}`);
      }

      this.token = response.data.tenant_access_token;
      // 令牌有效期 2 小时，提前 10 分钟刷新
      this.tokenExpire = Date.now() + (response.data.expire - 600) * 1000;

      return this.token;
    } catch (error) {
      console.error('获取 token 失败:', error.message);
      throw error;
    }
  }

  /**
   * 发送 API 请求
   */
  async request(method, path, data = null) {
    const token = await this.getToken();
    
    const config = {
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.data = data;
    }

    try {
      const response = await axios(config);
      
      if (response.data.code !== 0) {
        throw new Error(`API 请求失败：${response.data.msg}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('API 请求失败:', error.message);
      throw error;
    }
  }

  /**
   * 创建多维表格应用
   */
  async createApp(name, folderToken = null) {
    const data = {
      name: name
    };

    if (folderToken) {
      data.folder_token = folderToken;
    }

    return await this.request('POST', '/bitable/v1/apps', data);
  }

  /**
   * 获取表格列表
   */
  async listTables(appToken) {
    return await this.request('GET', `/bitable/v1/apps/${appToken}/tables`);
  }

  /**
   * 创建数据表
   */
  async createTable(appToken, name, fields) {
    return await this.request('POST', `/bitable/v1/apps/${appToken}/tables`, {
      name: name,
      fields: fields
    });
  }

  /**
   * 添加字段
   */
  async createField(appToken, tableId, field) {
    return await this.request('POST', `/bitable/v1/apps/${appToken}/tables/${tableId}/fields`, field);
  }

  /**
   * 批量添加记录
   */
  async createRecords(appToken, tableId, records) {
    return await this.request('POST', `/bitable/v1/apps/${appToken}/tables/${tableId}/records`, {
      records: records
    });
  }

  /**
   * 查询记录
   */
  async listRecords(appToken, tableId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return await this.request('GET', `/bitable/v1/apps/${appToken}/tables/${tableId}/records?${queryParams}`);
  }

  /**
   * 更新记录
   */
  async updateRecord(appToken, tableId, recordId, fields) {
    return await this.request('PUT', `/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`, {
      fields: fields
    });
  }

  /**
   * 删除记录
   */
  async deleteRecord(appToken, tableId, recordId) {
    return await this.request('DELETE', `/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`);
  }

  /**
   * 上传文件到飞书云空间
   */
  async uploadFile(fileName, fileContent, parentFolder = 'root') {
    // 文件上传需要 multipart/form-data
    const token = await this.getToken();
    
    const formData = new FormData();
    formData.append('file', new Blob([fileContent]), fileName);
    
    const response = await axios.post(`${this.baseUrl}/drive/v1/medias/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.data;
  }
}

module.exports = BitableClient;
