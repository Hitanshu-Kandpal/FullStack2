import { useState, useEffect } from 'react'

export default function lazyWithDelay(importer, options = {}) {
  const { ms = 1000, fallback = null } = options

  return function LazyComponent(props) {
    const [Comp, setComp] = useState(null)
    const [minPassed, setMinPassed] = useState(false)

    useEffect(() => {
      let mounted = true
      importer().then((m) => {
        if (!mounted) return
        setComp(() => m && m.default ? m.default : m)
      })
      const t = setTimeout(() => {
        if (mounted) setMinPassed(true)
      }, ms)
      return () => {
        mounted = false
        clearTimeout(t)
      }
    }, [])

    if (!Comp || !minPassed) return fallback
    const C = Comp
    return <C {...props} />
  }
}
