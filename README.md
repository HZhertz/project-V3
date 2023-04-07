# project

项目描述:该项目是一个后台管理系统,主要用于数据管理及数据可视化的展示
技术选型: Vite, Vue3, TypeScript, Element-Plus, pnpm, pinia

## Project-V3 setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run dev
```

### Compiles and minifies for production
```
pnpm run build
```

## Api-Koa setup

```
pnpm run dev
```



### Nginx部署项目
1、pnpm run build打包Vue项目
2、打开nging.conf文件,配置对应的信息

```
# nginx.conf
server {
        listen       8080;
        server_name  localhost;
        root   D:\ST\Vue\management-V3\project-v3\dist;
        # 上述端口指向的根目录
        # 项目根目录中指向项目首页
        index index.html;
        # 根请求会指向的页面
        location / {
        # 此处的 @router 实际上是引用下面的转发，否则在 Vue 路由刷新时可能会抛出 404
        try_files $uri $uri/ @router;
        }

        location @router {
            rewrite ^.*$ /index.html last; 
        }
        
        location /api/ {
            proxy_pass http://127.0.0.1:3007/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```
3、检查配置文件是否配置成功

```cmd
nginx -t -c D:\develop\nginx-1.22.1\conf\nginx.conf
start nginx # 运行nginx
```

