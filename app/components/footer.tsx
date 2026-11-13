"use client";
import { useLanguage } from "../context/language";
import { useEffect, useState } from "react";

function LocalTime() {
  const [time, setTime] = useState("00:00 AM");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p className="text-[12px] text-[#576779] tracking-[-0.2px] leading-[28px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">{time}</p>;
}

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-[var(--border)] px-4 sm:px-6 pb-28 max-w-[1100px] mx-auto w-full">
      <div className="flex gap-[24px] justify-between pt-[24px] pb-[40px]">
        <div className="flex-[1_0_0] min-w-px">
          <p className="text-[12px] text-[#576779] tracking-[-0.2px] leading-[28px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
            {t.footer.status}
          </p>
        </div>
        <div className="flex flex-col gap-[8px] flex-[1_0_0] min-w-px">
          <p className="text-[12px] text-[#576779] tracking-[-0.2px] leading-[28px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
            {t.footer.localTimeLabel}
          </p>
          <LocalTime />
        </div>
        <div className="flex flex-col gap-[8px] flex-[1_0_0] min-w-px">
          <p className="text-[12px] text-[#576779] tracking-[-0.2px] leading-[28px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
            {t.footer.contactLabel}
          </p>
          <a
            href="mailto:damiree813@gmail.com"
            className="text-[12px] text-[#576779] tracking-[-0.2px] leading-[28px] hover:text-[#181818] transition-colors [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]"
          >
            damiree813@gmail.com
          </a>
        </div>
        <div className="flex flex-col gap-[8px] flex-[1_0_0] min-w-px">
          <p className="text-[12px] text-[#576779] tracking-[-0.2px] leading-[28px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
            {t.footer.updated}
          </p>
          <p className="text-[12px] text-[#576779] tracking-[-0.2px] leading-[28px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">v.2.0.0</p>
        </div>
      </div>
    </footer>
  );
}
