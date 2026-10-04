import { getMenu } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
    const menu = await getMenu();

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-32">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold text-center">Our Menu</h1>

                {menu.map((section) => (
                    <section key={section.category} className="mt-16">
                        <h2 className="text-2xl uppercase tracking-[0.2em] text-amber-400">
                            {section.category}
                        </h2>

                        <div className="mt-6 space-y-6">
                            {section.items.map((item) => (
                                <div key={item.id} className="flex gap-5 border-b border-white/10 pb-6">
                                    {item.imageKey && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={`/api/menu-image?key=${encodeURIComponent(item.imageKey)}`}
                                            alt={item.name}
                                            className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-32 md:w-32"
                                        />
                                    )}
                                    <div className="flex flex-1 justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">{item.name}</h3>
                                            <p className="mt-1 text-neutral-400">{item.description}</p>
                                        </div>
                                        <p className="text-lg text-amber-400">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}