import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { produce } from 'immer';
import { create } from 'zustand';

import { removeToken, setToken } from '@/store/useCookieStore';

type AuthStoreType = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: string) => void;
  logout: () => void;
  stopLoading: () => void;
};

const useAuthStoreBase = create<AuthStoreType>((set) => ({
  token: '',
  isAuthenticated: false,
  isLoading: true,
  login: (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = true;
        state.token = token;
      }),
    );
  },
  logout: () => {
    removeToken();
    localStorage.removeItem('token');
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = false;
        state.token = '';
      }),
    );
  },
  stopLoading: () => {
    set(
      produce<AuthStoreType>((state) => {
        state.isLoading = false;
      }),
    );
  },
}));

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
