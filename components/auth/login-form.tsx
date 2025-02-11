"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BorderBeam } from "../magicui/border-beam"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [mobileNumber, setMobileNumber] = useState("")
  const isValidMobileNumber = /^\d{10}$/.test(mobileNumber)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidMobileNumber) {
      router.push("/auth/otp")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="relative w-[350px] mx-auto">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login with your Mobile Number
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  type="text"
                  placeholder="9*********"
                  required
                  value={mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      setMobileNumber(value);
                    }
                  }}
                />
              </div>
              
              <Button effect="shine" type="submit" className="w-full" disabled={!isValidMobileNumber}>
                Generate OTP
              </Button>
              
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.unsplash.com/photo-1573011708674-8e127b99e490?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
        <BorderBeam duration={8} size={100}/>
      </Card>
      
    </div>
  )
}
