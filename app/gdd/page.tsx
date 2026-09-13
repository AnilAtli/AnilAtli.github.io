import type { Metadata } from "next";
import { Portfolio } from "../page";

export const metadata: Metadata = {
  title: "Battle Bag GDD | Anıl Atlı",
  description: "Battle Bag game design document: core loop, economy, balance, level pacing, and playable evidence.",
};

export default function GddPage() {
  return <Portfolio gddOnly />;
}
