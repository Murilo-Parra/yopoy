// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import OnboardingTutorial from './OnboardingTutorial';

describe('OnboardingTutorial no MVP', () => {
  afterEach(cleanup);

  it('ensina o fluxo canônico sem prometer emissão fiscal real', () => {
    render(<OnboardingTutorial isOpen theme="light" onClose={vi.fn()} />);
    let tutorialText = '';

    for (let step = 0; step < 5; step += 1) {
      tutorialText += ` ${document.body.textContent ?? ''}`;
      if (step < 4) fireEvent.click(screen.getByRole('button', { name: /avançar/i }));
    }

    expect(tutorialText).toMatch(/registrar primeiro/i);
    expect(tutorialText).toMatch(/organizar depois/i);
    expect(tutorialText).toMatch(/concilie quando for possível/i);
    expect(tutorialText).toMatch(/prepare para o contador/i);
    expect(tutorialText).toMatch(/pré-nota interna/i);
    expect(tutorialText).toMatch(/emissão fiscal real não está disponível/i);
    expect(tutorialText).not.toMatch(/SEFAZ|DANFE|NF-e|NFC-e|NFS-e|certificado digital/i);
  });
});
