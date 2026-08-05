import { fields, singleton } from '@keystatic/core';

export const aboutPage = singleton({
  label: '關於我',
  path: 'src/content/about',
  format: { data: 'json' },
  schema: {
    meta: fields.object(
      {
        title: fields.text({ label: '頁面標題' }),
        description: fields.text({ label: '頁面描述', multiline: true }),
      },
      { label: '頁面資訊（SEO）' }
    ),
    hero: fields.object(
      {
        headingLine1: fields.text({
          label: '主標第一行',
          description: '含 HTML 標記：寶藍色名字的 <span> 標籤，編輯時請保留',
        }),
        headingLine2: fields.text({ label: '主標第二行' }),
        intro: fields.text({ label: '自介段落', multiline: true }),
        profile: fields.object(
          {
            name: fields.text({ label: '姓名' }),
            role: fields.text({ label: '職稱' }),
            location: fields.text({ label: '地點' }),
            photo: fields.object(
              {
                src: fields.text({ label: '照片路徑' }),
                alt: fields.text({ label: '照片替代文字' }),
              },
              { label: '個人照片' }
            ),
            emailButton: fields.object(
              {
                label: fields.text({ label: '按鈕文字' }),
                href: fields.text({ label: '連結' }),
              },
              { label: 'Email 按鈕' }
            ),
            resumeButton: fields.object(
              {
                label: fields.text({ label: '按鈕文字' }),
                href: fields.text({ label: '連結' }),
              },
              { label: '下載履歷按鈕' }
            ),
          },
          { label: '個人資訊卡' }
        ),
      },
      { label: '01 頁首 Hero' }
    ),
    background: fields.object(
      {
        number: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題' }),
        experience: fields.object(
          {
            heading: fields.text({ label: '欄位標題' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: '職稱' }),
                meta: fields.text({ label: '單位與期間' }),
                body: fields.text({ label: '說明', multiline: true }),
              }),
              { label: '經歷項目', itemLabel: (props) => props.fields.title.value }
            ),
          },
          { label: 'Experience 欄' }
        ),
        education: fields.object(
          {
            heading: fields.text({ label: '欄位標題' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: '科系' }),
                meta: fields.text({ label: '學校與年份' }),
              }),
              { label: '學歷項目', itemLabel: (props) => props.fields.title.value }
            ),
          },
          { label: 'Education 欄' }
        ),
        tools: fields.object(
          {
            heading: fields.text({ label: '欄位標題' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: '分類名稱' }),
                body: fields.text({ label: '工具清單' }),
              }),
              { label: '工具項目', itemLabel: (props) => props.fields.title.value }
            ),
          },
          { label: 'Tools & Technical 欄' }
        ),
        recognition: fields.object(
          {
            heading: fields.text({ label: '欄位標題' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: '獎項名稱' }),
                linkLabel: fields.text({ label: '連結文字' }),
                linkHref: fields.text({ label: '連結網址' }),
              }),
              { label: '獲獎項目', itemLabel: (props) => props.fields.title.value }
            ),
          },
          { label: 'Recognition 欄' }
        ),
      },
      { label: '02 經歷與背景' }
    ),
    careerPath: fields.object(
      {
        number: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題' }),
        lead: fields.text({ label: '章節前言', multiline: true }),
        cards: fields.array(
          fields.object({
            label: fields.text({ label: '卡片標籤' }),
            title: fields.text({ label: '卡片標題' }),
            body: fields.text({ label: '內文', multiline: true }),
          }),
          { label: '路徑卡片', itemLabel: (props) => props.fields.title.value }
        ),
      },
      { label: '03 我的職涯路徑' }
    ),
    responsibilities: fields.object(
      {
        number: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題' }),
        lead: fields.text({ label: '章節前言', multiline: true }),
        cards: fields.array(
          fields.object({
            label: fields.text({ label: '卡片標籤' }),
            title: fields.text({ label: '卡片標題' }),
            paragraphs: fields.array(fields.text({ label: '段落', multiline: true }), {
              label: '內文段落',
              itemLabel: (props) => props.value,
            }),
            tags: fields.array(fields.text({ label: '標籤' }), {
              label: '技能標籤',
              itemLabel: (props) => props.value,
            }),
          }),
          { label: '職責卡片', itemLabel: (props) => props.fields.title.value }
        ),
        aiNote: fields.object(
          {
            eyebrow: fields.text({ label: '小標' }),
            title: fields.text({ label: '標題' }),
            paragraphs: fields.array(fields.text({ label: '段落', multiline: true }), {
              label: '內文段落',
              itemLabel: (props) => props.value,
            }),
          },
          { label: 'AI Workflow 補充' }
        ),
      },
      { label: '04 我實際負責什麼' }
    ),
    collaboration: fields.object(
      {
        number: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題' }),
        lead: fields.text({ label: '章節前言', multiline: true }),
        cards: fields.array(
          fields.object({
            title: fields.text({ label: '卡片標題' }),
            body: fields.text({ label: '內文', multiline: true }),
          }),
          { label: '協作卡片', itemLabel: (props) => props.fields.title.value }
        ),
      },
      { label: '05 我的協作方式' }
    ),
    beyondWork: fields.object(
      {
        number: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題' }),
        body: fields.text({ label: '內文', multiline: true }),
      },
      { label: '06 工作之外' }
    ),
    contact: fields.object(
      {
        title: fields.text({ label: '章節標題' }),
        lead: fields.text({ label: '說明文字' }),
        workButton: fields.object(
          {
            label: fields.text({ label: '按鈕文字' }),
            href: fields.text({ label: '連結' }),
          },
          { label: '查看作品按鈕' }
        ),
        resumeButton: fields.object(
          {
            label: fields.text({ label: '按鈕文字' }),
            href: fields.text({ label: '連結' }),
          },
          { label: '下載履歷按鈕' }
        ),
        emailButton: fields.object(
          {
            label: fields.text({ label: '按鈕文字' }),
            href: fields.text({ label: '連結' }),
          },
          { label: 'Email 按鈕' }
        ),
        email: fields.object(
          {
            text: fields.text({ label: '顯示文字' }),
            href: fields.text({
              label: '連結',
              description: '注意：頁面 script 內的複製功能仍寫死同一組 Email，改此欄位需一併通知工程調整',
            }),
          },
          { label: 'Email 顯示連結' }
        ),
      },
      { label: '07 Contact' }
    ),
  },
});
