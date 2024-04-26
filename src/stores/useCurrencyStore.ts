import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Currency } from '@/@types/currency';

type State = {
  currency: Currency;
};

type Actions = {
  setCurrency: (currency: Currency) => void;
};

const initialState: State = {
  currency: 'krw',
};

export const useCurrencyStore = create<State & Actions>()(
  persist(
    set => ({
      ...initialState,
      setCurrency: currency => set(() => ({ currency })),
    }),
    {
      name: 'currency-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
