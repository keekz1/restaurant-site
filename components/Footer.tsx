import info from "@/data/restaurant.json";

export default function Footer() {
    return (
        <footer className="bg-cedar-dark px-6 py-12 text-center text-sm text-cream/80">
            <p className="text-xl font-semibold text-cream">{info.name}</p>
            <p className="mt-3">{info.address}</p>
            <p className="mt-1">
                {info.phone} · {info.email}
            </p>
            <p className="mt-8 text-xs text-cream/50">
                © {new Date().getFullYear()} {info.name}. All rights reserved.
            </p>
        </footer>
    );
}