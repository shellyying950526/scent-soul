
# Scent & Soul - AI 面相香水推荐师

这是一个结合了面相学与调香艺术的 AI 顾问应用。通过分析用户的面部特征，推荐契合其“外在人格”与“内在本我”的两款专属香水。

## 🚀 部署到 Vercel 指南

1. **上传代码到 GitHub**: 将项目的所有文件上传至你的仓库 `https://github.com/shellyying950526/scent-soul.git`。
2. **连接 Vercel**: 
   - 登录 [Vercel](https://vercel.com/)。
   - 点击 **Add New** -> **Project**。
   - 选择你的 `scent-soul` 仓库。
3. **配置环境变量 (关键)**:
   - 在部署页面的 **Environment Variables** 部分。
   - 添加 Key 为 `API_KEY`。
   - Value 为你的 Google Gemini API Key。
4. **点击 Deploy**: 部署完成后即可通过 Vercel 提供的域名访问。

## ⚠️ 注意事项
- **Tailwind 警告**: 你可能会在浏览器控制台看到 `cdn.tailwindcss.com should not be used in production`。这是一个性能优化提示，不影响功能使用。
- **浏览器兼容性**: 本项目使用了现代浏览器的 `importmap` 特性，建议使用最新版的 Chrome 或 Edge 访问。
