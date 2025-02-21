// src/app/layout.tsx
import '../styles/globals.css';

export const metadata = {
  title: 'My App',
  description: 'Blank canvas with left and bottom sidebars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* A grid with two columns: fixed (left sidebar) & fluid (app container),
            and two rows: flexible main row and fixed bottom sidebar */}
        <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr_auto] h-screen">
          {/* Left Sidebar */}
          <aside className="bg-gray-600 p-4">
            <nav>
              <ul className="space-y-2">
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
              </ul>
            </nav>
          </aside>

          {/* Main App Container */}
          <main className="p-4 overflow-auto">{children}</main>

          {/* Bottom Sidebar */}
          <footer className="bg-gray-800 p-4 col-span-2">
            <div>Bottom Sidebar</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
