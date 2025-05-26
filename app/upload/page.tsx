"use client"

import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react'

function page() {
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const [port, setPort] = useState("");

    const clickHandler = () => {
        fetch("http://localhost:8080/container/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                owner: "test",
                name: name,
                imageTag: tag,
                replicas: 1,
                port,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // or .text() based on expected response
            })
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="mt-12 flex flex-col mx-auto  px-8 w-lg">

                <h1 className="w-full text-center mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Continer Creation
                </h1>

                <Label className='mb-2'>Container Name</Label>
                <Input className="mb-6" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Container Name" />

                <Label className='mb-2'>Tag</Label>
                <Input className='mb-6' value={tag} onChange={(e) => setTag(e.target.value)} type="text" placeholder="Tag" />

                <Label className='mb-2'>Port</Label>
                <Input className='mb-6' value={port} onChange={(e) => setPort(e.target.value)} type="text" placeholder="Port" />

                <Button onClick={clickHandler}>
                    Submit
                </Button>
            </div>
        </>
    )
}

export default page