import { fields, singleton } from '@keystatic/core';

export const tra = singleton({
  label: '專案：台鐵 e訂通',
  path: 'src/content/work/tra',
  format: { data: 'json' },
  schema: {
    seo: fields.object(
      {
        title: fields.text({ label: '頁面標題' }),
        description: fields.text({ label: '頁面描述', multiline: true }),
      },
      { label: 'SEO 設定' },
    ),
    hero: fields.object(
      {
        cover: fields.object(
          {
            src: fields.text({ label: '圖片路徑' }),
            alt: fields.text({ label: '替代文字' }),
          },
          { label: '封面圖' },
        ),
        eyebrow: fields.text({ label: '眉標' }),
        title: fields.text({ label: '專案標題' }),
        lead: fields.text({ label: '導言', multiline: true }),
        meta: fields.array(
          fields.object({
            label: fields.text({ label: '欄位名稱' }),
            value: fields.text({ label: '內容', multiline: true }),
          }),
          {
            label: '專案資訊列',
            itemLabel: (props) => props.fields.label.value,
          },
        ),
      },
      { label: 'Hero 區塊' },
    ),
    ch01: fields.object(
      {
        title: fields.text({ label: '章節標題' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        research: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            metrics: fields.array(
              fields.object({
                value: fields.text({ label: '數值' }),
                label: fields.text({
                  label: '說明文字',
                  multiline: true,
                  description: '此欄位含 HTML 標記（<br> 換行），修改時請保留標記。',
                }),
              }),
              {
                label: '研究數據卡',
                itemLabel: (props) => props.fields.value.value,
              },
            ),
            note: fields.text({ label: '附註', multiline: true }),
          },
          { label: '前期研究概覽' },
        ),
        scope: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            cards: fields.array(
              fields.object({
                tag: fields.text({ label: '問題標籤' }),
                title: fields.text({ label: '卡片標題' }),
                text: fields.text({ label: '卡片說明', multiline: true }),
              }),
              {
                label: '問題範圍卡',
                itemLabel: (props) => props.fields.title.value,
              },
            ),
          },
          { label: '問題範圍與改版方向' },
        ),
      },
      { label: '01 背景與目標' },
    ),
    ch02: fields.object(
      {
        title: fields.text({ label: '章節標題' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        methods: fields.array(
          fields.object({
            title: fields.text({ label: '方法名稱' }),
            text: fields.text({ label: '方法說明', multiline: true }),
          }),
          {
            label: '研究方法卡',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        reviews: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
            items: fields.array(fields.text({ label: '問題類別' }), {
              label: '評論問題類別',
              itemLabel: (props) => props.value,
            }),
          },
          { label: '公開評論中的問題方向' },
        ),
        participants: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
            cards: fields.array(
              fields.object({
                name: fields.text({ label: '參與者名稱' }),
                frequency: fields.text({ label: '搭乘頻率' }),
                note: fields.text({ label: '背景說明', multiline: true }),
              }),
              {
                label: '受訪者卡',
                itemLabel: (props) => props.fields.name.value,
              },
            ),
            note: fields.text({ label: '附註', multiline: true }),
          },
          { label: '四位研究參與者的使用差異' },
        ),
        tasks: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
          },
          { label: '相同任務中的操作與理解' },
        ),
        journey: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            paragraphs: fields.array(
              fields.text({ label: '段落', multiline: true }),
              {
                label: '段落內容',
                itemLabel: (props) => props.value,
              },
            ),
            image: fields.object(
              {
                src: fields.text({ label: '圖片路徑' }),
                alt: fields.text({ label: '替代文字' }),
              },
              { label: 'Journey Map 圖' },
            ),
            caption: fields.text({ label: '圖說', multiline: true }),
          },
          { label: '代表性任務歷程' },
        ),
        findings: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: '問題名稱' }),
                text: fields.text({ label: '問題說明', multiline: true }),
              }),
              {
                label: '研究發現',
                itemLabel: (props) => props.fields.title.value,
              },
            ),
          },
          { label: '研究收斂' },
        ),
      },
      { label: '02 挑戰與洞察' },
    ),
    ch03: fields.object(
      {
        title: fields.text({ label: '章節標題' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        tradeoff: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            lose: fields.object(
              {
                tag: fields.text({ label: '標籤' }),
                text: fields.text({ label: '說明', multiline: true }),
              },
              { label: '未採用方案' },
            ),
            win: fields.object(
              {
                tag: fields.text({ label: '標籤' }),
                title: fields.text({ label: '方案標題' }),
                text: fields.text({ label: '說明', multiline: true }),
              },
              { label: '最終選擇' },
            ),
            note: fields.text({ label: '附註', multiline: true }),
          },
          { label: '核心取捨' },
        ),
        decisions: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
            cards: fields.array(
              fields.object({
                phase: fields.text({ label: '問題層次' }),
                num: fields.text({ label: '決策編號' }),
                title: fields.text({ label: '決策標題' }),
                problem: fields.text({ label: '問題描述', multiline: true }),
                choice: fields.text({ label: '設計選擇', multiline: true }),
                tradeoff: fields.text({ label: '取捨', multiline: true }),
              }),
              {
                label: '設計決策卡',
                itemLabel: (props) => props.fields.title.value,
              },
            ),
          },
          { label: '四項關鍵設計決策' },
        ),
        ia: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
            pills: fields.array(fields.text({ label: '入口名稱' }), {
              label: '主要入口膠囊',
              itemLabel: (props) => props.value,
            }),
            note: fields.text({ label: '附註' }),
            summary: fields.text({ label: '展開提示文字' }),
            image: fields.object(
              {
                src: fields.text({ label: '圖片路徑' }),
                alt: fields.text({ label: '替代文字' }),
              },
              { label: 'Functional Map 圖' },
            ),
            caption: fields.text({ label: '圖說', multiline: true }),
          },
          { label: '資訊架構' },
        ),
        userflow: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
            image: fields.object(
              {
                src: fields.text({ label: '圖片路徑' }),
                alt: fields.text({ label: '替代文字' }),
              },
              { label: 'User Flow 圖' },
            ),
            caption: fields.text({ label: '圖說', multiline: true }),
          },
          { label: 'User Flow' },
        ),
        wireframe: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
            image: fields.object(
              {
                src: fields.text({ label: '圖片路徑' }),
                alt: fields.text({ label: '替代文字' }),
              },
              { label: 'Wireframe 圖' },
            ),
            hint: fields.text({ label: '捲動提示文字' }),
          },
          { label: 'Wireframe' },
        ),
        testing: fields.object(
          {
            heading: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
          },
          { label: '易用性測試' },
        ),
      },
      { label: '03 設計決策' },
    ),
    ch04: fields.object(
      {
        title: fields.text({ label: '章節標題' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        styleguide: fields.object(
          {
            tag: fields.text({ label: '標籤' }),
            title: fields.text({ label: '小節標題' }),
            text: fields.text({ label: '小節說明', multiline: true }),
            image: fields.object(
              {
                src: fields.text({ label: '圖片路徑' }),
                alt: fields.text({ label: '替代文字' }),
              },
              { label: '介面規範圖' },
            ),
            hint: fields.text({ label: '捲動提示文字' }),
          },
          { label: '介面規範' },
        ),
        screens: fields.array(
          fields.object({
            tag: fields.text({ label: '標籤' }),
            title: fields.text({ label: '介面標題' }),
            text: fields.text({ label: '介面說明', multiline: true }),
            image: fields.object(
              {
                src: fields.text({ label: '圖片路徑' }),
                alt: fields.text({ label: '替代文字' }),
              },
              { label: '介面圖' },
            ),
          }),
          {
            label: '介面展示',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
      },
      { label: '04 介面設計' },
    ),
    next: fields.object(
      {
        eyebrow: fields.text({ label: '眉標' }),
        label: fields.text({ label: '連結文字' }),
        href: fields.text({ label: '連結網址' }),
      },
      { label: 'Next project' },
    ),
  },
});
