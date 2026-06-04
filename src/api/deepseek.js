const API_BASE = 'https://api.deepseek.com/v1/chat/completions'

const TERMS_ZH_VI = `## 标准术语对照 (Tiêu chuẩn thuật ngữ)
整机与系统:
- 旋挖钻机 = Máy khoan xoay
- 液压系统 = Hệ thống thủy lực
- 电控系统 = Hệ thống điều khiển điện
- 润滑系统 = Hệ thống bôi trơn
- 冷却系统 = Hệ thống làm mát
- 行走系统 = Hệ thống di chuyển

钻杆与钻头:
- 导管 = Ống tremi
- 凯氏钻杆 = Thanh Kelly
- 摩擦钻杆 = Cần khoan ma sát
- 机锁钻杆 = Cần khoan khóa cơ
- 钻头 = Mũi khoan
- 筒钻 = Mũi khoan thùng
- 螺旋钻头 = Mũi khoan xoắn
- 扩底钻头 = Mũi khoan mở rộng đáy
- 取芯钻头 = Mũi khoan lấy lõi
- 截齿 = Răng cắt

动力头:
- 动力头 = Đầu quay
- 减速机 = Hộp giảm tốc
- 马达 = Mô tơ
- 轴承 = Vòng bi

液压元件:
- 加压油缸 = Xi lanh áp lực
- 变幅油缸 = Xi lanh thay đổi biên độ
- 液压泵 = Bơm thủy lực
- 液压阀 = Van thủy lực
- 液压马达 = Mô tơ thủy lực
- 油封 = Phốt dầu
- 滤芯 = Lõi lọc

底盘与履带:
- 底盘 = Khung gầm
- 履带 = Xích
- 履带板 = Tấm xích
- 支重轮 = Bánh đỡ xích
- 引导轮 = Bánh dẫn hướng
- 驱动轮 = Bánh dẫn động
- 张紧装置 = Thiết bị căng xích

结构件:
- 桅杆 = Cột chống
- 变幅机构 = Cơ cấu thay đổi biên độ
- 回转机构 = Cơ cấu xoay
- 回转支承 = Vòng bi xoay
- 配重 = Đối trọng
- 主平台 = Sàn chính

卷扬与钢丝绳:
- 主卷扬 = Tời chính
- 副卷扬 = Tời phụ
- 钢丝绳 = Cáp thép
- 滑轮组 = Cụm ròng rọc
- 吊钩 = Móc cẩu

发动机与动力:
- 发动机 = Động cơ
- 柴油机 = Động cơ diesel
- 散热器 = Két tản nhiệt
- 蓄电池 = Ắc quy
- 发电机 = Máy phát điện

控制系统:
- 控制面板 = Bảng điều khiển
- 显示器 = Màn hình
- 传感器 = Cảm biến
- 电磁阀 = Van điện từ
- PLC控制器 = Bộ điều khiển PLC

维修配件:
- 密封件 = Phớt làm kín
- 垫圈 = Vòng đệm
- 螺栓 = Bu lông
- 螺母 = Đai ốc
- 销轴 = Chốt trục
- 衬套 = Bạc lót

贸易术语:
- FOB = FOB (Giao tại cảng)
- CIF = CIF (Bao gồm phí bảo hiểm và cước)
- 最小起订量 = Số lượng đặt hàng tối thiểu (MOQ)
- 交货期 = Thời gian giao hàng
- 技术参数 = Thông số kỹ thuật
- 操作手册 = Hướng dẫn vận hành
- 保修期 = Thời gian bảo hành`

const TERMS_ZH_EN = `## Standard Terminology Reference
Complete Machine & Systems:
- 旋挖钻机 = Rotary Drilling Rig
- 液压系统 = Hydraulic System
- 电控系统 = Electrical Control System
- 润滑系统 = Lubrication System
- 冷却系统 = Cooling System
- 行走系统 = Travel System

Drill Pipes & Bits:
- 导管 = Tremie Pipe
- 凯氏钻杆 = Kelly Bar
- 摩擦钻杆 = Friction Kelly Bar
- 机锁钻杆 = Interlocking Kelly Bar
- 钻头 = Drill Bit
- 筒钻 = Core Barrel / Bucket
- 螺旋钻头 = Auger Drill Bit
- 扩底钻头 = Belling Bucket
- 取芯钻头 = Coring Bit
- 截齿 = Cutting Pick

Rotary Head:
- 动力头 = Rotary Head
- 减速机 = Gearbox / Reducer
- 马达 = Motor
- 轴承 = Bearing

Hydraulic Components:
- 加压油缸 = Feed Cylinder
- 变幅油缸 = Luffing Cylinder
- 液压泵 = Hydraulic Pump
- 液压阀 = Hydraulic Valve
- 液压马达 = Hydraulic Motor
- 油封 = Oil Seal
- 滤芯 = Filter Element

Undercarriage & Tracks:
- 底盘 = Undercarriage
- 履带 = Track / Crawler
- 履带板 = Track Pad
- 支重轮 = Track Roller
- 引导轮 = Idler
- 驱动轮 = Sprocket
- 张紧装置 = Track Tensioner

Structural Parts:
- 桅杆 = Mast
- 变幅机构 = Luffing Mechanism
- 回转机构 = Slewing Mechanism
- 回转支承 = Slewing Bearing
- 配重 = Counterweight
- 主平台 = Main Platform

Winch & Wire Rope:
- 主卷扬 = Main Winch
- 副卷扬 = Auxiliary Winch
- 钢丝绳 = Wire Rope
- 滑轮组 = Pulley Block
- 吊钩 = Hook

Engine & Power:
- 发动机 = Engine
- 柴油机 = Diesel Engine
- 散热器 = Radiator
- 蓄电池 = Battery
- 发电机 = Generator

Control System:
- 控制面板 = Control Panel
- 显示器 = Display / Monitor
- 传感器 = Sensor
- 电磁阀 = Solenoid Valve
- PLC控制器 = PLC Controller

Maintenance Parts:
- 密封件 = Seal
- 垫圈 = Washer / Gasket
- 螺栓 = Bolt
- 螺母 = Nut
- 销轴 = Pin
- 衬套 = Bushing

Trade Terms:
- FOB = FOB
- CIF = CIF
- 最小起订量 = MOQ
- 交货期 = Delivery Time
- 技术参数 = Technical Specifications
- 操作手册 = Operation Manual
- 保修期 = Warranty Period`

const TERMS_VI_EN = `## Standard Terminology Reference
- Máy khoan xoay = Rotary Drilling Rig
- Thanh Kelly = Kelly Bar
- Mũi khoan = Drill Bit
- Đầu quay = Rotary Head
- Hệ thống thủy lực = Hydraulic System
- Khung gầm = Undercarriage
- Cơ cấu thay đổi biên độ = Luffing Mechanism
- Cột chống = Mast
- Xi lanh áp lực = Feed Cylinder
- Tời chính = Main Winch
- Ống tremi = Tremie Pipe
- Cần khoan ma sát = Friction Kelly Bar
- Cần khoan khóa cơ = Interlocking Kelly Bar
- Mũi khoan thùng = Core Barrel / Bucket
- Mũi khoan xoắn = Auger Drill Bit
- Mũi khoan mở rộng đáy = Belling Bucket
- Mũi khoan lấy lõi = Coring Bit
- Răng cắt = Cutting Pick
- Hộp giảm tốc = Gearbox / Reducer
- Mô tơ = Motor
- Vòng bi = Bearing
- Xi lanh thủy lực = Hydraulic Cylinder
- Bơm thủy lực = Hydraulic Pump
- Van thủy lực = Hydraulic Valve
- Mô tơ thủy lực = Hydraulic Motor
- Phốt dầu = Oil Seal
- Lõi lọc = Filter Element
- Xích = Track / Crawler
- Tấm xích = Track Pad
- Bánh đỡ xích = Track Roller
- Bánh dẫn hướng = Idler
- Bánh dẫn động = Sprocket
- Thiết bị căng xích = Track Tensioner
- Cơ cấu xoay = Slewing Mechanism
- Vòng bi xoay = Slewing Bearing
- Đối trọng = Counterweight
- Sàn chính = Main Platform
- Tời phụ = Auxiliary Winch
- Cáp thép = Wire Rope
- Cụm ròng rọc = Pulley Block
- Móc cẩu = Hook
- Động cơ = Engine
- Động cơ diesel = Diesel Engine
- Két tản nhiệt = Radiator
- Ắc quy = Battery
- Máy phát điện = Generator
- Bảng điều khiển = Control Panel
- Màn hình = Display / Monitor
- Cảm biến = Sensor
- Van điện từ = Solenoid Valve
- Bộ điều khiển PLC = PLC Controller
- Phớt làm kín = Seal
- Vòng đệm = Washer / Gasket
- Bu lông = Bolt
- Đai ốc = Nut
- Chốt trục = Pin
- Bạc lót = Bushing`

function getTechnicalPrompt(sourceLang, targetLang) {
  const pair = `${sourceLang}${targetLang}`
  let termTable = ''
  if (pair === 'zhvi' || pair === 'vizh') termTable = TERMS_ZH_VI
  else if (pair === 'zhen' || pair === 'enzh') termTable = TERMS_ZH_EN
  else if (pair === 'vien' || pair === 'envi') termTable = TERMS_VI_EN

  const srcNames = { zh: '中文', vi: '越南语', en: '英语' }
  const tgtNames = { zh: '中文', vi: '越南语', en: '英语' }

  return `你是旋挖钻机行业的中越英翻译专家。你的任务是将完整的${srcNames[sourceLang]}句子翻译成${tgtNames[targetLang]}句子。

## 核心规则（必须严格遵守）
1. 翻译整个句子，绝不能只输出单个词语
2. 只输出${tgtNames[targetLang]}译文，禁止输出${srcNames[sourceLang]}或其他语言
3. 保持原文的句式结构和语气（疑问句→疑问句，祈使句→祈使句）
4. 数字、尺寸、型号保持原值不变

## 行业术语参考（翻译时使用以下标准译法）
${termTable}

请翻译以下内容，只返回翻译后的完整句子。`
}

const LANG_NAMES = {
  zh: 'Chinese',
  vi: 'Vietnamese',
  en: 'English'
}

export async function translateText({ text, sourceLang, targetLang, mode = 'general', apiKey }) {
  if (!apiKey) throw new Error('missing_api_key')
  if (!text?.trim()) throw new Error('empty_input')

  let systemPrompt
  if (mode === 'technical') {
    systemPrompt = getTechnicalPrompt(sourceLang, targetLang)
  } else {
    systemPrompt = '你是一名专业翻译专家。请将以下内容准确翻译到目标语言，保持原意和语气。只返回翻译结果，不要加任何解释。'
    const srcName = LANG_NAMES[sourceLang] || sourceLang
    const tgtName = LANG_NAMES[targetLang] || targetLang
    systemPrompt += ` 将以下${srcName}翻译成${tgtName}。`
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: 0.3,
        max_tokens: 4096
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 429) throw new Error('rate_limited')
      if (response.status === 401) throw new Error('invalid_api_key')
      throw new Error(errorData.error?.message || `API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('timeout')
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function searchCustomers({ keyword, customerCount = 10, country = 'Vietnam', apiKey }) {
  if (!apiKey) throw new Error('missing_api_key')
  if (!keyword?.trim()) throw new Error('empty_keyword')

  const systemPrompt = `你是一名国际贸易客户开发专家。请根据产品关键词，生成${customerCount}个潜在客户信息。客户应该是在${country}的相关贸易公司、进口商或经销商。以严格的JSON数组格式返回，每个对象包含以下字段：company（公司名称）、contact（联系人）、email（邮箱）、address（公司地址）、social（社交媒体，如LinkedIn/Facebook链接）、legalRep（公司法人）。只返回JSON数组，不要加任何解释或markdown格式。`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: keyword }
        ],
        temperature: 0.5,
        max_tokens: 4096
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 429) throw new Error('rate_limited')
      if (response.status === 401) throw new Error('invalid_api_key')
      throw new Error(errorData.error?.message || `API error: ${response.status}`)
    }

    const data = await response.json()
    const raw = data.choices[0].message.content.trim()
    const jsonStr = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(jsonStr)
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('timeout')
    if (err instanceof SyntaxError) throw new Error('parse_error')
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function generateMarketingCopy({ productName, wordCount, apiKey }) {
  if (!apiKey) throw new Error('missing_api_key')
  if (!productName?.trim()) throw new Error('empty_product')

  const systemPrompt = `你是一名专业的中文营销文案撰写专家，专注于中越贸易产品推广。请根据用户提供的产品名称，撰写一篇约${wordCount}字的中文营销文案。文案应包含：产品亮点、竞争优势、适用场景、以及号召购买的内容。语言应专业、有感染力，适合B2B贸易场景。只返回文案内容，不要加任何解释和标题。`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: productName }
        ],
        temperature: 0.7,
        max_tokens: 4096
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 429) throw new Error('rate_limited')
      if (response.status === 401) throw new Error('invalid_api_key')
      throw new Error(errorData.error?.message || `API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('timeout')
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}
