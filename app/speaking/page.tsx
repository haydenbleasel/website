import type { Metadata } from "next";
import { SimpleLayout } from "@/components/simple-layout";
import { createMetadata } from "@/lib/metadata";
import { interviews, speaking, writing } from "@/lib/speaking";
import { Appearance } from "./components/appearance";
import { SpeakingSection } from "./components/speaking-section";

export const metadata: Metadata = createMetadata({
  title: "Speaking",
  description: "I’ve spoken at events and been interviewed for some podcasts.",
});

const Speaking = () => (
  <SimpleLayout
    intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
    title="I’ve spoken at events and been interviewed for some podcasts."
  >
    <div className="space-y-20">
      <SpeakingSection title="Interviews">
        {interviews.map((item) => (
          <Appearance
            description={`${item.location} • ${item.year}`}
            href={item.url}
            key={item.name}
            title={item.name}
          />
        ))}
      </SpeakingSection>
      <SpeakingSection title="Speaking">
        {speaking.map((item) => (
          <Appearance
            description={`${item.location} • ${item.year}`}
            href={item.url}
            key={item.name}
            title={item.name}
          />
        ))}
      </SpeakingSection>
      <SpeakingSection title="Writing">
        {writing.map((item) => (
          <Appearance
            description={`${item.location} • ${item.year}`}
            href={item.url}
            key={item.name}
            title={item.name}
          />
        ))}
      </SpeakingSection>
    </div>
  </SimpleLayout>
);

export default Speaking;
