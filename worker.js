export default {

  // 访问示例：
  //  https://xx.org/api.openai.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=xx
  async fetch(request) {
    const url = new URL(request.url);
    const headers_Origin = request.headers.get("Access-Control-Allow-Origin") || "*";
    
    // 解析 URL 路径，提取目标域名和 API 路径
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);
    
    if (pathParts.length === 0) {
      return new Response('请在路径中指定目标域名，格式: /目标域名/api路径', { status: 400 });
    }
    
    // 检查是否是完整 URL（包含协议）
    let targetUrl;
    const fullPath = url.pathname.substring(1); // 去掉开头的 /
    
    if (fullPath.startsWith('http://') || fullPath.startsWith('https://')) {
      // 如果是完整 URL，直接使用并添加查询参数
      targetUrl = fullPath + url.search;
    } else {
      // 普通域名处理
      const targetDomain = pathParts[0];
      const apiPath = pathParts.length > 1 ? '/' + pathParts.slice(1).join('/') : '/';
      targetUrl = 'https://' + targetDomain + apiPath + url.search;
    }
    
    try {
      const modifiedRequest = new Request(targetUrl, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: 'follow'
      });
      
      const response = await fetch(modifiedRequest);
      const modifiedResponse = new Response(response.body, response);
      
      // 添加允许跨域访问的响应头
      modifiedResponse.headers.set('Access-Control-Allow-Origin', headers_Origin);
      modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return modifiedResponse;
    } catch (error) {
      return new Response(`代理请求失败: ${error.message}`, { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': headers_Origin,
          'Content-Type': 'text/plain; charset=utf-8'
        }
      });
    }
  }
};

