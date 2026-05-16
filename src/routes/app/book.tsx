import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MapMock } from '@/components/MapMock';
import { BottomSheet } from '@/components/BottomSheet';
import { TripVisualizer } from '@/components/TripVisualizer';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Chip } from '@/components/Chip';
import { useStore } from '@/store';

type Stage = 'review' | 'confirmed';

export default function Book() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const destId = params.get('dest') ?? 'hq';
  const destination = useStore((s) =>
    s.destinations.find((d) => d.id === destId),
  );
  const corpVerified = useStore((s) => s.user?.corpVerified ?? false);
  const appendRide = useStore((s) => s.appendRide);

  const [stage, setStage] = useState<Stage>('review');
  const [pickupTime] = useState('3:15 PM');
  const arrival = '3:37 PM';
  const cost = corpVerified ? 0 : 29.79;

  const onRequest = () => {
    if (!destination) return;
    appendRide({
      id: `ride-${Date.now()}`,
      origin: 'Home',
      destination: destination.name,
      scheduledFor: new Date().toISOString(),
      durationMin: 22,
      cost,
      status: 'scheduled',
      paidBy: corpVerified ? 'employer' : 'employee',
    });
    setStage('confirmed');
  };

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-mobile flex-col bg-surface-container-low">
      <div className="absolute inset-0">
        <MapMock />
      </div>

      <header className="relative z-10 flex items-center justify-between px-margin-sm pt-4">
        <button
          type="button"
          onClick={() => navigate('/app/home')}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-float"
        >
          <Icon name="arrow_back" className="text-on-surface" />
        </button>
        <button
          type="button"
          aria-label="Center on me"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest shadow-float"
        >
          <Icon name="my_location" className="text-on-surface" />
        </button>
      </header>

      <div className="relative z-10 mx-auto mt-4 max-w-[80%] rounded-2xl bg-on-background px-4 py-2 text-center text-body-sm font-semibold text-inverse-on-surface shadow-float">
        4 min to pickup · ETA {arrival}
      </div>

      <div className="relative z-10 mt-auto">
        <BottomSheet>
          {stage === 'review' ? (
            <ReviewSheet
              destinationName={destination?.name ?? 'Unknown destination'}
              destinationDetail={destination?.address ?? ''}
              pickupTime={pickupTime}
              arrival={arrival}
              cost={cost}
              corpPaid={corpVerified}
              onRequest={onRequest}
            />
          ) : (
            <ConfirmedSheet
              destinationName={destination?.name ?? 'your destination'}
              arrival={arrival}
              corpPaid={corpVerified}
            />
          )}
        </BottomSheet>
      </div>
    </div>
  );
}

function ReviewSheet({
  destinationName,
  destinationDetail,
  pickupTime,
  arrival,
  cost,
  corpPaid,
  onRequest,
}: {
  destinationName: string;
  destinationDetail: string;
  pickupTime: string;
  arrival: string;
  cost: number;
  corpPaid: boolean;
  onRequest: () => void;
}) {
  return (
    <>
      <TripVisualizer
        pickup={{ label: 'Home', detail: '116th St', time: pickupTime }}
        destination={{
          label: destinationName,
          detail: destinationDetail,
          time: arrival,
        }}
      />

      <div className="mt-margin-lg flex items-center justify-between gap-2">
        <Chip variant="status-info" leading={<Icon name="schedule" size={14} />}>
          DEPART AS SOON AS POSSIBLE
        </Chip>
        <button type="button" className="text-label-bold uppercase text-primary">
          Change
        </button>
      </div>

      <div className="mt-margin-lg flex items-center justify-between rounded-2xl bg-surface-container-low p-4">
        <div className="flex items-center gap-3">
          <Icon
            name={corpPaid ? 'work' : 'credit_card'}
            filled={corpPaid}
            className="text-on-surface"
          />
          <div>
            <p className="text-body-md font-semibold text-on-surface">
              {corpPaid ? 'Billed to Acme HQ' : 'Apple Pay'}
            </p>
            <p className="text-body-sm text-on-surface-variant">
              {corpPaid ? 'No expense report required' : '•••• 3761'}
            </p>
          </div>
        </div>
        <p className="text-body-md font-semibold text-on-surface">
          {corpPaid ? 'Covered' : `USD ${cost.toFixed(2)}`}
        </p>
      </div>

      <Button className="mt-margin-lg" onClick={onRequest}>
        Request ride
      </Button>
    </>
  );
}

function ConfirmedSheet({
  destinationName,
  arrival,
  corpPaid,
}: {
  destinationName: string;
  arrival: string;
  corpPaid: boolean;
}) {
  return (
    <div className="py-4">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tertiary-container">
        <Icon name="check" filled className="text-on-tertiary-container" size={32} />
      </div>
      <h3 className="mt-4 text-center text-headline-lg-mobile font-semibold text-on-surface">
        Waymo is on the way
      </h3>
      <p className="mt-1 text-center text-body-md text-on-surface-variant">
        Arriving by {arrival} to take you to {destinationName}.
      </p>
      {corpPaid ? (
        <p className="mt-3 text-center text-body-sm text-tertiary">
          Paid by your employer · no expense report
        </p>
      ) : null}
      <div className="mt-margin-lg space-y-3 pb-safe">
        <Link to="/app/home" className="block">
          <Button>Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
