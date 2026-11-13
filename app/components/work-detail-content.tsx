"use client";
import Link from "next/link";
import type { Project } from "../data/projects";
import Footer from "./footer";
import FloatingNav from "./floating-nav";

export default function WorkDetailContent({ project }: { project: Project }) {
  const d = project.detail;

  return (
    <>
      <FloatingNav />
      <main className="bg-white text-[#181818] min-h-screen w-full">
        {/* Hero */}
        <section className="px-4 sm:px-6 max-w-[1100px] mx-auto pt-36 pb-16 w-full">
          <p className="text-[12px] text-[#738395] tracking-[-0.2px] mb-10">
            Work{" "}
            <span className="text-[#9aa5b1]">/</span>{" "}
            Project detail
          </p>

          <div className="grid grid-cols-1 min-[700px]:grid-cols-[1fr_300px] gap-10 pb-12 border-b border-black/[0.07]">
            <div>
              <h1 className="text-[38px] sm:text-[46px] leading-[1.08] font-bold text-[#181818] tracking-[-1.5px] mb-5 max-w-[580px]">
                {project.title}
              </h1>
              {project.description && (
                <p className="text-[15px] leading-[1.65] text-[#576779] tracking-[-0.2px] max-w-[520px]">
                  {project.description}
                </p>
              )}
            </div>

            {/* Meta */}
            {d && (
              <div className="flex flex-col gap-7 pt-1">
                {d.deliverable && (
                  <div>
                    <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-2.5">
                      Delivered
                    </p>
                    {d.deliverable.url ? (
                      <a
                        href={d.deliverable.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.08] px-4 py-2 rounded-full text-[13px] text-[#181818] transition-colors"
                      >
                        {d.deliverable.label}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center bg-black/[0.04] border border-black/[0.08] px-4 py-2 rounded-full text-[13px] text-[#181818]">
                        {d.deliverable.label}
                      </span>
                    )}
                  </div>
                )}
                {d.duration && (
                  <div>
                    <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-2.5">
                      Duration
                    </p>
                    <p className="text-[13px] text-[#576779] tracking-[-0.2px]">{d.duration}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Impact */}
          {d?.impact && (
            <div className="pt-10 pb-2">
              <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-4">
                Impact / Proxy
              </p>
              <ul className="flex flex-col gap-2">
                {d.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#576779] tracking-[-0.2px]">
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-[#9aa5b1] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Problem Definition */}
        {d?.problemIntro && (
          <section className="px-4 sm:px-6 max-w-[1100px] mx-auto py-14 w-full border-t border-black/[0.07]">
            <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-6">
              Problem Definition
            </p>
            <p className="text-[16px] leading-[1.7] text-[#576779] tracking-[-0.2px] max-w-[640px] mb-10">
              {d.problemIntro}
            </p>
            {d.problemStats && (
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[700px]:grid-cols-3 gap-6">
                {d.problemStats.map((stat, i) => (
                  <div key={i} className="bg-[#f8f9fa] border border-black/[0.07] rounded-xl p-5">
                    <p className="text-[28px] font-bold text-[#181818] tracking-[-1px] mb-1">{stat.value}</p>
                    <p className="text-[13px] text-[#738395] tracking-[-0.2px] leading-[1.5]">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* How might we */}
        {d?.hmw && (
          <section className="px-4 sm:px-6 max-w-[1100px] mx-auto py-14 w-full border-t border-black/[0.07]">
            <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-6">
              How might we
            </p>
            <ul className="flex flex-col gap-4 max-w-[640px]">
              {d.hmw.map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-[11px] text-[#9aa5b1] font-medium tabular-nums">0{i + 1}</span>
                  <p className="text-[16px] leading-[1.6] text-[#181818] tracking-[-0.3px]">{q}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Design Decisions */}
        {d?.decisions?.map((dec) => (
          <section key={dec.number} className="px-4 sm:px-6 max-w-[1100px] mx-auto py-14 w-full border-t border-black/[0.07]">
            <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-6">
              Design Decision {dec.number}.
            </p>
            <div className="grid grid-cols-1 min-[700px]:grid-cols-[1fr_280px] gap-10">
              <div>
                <h2 className="text-[22px] font-bold text-[#181818] tracking-[-0.5px] mb-4 leading-[1.2]">
                  {dec.title}
                </h2>
                <p className="text-[14px] leading-[1.7] text-[#576779] tracking-[-0.2px]">
                  {dec.desc}
                </p>
              </div>
              {dec.objectives.length > 0 && (
                <div>
                  <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-3">
                    Objectives
                  </p>
                  <ul className="flex flex-col gap-2">
                    {dec.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-[#576779] tracking-[-0.2px] leading-[1.6]">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[#9aa5b1] flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Impact Results */}
        {d?.results && (
          <section className="px-4 sm:px-6 max-w-[1100px] mx-auto py-14 w-full border-t border-black/[0.07]">
            <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-8">
              Initial impact
            </p>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-5">
              {d.results.map((r, i) => (
                <div key={i} className="bg-[#f8f9fa] border border-black/[0.07] rounded-xl p-5">
                  <p className="text-[13px] text-[#738395] tracking-[-0.2px] mb-2">{r.label}</p>
                  <p className="text-[20px] font-bold text-[#181818] tracking-[-0.5px]">{r.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* What I'd test next */}
        {d?.whatNext && (
          <section className="px-4 sm:px-6 max-w-[1100px] mx-auto py-14 w-full border-t border-black/[0.07]">
            <p className="text-[10px] text-[#9aa5b1] uppercase tracking-[0.07em] mb-5">
              What I&apos;d test next
            </p>
            <p className="text-[15px] leading-[1.7] text-[#576779] tracking-[-0.2px] max-w-[580px]">
              {d.whatNext}
            </p>
          </section>
        )}

        {/* Back link */}
        <div className="px-4 sm:px-6 max-w-[1100px] mx-auto pb-20 pt-4 w-full border-t border-black/[0.07]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#738395] hover:text-[#181818] tracking-[-0.2px] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
