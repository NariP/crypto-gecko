import { create } from 'zustand';

type State = {
  display: 'all' | 'bookmark';
  limit: '10' | '30' | '50';
};

type Actions = {
  setToolbarOptions: (option: { [key in keyof State]?: State[key] }) => void;
  reset: () => void;
};

const initialState: State = {
  display: 'all',
  limit: '50',
};

export const useCryptoHomeToolbarStore = create<State & Actions>()(set => ({
  ...initialState,
  setToolbarOptions: option => set(() => option),
  reset: () => {
    set(initialState);
  },
}));
