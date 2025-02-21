// src/app/layout.tsx
import '../styles/globals.css';
import { PatternProvider } from '../app/context/PatternContext';
import ClientSidePatternSelector from '../components/ClientSidePatternSelector';

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
          <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr_auto] h-screen">
            <aside className="bg-gray-800 p-4 text-white">
              <h2 className="text-xl font-bold mb-4">Pattern Select</h2>
              <ClientSidePatternSelector />
            </aside>

            <main className="p-4 overflow-hidden">{children}</main>

            <footer className="bg-gray-900 text-white p-4 col-span-2">
              <div>Pattern Animation Controls</div>
            </footer>
          </div>
        </PatternProvider>
      </body>
    </html>
  );
}
