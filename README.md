这是一个简单的 Cloudflare Worker 项目，用于代理任意 Web 请求，解决跨域问题和区域限制。

## 使用方法

部署完成后，您可以通过以下方式使用此代理：

```
https://your-worker-domain.com/目标域名/api路径?查询参数
```

例如，如果您想代理 `https://example.com/api/data?param=value`，则可以使用：

```
https://your-worker-domain.com/example.com/api/data?param=value
```

或者，如果您想直接代理一个完整的 URL，例如 `https://api.example.com/v1/resource`，则可以使用：

```
https://your-worker-domain.com/https://api.example.com/v1/resource
```

请将 `your-worker-domain.com` 替换为您的 Cloudflare Worker 域名。
