
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 移除 define 注入，确保前端环境不含敏感信息
});
