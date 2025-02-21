// src/app/layout.tsx
import '../styles/globals.css';
import { PatternProvider } from '../app/context/PatternContext';
import { PatternParametersProvider } from './context/PatternParametersContext';
import PatternSelector from '../components/PatternSelectior';
import PatternControls from '../components/PatternControls';

export const metadata = {
  title: 'Pattern Animation',
  description: 'Interactive pattern animations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PatternProvider>
          <PatternParametersProvider>
            <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr_auto] h-screen">
              <aside className="bg-gray-800 p-4">
                <PatternSelector />
              </aside>

              <main className="p-4 overflow-hidden">{children}</main>

              <footer className="bg-gray-900 text-white p-6 col-span-2">
                <PatternControls />
              </footer>
            </div>
          </PatternParametersProvider>
        </PatternProvider>
      </body>
    </html>
  );
}
