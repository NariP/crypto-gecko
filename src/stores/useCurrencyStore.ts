import { create } from 'zustand';
import { Currency } from '@/@types/currency';

type State = {
  currency: Currency;
};

type Actions = {
  setCurrency: (currency: Currency) => void;
  reset: () => void;
};

const initialState: State = {
  currency: 'krw',
};

export const useCurrencyStore = create<State & Actions>()(set => ({
  ...initialState,
  setCurrency: currency => set(() => ({ currency })),
  reset: () => {
    set(initialState);
  },
}));
