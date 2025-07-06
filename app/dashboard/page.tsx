"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardCard from "./_components/card"
import Chart from "./_components/chart"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface Container {
  owner: string
  name: string
  imageTag: string
  replicas: number
  mappedPort: number
  CreationDate: string
  containerTags: Record<string, string>
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Container[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const containerClickHandler = (name: string) => {
    router.push(`/dashboard/container?name=${name}`)
  }

  useEffect(() => {
    async function fetchContainers() {
      try {
        const res = await fetch("http://localhost:8080/container/namespace/test")
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

      <div className="flex items-start justify-items-center min-h-screen p-8 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mx-auto">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2 className="text-2xl font-bold">Containers</h2>

          {loading && <p>Loading containers...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && data && data.length === 0 && (
            <p>No containers found in this namespace.</p>
          )}
          {!loading && !error && data && data.length > 0 && (
            data.map((container) => (
              <Card className="w-full max-w-4xl cursor-pointer p-4" key={container.name} onClick={() => containerClickHandler(container.name)}>
                <p><strong>Container Name:</strong> {container.name}</p>
                <p><strong>Image:</strong> {container.imageTag}</p>
                <p><strong>Replicas:</strong> {container.replicas}</p>
                <p><strong>Created At:</strong> {new Date(container.CreationDate).toLocaleString()}</p>
                <p><strong>Port:</strong> {container.mappedPort}</p>
              </Card>
            ))
          )}

          <Accordion defaultValue="Today" type="single" collapsible className="w-full min-w-4xl">
            <AccordionItem value="Today">
              <AccordionTrigger>Today</AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-4 justify-center sm:justify-start">
                  <DashboardCard title="Total Running Containers" value={6} pastValue={5} />
                  <DashboardCard title="Today's Deployments" value={300} pastValue={320} />
                  <DashboardCard title="Active Users" value={239} pastValue={250} />
                  <DashboardCard title="New Users" value={1156} pastValue={1000} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="w-full max-w-6xl mx-auto">
            <Chart title="CPU Usage" />
          </div>
          <div className="w-full max-w-6xl mx-auto">
            <Chart title="Memory Usage" />
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
