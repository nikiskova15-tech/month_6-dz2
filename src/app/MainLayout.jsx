import { Link, Outlet, useNavigation } from 'react-router-dom'
import Loader from '../shared/Loader.jsx'
import Header from '../widgets/Header.jsx'

export default function MainLayout() {
  const navigation = useNavigation();

  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      {navigation.state === 'loading' && <Loader />}

      <footer>
        <p>2026 GeeksOnline</p>
      </footer>
    </div>
  )
}