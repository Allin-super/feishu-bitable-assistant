/**
 * BitableAI - 真实场景测试
 */

const BitableAI = require('./src/index');

const bitableAI = new BitableAI(process.env.FEISHU_APP_ID, process.env.FEISHU_APP_SECRET);

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    console.log(`\n🧪 测试：${name}`);
    await fn();
    console.log(`✅ 通过`);
    passed++;
  } catch (error) {
    console.log(`❌ 失败：${error.message}`);
    failed++;
  }
}

(async () => {
  console.log('='.repeat(60));
  console.log('🧪 BitableAI 真实场景测试');
  console.log('='.repeat(60));
  
  // 场景 1: 创业公司客户管理
  await test('场景 1: 创业公司客户管理', async () => {
    const result = await bitableAI.createTableFromTemplate('crm', '创业公司客户管理 - 真实测试');
    console.log('   🔗 URL:', result.app_url);
    if (!result.app_url || !result.app_url.includes('feishu.cn')) {
      throw new Error('URL 格式错误');
    }
  });
  
  // 场景 2: 电商公司销售管理
  await test('场景 2: 电商公司销售管理', async () => {
    const result = await bitableAI.createTableFromTemplate('sales', '电商销售管理 - 真实测试');
    console.log('   🔗 URL:', result.app_url);
    if (!result.app_url) throw new Error('返回结果不完整');
  });
  
  // 场景 3: 科技公司项目管理
  await test('场景 3: 科技公司项目管理', async () => {
    const result = await bitableAI.createTableFromTemplate('project', '科技公司项目管理 - 真实测试');
    console.log('   🔗 URL:', result.app_url);
    if (!result.app_url) throw new Error('返回结果不完整');
  });
  
  // 场景 4: 批量创建
  await test('场景 4: 批量创建 5 个表格', async () => {
    const templates = ['crm', 'sales', 'task', 'finance', 'meeting'];
    for (const tpl of templates) {
      const result = await bitableAI.createTableFromTemplate(tpl, `批量-${tpl}`);
      if (!result.app_url) throw new Error(`${tpl} 创建失败`);
      console.log(`   ✓ ${tpl} 创建成功`);
    }
  });
  
  // 场景 5: 所有模板
  await test('场景 5: 测试所有 8 个模板', async () => {
    const templates = bitableAI.listTemplates();
    for (const tpl of templates) {
      const result = await bitableAI.createTableFromTemplate(tpl.id, `模板-${tpl.name}`);
      if (!result.app_url) throw new Error(`${tpl.name} 失败`);
      console.log(`   ✓ ${tpl.name}`);
    }
  });
  
  // 输出结果
  console.log('\n' + '='.repeat(60));
  console.log('📊 测试结果');
  console.log('='.repeat(60));
  console.log(`✅ 通过：${passed}`);
  console.log(`❌ 失败：${failed}`);
  console.log(`📈 成功率：${((passed/(passed+failed))*100).toFixed(1)}%`);
  console.log('='.repeat(60));
  
  if (failed === 0) {
    console.log('\n🎉 所有测试通过！可以发布！');
    process.exit(0);
  } else {
    console.log('\n⚠️ 有测试失败！');
    process.exit(1);
  }
})();
