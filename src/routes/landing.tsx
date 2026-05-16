import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-mobile flex-col items-stretch justify-between bg-background px-container-padding py-margin-lg">
      <header className="pt-margin-lg">
        <p className="font-label-bold uppercase tracking-[0.05em] text-primary">
          Waymo for Business
        </p>
        <h1 className="mt-3 text-headline-lg text-on-surface">
          Your commute, on your employer.
        </h1>
        <p className="mt-4 text-body-md text-on-surface-variant">
          Recurring and on-demand rides on Waymo&apos;s fully autonomous fleet,
          billed directly to your company. No expense reports. No surge.
        </p>
      </header>

      <div className="my-margin-lg overflow-hidden rounded-3xl bg-surface-container shadow-card">
        <div className="aspect-[4/3] bg-gradient-to-br from-primary to-primary-container" />
      </div>

      <div className="flex flex-col gap-3 pb-safe">
        <Link
          to="/app/home"
          className="flex h-14 items-center justify-center rounded-full bg-primary text-on-primary text-headline-lg-mobile font-semibold shadow-card active:scale-[0.98] transition-transform"
        >
          Open the prototype
        </Link>
        <Link
          to="/app/business/connect"
          className="flex h-14 items-center justify-center rounded-full border-2 border-outline-variant text-on-surface-variant text-body-md font-semibold"
        >
          I&apos;m setting up at work
        </Link>
      </div>
    </main>
  );
}
