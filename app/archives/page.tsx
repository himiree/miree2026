"use client";
import { useEffect, useRef, useState } from "react";
import FloatingNav from "../components/floating-nav";
import Footer from "../components/footer";
import { useLanguage } from "../context/language";

interface ArchiveItem {
  id: string;
  image: string;
  title: string;
  date: string;
  body: string;
}

const STORAGE_KEY = "archive-items-v2";

const defaultItems: ArchiveItem[] = [
  { id: "a1",  image: "/images/archive1_Apzima.png",       title: "Branding",              date: "2022", body: "" },
  { id: "a2",  image: "/images/archive2_infographic.png",  title: "Infographic editorial", date: "2019", body: "" },
  { id: "a3",  image: "/images/archive3_Exhibition.png",   title: "Exhibition",            date: "2022", body: "" },
  { id: "a4",  image: "/images/archive4_identity.png",     title: "Visual Identity",       date: "2022", body: "" },
  { id: "a5",  image: "/images/archive5_uistudy.png",      title: "UI Study",              date: "2022", body: "" },
  { id: "a6",  image: "/images/archive6_surrealism.png",   title: "Surrealism",            date: "2022", body: "" },
  { id: "a7",  image: "/images/archive7_35hz.png",         title: "Branding",              date: "2022", body: "" },
  { id: "a8",  image: "/images/archive8_branding.jpg",     title: "Branding",              date: "2018", body: "" },
  { id: "a9",  image: "/images/archive9_goguma.gif",       title: "Motion",                date: "2021", body: "" },
  { id: "a10", image: "/images/archive10_poster.png",      title: "Poster",                date: "2019", body: "" },
  { id: "a11", image: "/images/archive11_Exhibition.png",  title: "Exhibition",            date: "2022", body: "" },
];

function resizeImage(file: File, maxSize = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image"));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-[14px] text-[#181818] outline-none focus:border-black/30 placeholder:text-[#9aa5b1]";

export default function Archives() {
  const { t } = useLanguage();
  const [items, setItems] = useState<ArchiveItem[]>(defaultItems);
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewing, setViewing] = useState<ArchiveItem | null>(null);
  const [editing, setEditing] = useState<ArchiveItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      alert("Storage is full. Try removing some images.");
    }
  }, [items, loaded]);

  useEffect(() => {
    if (!viewing && !editing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setViewing(null);
        setEditing(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [viewing, editing]);

  const startNew = () =>
    setEditing({ id: crypto.randomUUID(), image: "", title: "", date: "", body: "" });

  const saveEditing = () => {
    if (!editing) return;
    setItems((prev) =>
      prev.some((i) => i.id === editing.id)
        ? prev.map((i) => (i.id === editing.id ? editing : i))
        : [editing, ...prev]
    );
    setEditing(null);
  };

  const deleteItem = (id: string) => {
    if (!confirm(t.archives.confirmDelete)) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    setEditing(null);
  };

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editing) return;
    try {
      const image = await resizeImage(file);
      setEditing((cur) => (cur ? { ...cur, image } : cur));
    } catch {}
  };

  const closeButton = (onClick: () => void) => (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-[#181818] hover:bg-white transition-colors"
      aria-label="Close"
    >
      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
        <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  );

  return (
    <>
      <FloatingNav />
      <main className="px-4 sm:px-6 max-w-[1100px] mx-auto pb-28 w-full">
        <section className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-2 pt-36 pb-14">
          <p className="text-[32px] font-bold leading-[28px] text-[#181818] tracking-[-0.5px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
            {t.archives.heading}
          </p>
          <p className="text-[20px] leading-[28px] text-[#576779] tracking-[-0.2px]">
              {t.archives.bio}
            </p>
        </section>

        <div className="border-t border-[var(--border)]" />

        <section className="pt-10 pb-10">
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[900px]:grid-cols-3 gap-[24px]">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-[16px] group">
                <button
                  onClick={() => (editMode ? setEditing(item) : setViewing(item))}
                  className="relative flex-1 min-h-[330px] rounded-xl overflow-hidden text-left transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-[#f1f3f5] p-6 overflow-hidden">
                      <p className="text-[16px] leading-[24px] text-[#576779] whitespace-pre-wrap line-clamp-[10]">
                        {item.body}
                      </p>
                    </div>
                  )}
                  {editMode && (
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[12px] text-[#181818]">
                      {t.archives.edit}
                    </span>
                  )}
                </button>
                <div className="flex justify-between items-end">
                  <p className="text-[14px] font-medium leading-[28px] tracking-[-0.2px] text-[#181818] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
                    {item.title}
                  </p>
                  <p className="text-[14px] leading-[28px] tracking-[-0.2px] text-[#576779] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {viewing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewing(null);
          }}
        >
          <div className="absolute inset-0 backdrop-blur-2xl bg-[rgba(255,255,255,0.3)]" onClick={() => setViewing(null)} />
          <div className="relative z-10 max-w-[90vw] max-h-[90vh] flex flex-col rounded-[20px] overflow-hidden bg-white shadow-[0px_24px_64px_0px_rgba(0,0,0,0.18)]">
            {closeButton(() => setViewing(null))}
            {viewing.image && (
              <img src={viewing.image} alt={viewing.title} className="max-h-[75vh] w-auto object-contain" />
            )}
            {(viewing.body || !viewing.image) && (
              <div className="overflow-y-auto p-6 max-w-[640px]">
                <p className="text-[18px] font-medium text-[#181818]">{viewing.title}</p>
                <p className="mb-3 text-[13px] text-[#576779]">{viewing.date}</p>
                <p className="text-[15px] leading-[24px] text-[#181818] whitespace-pre-wrap">{viewing.body}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 backdrop-blur-2xl bg-[rgba(255,255,255,0.3)]" onClick={() => setEditing(null)} />
          <div className="relative z-10 w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-white/90 backdrop-blur-xl p-6 shadow-[0px_24px_64px_0px_rgba(0,0,0,0.18)] flex flex-col gap-3">
            {closeButton(() => setEditing(null))}
            <p className="text-[16px] font-medium text-[#181818]">
              {items.some((i) => i.id === editing.id) ? t.archives.edit : t.archives.newItem}
            </p>

            {editing.image && (
              <img src={editing.image} alt="" className="w-full max-h-[260px] rounded-xl object-cover" />
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} className="hidden" />
            <div className="flex gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="rounded-full border border-black/10 px-4 py-1.5 text-[13px] text-[#181818] hover:bg-black/5 transition-colors"
              >
                {editing.image ? t.archives.changeImage : t.archives.chooseImage}
              </button>
              {editing.image && (
                <button
                  onClick={() => setEditing({ ...editing, image: "" })}
                  className="rounded-full border border-black/10 px-4 py-1.5 text-[13px] text-[#576779] hover:bg-black/5 transition-colors"
                >
                  {t.archives.removeImage}
                </button>
              )}
            </div>

            <input
              className={inputClass}
              placeholder={t.archives.titlePlaceholder}
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder={t.archives.datePlaceholder}
              value={editing.date}
              onChange={(e) => setEditing({ ...editing, date: e.target.value })}
            />
            <textarea
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder={t.archives.bodyPlaceholder}
              value={editing.body}
              onChange={(e) => setEditing({ ...editing, body: e.target.value })}
            />

            <div className="flex justify-between pt-2">
              {items.some((i) => i.id === editing.id) ? (
                <button
                  onClick={() => deleteItem(editing.id)}
                  className="rounded-full px-4 py-1.5 text-[13px] text-[#FF383C] hover:bg-[#FF383C]/10 transition-colors"
                >
                  {t.archives.delete}
                </button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-full border border-black/10 px-4 py-1.5 text-[13px] text-[#576779] hover:bg-black/5 transition-colors"
                >
                  {t.archives.cancel}
                </button>
                <button
                  onClick={saveEditing}
                  disabled={!editing.image && !editing.title && !editing.body}
                  className="rounded-full bg-[#181818] px-4 py-1.5 text-[13px] text-white hover:opacity-80 transition-opacity disabled:opacity-30"
                >
                  {t.archives.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
