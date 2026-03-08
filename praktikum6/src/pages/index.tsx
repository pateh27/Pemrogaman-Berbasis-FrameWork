import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600">Praktikum Next.js Pages Router</h1> <br />
        <p className="text-lg text-gray-600">Mahasiswa D4 Pengembangan Web</p> <br />
      </div>
   </div>
  )
}
