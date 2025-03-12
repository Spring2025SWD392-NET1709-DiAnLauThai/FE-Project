import { TshirtDesigner } from "@/components/screen/t-shirt/create/t-shirt-designer";

export default function CreateTShirtPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        T-shirt Design Studio
      </h1>
      <TshirtDesigner />
    </main>
  );
}
