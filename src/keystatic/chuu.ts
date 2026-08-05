import { fields, singleton } from '@keystatic/core';

const image = (label: string) =>
  fields.object(
    {
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '圖片替代文字（alt）' }),
    },
    { label }
  );

const figure = (label: string) =>
  fields.object(
    {
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '圖片替代文字（alt）' }),
      caption: fields.text({ label: '圖說' }),
    },
    { label }
  );

const factItems = (label: string) =>
  fields.array(
    fields.object({
      label: fields.text({ label: '粗體標題' }),
      text: fields.text({ label: '說明文字' }),
    }),
    { label, itemLabel: (props) => props.fields.label.value }
  );

const screen = fields.object({
  eyebrow: fields.text({ label: '眉標' }),
  title: fields.text({ label: '標題' }),
  body: fields.text({ label: '說明文字', multiline: true }),
  image: image('展示圖片'),
});

export const chuu = singleton({
  label: '專案：chuu 服飾電商',
  path: 'src/content/work/chuu',
  format: { data: 'json' },
  schema: {
    title: fields.text({ label: '頁面標題（瀏覽器分頁）' }),
    description: fields.text({ label: '頁面描述（SEO meta description）', multiline: true }),
    hero: fields.object(
      {
        cover: image('滿版主視覺'),
        eyebrow: fields.text({ label: '眉標' }),
        heading: fields.text({ label: '主標題' }),
        lead: fields.text({ label: '導言', multiline: true }),
        meta: fields.array(
          fields.object({
            label: fields.text({ label: '欄位名稱' }),
            value: fields.text({ label: '內容' }),
          }),
          { label: '專案資訊列', itemLabel: (props) => props.fields.label.value }
        ),
      },
      { label: 'Hero 區' }
    ),
    ch01: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        goals: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            items: factItems('目標列表'),
          },
          { label: '專案目標' }
        ),
        role: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            phases: fields.array(
              fields.object({
                title: fields.text({ label: '階段名稱' }),
                text: fields.text({ label: '階段內容', multiline: true }),
              }),
              { label: '階段列表', itemLabel: (props) => props.fields.title.value }
            ),
          },
          { label: '我的角色與交付' }
        ),
        note: fields.text({ label: '註記（非商業聲明）', multiline: true }),
      },
      { label: '01 背景與目標' }
    ),
    ch02: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        competitive: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            figure: figure('附圖'),
          },
          { label: '競品與介面觀察' }
        ),
        userFeedback: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            figure: figure('附圖'),
          },
          { label: '四位使用者的購物經驗整理' }
        ),
        journey: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            figure: figure('附圖'),
          },
          { label: '初步購物旅程' }
        ),
        consensus: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            items: factItems('收斂項目'),
          },
          { label: '問題收斂' }
        ),
        structure: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            functionalMap: fields.object(
              {
                body: fields.text({ label: '內文', multiline: true }),
                figure: figure('附圖'),
              },
              { label: 'Functional Map' }
            ),
            userFlow: fields.object(
              {
                body: fields.text({ label: '內文', multiline: true }),
                figure: figure('附圖'),
              },
              { label: 'User Flow' }
            ),
            wireframe: fields.object(
              {
                body: fields.text({ label: '內文', multiline: true }),
                figure: image('附圖（無圖說）'),
              },
              { label: 'Wireframe' }
            ),
          },
          { label: '架構、流程與線框' }
        ),
        prototype: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '內文', multiline: true }),
            figure: figure('附圖'),
          },
          { label: 'Prototype 測試' }
        ),
        adjustments: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            items: factItems('調整方向列表'),
          },
          { label: '測試後調整方向' }
        ),
      },
      { label: '02 挑戰與洞察' }
    ),
    ch03: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        coreDecision: fields.object(
          {
            num: fields.text({ label: '卡片標記' }),
            title: fields.text({ label: '決策標題' }),
            findingLabel: fields.text({ label: '依據欄位名稱' }),
            finding: fields.text({ label: '依據內容', multiline: true }),
            decisionLabel: fields.text({ label: '決策欄位名稱' }),
            decision: fields.text({ label: '決策內容', multiline: true }),
            tradeoffLabel: fields.text({ label: '取捨欄位名稱' }),
            tradeoff: fields.text({ label: '取捨內容', multiline: true }),
          },
          { label: '核心決策卡' }
        ),
        extensions: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            cards: fields.array(
              fields.object({
                phase: fields.text({ label: '階段標籤' }),
                num: fields.text({ label: '卡片標記' }),
                title: fields.text({ label: '決策標題' }),
                findingLabel: fields.text({ label: '依據欄位名稱' }),
                finding: fields.text({ label: '依據內容', multiline: true }),
                decisionLabel: fields.text({ label: '決策欄位名稱' }),
                decision: fields.text({ label: '決策內容', multiline: true }),
                tradeoffLabel: fields.text({ label: '取捨欄位名稱' }),
                tradeoff: fields.text({ label: '取捨內容', multiline: true }),
              }),
              { label: '延伸決策卡', itemLabel: (props) => props.fields.title.value }
            ),
          },
          { label: '三個延伸決策' }
        ),
      },
      { label: '03 設計決策' }
    ),
    ch04: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        title: fields.text({ label: '章節標題（同時用於左側導覽）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        styleguide: fields.object(
          {
            eyebrow: fields.text({ label: '眉標' }),
            title: fields.text({ label: '標題' }),
            body: fields.text({ label: '說明文字', multiline: true }),
            image: image('介面規範圖'),
            hint: fields.text({ label: '捲動提示文字' }),
          },
          { label: '介面規範（UI Guidelines）' }
        ),
        screens: fields.array(screen, {
          label: '核心介面（介面 01–04）',
          itemLabel: (props) => props.fields.title.value,
        }),
        responsive: fields.object(
          {
            eyebrow: fields.text({ label: '眉標' }),
            title: fields.text({ label: '標題' }),
            body: fields.text({ label: '說明文字', multiline: true }),
            image: image('展示圖片'),
          },
          { label: '跨裝置設計（Responsive）' }
        ),
        frontend: fields.object(
          {
            eyebrow: fields.text({ label: '眉標' }),
            title: fields.text({ label: '標題' }),
            body1: fields.text({ label: '說明文字（第一段）', multiline: true }),
            body2: fields.text({ label: '說明文字（第二段）', multiline: true }),
            figures: fields.array(figure('切版成品圖'), {
              label: '切版成品圖列表',
              itemLabel: (props) => props.fields.caption.value,
            }),
          },
          { label: '靜態前端切版（Front-end）' }
        ),
        extendedScreens: fields.array(screen, {
          label: '延伸介面',
          itemLabel: (props) => props.fields.title.value,
        }),
      },
      { label: '04 介面設計' }
    ),
    next: fields.object(
      {
        eyebrow: fields.text({ label: '眉標' }),
        title: fields.text({ label: '下一個專案名稱（模板會自動加「→」）' }),
        href: fields.text({ label: '連結網址' }),
      },
      { label: 'Next project 區' }
    ),
  },
});
