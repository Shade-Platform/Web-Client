"use client"

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth/authContext"
import { Navbar } from "@/components/Navbar"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface ContainerMetrics {
  cpuUsage: number
  memoryUsage: number
}

const ContainerMetricsPage = () => {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") ?? ""

  const [metrics, setMetrics] = useState<ContainerMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!name) {
      setError("No container name provided")
      setLoading(false)
      return
    }

    const fetchMetrics = async () => {
      try {
        const res = await fetch(`http://localhost:8080/container/metrics`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "name": name,
              "userID": user?.id
            }),
          }
        )
        if (!res.ok) throw new Error(`Failed to fetch metrics: ${res.statusText}`)
        const data: ContainerMetrics = await res.json()
        setMetrics(data)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [name])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <>
      <Navbar />
      <SidebarTrigger className="sticky top-15" />
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Container Metrics: {name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="mb-1 font-medium text-gray-700">CPU Usage</p>
            <Progress value={metrics?.cpuUsage ?? 0} max={100} />
            <p className="text-sm text-gray-500 mt-1">{metrics?.cpuUsage.toFixed(2)}%</p>
          </div>
          <div>
            <p className="mb-1 font-medium text-gray-700">Memory Usage</p>
            <Progress value={metrics?.memoryUsage ?? 0} max={100} />
            <p className="text-sm text-gray-500 mt-1">{metrics?.memoryUsage.toFixed(2)}%</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ContainerMetricsPage
