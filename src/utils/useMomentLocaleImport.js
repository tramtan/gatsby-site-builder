import { useState, useEffect } from 'react'

const useMomentLocaleImport = ({ locale }) => {
  const [momentLocaleStatus, setMomentLocaleStatus] = useState('LOADING')
  useEffect(() => {
    if (locale !== 'en') {
      import(`moment/locale/${locale}`).then(() => {
        setMomentLocaleStatus('LOADED')
      })
    }
  }, [locale])
}

export default useMomentLocaleImport