import { CallToAction } from "@/components/call-to-action";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { Projects } from "@/components/projects";
import { Section } from "@/components/section";
import { Speaking } from "@/components/speaking";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";

const Home = () => (
  <>
    <Header>
      <Hero />
      <CallToAction />
      <Newsletter />
    </Header>
    <Section title="Work">
      <Work />
    </Section>
    <Section title="Projects">
      <Projects />
    </Section>
    <Section title="Speaking & Interviews">
      <Speaking />
    </Section>
    <Section title="Stack">
      <Stack />
    </Section>
  </>
);

export default Home;
