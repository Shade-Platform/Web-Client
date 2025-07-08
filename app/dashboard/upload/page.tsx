"use client"

import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState, useRef } from 'react';
import { motion } from "framer-motion";
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth/authContext';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Page() {
  const [name, setName] = useState("");
  const [imageTag, setImageTag] = useState("");
  const [mappedPort, setMappedPort] = useState("");
  const [createdPort, setCreatedPort] = useState(null); // To store port from response
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  const clickHandler = () => {
    if (user === null) {
      setError("User not authenticated");
      return;
    }
    setError(null);
    setCreatedPort(null);

    fetch("http://localhost:8080/container/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: user.id,
        name: name.split(" ").join("-").toLowerCase(), 
        imageTag: imageTag,
        replicas: 1,
        mappedPort: Number(mappedPort),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setCreatedPort(data.mappedPort);  // Store mappedPort from response
        successRef.current?.scrollIntoView({ behavior: 'smooth' });

        // Clear form
        setName("");
        setImageTag("");
        setMappedPort("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
      });
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <SidebarTrigger className="sticky top-0" />
      <div className="mx-auto min-h-screen w-full">
        <div className="mt-12 flex flex-col mx-auto px-8 w-lg">
          <h1 className="w-full text-center mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Container Creation
          </h1>

          <Label htmlFor='container-name' className='mb-2'>Container Name</Label>
          <Input className="mb-6" id='container-name' name="container-name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Container Name" />

          <Label htmlFor='image-tag' className='mb-2'>Image Tag</Label>
          <Input className='mb-6' id='image-tag' name="image-tag" value={imageTag} onChange={(e) => setImageTag(e.target.value)} type="text" placeholder="Image Tag" />

          <Label htmlFor='mapped-port' className='mb-2'>Mapped Port</Label>
          <Input className='mb-6' id='mapped-port' name="mapped-port" value={mappedPort} onChange={(e) => setMappedPort(e.target.value)} type="number" placeholder="Port" />

          <Button onClick={clickHandler}>
            Submit
          </Button>
        </div>

        {createdPort && (
          <div ref={successRef} className="flex flex-col items-center justify-center mt-10 pb-20">
            <motion.div
              className="relative flex items-center justify-center w-28 h-28"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                bounce: 0.4,
                duration: 1,
                ease: "easeIn",
              }}
            >
              {/* Faded edge circle */}
              <div className="absolute w-full h-full border-4 border-green-400 rounded-full opacity-100 blur-sm" />

              {/* Tick Icon */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-green-700 z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 12,
                  duration: 1,
                  ease: "easeIn",
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            </motion.div>

            <h2 className="text-2xl font-bold mt-4">
              Container Created Successfully!
            </h2>

            <div className="mt-4 space-y-2 text-center">
              <p>
                <strong>Created Port:</strong>{" "}
                <Badge variant="secondary" className="text-sm">{createdPort}</Badge>
              </p>
            </div>

            <Button
              className="mt-6 bg-green-700 hover:bg-green-800 text-white"
              onClick={() => window.open(`http://${process.env.NEXT_PUBLIC_MINIKUBE_IP}:${createdPort}`, "_blank")}
            >
              View Container
            </Button>
          </div>
        )}


        {error && (
          <div className="mt-6 text-center text-red-600">
            Error: {error}
          </div>
        )}
      </div>
    </ProtectedRoute >
  )
}

export default Page;