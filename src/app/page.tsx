import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/index";

/**
 * Root page — immediately redirects to the default locale.
 * In production the proxy handles this redirect before the page renders,
 * so this acts as a fallback safety net only.
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
