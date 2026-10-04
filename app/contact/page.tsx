import info from "@/data/restaurant.json";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-32">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold text-center">Visit Us</h1>

                <div className="mt-16 grid gap-12 md:grid-cols-2">
                    <section>
                        <h2 className="text-2xl uppercase tracking-[0.2em] text-amber-400">Opening hours</h2>
                        <div className="mt-6 space-y-3">
                            {info.hours.map((h) => (
                                <div key={h.day} className="flex justify-between border-b border-white/10 pb-2">
                                    <span>{h.day}</span>
                                    <span className="text-neutral-400">{h.time}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl uppercase tracking-[0.2em] text-amber-400">Find us</h2>
                        <p className="mt-6">{info.address}</p>
                        <p className="mt-4">
                            <a href={`tel:${info.phone}`} className="hover:text-amber-400">{info.phone}</a>
                        </p>
                        <p className="mt-2">
                            <a href={`mailto:${info.email}`} className="hover:text-amber-400">{info.email}</a>
                        </p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-block rounded-full border border-white/30 px-6 py-2 hover:bg-white/10 transition"
                        >
                            Open in Google Maps
                        </a>
                    </section>
                </div>
            </div>
        </main>
    );
}