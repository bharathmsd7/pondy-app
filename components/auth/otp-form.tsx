"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { BorderBeam } from "../magicui/border-beam"
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export function OtpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          pin: "",
        },
      })
     
    const router = useRouter();
     
    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("OTP", data);
        const end = Date.now() + 1 * 1000; // 3 seconds
        const colors = ["#C0C0C0", "#FFD700", "#000000", "#F5F5DC", "#FFFFFF"];
        toast.success("Successfully logged in.")
         
        const frame = () => {
          if (Date.now() > end) return;
     
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          });
     
          requestAnimationFrame(frame);
        };
     
        frame();

        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    }


  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="relative sm:w-[350px] md:w-[750px] mx-auto">
        <CardContent className="grid p-0 ">
          <div className="p-6 md:p-8 flex justify-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Enter OTP code</h1>
                <p className="text-balance text-muted-foreground">
                  Enter the 6-digit code sent to +91 8979798798
                </p>
              </div>
              <div className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center">
                        <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <InputOTP maxLength={6} {...field} >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSeparator />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            {/* <FormDescription>
                                Please enter the one-time password sent to your phone.
                            </FormDescription> */}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button 
                            effect="shine" 
                            type="submit" 
                            className="w-full" 
                            disabled={form.watch("pin").length !== 6}
                        >
                            Verify
                        </Button>
                
                        {/* <Button type="submit">Submit</Button> */}
                    </form>
                </Form>
              </div>
            </div>
          </div>
          <BorderBeam duration={8} size={100}/>
        </CardContent >
      </Card>
      
    </div>
  )
}
