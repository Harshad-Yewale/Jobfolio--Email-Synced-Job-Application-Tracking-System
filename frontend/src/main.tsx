import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: 'var(--ink)',
            color: '#fff',
            fontSize: 13,
            borderRadius: 8,
            padding: '10px 18px',
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);