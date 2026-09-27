import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useApplicationsStore } from '@/hooks/store';
import type { ApplicationResponse } from '@/types';

const makeApplication = (id: string): ApplicationResponse => ({
  id,
  task_id: 'task-1',
  prestataire_id: `provider-${id}`,
  message: 'Je souhaite réaliser cette mission.',
  status: 'EN_ATTENTE',
  created_at: '2026-09-28T10:00:00.000Z',
  prestataire: {
    name: `Prestataire ${id}`,
    email: `${id}@example.test`,
    role: 'prestataire',
    phone: '0000000000',
    rating_avg: 4,
    created_at: new Date('2026-01-01T00:00:00.000Z'),
  },
});

function ApplicationStatus({ id }: { id: string }) {
  const status = useApplicationsStore((state) =>
    state.applications.find((application) => application.id === id)?.status ?? 'ABSENTE'
  );

  return <p>{`${id}: ${status}`}</p>;
}

describe('shared application state', () => {
  beforeEach(() => {
    useApplicationsStore.getState().setApplications([makeApplication('application-1'), makeApplication('application-2')]);
  });

  it('updates subscribers when one application status changes', () => {
    render(
      <>
        <ApplicationStatus id="application-1" />
        <ApplicationStatus id="application-2" />
      </>
    );

    act(() => {
      useApplicationsStore.getState().updateApplicationStatus('application-1', 'ACCEPTEE');
    });

    expect(screen.getByText('application-1: ACCEPTEE')).toBeTruthy();
    expect(screen.getByText('application-2: EN_ATTENTE')).toBeTruthy();
  });
});
