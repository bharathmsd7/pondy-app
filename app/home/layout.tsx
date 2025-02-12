"use client";
import { Home, Sailboat, CarFront, Package2, TreePalm } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Activites', url: '#', icon: Sailboat },
    { name: 'Rentals', url: '#', icon: CarFront },
    { name: 'Places', url: '#', icon: TreePalm },
    { name: 'Packages', url: '#', icon: Package2 }
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar items={navItems} />
      {children}
    </div>
  )
}