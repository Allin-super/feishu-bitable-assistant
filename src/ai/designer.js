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
      { name: '电话', type: 'phone' },
      { name: '邮箱', type: 'email' },
      { name: '客户状态', type: 'single_select', options: ['潜在客户', '意向客户', '成交客户', '休眠客户'] },
      { name: '优先级', type: 'single_select', options: ['高', '中', '低'] },
      { name: '来源', type: 'single_select', options: ['官网', '转介绍', '广告', '活动', '其他'] },
      { name: '创建时间', type: 'date_time', auto: true },
      { name: '最后联系', type: 'date_time' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 项目管理
  project: {
    name: '项目管理',
    fields: [
      { name: '项目名称', type: 'single_line_text', required: true },
      { name: '项目负责人', type: 'user' },
      { name: '开始日期', type: 'date' },
      { name: '截止日期', type: 'date' },
      { name: '进度', type: 'number', format: 'percent' },
      { name: '状态', type: 'single_select', options: ['未开始', '进行中', '已完成', '已延期'] },
      { name: '优先级', type: 'single_select', options: ['高', '中', '低'] },
      { name: '项目描述', type: 'multi_line_text' },
      { name: '附件', type: 'attachment' },
      { name: '创建时间', type: 'date_time', auto: true }
    ]
  },

  // 销售追踪
  sales: {
    name: '销售管理',
    fields: [
      { name: '订单编号', type: 'single_line_text', auto: true, prefix: 'SO-' },
      { name: '客户名称', type: 'single_line_text', required: true },
      { name: '产品', type: 'single_line_text' },
      { name: '数量', type: 'number' },
      { name: '单价', type: 'currency' },
      { name: '总金额', type: 'currency', formula: '数量 * 单价' },
      { name: '订单状态', type: 'single_select', options: ['待确认', '已确认', '生产中', '已发货', '已完成'] },
      { name: '付款状态', type: 'single_select', options: ['未付款', '部分付款', '已付款'] },
      { name: '下单日期', type: 'date' },
      { name: '预计交付', type: 'date' },
      { name: '销售备注', type: 'multi_line_text' }
    ]
  },

  // 库存管理
  inventory: {
    name: '库存管理',
    fields: [
      { name: '商品名称', type: 'single_line_text', required: true },
      { name: 'SKU 编码', type: 'single_line_text' },
      { name: '分类', type: 'single_select' },
      { name: '规格', type: 'single_line_text' },
      { name: '库存数量', type: 'number' },
      { name: '预警数量', type: 'number' },
      { name: '单价', type: 'currency' },
      { name: '总金额', type: 'currency', formula: '库存数量 * 单价' },
      { name: '供应商', type: 'single_line_text' },
      { name: '入库日期', type: 'date' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 人事管理
  hr: {
    name: '员工管理',
    fields: [
      { name: '姓名', type: 'single_line_text', required: true },
      { name: '工号', type: 'single_line_text', auto: true, prefix: 'E-' },
      { name: '部门', type: 'single_select' },
      { name: '职位', type: 'single_line_text' },
      { name: '入职日期', type: 'date' },
      { name: '手机号', type: 'phone' },
      { name: '邮箱', type: 'email' },
      { name: '直属上级', type: 'user' },
      { name: '员工状态', type: 'single_select', options: ['试用期', '正式', '离职'] },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 财务管理
  finance: {
    name: '财务管理',
    fields: [
      { name: '账单名称', type: 'single_line_text', required: true },
      { name: '类型', type: 'single_select', options: ['收入', '支出'] },
      { name: '金额', type: 'currency', required: true },
      { name: '日期', type: 'date' },
      { name: '分类', type: 'single_select' },
      { name: '经手人', type: 'user' },
      { name: '支付方式', type: 'single_select', options: ['现金', '银行卡', '支付宝', '微信', '其他'] },
      { name: '状态', type: 'single_select', options: ['待审核', '已通过', '已拒绝'] },
      { name: '凭证', type: 'attachment' },
      { name: '备注', type: 'multi_line_text' }
    ]
  },

  // 任务管理
  task: {
    name: '任务管理',
    fields: [
      { name: '任务名称', type: 'single_line_text', required: true },
      { name: '负责人', type: 'user' },
      { name: '优先级', type: 'single_select', options: ['紧急重要', '重要不紧急', '紧急不重要', '不紧急不重要'] },
      { name: '状态', type: 'single_select', options: ['待办', '进行中', '已完成', '已取消'] },
      { name: '开始日期', type: 'date' },
      { name: '截止日期', type: 'date' },
      { name: '预计工时', type: 'number', unit: '小时' },
      { name: '实际工时', type: 'number', unit: '小时' },
      { name: '任务描述', type: 'multi_line_text' },
      { name: '创建时间', type: 'date_time', auto: true }
    ]
  },

  // 会议管理
  meeting: {
    name: '会议管理',
    fields: [
      { name: '会议主题', type: 'single_line_text', required: true },
      { name: '会议时间', type: 'date_time' },
      { name: '会议地点', type: 'single_line_text' },
      { name: '主持人', type: 'user' },
      { name: '参会人员', type: 'user', multiple: true },
      { name: '会议类型', type: 'single_select', options: ['周会', '月会', '项目会', '培训会', '其他'] },
      { name: '会议纪要', type: 'multi_line_text' },
      { name: '待办事项', type: 'multi_line_text' },
      { name: '附件', type: 'attachment' }
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
 */
function convertToFeishuFields(fields) {
  const typeMapping = {
    'single_line_text': 'text',
    'multi_line_text': 'text',
    'phone': 'phone',
    'email': 'email',
    'single_select': 'single_select',
    'multi_select': 'multi_select',
    'number': 'number',
    'currency': 'number',
    'percent': 'number',
    'date': 'date',
    'date_time': 'date_time',
    'user': 'user',
    'attachment': 'attachment',
    'link': 'url',
    'checkbox': 'checkbox',
    'formula': 'formula',
    'lookup': 'lookup',
    'rollup': 'rollup'
  };

  return fields.map(field => {
    const feishuField = {
      field_name: field.name,
      type: typeMapping[field.type] || 'text'
    };

    // 添加选项 (单选/多选)
    if (field.options) {
      feishuField.property = {
        single_select_config: {
          options: field.options.map(opt => ({ name: opt, color: 'blue' }))
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
