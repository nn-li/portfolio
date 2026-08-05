import { fields, singleton } from '@keystatic/core';

const image = (label: string) =>
  fields.object(
    {
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '替代文字（alt）' }),
    },
    { label }
  );

const captionedFigure = (label: string) =>
  fields.object(
    {
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '替代文字（alt）' }),
      caption: fields.text({ label: '圖說' }),
    },
    { label }
  );

const video = (label: string) =>
  fields.object(
    {
      poster: fields.text({ label: '影片封面圖路徑' }),
      src: fields.text({ label: '影片路徑' }),
      caption: fields.text({ label: '影片說明' }),
    },
    { label }
  );

const labeledLine = (label: string) =>
  fields.object(
    {
      label: fields.text({ label: '標籤文字' }),
      text: fields.text({ label: '內容', multiline: true }),
    },
    { label }
  );

const interviewGroup = (label: string) =>
  fields.object(
    {
      label: fields.text({ label: '群組標題' }),
      sub: fields.text({ label: '群組副標' }),
      rows: fields.array(
        fields.object({
          name: fields.text({ label: '受訪者名稱' }),
          tags: fields.array(
            fields.object({
              text: fields.text({ label: '標籤文字' }),
              hot: fields.checkbox({ label: '強調樣式（紅色標籤）' }),
            }),
            {
              label: '情境標籤',
              itemLabel: (props) => props.fields.text.value,
            }
          ),
          desc: fields.text({ label: '情境說明', multiline: true }),
        }),
        {
          label: '受訪者列表',
          itemLabel: (props) => props.fields.name.value,
        }
      ),
    },
    { label }
  );

const phasePlan = (label: string) =>
  fields.object(
    {
      title: fields.text({ label: '階段名稱' }),
      tag: fields.text({ label: '階段小標' }),
      desc: fields.text({ label: '階段說明', multiline: true }),
    },
    { label }
  );

const soundLevel = (label: string) =>
  fields.object(
    {
      level: fields.text({ label: '層級名稱' }),
      title: fields.text({ label: '標題' }),
      desc: fields.text({ label: '說明', multiline: true }),
      audio: fields.text({ label: '音檔路徑' }),
    },
    { label }
  );

const uiPhase = {
  pk: fields.text({ label: '區塊小標（英文標籤）' }),
  title: fields.text({ label: '區塊標題' }),
  body: fields.text({ label: '段落內文', multiline: true }),
};

const uiImages = (label: string) =>
  fields.array(
    fields.object({
      src: fields.text({ label: '圖片路徑' }),
      alt: fields.text({ label: '替代文字（alt）' }),
    }),
    {
      label,
      itemLabel: (props) => props.fields.alt.value,
    }
  );

export const quake = singleton({
  label: '專案：震時秒判 Quake',
  path: 'src/content/work/quake',
  format: { data: 'json' },
  schema: {
    title: fields.text({ label: '頁面標題（瀏覽器分頁）' }),
    description: fields.text({ label: '頁面描述（SEO meta）', multiline: true }),
    hero: fields.object(
      {
        cover: image('封面主視覺'),
        eyebrow: fields.text({ label: '頂部小標（eyebrow）' }),
        title: fields.text({ label: '專案標題' }),
        lead: fields.text({ label: '導言副標', multiline: true }),
        awardImage: image('獎項標章圖'),
        awards: fields.array(
          fields.object({
            name: fields.text({ label: '獎項名稱' }),
            en: fields.text({ label: '獎項英文名稱' }),
          }),
          {
            label: '獎項',
            itemLabel: (props) => props.fields.name.value,
          }
        ),
        meta: fields.array(
          fields.object({
            label: fields.text({ label: '欄位名稱' }),
            value: fields.text({ label: '欄位內容' }),
          }),
          {
            label: '專案資訊列',
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      },
      { label: 'Hero 區' }
    ),
    ch01: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        label: fields.text({ label: '章節標題（同左側導覽文字）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        goals: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            items: fields.array(fields.text({ label: '目標項目', multiline: true }), {
              label: '專案目標列表',
              itemLabel: (props) => props.value,
            }),
          },
          { label: '專案目標' }
        ),
        problem: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            bodyHtml: fields.text({
              label: '段落內文（HTML）',
              multiline: true,
              description: '含 HTML 標記（<b style="color:var(--clay)"> 重點字），會以 set:html 原樣輸出，請保留標籤。',
            }),
            figure: captionedFigure('配圖'),
          },
          { label: '核心設計問題' }
        ),
        research: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            methods: fields.array(
              fields.object({
                title: fields.text({ label: '方法名稱' }),
                desc: fields.text({ label: '方法說明', multiline: true }),
              }),
              {
                label: '研究方法卡',
                itemLabel: (props) => props.fields.title.value,
              }
            ),
          },
          { label: '研究方法' }
        ),
        survey: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            metrics: fields.array(
              fields.object({
                value: fields.text({ label: '數值' }),
                label: fields.text({ label: '說明文字' }),
              }),
              {
                label: '問卷數據卡',
                itemLabel: (props) => props.fields.label.value,
              }
            ),
            note: fields.text({ label: '樣本註記', multiline: true }),
            closing: fields.text({ label: '收尾段落', multiline: true }),
          },
          { label: '問卷結果' }
        ),
      },
      { label: '01 背景與目標' }
    ),
    ch02: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        label: fields.text({ label: '章節標題（同左側導覽文字）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        stats: fields.array(
          fields.object({
            title: fields.text({ label: '主標' }),
            tag: fields.text({ label: '小標' }),
            desc: fields.text({ label: '說明', multiline: true }),
          }),
          {
            label: '章節重點卡（週期／情境／操作）',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        sampling: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            groupMain: interviewGroup('代表情境群組'),
            groupCheck: interviewGroup('延伸訪談群組'),
            closingHtml: fields.text({
              label: '收尾段落（HTML）',
              multiline: true,
              description: '含 HTML 標記（<b style="color:var(--clay)"> 重點字），會以 set:html 原樣輸出，請保留標籤。',
            }),
          },
          { label: '訪談取樣' }
        ),
        failure: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            phases: fields.array(
              fields.object({
                title: fields.text({ label: '情境名稱' }),
                desc: fields.text({ label: '情境說明', multiline: true }),
              }),
              {
                label: '情境卡',
                itemLabel: (props) => props.fields.title.value,
              }
            ),
          },
          { label: '警報失效情境' }
        ),
        journey: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            figure: captionedFigure('Journey Map 圖'),
            closing: fields.text({ label: '收尾段落', multiline: true }),
          },
          { label: 'Journey Map' }
        ),
        insightTable: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            headers: fields.object(
              {
                scenario: fields.text({ label: '欄位一（情境）' }),
                limitation: fields.text({ label: '欄位二（主要限制）' }),
                design: fields.text({ label: '欄位三（對應的設計）' }),
              },
              { label: '表頭' }
            ),
            rows: fields.array(
              fields.object({
                scenario: fields.text({ label: '情境' }),
                limitation: fields.text({ label: '主要限制', multiline: true }),
                design: fields.text({ label: '對應的設計', multiline: true }),
              }),
              {
                label: '表格列',
                itemLabel: (props) => props.fields.scenario.value,
              }
            ),
            closing: fields.text({ label: '收尾段落', multiline: true }),
          },
          { label: '洞察收斂表' }
        ),
        needs: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            items: fields.array(
              fields.object({
                phase: fields.text({ label: '階段標籤' }),
                title: fields.text({ label: '需求名稱' }),
                desc: fields.text({ label: '需求說明', multiline: true }),
              }),
              {
                label: '關鍵需求卡（2×2）',
                itemLabel: (props) => props.fields.title.value,
              }
            ),
            closing: fields.text({ label: '收尾段落', multiline: true }),
          },
          { label: '關鍵需求' }
        ),
        assumption: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            cardTitle: fields.text({ label: '卡片標題' }),
            before: labeledLine('原先假設'),
            finding: labeledLine('研究發現'),
            adjust: labeledLine('調整方向'),
            closing: fields.text({ label: '收尾段落', multiline: true }),
          },
          { label: '被修正的假設' }
        ),
      },
      { label: '02 挑戰與洞察' }
    ),
    ch03: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        label: fields.text({ label: '章節標題（同左側導覽文字）' }),
        intro: fields.text({ label: '章節導言', multiline: true }),
        reallocation: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            phases: fields.object(
              {
                pre: phasePlan('震前'),
                during: phasePlan('震時（高亮卡）'),
                post: phasePlan('震後'),
              },
              { label: '三階段卡' }
            ),
            figure: image('功能系統概述圖'),
            closing: fields.text({ label: '收尾段落', multiline: true }),
          },
          { label: '三階段任務分配' }
        ),
        versus: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            lose: fields.object(
              {
                tag: fields.text({ label: '標籤' }),
                title: fields.text({ label: '方案標題' }),
                body: fields.text({ label: '方案說明', multiline: true }),
              },
              { label: '未採用方向' }
            ),
            win: fields.object(
              {
                tag: fields.text({ label: '標籤' }),
                title: fields.text({ label: '方案標題' }),
                body: fields.text({ label: '方案說明', multiline: true }),
              },
              { label: '最終決策' }
            ),
            closing: fields.text({ label: '收尾段落', multiline: true }),
          },
          { label: '震時第一層取捨' }
        ),
        decisions: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            cards: fields.array(
              fields.object({
                phase: fields.text({ label: '階段標籤' }),
                num: fields.text({ label: '決策編號' }),
                title: fields.text({ label: '決策標題' }),
                source: fields.text({ label: '研究依據', multiline: true }),
                win: labeledLine('選擇'),
                lose: labeledLine('取捨'),
              }),
              {
                label: '決策卡',
                itemLabel: (props) => props.fields.title.value,
              }
            ),
          },
          { label: '四項關鍵決策' }
        ),
        flows: fields.object(
          {
            title: fields.text({ label: '小節標題' }),
            body: fields.text({ label: '段落內文', multiline: true }),
            figures: fields.array(
              fields.object({
                src: fields.text({ label: '流程圖路徑' }),
                alt: fields.text({ label: '替代文字（alt）' }),
                cap1: fields.text({ label: '圖說一（流程名稱）' }),
                cap2: fields.text({ label: '圖說二（流程摘要）', multiline: true }),
              }),
              {
                label: '使用者流程圖',
                itemLabel: (props) => props.fields.cap1.value,
              }
            ),
          },
          { label: '使用者流程' }
        ),
      },
      { label: '03 設計決策' }
    ),
    ch04: fields.object(
      {
        num: fields.text({ label: '章節編號' }),
        label: fields.text({ label: '章節標題（同左側導覽文字）' }),
        lede: fields.text({ label: '章節導言', multiline: true }),
        introVideo: video('產品介紹影片'),
        styleguide: fields.object(
          {
            ...uiPhase,
            image: image('介面規範圖'),
            hint: fields.text({ label: '捲動提示文字' }),
          },
          { label: '介面規範' }
        ),
        response: fields.object(
          {
            ...uiPhase,
            images: uiImages('介面圖'),
          },
          { label: '情境一 · 震時應變' }
        ),
        sound: fields.object(
          {
            ...uiPhase,
            levels: fields.object(
              {
                low: soundLevel('提醒級'),
                mid: soundLevel('警戒級'),
                high: soundLevel('緊急級'),
              },
              { label: '三個警報層級' }
            ),
          },
          { label: '警報聲設計' }
        ),
        prepare: fields.object(
          {
            ...uiPhase,
            images: uiImages('介面圖'),
          },
          { label: '情境二 · 震前準備' }
        ),
        recover: fields.object(
          {
            ...uiPhase,
            note: fields.text({ label: '免責註記', multiline: true }),
            images: uiImages('介面圖'),
          },
          { label: '情境三 · 震後支援' }
        ),
        prototype: fields.object(
          {
            ...uiPhase,
            clips: fields.array(
              fields.object({
                poster: fields.text({ label: '影片封面圖路徑' }),
                src: fields.text({ label: '影片路徑' }),
                caption: fields.text({ label: '影片說明' }),
              }),
              {
                label: '原型影片',
                itemLabel: (props) => props.fields.caption.value,
              }
            ),
          },
          { label: '互動原型' }
        ),
        usability: fields.object(
          {
            ...uiPhase,
            findingsNote: fields.text({ label: '調整總述', multiline: true }),
            findings: fields.array(
              fields.object({
                title: fields.text({ label: '調整標題' }),
                body: fields.text({ label: '調整說明', multiline: true }),
              }),
              {
                label: '調整項目',
                itemLabel: (props) => props.fields.title.value,
              }
            ),
            video: video('測試實錄影片'),
          },
          { label: '易用性測試' }
        ),
        feedback: fields.object(
          {
            ...uiPhase,
          },
          { label: '展場回饋' }
        ),
      },
      { label: '04 介面設計' }
    ),
    next: fields.object(
      {
        eyebrow: fields.text({ label: '小標（Next project）' }),
        label: fields.text({ label: '連結文字' }),
        href: fields.text({ label: '連結網址' }),
      },
      { label: '下一個專案' }
    ),
  },
});
