import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuth = create(
  persist<{ token: string; addToken: (token: string) => void }>(
    set => ({
      token: '',
      addToken: (token: string) =>
        set({
          token,
        }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
