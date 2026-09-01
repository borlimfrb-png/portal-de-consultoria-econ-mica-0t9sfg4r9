import { Outlet } from 'react-router-dom'
import TopTicker from './TopTicker'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F6F4EE] text-[#0B1F3A] antialiased selection:bg-[#B8892F]/20 selection:text-[#0B1F3A]">
      {/* 1. Global Top Marquee Ticker */}
      <TopTicker />

      {/* 2. Global Sticky Navbar */}
      <Navbar />

      {/* 3. Page Body */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* 4. Global Footer */}
      <Footer />
    </div>
  )
}
