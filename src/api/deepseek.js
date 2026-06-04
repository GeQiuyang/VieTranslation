const API_BASE = 'https://api.deepseek.com/v1/chat/completions'

const SYSTEM_PROMPTS = {
  general: '你是一名专业的中文-越南语-英语翻译专家。请将以下内容准确翻译到目标语言，保持原意和语气。只返回翻译结果，不要加任何解释。',
  technical: `你是旋挖钻机行业的中越英翻译专家，具有十年以上行业经验。你必须使用以下标准术语进行翻译，确保术语一致性和准确性。保留所有数字、尺寸、规格参数的原始数值精度。

## 整机与系统 (Complete Machine & Systems)
- 旋挖钻机 = Máy khoan xoay = Rotary Drilling Rig
- 液压系统 = Hệ thống thủy lực = Hydraulic System
- 电控系统 = Hệ thống điều khiển điện = Electrical Control System
- 润滑系统 = Hệ thống bôi trơn = Lubrication System
- 冷却系统 = Hệ thống làm mát = Cooling System
- 行走系统 = Hệ thống di chuyển = Travel System

## 钻杆与钻头 (Drill Pipes & Bits)
- 凯氏钻杆 = Thanh Kelly = Kelly Bar
- 摩擦钻杆 = Cần khoan ma sát = Friction Kelly Bar
- 机锁钻杆 = Cần khoan khóa cơ = Interlocking Kelly Bar
- 钻头 = Mũi khoan = Drill Bit
- 筒钻 = Mũi khoan thùng = Core Barrel / Bucket
- 螺旋钻头 = Mũi khoan xoắn = Auger Drill Bit
- 扩底钻头 = Mũi khoan mở rộng đáy = Belling Bucket
- 取芯钻头 = Mũi khoan lấy lõi = Coring Bit
- 截齿 = Răng cắt = Cutting Pick

## 动力头 (Rotary Head)
- 动力头 = Đầu quay = Rotary Head
- 减速机 = Hộp giảm tốc = Gearbox / Reducer
- 马达 = Mô tơ = Motor
- 轴承 = Vòng bi = Bearing

## 液压元件 (Hydraulic Components)
- 加压油缸 = Xi lanh áp lực = Feed Cylinder
- 变幅油缸 = Xi lanh thay đổi biên độ = Luffing Cylinder
- 液压泵 = Bơm thủy lực = Hydraulic Pump
- 液压阀 = Van thủy lực = Hydraulic Valve
- 液压马达 = Mô tơ thủy lực = Hydraulic Motor
- 液压油缸 = Xi lanh thủy lực = Hydraulic Cylinder
- 油封 = Phốt dầu = Oil Seal
- 滤芯 = Lõi lọc = Filter Element

## 底盘与履带 (Undercarriage & Tracks)
- 底盘 = Khung gầm = Undercarriage
- 履带 = Xích = Track / Crawler
- 履带板 = Tấm xích = Track Pad
- 支重轮 = Bánh đỡ xích = Track Roller
- 引导轮 = Bánh dẫn hướng = Idler
- 驱动轮 = Bánh dẫn động = Sprocket
- 张紧装置 = Thiết bị căng xích = Track Tensioner

## 桅杆与结构件 (Mast & Structural Parts)
- 桅杆 = Cột chống = Mast
- 变幅机构 = Cơ cấu thay đổi biên độ = Luffing Mechanism
- 回转机构 = Cơ cấu xoay = Slewing Mechanism
- 回转支承 = Vòng bi xoay = Slewing Bearing
- 配重 = Đối trọng = Counterweight
- 主平台 = Sàn chính = Main Platform
- 护栏 = Lan can = Guardrail

## 卷扬与钢丝绳 (Winch & Wire Rope)
- 主卷扬 = Tời chính = Main Winch
- 副卷扬 = Tời phụ = Auxiliary Winch
- 钢丝绳 = Cáp thép = Wire Rope
- 滑轮组 = Cụm ròng rọc = Pulley Block
- 吊钩 = Móc cẩu = Hook

## 发动机与动力 (Engine & Power)
- 发动机 = Động cơ = Engine
- 柴油机 = Động cơ diesel = Diesel Engine
- 散热器 = Két tản nhiệt = Radiator
- 蓄电池 = Ắc quy = Battery
- 发电机 = Máy phát điện = Generator

## 控制系统 (Control System)
- 控制面板 = Bảng điều khiển = Control Panel
- 显示器 = Màn hình = Display / Monitor
- 传感器 = Cảm biến = Sensor
- 电磁阀 = Van điện từ = Solenoid Valve
- PLC控制器 = Bộ điều khiển PLC = PLC Controller

## 维修配件 (Maintenance Parts)
- 密封件 = Phớt làm kín = Seal
- 垫圈 = Vòng đệm = Washer / Gasket
- 螺栓 = Bu lông = Bolt
- 螺母 = Đai ốc = Nut
- 销轴 = Chốt trục = Pin
- 衬套 = Bạc lót = Bushing

## 贸易术语 (Trade Terms)
- FOB = FOB (Giao tại cảng)
- CIF = CIF (Bao gồm phí bảo hiểm và cước)
- 最小起订量 = Số lượng đặt hàng tối thiểu (MOQ)
- 交货期 = Thời gian giao hàng
- 技术参数 = Thông số kỹ thuật
- 操作手册 = Hướng dẫn vận hành
- 保修期 = Thời gian bảo hành

请严格按照上述术语表进行翻译。只返回翻译结果，不要加任何解释。`
}

const LANG_NAMES = {
  zh: 'Chinese',
  vi: 'Vietnamese',
  en: 'English'
}

export async function translateText({ text, sourceLang, targetLang, mode = 'general', apiKey }) {
  if (!apiKey) throw new Error('missing_api_key')
  if (!text?.trim()) throw new Error('empty_input')

  const srcName = LANG_NAMES[sourceLang] || sourceLang
  const tgtName = LANG_NAMES[targetLang] || targetLang
  const systemPrompt = `${SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.general} 将以下${srcName}翻译成${tgtName}。`

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
