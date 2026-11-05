"use client";

import { ErrorScreen } from "@/components/StatusScreen";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return <ErrorScreen retry={reset} />;
}
