import Link from "next/link";
import info from "@/data/restaurant.json";
import { getMenu } from "@/lib/menu";

export const dynamic = "force-dynamic";

const CURRENCY = "£";

const highlights = [
  { title: "Fresh ingredients", text: "Prepared with care, the way it should be." },
  { title: "Made to share", text: "Generous mezze and grills for the whole table." },
  { title: "Catering for events", text: "Birthdays, weddings and corporate lunches." },
];

export default async function Home() {
  const menu = await getMenu();
  const featured = menu.flatMap((s) => s.items).slice(0, 3);

  return (
    <main className="bg-cream text-ink">
      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cedar to-cedar-dark px-6 text-center text-cream">
        <p className="fade-up text-sm uppercase tracking-[0.3em] text-gold">{info.tagline}</p>

        <h1
          className="fade-up mt-6 text-6xl font-bold md:text-8xl"
          style={{ animationDelay: "0.2s" }}
        >
          {info.name}
        </h1>

        <div
          className="fade-up mt-10 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "0.6s" }}
        >
          <Link href="/menu" className="rounded-full bg-gold px-8 py-3 font-semibold text-ink transition hover:bg-cream">
            View Menu
          </Link>
          <Link href="/order" className="rounded-full bg-spice px-8 py-3 font-semibold text-white transition hover:bg-spice-dark">
            Order Online
          </Link>
          <Link href="/catering" className="rounded-full border border-cream/40 px-8 py-3 text-cream transition hover:bg-cream/10">
            Catering
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="text-center">
            <div className="mx-auto h-1 w-10 rounded bg-gold" />
            <h3 className="mt-5 text-xl font-semibold text-cedar">{h.title}</h3>
            <p className="mt-2 text-ink/70">{h.text}</p>
          </div>
        ))}
      </section>

      {/* Favourites */}
      {featured.length > 0 && (
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-4xl font-bold text-cedar md:text-5xl">Our Favourites</h2>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {featured.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-sm">
                  {item.imageKey && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/menu-image?key=${encodeURIComponent(item.imageKey)}`}
                      alt={item.name}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <span className="font-semibold text-spice">
                        {CURRENCY}
                        {item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/menu" className="font-semibold text-cedar hover:text-cedar-dark">
                See the full menu →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Catering call to action */}
      <section className="bg-cedar px-6 py-24 text-center text-cream">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold md:text-5xl">Planning an event?</h2>
          <p className="mt-4 text-cream/80">
            Tell us what you need and we&apos;ll send you a quote.
          </p>
          <Link href="/catering" className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition hover:bg-cream">
            Request catering
          </Link>
        </div>
      </section>
    </main>
  );
}