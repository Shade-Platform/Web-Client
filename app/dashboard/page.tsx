"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardCard from "./_components/card"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useState } from "react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


interface Container {
  owner: string
  name: string
  imageTag: string
  replicas: number
  mappedPort: number
  CreationDate: string
  containerTags: Record<string, string>
}

// interface ChartData {
//   container: string,
//   metrics: {
//     time: string;
//     cpuUsage: number;
//     memoryUsage: number;
//   }[]
// }
interface metrics {
  container: string,
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
  }
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Container[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allUsersCount, setAllUsersCount] = useState<number>(0);
  const [deploymentsCount, setDeploymentsCount] = useState<number>(0);
  const [metricsData, setMetricsData] = useState<metrics[]>([]);
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);

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

        const containers: Container[] = (await res.json()).containers
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

    async function getDeploymentsSince(time: number) {
      if (user === null) return;
      try {
        const res = await fetch(`http://localhost:8080/container/namespace/${user.id}?hours=${time}`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const json = await res.json()
        setDeploymentsCount(json.deployments)
      } catch (err: any) {
        setError("Failed to fetch deployments data")
      }
    }


    getDeploymentsSince(24)
    fetchContainers()
    getAllUsers()
  }, [user])

  useEffect(() => {
    if (!data || data.length === 0 || !user) return;

    const getChartData = async (container: string) => {

      try {
        console.log(`Fetching metrics for container: ${container}`)
        const res = await fetch(`http://localhost:8080/container/metrics`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "name": container,
              "userID": user.id
            }),
          }
        )
        if (!res.ok) throw new Error(`Failed to fetch metrics: ${res.statusText}`)
        const data = await res.json()

        const { cpuUsage, memoryUsage } = data;

        // Transform data to match chart requirements
        const now = new Date();
        const hh = now.getHours().toString().padStart(2, "0");
        const mm = now.getMinutes().toString().padStart(2, "0");
        const hhmm = `${hh}:${mm}`;

        // setCpuUsage(cpuUsage);
        // setMemoryUsage(memoryUsage);

        // return;


        setMetricsData(prev => {
          const existingIndex = prev.findIndex(item => item.container === container);
          if (existingIndex !== -1) {
            const updatedData = [...prev];
            updatedData[existingIndex].metrics = {
              cpuUsage: cpuUsage,
              memoryUsage: memoryUsage,
            };
            return updatedData;
          }
          return [...prev, {
            container: container,
            metrics: {
              cpuUsage: cpuUsage,
              memoryUsage: memoryUsage,
            }
          }];
        });

      } catch (err: any) {
        console.log("Error fetching chart data:", err)
      }
    }

    const interval = setInterval(() => {
      data.forEach(container => {
        getChartData(container.name)
      })
    }, 1000 * 60)

    data.forEach(container => {
      getChartData(container.name)
    })

    return () => clearInterval(interval)

  }, [data, user])


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
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((container) => (
            <TableRow key={container.name}>
              <TableCell onClick={() => containerClickHandler(container.name)} className="font-medium">{container.name}</TableCell>
              <TableCell className="font-medium">{container.imageTag}</TableCell>
              <TableCell>{container.replicas}</TableCell>
              <TableCell>{new Date(container.CreationDate).toLocaleString()}</TableCell>
              <TableCell>{container.mappedPort}</TableCell>
              <TableCell className="text-right">
                <a href={`http://${process.env.NEXT_PUBLIC_MINIKUBE_IP}:${container.mappedPort}`} target="_blank" className="text-blue-600 hover:underline">
                  View Container
                </a>
              </TableCell>
              <TableCell className="text-right">
                <a
                  className="text-red-600 hover:underline cursor-pointer"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete container ${container.name}?`)) {
                      fetch(`http://localhost:8080/container/delete`, {
                        method: "DELETE",
                        body: JSON.stringify({
                          name: container.name,
                          userID: user?.id,
                        }),
                      })
                        .then(res => {
                          if (!res.ok) throw new Error(`Failed to delete container: ${res.statusText}`);
                          setData(prev => prev?.filter(c => c.name !== container.name) || null);
                        })
                        .catch(err => setError(err.message));
                    }
                  }}
                >
                  Delete
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total:</TableCell>
            <TableCell colSpan={6} className="text-left">{data?.length} containers</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <SidebarTrigger className="sticky top-15" />

      <div className="flex items-start justify-items-center min-h-screen p-8 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mx-auto">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2 className="text-2xl font-bold">Containers</h2>

          {loading && <p>Loading containers...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && data === null && (
            <p>No containers found, nothing to see here...</p>
          )}
          {!loading && !error && data && data.length > 0 && ContainerList()}
          <Accordion defaultValue="Today" type="single" collapsible className="w-full min-w-4xl">
            <AccordionItem value="Today">
              <AccordionTrigger>Today</AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-4 justify-center sm:justify-start">
                  <DashboardCard title="Total Running Containers" value={data?.length || 0} pastValue={1} />
                  <DashboardCard title="Today's Deployments" value={deploymentsCount} pastValue={1} />
                  <DashboardCard title="Active Users" value={1} pastValue={1} />
                  <DashboardCard title="All Users" value={allUsersCount} pastValue={1} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h2 className="text-2xl font-bold">Metrics</h2>
          {metricsData.length === 0 && <p>No metrics data available</p>}
          {metricsData.length > 0 && metricsData.map(metric => {
            return (
              // <ChartAreaInteractive title={metric.container} key={metric.container} chartData={metric.metrics}/>
              <Card className="w-full mx-auto mt-10">
                <CardHeader>
                  <CardTitle>Container Metrics: {metric.container}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-1 font-medium text-gray-700">CPU Usage</p>
                    <Progress value={metric.metrics.cpuUsage} max={100} />
                    <p className="text-sm text-gray-500 mt-1">{metric.metrics.cpuUsage.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-700">Memory Usage</p>
                    <Progress value={metric.metrics.memoryUsage} max={100} />
                    <p className="text-sm text-gray-500 mt-1">{metric.metrics.memoryUsage.toFixed(2)}%</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </main>
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard
