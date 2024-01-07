import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar/Sidebar";
import "./globals.css";
import Player from "@/components/Player/Player";
import { PlaylistContextProvider } from "./context/PlaylistContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Spotify Clone for Ynov",
};

export default function RootLayout({ children }) {
  return (
    <PlaylistContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <div className="flex p-2 gap-x-2 fixed top-[2px] w-screen">
              <Sidebar />
              <div className="overflow-y-auto flex flex-col h-[86vh] rounded-lg gap-y-3 bg-neutral-900 to-50% w-full">
                {children}
              </div>
            </div>
            <Player />
          </main>
        </body>
      </html>
    </PlaylistContextProvider>
  );
}
