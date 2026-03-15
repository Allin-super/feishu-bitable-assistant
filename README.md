# BitableAI - 飞书多维表格智能助手

> **一句话，创建你的业务系统**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

---

## 🎯 功能特性

### ✨ 智能创建表格
只需说一句话，AI 自动设计表结构并创建完整的多维表格系统。

```
"帮我创建一个客户管理表格"
→ 自动设计 10+ 个字段
→ 自动配置视图和权限
→ 30 秒完成
```

### 📥 数据批量导入
支持 Excel、CSV 等格式，智能匹配字段，一键导入。

### 🔍 智能数据查询
自然语言查询，自动统计汇总，生成可视化报表。

### 🤖 自动化工作流
定时任务、条件触发、跨表关联，让数据自动流动。

---

## 🚀 快速开始

### 1. 获取飞书 API 凭证

访问 [飞书开放平台](https://open.feishu.cn/) 创建应用并获取：
- App ID
- App Secret

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 App ID 和 App Secret
```

### 4. 运行

```bash
npm start
```

---

## 📖 使用示例

### 创建客户管理表格

```javascript
const BitableAI = require('./src/index');

const client = new BitableAI(process.env.FEISHU_APP_ID, process.env.FEISHU_APP_SECRET);

// 创建 CRM 表格
const result = await client.createTableFromTemplate('crm', '我的客户管理');
console.log('表格已创建:', result.appUrl);
```

### 导入数据

```javascript
// 从 CSV 导入
await client.importFromCSV('customers.csv', appToken, tableId);
```

### 查询统计

```javascript
// 查询本周新增客户
const result = await client.queryRecords(appToken, tableId, {
  filter: '创建时间 >= 本周'
});
console.log('本周新增:', result.records.length);
```

---

## 📋 支持的模板

| 模板 | 说明 | 命令 |
|------|------|------|
| **CRM** | 客户管理 | `crm` |
| **Project** | 项目管理 | `project` |
| **Sales** | 销售追踪 | `sales` |
| **Inventory** | 库存管理 | `inventory` |
| **HR** | 人事管理 | `hr` |
| **Finance** | 财务管理 | `finance` |
| **Task** | 任务管理 | `task` |
| **Meeting** | 会议管理 | `meeting` |

---

## 💰 定价方案

### 免费版
- ✅ 基础表格创建
- ✅ 单次导入 ≤100 条
- ✅ 基础查询

### 专业版 (¥199/月)
- ✅ 无限表格创建
- ✅ 批量导入 ≤10000 条
- ✅ 自动化工作流
- ✅ 优先支持

### 企业版 (定制)
- ✅ 私有部署
- ✅ 自定义集成
- ✅ 专属客服

---

## 🛠️ 开发

### 项目结构

```
feishu-bitable-assistant/
├── src/
│   ├── index.js           # 主入口
│   ├── bitable/
│   │   └── client.js      # 飞书 API 客户端
│   ├── ai/
│   │   └── designer.js    # AI 表结构设计
│   └── utils/             # 工具函数
├── templates/             # 表格模板
└── tests/                 # 测试用例
```

### 运行测试

```bash
npm test
```

---

## 📞 技术支持

- **GitHub Issues**: https://github.com/Allin-super/feishu-bitable-assistant/issues
- **GitHub**: https://github.com/Allin-super
- **邮箱**: (待设置)

---

## 📄 许可证

MIT License

---

**BitableAI** - 一句话，创建你的业务系统
