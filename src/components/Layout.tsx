import { Outlet } from 'react-router-dom'
import TopTicker from './TopTicker'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#082852] antialiased selection:bg-[#16A34A]/20 selection:text-[#082852]">
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
