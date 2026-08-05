import { defineConfig } from 'astro/config';

export default defineConfig({
  // 保留與原靜態站相同的 URL 結構（/about.html、/work/quake.html）
  build: { format: 'file' },
});
