import Header from './Header'
import Footer from './Footer'
import { useLocation, useNavigate } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)
  const isCheckoutPage = location.pathname === '/checkout'

  // Save the previous location when navigating to auth pages
  if (isAuthPage) {
    // Don't save auth pages as the return destination
    if (!location.state?.from?.pathname?.includes('/login') && 
        !location.state?.from?.pathname?.includes('/signup')) {
      sessionStorage.setItem('returnTo', JSON.stringify(location.state?.from || { pathname: '/' }))
    }
  }

  return (
    <div>
      {!isAuthPage && !isCheckoutPage && <Header />}
      <main>
        {children}
      </main>
      {!isAuthPage && !isCheckoutPage && <Footer />}
    </div>
  )
}

export default Layout 