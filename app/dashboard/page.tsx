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
import { useAuth } from "@/lib/auth/authContext"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Container, Link } from "lucide-react"

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
  const [data, setData] = useState<Container[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ allUsersCount, setAllUsersCount ] = useState<number>(0);
  const { user } = useAuth();

  const router = useRouter();

  const containerClickHandler = (name: string) => {
    router.push(`/dashboard/container?name=${name}`)
  }

  useEffect(() => {
    
    async function fetchContainers() {
      if (user === null) {
        setError("User not authenticated")
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`http://localhost:8080/container/namespace/${user.id}`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const containers: Container[] = await res.json()
        setData(containers)
      } catch (err: any) {
        setError("Failed to fetch container data")
      } finally {
        setLoading(false)
      }
    }

    async function getAllUsers() {
      try {
        const res = await fetch(`http://localhost:8080/users`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const json = await res.json()
        setAllUsersCount(json.users)
      } catch (err: any) {
        console.error("Failed to fetch all users:", err)
      }
    }

    fetchContainers()
    getAllUsers()
  }, [])


  const ContainerList = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Container Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Replicas</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Port</TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((container) => (
            <TableRow key={container.name}>
              <TableCell className="font-medium">{container.name}</TableCell>
              <TableCell className="font-medium">{container.imageTag}</TableCell>
              <TableCell>{container.replicas}</TableCell>
              <TableCell>{new Date(container.CreationDate).toLocaleString()}</TableCell>
              <TableCell>{container.mappedPort}</TableCell>
              <TableCell className="text-right">
                <a href={`http://${process.env.NEXT_PUBLIC_MINIKUBE_IP}:${container.mappedPort}`} target="_blank" className="text-blue-600 hover:underline">
                  View Container
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{data?.length} containers</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }


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
          {!loading && !error && data && data.length > 0 && ContainerList()}
          <Accordion defaultValue="Today" type="single" collapsible className="w-full min-w-4xl">
            <AccordionItem value="Today">
              <AccordionTrigger>Today</AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-4 justify-center sm:justify-start">
                  <DashboardCard title="Total Running Containers" value={data?.length || 0} pastValue={0} />
                  <DashboardCard title="Today's Deployments" value={300} pastValue={0} />
                  <DashboardCard title="Active Users" value={239} pastValue={0} />
                  <DashboardCard title="All Users" value={allUsersCount} pastValue={0} />
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
