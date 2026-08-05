import { fields, singleton } from '@keystatic/core';

export const site = singleton({
  label: '網站共用（導覽與頁尾）',
  path: 'src/content/site',
  format: { data: 'json' },
  schema: {
    nav: fields.object(
      {
        work: fields.text({ label: '導覽：作品' }),
        about: fields.text({ label: '導覽：關於我' }),
        contact: fields.text({ label: '導覽：聯絡我（膠囊鈕）' }),
      },
      { label: '頂部導覽（首頁與關於我）' }
    ),
    topbar: fields.object(
      {
        back: fields.text({ label: '返回連結文字' }),
      },
      { label: '專案頁頂欄' }
    ),
    footerIndex: fields.object(
      {
        left: fields.text({ label: '左側文字' }),
        right: fields.text({ label: '右側文字' }),
      },
      { label: '頁尾（首頁）' }
    ),
    footerAbout: fields.object(
      {
        left: fields.text({ label: '左側文字' }),
        right: fields.text({ label: '右側文字' }),
      },
      { label: '頁尾（關於我）' }
    ),
    footerCase: fields.object(
      {
        menuLabel: fields.text({ label: 'Menu 欄標題' }),
        menuLinks: fields.array(
          fields.object({
            label: fields.text({ label: '文字' }),
            href: fields.text({ label: '連結' }),
          }),
          { label: 'Menu 連結', itemLabel: (props) => props.fields.label.value }
        ),
        reachLabel: fields.text({ label: 'Reach out 欄標題' }),
        email: fields.object(
          {
            label: fields.text({ label: '文字' }),
            href: fields.text({ label: '連結（mailto:開頭）' }),
          },
          { label: 'Email 連結' }
        ),
        cv: fields.object(
          {
            label: fields.text({ label: '文字' }),
            href: fields.text({ label: '檔案路徑' }),
          },
          { label: 'CV 下載連結' }
        ),
        copyright: fields.text({ label: '版權文字' }),
        tagline: fields.text({ label: '右下角標語' }),
      },
      { label: '頁尾（四個專案頁）' }
    ),
  },
});
