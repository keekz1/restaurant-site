import Link from "next/link";
import info from "@/data/restaurant.json";

const links = [
    { href: "/menu", label: "Menu" },
    { href: "/catering", label: "Catering" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
                <Link href="/" className="text-xl font-bold">
                    {info.name}
                </Link>
                <div className="flex items-center gap-5 text-sm md:gap-8">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="text-neutral-300 hover:text-amber-400 transition">
                            {l.label}
                        </Link>
                    ))}
                    <Link href="/order" className="rounded-full bg-amber-400 px-5 py-2 font-semibold text-black hover:bg-amber-300 transition">
                        Order
                    </Link>
                </div>
            </nav>
        </header>
    );
}