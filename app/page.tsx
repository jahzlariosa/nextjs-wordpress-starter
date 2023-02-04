import { Suspense } from 'react'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import PostLists from './posts/PostLists'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className='text-center my-20'>
        <h1 className='text-7xl font-bold'>NextJS WordPress Starter Kit</h1>
        <p className='text-gray-800 italic text-2xl mt-2'>Minus all the bloat, seriously no plugins required</p>
      </div>
      {/*@ts-ignore known issue*/}
      <PostLists />
    </main>
  )
}
