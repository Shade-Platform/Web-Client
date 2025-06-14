"use client"

import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react'

function Page() {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [imageTag, setImageTag] = useState("");
  const [mappedPort, setMappedPort] = useState("");
  const [createdPort, setCreatedPort] = useState(null); // To store port from response
  const [error, setError] = useState(null);

  const clickHandler = () => {
    setError(null);
    setCreatedPort(null);

    fetch("http://localhost:8080/container/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: owner,
        name: name,
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
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="mt-12 flex flex-col mx-auto px-8 w-lg">
        <h1 className="w-full text-center mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Container Creation
        </h1>

        <Label className='mb-2'>Owner</Label>
        <Input className="mb-6" value={owner} onChange={(e) => setOwner(e.target.value)} type="text" placeholder="Owner" />

        <Label className='mb-2'>Container Name</Label>
        <Input className="mb-6" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Container Name" />

        <Label className='mb-2'>Image Tag</Label>
        <Input className='mb-6' value={imageTag} onChange={(e) => setImageTag(e.target.value)} type="text" placeholder="Image Tag" />

        <Label className='mb-2'>Mapped Port</Label>
        <Input className='mb-6' value={mappedPort} onChange={(e) => setMappedPort(e.target.value)} type="number" placeholder="Port" />

        <Button onClick={clickHandler}>
          Submit
        </Button>
      </div>

      {createdPort && (
        <div className="mt-6 text-center text-green-700">
          Container is created successfully, please use port <strong>{createdPort}</strong> to visit it.
        </div>
      )}

      {error && (
        <div className="mt-6 text-center text-red-600">
          Error: {error}
        </div>
      )}
    </>
  )
}

export default Page
