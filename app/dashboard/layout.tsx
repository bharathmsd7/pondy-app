"use client";
import { Home, Compass, CarFront, Package2, TreePalm } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const navItems = [
    { name: 'Home', url: '/dashboard', icon: Home },
    { name: 'Explore', url: 'explore', icon: Compass },
    { name: 'Rentals', url: 'rentals', icon: CarFront },
    { name: 'Places', url: 'places', icon: TreePalm },
    { name: 'Packages', url: 'packages', icon: Package2 }
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar items={navItems} />
      {children}
    </div>
  )
}