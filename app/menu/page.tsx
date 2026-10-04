import { getMenu } from "@/lib/menu";

export const dynamic = "force-dynamic";

const CURRENCY = "£"; // change to "$" or "€" if needed

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default async function MenuPage() {
    const menu = await getMenu();

    if (menu.length === 0) {
        return (
            <main className="min-h-screen bg-cream px-6 pt-40 text-center text-ink">
                <h1 className="text-5xl font-bold text-cedar">Our Menu</h1>
                <p className="mt-6 text-ink/70">Our menu is coming soon.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-cream text-ink">
            {/* Header */}
            <section className="bg-gradient-to-b from-cedar to-cedar-dark px-6 pb-14 pt-36 text-center text-cream">
                <p className="text-sm uppercase tracking-[0.3em] text-gold">Lebanese Kitchen</p>
                <h1 className="mt-4 text-5xl font-bold md:text-6xl">Our Menu</h1>
                <p className="mx-auto mt-4 max-w-xl text-cream/80">
                    Fresh, home-style Lebanese food made to share.
                </p>
            </section>

            {/* Sticky category bar */}
            <nav className="sticky top-[73px] z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
                <div className="mx-auto flex max-w-5xl gap-3 overflow-x-auto px-6 py-3">
                    {menu.map((s) => (
                        <a
                            key={s.category}
                            href={`#${slug(s.category)}`}
                            className="shrink-0 rounded-full border border-ink/20 px-4 py-1.5 text-sm text-ink/80 transition hover:border-cedar hover:bg-cedar hover:text-white"
                        >
                            {s.category}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Sections */}
            <div className="mx-auto max-w-5xl px-6 pb-24">
                {menu.map((section) => (
                    <section key={section.category} id={slug(section.category)} className="scroll-mt-36 pt-14">
                        <h2 className="text-3xl font-bold text-cedar">{section.category}</h2>
                        <div className="mt-3 h-1 w-16 rounded bg-gold" />

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            {section.items.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-3 shadow-sm"
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
                                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-cream text-3xl font-bold text-cedar/60">
                                            {item.name.charAt(0)}
                                        </div>
                                    )}

                                    {/* Text */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                                        <div>
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                                                <span className="shrink-0 font-semibold text-spice">
                                                    {CURRENCY}
                                                    {item.price.toFixed(2)}
                                                </span>
                                            </div>
                                            {item.nameAr && (
                                                <p dir="rtl" className="mt-0.5 text-sm text-ink/60">
                                                    {item.nameAr}
                                                </p>
                                            )}
                                            <p className="mt-2 line-clamp-3 text-sm text-ink/70">
                                                {item.description}
                                            </p>
                                        </div>

                                        {(item.popular || item.vegetarian || item.spicy) && (
                                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                                {item.popular && (
                                                    <span className="rounded-full bg-gold/25 px-2 py-0.5 font-medium text-cedar-dark">
                                                        Popular
                                                    </span>
                                                )}
                                                {item.vegetarian && (
                                                    <span className="rounded-full bg-emerald-600/15 px-2 py-0.5 font-medium text-emerald-800">
                                                        Vegetarian
                                                    </span>
                                                )}
                                                {item.spicy && (
                                                    <span className="rounded-full bg-spice/15 px-2 py-0.5 font-medium text-spice-dark">
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