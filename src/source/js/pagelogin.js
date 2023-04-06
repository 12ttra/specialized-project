import React, {useCallback, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Api} from '../../utils/Api'
import {setToken} from '../../utils/localstorage'
import './pagelogin.scss'
function Index() {
  const {replace, push} = useHistory()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  const _handleSubmit = useCallback(async () => {
    // callback
    if (email.length > 2 && password.length > 2) {
      setLoading(true)
      const {statusCode, data} = await Api.postRequest('/api/user/signin', {
        email,

        password,
      })
      setLoading(false)
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false)
        alert(data)
        return
      }
      const {token} = JSON.parse(data)
      setToken(token)
      replace('/')
    }
  }, [email, password, replace])

  if (loading) return <h1>Loading.....</h1>
  return ('./login.hbs')
}

export default Index
