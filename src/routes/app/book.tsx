import { PageScaffold } from '@/components/PageScaffold';

export default function Book() {
  return (
    <PageScaffold title="Book a ride">
      <Placeholder
        label="Book"
        detail="Map + bottom sheet with route, ETA, and Request ride CTA — built in feat/home-and-booking."
      />
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
