import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import './HomePage.css'

const HomePage = () => {
  const features = [
    {
      name: '现代化设计',
      description: '采用最新的设计趋势，提供优雅美观的用户界面',
      icon: '🎨',
    },
    {
      name: '响应式布局',
      description: '完美适配各种设备尺寸，从手机到桌面',
      icon: '📱',
    },
    {
      name: '高性能',
      description: '基于Vite构建，提供极快的开发体验和运行性能',
      icon: '⚡',
    },
    {
      name: 'TypeScript支持',
      description: '完整的类型安全，减少运行时错误',
      icon: '🔒',
    },
  ]

  const stats = [
    { name: '用户数量', value: '10,000+' },
    { name: '项目完成', value: '500+' },
    { name: '客户满意度', value: '99%' },
    { name: '支持语言', value: '5+' },
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <main className="hero-main">
              <div className="hero-text">
                <h1 className="hero-title">
                  <span className="hero-title-line">现代化的</span>{' '}
                  <span className="hero-title-highlight">React PC 应用</span>
                </h1>
                <p className="hero-description">
                  使用最新的技术栈构建的现代化React应用程序，提供优秀的用户体验和开发体验。
                </p>
                <div className="hero-buttons">
                  <div className="hero-button-group">
                    <Link to="/appointment" className="hero-button-primary">
                      在线预约
                      <ChevronRightIcon className="hero-button-icon" />
                    </Link>
                  </div>
                  <div className="hero-button-group">
                    <Link to="/order-approval" className="hero-button-secondary">
                      订单管理
                    </Link>
                  </div>
                  <div className="hero-button-group">
                    <Link to="/repair-report" className="hero-button-secondary">
                      维修上报
                    </Link>
                  </div>
                  <div className="hero-button-group">
                    <Link to="/demo" className="hero-button-secondary">
                      查看演示
                    </Link>
                  </div>
                  <div className="hero-button-group">
                    <Link to="/pc/order-list" className="hero-button-secondary">
                      订单列表
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-content">
            <div className="hero-visual-text">
              <div className="hero-visual-emoji">⚛️</div>
              <h2 className="hero-visual-title">React + TypeScript</h2>
              <p className="hero-visual-subtitle">现代化开发体验</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-subtitle">特性</h2>
            <p className="features-title">
              为什么选择我们
            </p>
            <p className="features-description">
              我们提供完整的解决方案，帮助您构建现代化的Web应用程序
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.name} className="feature-item">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-name">{feature.name}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            <span className="cta-title-line">准备开始您的项目？</span>
            <span className="cta-title-subline">立即联系我们获取免费咨询。</span>
          </h2>
          <div className="cta-button-group">
            <Link to="/contact" className="cta-button">
              开始项目
              <ChevronRightIcon className="cta-button-icon" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.name} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
