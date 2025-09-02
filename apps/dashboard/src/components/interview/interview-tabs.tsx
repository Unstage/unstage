"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@unstage/ui/components/tabs";
import { parseAsString, useQueryState } from "nuqs";
import { CandidateTab } from "./candidate-tab";
import { DeliveryTab } from "./delivery-tab";
import { ScenarioTab } from "./scenario-tab";

export function InterviewTabs() {
  const [tab, setTab] = useQueryState("tab", parseAsString.withDefault("candidate"));

  return (
    <Tabs value={tab} onValueChange={setTab}>
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
        <ScenarioTab />
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
