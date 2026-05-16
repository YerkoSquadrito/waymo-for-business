import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TripVisualizer } from './TripVisualizer';

describe('TripVisualizer', () => {
  it('renders pickup and destination labels and times', () => {
    render(
      <TripVisualizer
        pickup={{ label: 'Home', detail: '116th St', time: '9:00 AM' }}
        destination={{ label: 'Acme HQ', detail: 'Wilshire', time: '9:22 AM' }}
      />,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Acme HQ')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
    expect(screen.getByText('9:22 AM')).toBeInTheDocument();
  });
});
