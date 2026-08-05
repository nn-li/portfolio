import { config } from '@keystatic/core';
import { site } from './src/keystatic/site';
import { indexPage } from './src/keystatic/index-page';
import { aboutPage } from './src/keystatic/about';
import { quake } from './src/keystatic/quake';
import { tra } from './src/keystatic/tra';
import { soulmap } from './src/keystatic/soulmap';
import { chuu } from './src/keystatic/chuu';

export default config({
  // GitHub 模式：編輯後直接 commit 到 repo。
  // 首次使用請在本機 npm run dev 開 /keystatic，跟著精靈建立 GitHub App（會自動寫入 .env）
  storage: { kind: 'github', repo: { owner: 'nn-li', name: 'portfolio' } },
  ui: {
    brand: { name: "Brynn's Portfolio" },
  },
  singletons: {
    site,
    indexPage,
    aboutPage,
    quake,
    tra,
    soulmap,
    chuu,
  },
});
