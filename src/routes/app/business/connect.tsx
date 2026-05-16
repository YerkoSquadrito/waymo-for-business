import { useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageScaffold } from '@/components/PageScaffold';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { IconBadge } from '@/components/IconBadge';
import { useStore } from '@/store';

const PERSONAL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
]);

function validate(email: string): string | null {
  if (!email) return 'Enter your work email address.';
  const match = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/.exec(email.trim().toLowerCase());
  if (!match) return 'That email address doesn’t look right.';
  const domain = match[1];
  if (domain && PERSONAL_DOMAINS.has(domain)) {
    return 'Use your company email, not a personal address.';
  }
  return null;
}

export default function Connect() {
  const navigate = useNavigate();
  const verify = useStore((s) => s.verifyCorpEmail);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const message = validate(email);
    if (message) {
      setError(message);
      return;
    }
    verify(email.trim().toLowerCase());
    navigate('/app/business/calendar');
  };

  return (
    <PageScaffold title="Waymo for Business" hideBottomNav>
      <div className="-mx-container-padding mb-margin-lg overflow-hidden">
        <div className="mx-container-padding aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-container" />
      </div>

      <section className="space-y-2">
        <h2 className="text-headline-lg-mobile font-semibold text-on-background">
          Unlock employer-paid commutes
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Connect your corporate email. Eligible work rides will be billed
          directly to your company’s master account.
        </p>
      </section>

      <form
        onSubmit={onSubmit}
        className="mt-margin-lg space-y-6 rounded-2xl border border-surface-container bg-surface-container-lowest p-6 shadow-card"
      >
        <TextField
          label="Work email address"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          leadingIcon={<Icon name="mail" size={22} />}
          error={error ?? undefined}
        />
        <Button
          type="submit"
          trailing={<Icon name="arrow_forward" size={22} />}
        >
          Verify email
        </Button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Perk icon="receipt_long" tone="tertiary">
          No more expense reports
        </Perk>
        <Perk icon="security" tone="secondary">
          Secure corporate login
        </Perk>
      </div>

      <p className="mt-margin-lg text-center text-body-sm text-on-surface-variant">
        Already verified?{' '}
        <Link to="/app/business" className="font-semibold text-primary">
          Back to Business
        </Link>
      </p>
    </PageScaffold>
  );
}

function Perk({
  icon,
  tone,
  children,
}: {
  icon: string;
  tone: 'tertiary' | 'secondary';
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-surface-container-low p-3">
      <IconBadge icon={icon} tone={tone} size="sm" />
      <p className="text-body-sm text-on-surface-variant">{children}</p>
    </div>
  );
}
