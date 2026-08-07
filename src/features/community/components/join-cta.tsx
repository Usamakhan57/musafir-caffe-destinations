import Link from "next/link";

import { ROUTES } from "@/constants";

export default function JoinCTA() {
  return (
    <section className="mt-12 mb-24">
      <div className="overflow-hidden rounded-[32px] bg-[#2563EB] shadow-elevated">
        <div className="grid gap-8 px-6 py-10 md:grid-cols-[1.6fr_1fr] md:px-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Join the club</p>
            <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Become part of the travel community</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200/90">
              Share your story, host meetups, tap into local knowledge, and earn rewards for being an active member.
            </p>
          </div>
          <div className="rounded-[28px] bg-white/10 p-6 backdrop-blur-sm sm:p-8">
            <div className="text-sm font-semibold text-white">Ready to connect?</div>
            <p className="mt-3 text-sm text-slate-200/90">Sign up and start contributing to the world’s most active travel community.</p>
            <Link
              href={ROUTES.register}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#2563EB] transition hover:bg-slate-100"
            >
              Join now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
