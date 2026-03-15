---
name: feishu-bitable-assistant
description: BitableAI - 飞书多维表格智能助手。一句话创建业务系统，自动设计表结构、批量导入数据、智能查询统计。
version: 1.0.0
authors:
  - Allin-super
metadata:
  openclaw:
    requires:
      env:
        - FEISHU_APP_ID
        - FEISHU_APP_SECRET
      bins:
        - curl
        - node
    primaryEnv: FEISHU_APP_ID
tags:
  - feishu
  - bitable
  - automation
  - ai
  - productivity
---

# BitableAI - 飞书多维表格智能助手

> **一句话，创建你的业务系统**

---

## 🎯 功能特性

### 1. 智能创建表格
```
用户："帮我创建一个客户管理表格"
→ AI 自动设计表结构
→ 自动创建字段 (公司名、联系人、电话、状态等)
→ 自动配置视图和权限
→ 返回表格链接
```

### 2. 数据批量导入
```
用户："导入这个 Excel 到客户表"
→ 自动解析 Excel/CSV 文件
→ 智能匹配字段
→ 批量导入数据
→ 返回导入结果
```

### 3. 智能数据查询
```
用户："查询本周新增的客户"
→ 自动解析查询条件
→ 执行筛选
→ 返回结果 + 统计图表
```

### 4. 自动化工作流
```
用户："每天下午 5 点汇总当天数据发给我"
→ 创建定时任务
→ 自动汇总数据
→ 发送到飞书消息
```

---

## 🚀 快速开始

### 前置条件

1. **飞书开放平台账号**
   - 访问 https://open.feishu.cn/
   - 注册/登录 (可用个人飞书账号)

2. **创建企业自建应用**
   - 进入"开发者后台"
   - 点击"创建应用" → "企业自建"
   - 填写应用名称 (如：BitableAI)

3. **添加权限**
   在"权限管理"中添加：
   - `bitable:app` - 管理多维表格
   - `bitable:table` - 管理数据表
   - `bitable:record` - 管理记录
   - `drive:file` - 管理云文档文件

4. **获取凭证**
   - 在"凭证与基础信息"页面
   - 复制 `App ID` 和 `App Secret`

### 安装使用

```bash
# 安装技能
clawhub install feishu-bitable-assistant

# 配置环境变量
export FEISHU_APP_ID=cli_xxxxx
export FEISHU_APP_SECRET=xxxxx

# 或者创建 .env 文件
cp .env.example .env
# 编辑 .env 填入凭证
```

---

## 📖 使用示例

### 示例 1: 创建客户管理表格

```
我：帮我创建一个客户管理表格

BitableAI: 好的！正在为您创建客户管理系统...

✅ 已创建表格：客户管理
📋 字段设计:
   - 公司名 (文本)
   - 联系人 (文本)
   - 电话 (电话)
   - 邮箱 (邮箱)
   - 客户状态 (单选：潜在客户/意向客户/成交客户)
   - 优先级 (单选：高/中/低)
   - 创建时间 (日期)
   - 备注 (多行文本)

🔗 表格链接：https://bytedance.larkoffice.com/base/xxxxx
```

### 示例 2: 导入数据

```
我：导入 sales_data.csv 到客户表

BitableAI: 正在解析文件...
✅ 解析成功：发现 50 条记录
✅ 字段匹配：
   - Company → 公司名
   - Contact → 联系人
   - Phone → 电话
   
📊 导入结果:
   - 成功：48 条
   - 失败：2 条 (格式错误)
   
📄 错误详情：第 12 行、第 35 行
```

### 示例 3: 查询统计

```
我：查询本周新增的客户

BitableAI: 正在查询...

📊 查询结果:
   - 本周新增：15 个客户
   - 潜在客户：8 个
   - 意向客户：5 个
   - 成交客户：2 个

📈 趋势:
   - 比上周增长：+25%
   
📋 详细列表:
   1. XX 科技公司 - 张三 - 138****1234
   2. XX 贸易公司 - 李四 - 139****5678
   ...
```

### 示例 4: 创建项目管理

```
我：创建一个项目管理表格，需要跟踪进度和截止日期

BitableAI: 好的！正在创建项目管理系统...

✅ 已创建表格：项目管理
📋 字段设计:
   - 项目名称 (文本)
   - 项目负责人 (人员)
   - 开始日期 (日期)
   - 截止日期 (日期)
   - 进度 (数字 0-100%)
   - 状态 (单选：未开始/进行中/已完成/已延期)
   - 优先级 (单选：高/中/低)
   - 项目描述 (多行文本)
   - 附件 (附件)

📊 自动创建视图:
   - 全部项目 (表格视图)
   - 进行中项目 (筛选视图)
   - 项目进度 (看板视图)
   - 时间线 (甘特图)

🔗 表格链接：https://bytedance.larkoffice.com/base/xxxxx
```

---

## 🔧 API 参考

### 核心命令

```bash
# 创建表格
bitable create --name "客户管理" --template crm

# 导入数据
bitable import --file data.csv --table <table_id>

# 查询数据
bitable query --table <table_id> --filter "status='意向客户'"

# 导出数据
bitable export --table <table_id> --format excel

# 创建自动化
bitable automation create --trigger daily --action summary
```

### 支持的模板

| 模板 | 说明 | 命令 |
|------|------|------|
| **CRM** | 客户管理 | `--template crm` |
| **Project** | 项目管理 | `--template project` |
| **Sales** | 销售追踪 | `--template sales` |
| **Inventory** | 库存管理 | `--template inventory` |
| **HR** | 人事管理 | `--template hr` |
| **Finance** | 财务管理 | `--template finance` |
| **Custom** | 自定义 | `--template custom` |

---

## 💰 定价方案

### 免费版 (Free)
- ✅ 基础表格创建
- ✅ 单次导入 ≤100 条
- ✅ 基础查询统计
- ✅ 社区支持

### 专业版 (Pro) - ¥199/月
- ✅ 无限表格创建
- ✅ 批量导入 ≤10000 条
- ✅ 高级查询分析
- ✅ 自动化工作流
- ✅ 优先支持

### 企业版 (Enterprise) - 定制
- ✅ 私有部署
- ✅ 自定义集成
- ✅ 专属客服
- ✅ SLA 保障

---

## 🛠️ 开发指南

### 项目结构

```
feishu-bitable-assistant/
├── SKILL.md              # 技能文档
├── README.md             # 使用说明
├── package.json          # 依赖配置
├── src/
│   ├── index.js          # 主入口
│   ├── bitable/          # 飞书 API 封装
│   │   ├── client.js     # API 客户端
│   │   ├── table.js      # 表格操作
│   │   ├── record.js     # 记录操作
│   │   └── file.js       # 文件操作
│   ├── ai/               # AI 功能
│   │   ├── designer.js   # 表结构设计
│   │   └── parser.js     # 自然语言解析
│   └── utils/            # 工具函数
├── templates/            # 表格模板
│   ├── crm.json
│   ├── project.json
│   └── ...
└── tests/                # 测试用例
```

### 核心代码示例

```javascript
// 创建表格
async function createTable(name, template) {
  const schema = await designSchema(template);
  const appToken = await bitable.createApp(name);
  
  for (const field of schema.fields) {
    await bitable.createField(appToken, field);
  }
  
  return appToken;
}

// AI 设计表结构
async function designSchema(template) {
  const templates = {
    crm: {
      fields: [
        { name: '公司名', type: 'text' },
        { name: '联系人', type: 'text' },
        { name: '电话', type: 'phone' },
        { name: '客户状态', type: 'single_select' },
        // ...
      ]
    },
    // ...
  };
  
  return templates[template];
}
```

---

## 📞 技术支持

- **GitHub**: https://github.com/Allin-super
- **Issues**: https://github.com/Allin-super/feishu-bitable-assistant/issues
- **文档**: https://github.com/Allin-super/feishu-bitable-assistant

---

## 📝 更新日志

### v1.0.0 (2026-03-15)
- ✅ 初始版本发布
- ✅ 智能创建表格
- ✅ 数据批量导入
- ✅ 基础查询统计

### v1.1.0 (计划中)
- 🔄 自动化工作流
- 🔄 高级查询分析
- 🔄 模板市场

---

## 📄 许可证

MIT License

---

**BitableAI** - 一句话，创建你的业务系统
