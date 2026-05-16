import { PageScaffold } from '@/components/PageScaffold';

export default function Connect() {
  return (
    <PageScaffold title="Waymo for Business">
      <Placeholder
        label="Connect"
        detail="Connect corporate account form — port from connect_corporate_account/code.html in feat/business-onboarding."
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
