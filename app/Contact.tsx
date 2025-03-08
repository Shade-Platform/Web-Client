import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Contact() {
    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Have a question or want to work together? Fill out the form below and we'll get back to you as soon as
                        possible.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-md space-y-4">
                    <form className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                        </div>
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
