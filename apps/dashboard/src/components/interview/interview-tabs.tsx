"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@unstage/ui/components/tabs";
import { CandidateTab } from "./candidate-tab";
import { DeliveryTab } from "./delivery-tab";

export function InterviewTabs() {
  return (
    <Tabs defaultValue="candidate">
      <TabsList className="border-b-[1px] border-border w-full flex justify-start mb-6">
        <TabsTrigger value="candidate">Candidate</TabsTrigger>
        <TabsTrigger value="delivery">Delivery</TabsTrigger>
        <TabsTrigger value="scenario">Scenario</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="candidate">
        <CandidateTab />
      </TabsContent>

      <TabsContent value="delivery">
        <DeliveryTab />
      </TabsContent>

      <TabsContent value="scenario">
        <div className="text-muted-foreground">Scenario configuration coming soon...</div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="text-muted-foreground">Activity log coming soon...</div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="text-muted-foreground">Interview settings coming soon...</div>
      </TabsContent>
    </Tabs>
  );
}
