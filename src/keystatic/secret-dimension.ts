import { fields, singleton } from '@keystatic/core';

// Secret Dimension（深色雙欄版）後台 schema。
// hero + 卡片牆 + 大圖 + 交錯雙欄 rows + 情緒色票 + 滿版收尾 + footer。

const img = (label: string) =>
  fields.object(
    {
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '替代文字（alt）' }),
    },
    { label }
  );

export const secretDimension = singleton({
  label: '專案：Secret Dimension',
  path: 'src/content/work/secret-dimension',
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
        eyebrow: fields.text({ label: '眉標（如 << GRAPHIC DESIGN >>）' }),
        title: fields.text({ label: '專案標題' }),
        quote: fields.text({ label: '金句', multiline: true }),
      },
      { label: 'Hero 區塊' }
    ),
    cards: fields.array(img('卡片'), {
      label: '最上方卡片牆',
      itemLabel: (props) => props.fields.alt.value,
    }),
    heroGraphic: img('大圖'),
    rows: fields.array(
      fields.object({
        side: fields.select({
          label: '版面',
          options: [
            { label: '純文字（滿版）', value: '' },
            { label: '圖左文右', value: 'left' },
            { label: '文左圖右', value: 'right' },
          ],
          defaultValue: 'left',
        }),
        label: fields.text({ label: '小標題（可留空，會加分隔線）' }),
        body: fields.text({ label: '內文', multiline: true }),
        quote: fields.text({ label: '金句（可留空）', multiline: true }),
        chart: fields.checkbox({ label: '顯示情緒能量選色表', defaultValue: false }),
        images: fields.array(img('圖片'), {
          label: '圖片（1–2 張）',
          itemLabel: (props) => props.fields.alt.value,
        }),
      }),
      {
        label: '交錯雙欄段落',
        itemLabel: (props) => props.fields.label.value || props.fields.body.value.slice(0, 16),
      }
    ),
    colorChart: fields.object(
      {
        title: fields.text({ label: '標題' }),
        bands: fields.array(fields.text({ label: '能量帶' }), {
          label: '能量帶（高頻/中頻/低頻）',
          itemLabel: (props) => props.value,
        }),
        items: fields.array(
          fields.object({
            sw: fields.text({ label: '色票色碼' }),
            label: fields.text({ label: '文字' }),
          }),
          { label: '情緒色票', itemLabel: (props) => props.fields.label.value }
        ),
      },
      { label: '情緒能量選色表' }
    ),
    finalImage: img('滿版收尾圖'),
    footer: fields.object(
      {
        copyright: fields.text({ label: '版權文字' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: '連結文字' }),
            href: fields.text({ label: '連結網址' }),
          }),
          { label: '社群連結', itemLabel: (props) => props.fields.label.value }
        ),
      },
      { label: '頁尾' }
    ),
    next: fields.object(
      {
        eyebrow: fields.text({ label: '眉標' }),
        label: fields.text({ label: '連結文字' }),
        href: fields.text({ label: '連結網址' }),
      },
      { label: 'Next 區塊' }
    ),
  },
});
