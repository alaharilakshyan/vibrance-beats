import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { NowPlayingBar } from "./NowPlayingBar";

export const AppLayout = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      {/* Main layout grid */}
      <div className="grid grid-cols-[240px_1fr] grid-rows-[1fr_90px] h-full">
        {/* Sidebar */}
        <div className="row-span-2 bg-background-elevated border-r border-border">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="overflow-auto bg-gradient-surface">
          <Outlet />
        </main>

        {/* Now Playing Bar */}
        <div className="bg-player-background backdrop-blur-xl border-t border-player-border">
          <NowPlayingBar />
        </div>
      </div>
    </div>
  );
};