'use client'
import { useState } from 'react'
import styles from './register.css'
import MainHeader from '@/components/MainHeader'
import { useRouter } from 'next/navigation'

export default function Register() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    async function sendReg() {
        console.log('Пошта:', email)
        console.log('Логін:', name)
        console.log('Пароль:', password)


        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password, email }),
        })

        if (response){
            alert("Акаунт створено")
            router.push('/login')
        }


        
    }

    return (
        <>
            <MainHeader />
            <div id="centerHeader">
                <input
                    type="text"
                    placeholder="Пошта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Логін"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={sendReg}>Створити</button>
            </div>
        </>
    )
}
