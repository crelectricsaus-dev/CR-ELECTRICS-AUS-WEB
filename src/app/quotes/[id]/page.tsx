import { QuoteEditor } from "@/components/quotes/QuoteEditor";

export default async function QuoteEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <QuoteEditor id={id} />;
}
