import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TShirttDetailsProps {
  description: string;
  features: string[];
}

export function TShirttDetails({ description, features }: TShirttDetailsProps) {
  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="text-muted-foreground">
        <p>{description}</p>
      </TabsContent>
      <TabsContent value="features">
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
