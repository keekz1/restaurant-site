"use client";

import { useState } from "react";

export default function CateringPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");

        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch("/api/catering", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                setErrorMsg(body.reason || body.error || `Status ${res.status}`);
                setStatus("error");
                return;
            } setStatus("sent");
            form.reset();
        } catch {
            setStatus("error");
        }
    }

    const field =
        "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none";

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-20">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-center">Catering</h1>
                <p className="mt-4 text-center text-neutral-400">
                    Planning an event? Tell us the details and we&apos;ll get back to you with a quote.
                </p>

                <form onSubmit={handleSubmit} className="mt-12 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        <input name="name" required placeholder="Your name" className={field} />
                        <input name="phone" required placeholder="Phone number" className={field} />
                    </div>

                    <input name="email" type="email" required placeholder="Email address" className={field} />

                    <div className="grid gap-5 md:grid-cols-2">
                        <input name="date" type="date" required className={field} />
                        <input name="guests" type="number" min="1" required placeholder="Number of guests" className={field} />
                    </div>

                    <select name="eventType" required defaultValue="" className={field}>
                        <option value="" disabled>Type of event</option>
                        <option>Birthday</option>
                        <option>Wedding</option>
                        <option>Corporate</option>
                        <option>Family gathering</option>
                        <option>Other</option>
                    </select>

                    <input name="budget" placeholder="Budget (optional)" className={field} />

                    <textarea
                        name="details"
                        rows={4}
                        placeholder="Dietary needs, favourite dishes, location, anything else..."
                        className={field}
                    />
                    kj
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full rounded-full bg-amber-400 px-8 py-3 font-semibold text-black hover:bg-amber-300 transition disabled:opacity-60"
                    >
                        {status === "sending" ? "Sending..." : "Request a quote"}
                    </button>

                    {status === "sent" && (
                        <p className="text-center text-emerald-400">Thank you! We&apos;ll be in touch soon.</p>
                    )}
                    {status === "error" && (
                        <p className="text-center text-red-400">
                            Something went wrong. {errorMsg}
                        </p>
                    )}
                </form>
            </div>
        </main>
    );
}