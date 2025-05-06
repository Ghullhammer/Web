'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './login.css'
import MainHeader from '@/components/MainHeader'

export default function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async () => {

        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: login, password }),
        })

        const result = await res.json()
        console.log(result)
        if (result) {
            alert("Користувач існує, вхід")
            router.push('/catalogue')
        } else {
            alert(result.error || 'Невірний логін або пароль')
        }
    }

    return (
        <>
            <MainHeader />
            <div id="centerHeader">
                <input
                    type="text"
                    placeholder="Логін"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleLogin}>Увійти</button>
            </div>
        </>
    )
}
