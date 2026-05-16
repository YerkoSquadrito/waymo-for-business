import { PageScaffold } from '@/components/PageScaffold';

export default function Home() {
  return (
    <PageScaffold title="Waymo">
      <Placeholder label="Home" detail="Where to? Saved places and recents land here in feat/home-and-booking." />
    </PageScaffold>
  );
}

function Placeholder({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="mt-margin-lg rounded-2xl bg-surface-container-lowest p-margin-lg shadow-card">
      <p className="font-label-bold uppercase text-primary">{label}</p>
      <p className="mt-2 text-body-md text-on-surface-variant">{detail}</p>
    </div>
  );
}
