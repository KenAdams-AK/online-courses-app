import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T), ttl: number) {
  
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)

    if (jsonValue != null) {
      const item = JSON.parse(jsonValue)
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key)
        return null
      }
      return item.value
    }
    
    if (typeof initialValue === 'function') {
      return (initialValue as ()=>T)()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    const item = {
      value,
      expiry: Date.now() + (ttl * 1000)
    }
    localStorage.setItem(key, JSON.stringify(item))
  }, [key, value, ttl])

  return [value, setValue] as const
}