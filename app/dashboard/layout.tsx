import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar"
import ProtectedRoute from "@/components/ProtectedRoute"
import { cookies } from "next/headers"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}