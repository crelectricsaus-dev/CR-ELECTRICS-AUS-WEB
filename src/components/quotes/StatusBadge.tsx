import type { QuoteStatus } from "@/lib/quotes/types";
import { STATUS_STYLES } from "@/lib/quotes/constants";

export function StatusBadge({ status }: { status: QuoteStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
