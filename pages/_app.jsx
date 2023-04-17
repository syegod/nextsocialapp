import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { AuthContext } from '@/context/authcontext'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App({ Component, pageProps }) {
  const [username, setUsername] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getJwtData() {
      setLoading(true)
      const response = await axios.get('/api/auth/getjwtdata').catch((e) => console.log(e.message))
      if (response && response.status === 200) {
        setToken(response.data.token)
        setUsername(response.data.userdata.username)
        setUserId(response.data.userdata._id)
        setIsAuthenticated(!!response.data.token)
      }
      setLoading(false)
    }
    getJwtData()
  }, [])
  return (
    <AuthContext.Provider value={{ token, userId, username, isAuthenticated }}>
      {!loading &&
        <Layout>
          <Component {...pageProps} />
        </Layout>
      }
    </AuthContext.Provider>
  )
}
