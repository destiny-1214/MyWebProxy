这是一个简单的 Cloudflare Worker 项目，用于代理 API 请求，解决跨域问题和区域限制。

## 使用方法

部署完成后，您可以通过以下方式使用此代理：

```bash
curl -X POST "https://your-worker-domain.com/real-api/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

将 `your-worker-domain.com` 替换为您的 Cloudflare Worker 域名， real-api为代理的真实域名, `your-api-key` 替换为您的 OpenAI API 密钥。
如：https://xx.org/api.openai.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=xx
   代理后为 https://api.openai.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=xx
