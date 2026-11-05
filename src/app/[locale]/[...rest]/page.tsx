import { notFound } from "next/navigation";

/** Any unknown address inside a locale gets the site's own 404. */
export default function CatchAll() {
  notFound();
}
