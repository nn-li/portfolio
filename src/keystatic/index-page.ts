import { fields, singleton } from '@keystatic/core';

export const indexPage = singleton({
  label: '首頁',
  path: 'src/content/index',
  format: { data: 'json' },
  schema: {
    meta: fields.object(
      {
        title: fields.text({ label: '頁面標題', description: '顯示在瀏覽器分頁上的標題' }),
        description: fields.text({ label: '頁面描述', multiline: true, description: '搜尋引擎與社群分享顯示的描述文字' }),
      },
      { label: '頁面資訊（SEO）' }
    ),
    hero: fields.object(
      {
        status: fields.text({ label: '狀態列文字', description: '主標上方括號內的一行小字' }),
        headingHtml: fields.text({ label: 'Hero 主標', description: '可用 HTML，斜體強調字寫 <em>…</em>' }),
        portrait: fields.object(
          {
            src: fields.text({ label: '圖片路徑' }),
            alt: fields.text({ label: '替代文字' }),
          },
          { label: '個人照片（翻轉卡正面）' }
        ),
        flipBackHtml: fields.text({ label: '翻轉卡背面文字', multiline: true, description: '可用 HTML，換行寫 <br />' }),
        scrollLabel: fields.text({ label: '「查看作品」按鈕文字' }),
      },
      { label: 'Hero 區塊' }
    ),
    marquee: fields.object(
      {
        items: fields.array(fields.text({ label: '字詞' }), {
          label: '跑馬燈字詞',
          itemLabel: (props) => props.value,
        }),
      },
      { label: '跑馬燈' }
    ),
    work: fields.object(
      {
        num: fields.text({ label: '區塊編號', description: '例：01' }),
        heading: fields.text({ label: '區塊標題' }),
        projects: fields.array(
          fields.object({
            title: fields.text({ label: '專案名稱' }),
            description: fields.text({ label: '介紹句' }),
            tags: fields.array(
              fields.object({
                label: fields.text({ label: '標籤文字' }),
                win: fields.checkbox({ label: '得獎標籤', description: '勾選後以橘色強調並加上 * 前綴' }),
              }),
              {
                label: '標籤',
                itemLabel: (props) => props.fields.label.value,
              }
            ),
            cover: fields.object(
              {
                src: fields.text({ label: '封面圖路徑' }),
                alt: fields.text({ label: '封面圖替代文字', description: '裝飾用圖片可留空' }),
              },
              { label: '封面圖' }
            ),
            year: fields.text({ label: '年份' }),
            href: fields.text({ label: '連結網址', description: '例：/work/quake.html' }),
          }),
          {
            label: '專案卡片',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
      { label: 'Selected Projects 區塊' }
    ),
    about: fields.object(
      {
        num: fields.text({ label: '區塊編號', description: '例：02' }),
        heading: fields.text({ label: '區塊標題' }),
        leadHtml: fields.text({ label: '引言', description: '可用 HTML，橘色斜體重點字寫 <b>…</b>' }),
        body: fields.text({ label: '內文段落', multiline: true }),
        moreLabel: fields.text({ label: '「了解更多」連結文字' }),
      },
      { label: 'About 區塊' }
    ),
    howIWork: fields.object(
      {
        num: fields.text({ label: '區塊編號', description: '例：03' }),
        heading: fields.text({ label: '區塊標題' }),
        cards: fields.array(
          fields.object({
            num: fields.text({ label: '卡片編號', description: '例：/01' }),
            title: fields.text({ label: '卡片標題' }),
            body: fields.text({ label: '卡片內文', multiline: true }),
          }),
          {
            label: '工作方法卡片',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
      { label: 'How I Work 區塊' }
    ),
    contact: fields.object(
      {
        heading: fields.text({ label: '區塊標題' }),
        email: fields.text({ label: 'Email', description: '同時用於顯示文字與 mailto 連結' }),
        workLinkLabel: fields.text({ label: '「查看作品」連結文字' }),
        cvLinkLabel: fields.text({ label: '「下載履歷」連結文字' }),
      },
      { label: 'Contact 區塊' }
    ),
  },
});
