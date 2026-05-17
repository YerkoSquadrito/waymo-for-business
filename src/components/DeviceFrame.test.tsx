import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DeviceFrame } from './DeviceFrame';

describe('DeviceFrame', () => {
  it('renders children', () => {
    render(
      <DeviceFrame>
        <p>Inside the phone</p>
      </DeviceFrame>,
    );
    expect(screen.getByText('Inside the phone')).toBeInTheDocument();
  });

  it('constrains its inner container to the mobile width', () => {
    const { container } = render(
      <DeviceFrame>
        <p>x</p>
      </DeviceFrame>,
    );
    // The inner phone container is the second div in the tree.
    const inner = container.querySelector('.max-w-mobile');
    expect(inner).not.toBeNull();
  });

  it('forwards a custom className to the inner phone container', () => {
    const { container } = render(
      <DeviceFrame className="ring-red-500">
        <p>x</p>
      </DeviceFrame>,
    );
    const inner = container.querySelector('.ring-red-500');
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain('max-w-mobile');
  });
});
