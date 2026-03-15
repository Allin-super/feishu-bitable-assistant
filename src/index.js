/**
 * BitableAI - 飞书多维表格智能助手
 * 
 * 主入口文件
 */

require('dotenv').config();
const BitableClient = require('./bitable/client');
const { getTemplate, recommendTemplate, convertToFeishuFields } = require('./ai/designer');

class BitableAI {
  constructor(appId, appSecret) {
    this.client = new BitableClient(appId, appSecret);
  }

  /**
   * 从模板创建表格
   */
  async createTableFromTemplate(templateName, customName = null) {
    const template = getTemplate(templateName);
    if (!template) {
      throw new Error(`未找到模板：${templateName}`);
    }

    const appName = customName || template.name;
    const fields = convertToFeishuFields(template.fields);

    // 创建应用
    console.log(`正在创建表格：${appName}...`);
    const app = await this.client.createApp(appName);
    console.log('✅ 应用创建成功:', app.app_url);

    // 创建数据表
    console.log('正在创建数据表...');
    const table = await this.client.createTable(app.app_token, appName, fields);
    console.log('✅ 数据表创建成功');

    return {
      app_token: app.app_token,
      app_url: app.app_url,
      table_id: table.id,
      template: templateName
    };
  }

  /**
   * 智能创建表格 (根据自然语言描述)
   */
  async createTableSmart(description) {
    // 推荐模板
    const template = recommendTemplate(description);
    
    if (template) {
      console.log(`识别到模板：${template.name}`);
      return await this.createTableFromTemplate(
        Object.keys(TEMPLATES).find(key => TEMPLATES[key] === template),
        template.name
      );
    }

    throw new Error('未能识别表格类型，请指定模板名称');
  }

  /**
   * 导入 CSV 数据
   */
  async importFromCSV(filePath, appToken, tableId) {
    const fs = require('fs');
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    if (lines.length < 2) {
      throw new Error('CSV 文件为空或格式错误');
    }

    // 解析表头
    const headers = lines[0].split(',').map(h => h.trim());
    console.log('表头:', headers);

    // 解析数据
    const records = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',').map(v => v.trim());
      const fields = {};
      
      headers.forEach((header, index) => {
        if (values[index]) {
          fields[header] = values[index];
        }
      });
      
      records.push({ fields });
    }

    console.log(`解析到 ${records.length} 条记录`);

    // 批量导入 (每次最多 500 条)
    const batchSize = 500;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      try {
        const result = await this.client.createRecords(appToken, tableId, batch);
        successCount += result.records?.length || 0;
      } catch (error) {
        failCount += batch.length;
        console.error('批量导入失败:', error.message);
      }
    }

    return {
      total: records.length,
      success: successCount,
      fail: failCount
    };
  }

  /**
   * 查询记录
   */
  async queryRecords(appToken, tableId, options = {}) {
    const params = {};
    
    if (options.filter) {
      params.filter = options.filter;
    }
    
    if (options.sort) {
      params.sort = JSON.stringify(options.sort);
    }
    
    if (options.pageSize) {
      params.page_size = options.pageSize;
    }
    
    if (options.pageToken) {
      params.page_token = options.pageToken;
    }

    return await this.client.listRecords(appToken, tableId, params);
  }

  /**
   * 获取所有模板
   */
  listTemplates() {
    const { TEMPLATES } = require('./ai/designer');
    return Object.keys(TEMPLATES).map(key => ({
      id: key,
      name: TEMPLATES[key].name,
      fields: TEMPLATES[key].fields.length
    }));
  }
}

// 导出
module.exports = BitableAI;

// CLI 模式
if (require.main === module) {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;

  if (!appId || !appSecret) {
    console.error('错误：请设置 FEISHU_APP_ID 和 FEISHU_APP_SECRET 环境变量');
    process.exit(1);
  }

  const bitableAI = new BitableAI(appId, appSecret);

  // 示例：创建 CRM 表格
  (async () => {
    try {
      console.log('🚀 BitableAI 启动...\n');
      
      const result = await bitableAI.createTableFromTemplate('crm');
      console.log('\n✅ 创建成功!');
      console.log('表格链接:', result.app_url);
    } catch (error) {
      console.error('❌ 错误:', error.message);
      process.exit(1);
    }
  })();
}
