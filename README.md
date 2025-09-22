# React PC 项目

一个现代化的React PC应用程序，使用最新的技术栈构建。

## 🚀 技术栈

- **React 19** - 最新的React版本
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **React Router** - 客户端路由
- **Heroicons** - 精美的SVG图标

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Header.tsx      # 头部导航组件
│   ├── Footer.tsx      # 页脚组件
│   └── Layout.tsx      # 布局组件
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── AboutPage.tsx   # 关于页面
│   └── ContactPage.tsx # 联系页面
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
├── types/              # TypeScript类型定义
├── assets/             # 静态资源
│   ├── images/         # 图片资源
│   └── icons/          # 图标资源
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🛠️ 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 修复代码格式问题
npm run lint:fix

# 类型检查
npm run type-check

# 清理构建文件
npm run clean
```

## 🎨 特性

- ✅ 现代化设计系统
- ✅ 完全响应式布局
- ✅ TypeScript类型安全
- ✅ 组件化架构
- ✅ 路由管理
- ✅ 优雅的UI组件
- ✅ 移动端适配
- ✅ 无障碍访问支持

## 🚀 快速开始

1. 克隆项目
```bash
git clone <repository-url>
cd react
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:5173`

## 📱 页面说明

- **首页** (`/`) - 展示项目特色和主要功能
- **关于我们** (`/about`) - 团队介绍和公司信息
- **联系我们** (`/contact`) - 联系表单和公司信息

## 🎯 开发指南

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.tsx` 中添加路由配置
3. 在 `src/components/Header.tsx` 中添加导航链接

### 添加新组件

1. 在 `src/components/` 目录下创建组件文件
2. 使用TypeScript定义组件props类型
3. 使用Tailwind CSS进行样式设计

### 样式规范

- 使用Tailwind CSS实用类
- 遵循移动优先的响应式设计
- 保持一致的间距和颜色方案
- 使用语义化的HTML结构

## 📄 许可证

MIT License