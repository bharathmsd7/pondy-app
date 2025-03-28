"use client";
import { Home, Compass, CarFront, Hotel, TreePalm } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Toaster } from "@/components/ui/sonner"

export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const navItems = [
    { name: 'Home', url: '/dashboard', icon: Home },
    { name: 'Hotels', url: 'hotels', icon: Hotel },
    { name: 'Explore', url: 'explore', icon: Compass },
    { name: 'Transport', url: 'rentals', icon: CarFront },
    { name: 'Places', url: 'places', icon: TreePalm },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar items={navItems} />
      {children}
      <Toaster />
    </div>
  )
}