import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import OrderListPage from './pages/pc/OrderListPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pc/order-list" element={<OrderListPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
