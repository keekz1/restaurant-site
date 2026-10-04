import Link from "next/link";
import info from "@/data/restaurant.json";
import CedarIcon from "./CedarIcon";
const links = [
    { href: "/menu", label: "Menu" },
    { href: "/catering", label: "Catering" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-ink/10 bg-cream/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-cedar">
                    <CedarIcon className="h-8 w-8 text-tree" />
                    {info.name}
                </Link>
                <div className="flex items-center gap-5 text-sm md:gap-8">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="text-ink/80 transition hover:text-cedar">
                            {l.label}
                        </Link>
                    ))}
                    <Link
                        href="/order"
                        className="rounded-full bg-spice px-5 py-2 font-semibold text-white transition hover:bg-spice-dark"
                    >
                        Order
                    </Link>
                </div>
            </nav>
        </header>
    );
}