import React, {useCallback, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Api} from '../../utils/Api'
import './pagelogin.scss'

function Index() {
  const {replace, push} = useHistory()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const _handleSubmit = useCallback(async () => {
    if (fullName.length > 2 && email.length > 2 && password.length > 2) {
      setLoading(true)
      const {statusCode, data} = await Api.postRequest('/api/user/signup', {
        email,
        fullName,
        password,
      })
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false)
        alert(data)
        return
      }
      alert(data)
      replace('/signin')
    }
  }, [email, fullName, password, replace])
  if (loading) return <h1>Loading...</h1>
  return ('./register.hbs')
}

export default Index
