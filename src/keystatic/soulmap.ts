import { fields, singleton } from '@keystatic/core';

const image = (label: string) =>
  fields.object(
    {
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '替代文字（alt）' }),
    },
    { label }
  );

const imageWithCaption = (label: string) =>
  fields.object(
    {
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '替代文字（alt）' }),
      caption: fields.text({ label: '圖說' }),
    },
    { label }
  );

export const soulmap = singleton({
  label: '專案：Soul Map',
  path: 'src/content/work/soulmap',
  format: { data: 'json' },
  schema: {
    seo: fields.object(
      {
        title: fields.text({ label: '頁面標題' }),
        description: fields.text({ label: '頁面描述', multiline: true }),
      },
      { label: 'SEO' }
    ),
    hero: fields.object(
      {
        coverSrc: fields.text({ label: '主視覺圖片路徑' }),
        coverAlt: fields.text({ label: '主視覺替代文字（alt）' }),
        eyebrow: fields.text({ label: '眉標（分類 · 年份）' }),
        title: fields.text({ label: '專案標題' }),
        lead: fields.text({ label: '導言', multiline: true }),
      },
      { label: 'Hero 區塊' }
    ),
    meta: fields.array(
      fields.object({
        label: fields.text({ label: '欄位名稱' }),
        value: fields.text({ label: '欄位內容' }),
      }),
      { label: '專案資訊列', itemLabel: (props) => props.fields.label.value }
    ),
    ch01: fields.object(
      {
        label: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        goals: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            items: fields.array(fields.text({ label: '目標', multiline: true }), {
              label: '目標清單',
              itemLabel: (props) => props.value,
            }),
            note: fields.text({ label: '補充說明（note）', multiline: true }),
          },
          { label: '專案目標' }
        ),
      },
      { label: '01 背景與目標' }
    ),
    ch02: fields.object(
      {
        label: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        phases: fields.array(
          fields.object({
            title: fields.text({ label: '階段名稱' }),
            detail: fields.text({ label: '階段說明' }),
          }),
          { label: '研究階段列', itemLabel: (props) => props.fields.title.value }
        ),
        research: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            image: imageWithCaption('競品比較圖'),
          },
          { label: '競品分析' }
        ),
        persona: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            note: fields.text({ label: '補充說明（note）', multiline: true }),
            image: imageWithCaption('Persona 圖'),
          },
          { label: '三類假設型 Persona' }
        ),
        journey: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body1: fields.text({ label: '內文段落一', multiline: true }),
            body2: fields.text({ label: '內文段落二', multiline: true }),
            image: imageWithCaption('Journey Map 圖'),
          },
          { label: '旅程整理' }
        ),
        directions: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            image: image('Point of View 圖'),
          },
          { label: '設計方向' }
        ),
      },
      { label: '02 挑戰與洞察' }
    ),
    ch03: fields.object(
      {
        label: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        versus: fields.object(
          {
            lose: fields.object(
              {
                tag: fields.text({ label: '標籤' }),
                title: fields.text({ label: '方案名稱' }),
                body: fields.text({ label: '說明', multiline: true }),
              },
              { label: '未採用方案' }
            ),
            win: fields.object(
              {
                tag: fields.text({ label: '標籤' }),
                title: fields.text({ label: '方案名稱' }),
                body: fields.text({ label: '說明', multiline: true }),
              },
              { label: '最終選擇' }
            ),
          },
          { label: '方案比較（A vs 最終選擇）' }
        ),
        conclusion: fields.text({ label: '比較結論段落', multiline: true }),
        stages: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: '階段名稱（粗體）' }),
                desc: fields.text({ label: '階段說明' }),
              }),
              { label: '內容階段清單', itemLabel: (props) => props.fields.title.value }
            ),
            note: fields.text({ label: '補充說明（note）', multiline: true }),
          },
          { label: '三個內容階段' }
        ),
        decisions: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            items: fields.array(
              fields.object({
                phase: fields.text({ label: '階段標籤（如：開始／回顧／紀錄）' }),
                num: fields.text({ label: '決策編號（如：決策 01）' }),
                title: fields.text({ label: '決策標題' }),
                basis: fields.text({ label: '依據（含「依據 · 」前綴）', multiline: true }),
                choice: fields.text({ label: '設計選擇', multiline: true }),
                tradeoff: fields.text({ label: '取捨', multiline: true }),
              }),
              { label: '決策卡片', itemLabel: (props) => props.fields.title.value }
            ),
          },
          { label: '三個決策' }
        ),
        extension: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
          },
          { label: '延伸探索：好友分享' }
        ),
        architecture: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            functionalMap: imageWithCaption('Functional Map 圖'),
            userFlow: imageWithCaption('User Flow 圖'),
          },
          { label: '功能架構與流程' }
        ),
        wireframe: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            image: image('Wireframe 圖'),
          },
          { label: 'Wireframe' }
        ),
      },
      { label: '03 設計決策' }
    ),
    ch04: fields.object(
      {
        label: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        styleguide: fields.object(
          {
            k: fields.text({ label: '小標籤（eyebrow）' }),
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            image: image('介面規範圖'),
            hint: fields.text({ label: '捲動提示文字' }),
          },
          { label: '介面規範' }
        ),
        character: fields.object(
          {
            k: fields.text({ label: '小標籤（eyebrow）' }),
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            image: image('角色設計圖'),
          },
          { label: '角色設計' }
        ),
        screens: fields.array(
          fields.object({
            k: fields.text({ label: '小標籤（如：介面 01／延伸探索）' }),
            title: fields.text({ label: '介面標題' }),
            body: fields.text({ label: '介面說明', multiline: true }),
            image: image('介面截圖'),
          }),
          { label: '介面展示清單', itemLabel: (props) => props.fields.title.value }
        ),
      },
      { label: '04 介面設計' }
    ),
    next: fields.object(
      {
        eyebrow: fields.text({ label: '眉標' }),
        label: fields.text({ label: '連結文字（含箭頭 →）' }),
        href: fields.text({ label: '連結網址' }),
      },
      { label: 'Next project 區塊' }
    ),
  },
});
