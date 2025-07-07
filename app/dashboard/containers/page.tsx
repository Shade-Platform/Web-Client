"use client"

import { Navbar } from "@/components/Navbar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth/authContext";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Container {
  owner: string
  name: string
  imageTag: string
  replicas: number
  mappedPort: number
  CreationDate: string
  containerTags: Record<string, string>
}

const Containers = () => {

  const [data, setData] = useState<Container[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const containerClickHandler = (name: string) => {
    router.push(`/dashboard/container?name=${name}`)
  }

  useEffect(() => {
    if (!user) {
      setError("User not authenticated")
      setLoading(false)
      return
    }

    async function fetchContainers() {
      try {
        const res = await fetch(`http://localhost:8080/container/namespace/${user?.id}`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const containers: Container[] = await res.json()
        setData(containers)
      } catch (err: any) {
        setError("Failed to fetch container data")
      } finally {
        setLoading(false)
      }
    }

    fetchContainers()
  }, [])


  return (
    <>
      <Navbar />
      <SidebarTrigger className="sticky top-15" />
      <main className="flex flex-col gap-8 items-center sm:items-start mx-auto min-h-screen p-8 sm:p-20">
        <h2 className="text-2xl font-bold">Containers</h2>

        {loading && <p>Loading containers...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && data && data.length === 0 && (
          <p>No containers found in this namespace.</p>
        )}
        {!loading && !error && data && data.length > 0 && (
          data.map((container) => (
            <>
              <Card className="w-full max-w-4xl cursor-pointer p-4" key={container.name} onClick={() => containerClickHandler(container.name)}>
                <p><strong>Container Name:</strong> {container.name}</p>
                <p><strong>Image:</strong> {container.imageTag}</p>
                <p><strong>Replicas:</strong> {container.replicas}</p>
                <p><strong>Created At:</strong> {new Date(container.CreationDate).toLocaleString()}</p>
                <p><strong>Port:</strong> {container.mappedPort}</p>
                <a href={`http://${process.env.NEXT_PUBLIC_MINIKUBE_IP}:${container.mappedPort}`} target="_blank" className="text-blue-600 hover:underline">
                  View Container
                </a>
              </Card>
            </>
          ))
        )}
      </main>
    </>
  )
}

export default Containers;