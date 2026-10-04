import info from "@/data/restaurant.json";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-neutral-950 px-6 py-10 text-center text-sm text-neutral-400">
            <p className="text-lg font-semibold text-white">{info.name}</p>
            <p className="mt-2">{info.address}</p>
            <p className="mt-1">
                {info.phone} · {info.email}
            </p>
            <p className="mt-6 text-xs text-neutral-600">
                © {new Date().getFullYear()} {info.name}. All rights reserved.
            </p>
        </footer>
    );
}