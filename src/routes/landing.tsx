import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <main className="flex min-h-dvh flex-1 flex-col items-stretch justify-between bg-background px-container-padding py-margin-lg md:min-h-0">
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
        <Button onClick={() => navigate('/app/home')}>
          Open the prototype
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/app/business/connect')}
        >
          I&apos;m setting up at work
        </Button>
      </div>
    </main>
  );
}
