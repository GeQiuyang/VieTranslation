const API_BASE = 'https://api.deepseek.com/v1/chat/completions'

const SYSTEM_PROMPTS = {
  general: '你是一名专业的中文-越南语-英语翻译专家。请将以下内容准确翻译到目标语言，保持原意和语气。只返回翻译结果，不要加任何解释。',
  technical: '你是旋挖钻机行业的中越英翻译专家。精通钻杆（Kelly Bar）、钻头（Drill Bit）、动力头（Rotary Head）、液压系统（Hydraulic System）、底盘（Undercarriage）、变幅机构（Luffing Mechanism）等术语。请使用行业标准译法翻译以下内容，保留技术规格的数值精度。只返回翻译结果，不要加任何解释。'
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
