import { getMenu } from "@/lib/menu";

export const dynamic = "force-dynamic";

const CURRENCY = "£"; // change to "$" or "€" if needed

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default async function MenuPage() {
    const menu = await getMenu();

    if (menu.length === 0) {
        return (
            <main className="min-h-screen bg-neutral-950 px-6 pt-40 text-center text-white">
                <h1 className="text-5xl font-bold">Our Menu</h1>
                <p className="mt-6 text-neutral-400">Our menu is coming soon.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            {/* Header */}
            <section className="px-6 pb-10 pt-32 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Lebanese Kitchen</p>
                <h1 className="mt-4 text-5xl font-bold md:text-6xl">Our Menu</h1>
                <p className="mx-auto mt-4 max-w-xl text-neutral-400">
                    Fresh, home-style Lebanese food made to share.
                </p>
            </section>

            {/* Sticky category bar */}
            <nav className="sticky top-[65px] z-40 border-y border-white/10 bg-neutral-950/90 backdrop-blur">
                <div className="mx-auto flex max-w-5xl gap-3 overflow-x-auto px-6 py-3">
                    {menu.map((s) => (
                        <a
                            key={s.category}
                            href={`#${slug(s.category)}`}
                            className="shrink-0 rounded-full border border-white/20 px-4 py-1.5 text-sm text-neutral-300 transition hover:border-amber-400 hover:text-amber-400"
                        >
                            {s.category}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Sections */}
            <div className="mx-auto max-w-5xl px-6 pb-24">
                {menu.map((section) => (
                    <section key={section.category} id={slug(section.category)} className="scroll-mt-32 pt-14">
                        <h2 className="text-3xl font-bold">{section.category}</h2>
                        <div className="mt-3 h-px w-16 bg-amber-400" />

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            {section.items.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-3"
                                >
                                    {/* Photo, or a letter tile if there is no photo */}
                                    {item.imageKey ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={`/api/menu-image?key=${encodeURIComponent(item.imageKey)}`}
                                            alt={item.name}
                                            className="h-28 w-28 shrink-0 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-white/5 text-3xl font-bold text-amber-400/60">
                                            {item.name.charAt(0)}
                                        </div>
                                    )}

                                    {/* Text */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                                        <div>
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                                                <span className="shrink-0 font-semibold text-amber-400">
                                                    {CURRENCY}
                                                    {item.price.toFixed(2)}
                                                </span>
                                            </div>
                                            {item.nameAr && (
                                                <p dir="rtl" className="mt-0.5 text-sm text-neutral-500">
                                                    {item.nameAr}
                                                </p>
                                            )}
                                            <p className="mt-2 line-clamp-3 text-sm text-neutral-400">
                                                {item.description}
                                            </p>
                                        </div>

                                        {(item.popular || item.vegetarian || item.spicy) && (
                                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                                {item.popular && (
                                                    <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-amber-300">
                                                        Popular
                                                    </span>
                                                )}
                                                {item.vegetarian && (
                                                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-300">
                                                        Vegetarian
                                                    </span>
                                                )}
                                                {item.spicy && (
                                                    <span className="rounded-full bg-red-400/15 px-2 py-0.5 text-red-300">
                                                        Spicy
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}