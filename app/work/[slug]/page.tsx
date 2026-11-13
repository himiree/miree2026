import { notFound } from "next/navigation";
import WorkDetailContent from "../../components/work-detail-content";
import { projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function WorkDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return <WorkDetailContent project={project} />;
}
