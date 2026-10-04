import Link from "next/link";
import info from "@/data/restaurant.json";
import menu from "@/data/menu.json";

const featured = menu.flatMap((section) => section.items).slice(0, 3);

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white">
      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="fade-up text-sm uppercase tracking-[0.3em] text-amber-400">
          {info.tagline}
        </p>

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
          <Link href="/menu" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-black transition hover:bg-amber-300">
            View Menu
          </Link>
          <Link href="/order" className="rounded-full border border-white/30 px-8 py-3 transition hover:bg-white/10">
            Order Online
          </Link>
          <Link href="/catering" className="rounded-full border border-white/30 px-8 py-3 transition hover:bg-white/10">
            Catering
          </Link>
        </div>
      </section>

      {/* Featured dishes */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold md:text-5xl">Favourites</h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">{item.name}</h3>
              <p className="mt-3 text-neutral-400">{item.description}</p>
              <p className="mt-6 text-lg text-amber-400">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/menu" className="text-amber-400 hover:text-amber-300">
            See the full menu →
          </Link>
        </div>
      </section>

      {/* Catering call to action */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold md:text-5xl">Planning an event?</h2>
          <p className="mt-4 text-neutral-400">
            Birthdays, weddings and corporate lunches. Tell us what you need and we&apos;ll send a quote.
          </p>
          <Link href="/catering" className="mt-8 inline-block rounded-full bg-amber-400 px-8 py-3 font-semibold text-black transition hover:bg-amber-300">
            Request catering
          </Link>
        </div>
      </section>
    </main>
  );
}