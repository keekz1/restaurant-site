import menu from "@/data/menu.json";

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-20">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold text-center">Our Menu</h1>

                {menu.map((section) => (
                    <section key={section.category} className="mt-16">
                        <h2 className="text-2xl uppercase tracking-[0.2em] text-amber-400">
                            {section.category}
                        </h2>

                        <div className="mt-6 space-y-6">
                            {section.items.map((item) => (
                                <div key={item.name} className="flex justify-between gap-6 border-b border-white/10 pb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                        <p className="mt-1 text-neutral-400">{item.description}</p>
                                    </div>
                                    <p className="text-lg text-amber-400">${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}