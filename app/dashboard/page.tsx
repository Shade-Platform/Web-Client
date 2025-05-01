"use client"

import DashboardCard from "./_components/card";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import Chart from "./_components/chart";

const Dashboard : React.FC = () => {
  return (
    <div className="flex items-start justify-items-center min-h-screen p-8 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mx-auto">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Accordion  defaultValue="Today" type="single" collapsible className="w-full min-w-4xl">
          <AccordionItem  value="Today">
            <AccordionTrigger>Today</AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-4 justify-center sm:justify-start">
                <DashboardCard title="Total Running Containers" value={6} pastValue={5} />
                <DashboardCard title="Today's Deployments" value={300} pastValue={320}/>
                <DashboardCard title="Active Users" value={239} pastValue={250} />
                <DashboardCard title="New Users" value={1156} pastValue={1000} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Chart />
      </main>
    </div>
  );
}
export default Dashboard;
