/**
 * BitableAI - AI 表结构设计器
 * 
 * 根据用户需求自动设计表格结构
 */

// 预定义模板
const TEMPLATES = {
  // 客户管理 (CRM)
  crm: {
    name: '客户管理',
    fields: [
      { name: '公司名', type: 'single_line_text', required: true },
      { name: '联系人', type: 'single_line_text' },
      { name: '电话', type: 'single_line_text' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 项目管理
  project: {
    name: '项目管理',
    fields: [
      { name: '项目名称', type: 'single_line_text', required: true },
      { name: '项目负责人', type: 'single_line_text' },
      { name: '开始日期', type: 'single_line_text' },
      { name: '截止日期', type: 'single_line_text' },
      { name: '进度', type: 'number' },
      { name: '项目描述', type: 'multi_line_text' }
    ]
  },

  // 销售追踪
  sales: {
    name: '销售管理',
    fields: [
      { name: '订单编号', type: 'single_line_text' },
      { name: '客户名称', type: 'single_line_text', required: true },
      { name: '产品', type: 'single_line_text' },
      { name: '数量', type: 'number' },
      { name: '单价', type: 'number' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 库存管理
  inventory: {
    name: '库存管理',
    fields: [
      { name: '商品名称', type: 'single_line_text', required: true },
      { name: 'SKU 编码', type: 'single_line_text' },
      { name: '分类', type: 'single_line_text' },
      { name: '规格', type: 'single_line_text' },
      { name: '库存数量', type: 'number' },
      { name: '单价', type: 'number' },
      { name: '供应商', type: 'single_line_text' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 人事管理
  hr: {
    name: '员工管理',
    fields: [
      { name: '姓名', type: 'single_line_text', required: true },
      { name: '工号', type: 'single_line_text' },
      { name: '部门', type: 'single_line_text' },
      { name: '职位', type: 'single_line_text' },
      { name: '入职日期', type: 'single_line_text' },
      { name: '手机号', type: 'single_line_text' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 财务管理
  finance: {
    name: '财务管理',
    fields: [
      { name: '账单名称', type: 'single_line_text', required: true },
      { name: '金额', type: 'number', required: true },
      { name: '日期', type: 'single_line_text' },
      { name: '分类', type: 'single_line_text' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 任务管理
  task: {
    name: '任务管理',
    fields: [
      { name: '任务名称', type: 'single_line_text', required: true },
      { name: '负责人', type: 'single_line_text' },
      { name: '开始日期', type: 'single_line_text' },
      { name: '截止日期', type: 'single_line_text' },
      { name: '任务描述', type: 'multi_line_text' }
    ]
  },

  // 会议管理
  meeting: {
    name: '会议管理',
    fields: [
      { name: '会议主题', type: 'single_line_text', required: true },
      { name: '会议时间', type: 'single_line_text' },
      { name: '会议地点', type: 'single_line_text' },
      { name: '主持人', type: 'single_line_text' },
      { name: '会议纪要', type: 'multi_line_text' },
      { name: '待办事项', type: 'multi_line_text' }
    ]
  }
};

/**
 * 根据模板名称获取模板
 */
function getTemplate(templateName) {
  return TEMPLATES[templateName.toLowerCase()] || null;
}

/**
 * 根据自然语言描述智能推荐模板
 */
function recommendTemplate(description) {
  const keywords = {
    '客户': 'crm',
    'crm': 'crm',
    '销售': 'sales',
    '订单': 'sales',
    '项目': 'project',
    '任务': 'task',
    '库存': 'inventory',
    '商品': 'inventory',
    '员工': 'hr',
    '人事': 'hr',
    '财务': 'finance',
    '账单': 'finance',
    '会议': 'meeting',
    '纪要': 'meeting'
  };

  for (const [keyword, template] of Object.entries(keywords)) {
    if (description.toLowerCase().includes(keyword)) {
      return TEMPLATES[template];
    }
  }

  // 默认返回空
  return null;
}

/**
 * 将字段定义转换为飞书 API 格式
 * 飞书 API v2 字段类型：https://open.feishu.cn/document/ukTMukTMukTM/uATNz4SO1MjL5UzM
 */
function convertToFeishuFields(fields) {
  // 飞书 API v2 支持的字段类型
  const typeMapping = {
    'single_line_text': 1,      // 文本
    'multi_line_text': 2,       // 多行文本
    'phone': 11,                // 电话
    'email': 12,                // 邮箱
    'single_select': 3,         // 单选
    'multi_select': 4,          // 多选
    'number': 5,                // 数字
    'currency': 5,              // 货币 (用数字类型)
    'percent': 5,               // 百分比 (用数字类型)
    'date': 6,                  // 日期
    'date_time': 7,             // 日期时间
    'user': 8,                  // 成员
    'attachment': 9,            // 附件
    'link': 10,                 // 链接
    'checkbox': 13,             // 复选框
  };

  return fields.map(field => {
    const feishuField = {
      field_name: field.name,
      type: typeMapping[field.type] || 1  // 默认文本
    };

    // 添加选项 (单选/多选)
    if (field.options) {
      feishuField.property = {
        single_select_config: {
        }
      };
    }

    // 必填
    if (field.required) {
      feishuField.is_required = true;
    }

    return feishuField;
  });
}

module.exports = {
  TEMPLATES,
  getTemplate,
  recommendTemplate,
  convertToFeishuFields
};
