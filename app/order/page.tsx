import Link from "next/link";

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-40 text-center">
            <h1 className="text-5xl md:text-6xl font-bold">Order Online</h1>
            <p className="mt-6 text-neutral-400">
                Online ordering is coming soon. In the meantime, call us or request catering.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/menu" className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-black hover:bg-amber-300 transition">
                    View Menu
                </Link>
                <Link href="/contact" className="rounded-full border border-white/30 px-8 py-3 hover:bg-white/10 transition">
                    Contact us
                </Link>
            </div>
        </main>
    );
}