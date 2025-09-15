import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  Heart,
  Clock,
  Music,
  Users,
  Disc,
  Radio,
  Headphones,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Library, label: "Your Library", path: "/library" },
];

const libraryItems = [
  { icon: Heart, label: "Liked Songs", path: "/library/liked" },
  { icon: Clock, label: "Recently Played", path: "/library/recent" },
  { icon: Disc, label: "Albums", path: "/library/albums" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col h-full glass-elevated"
    >
      {/* Logo/Brand */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 p-6"
      >
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary shadow-lg"
        >
          <Headphones className="w-6 h-6 text-white" />
        </motion.div>
        <span className="text-2xl font-bold gradient-text">Vibe Me</span>
      </motion.div>

      {/* Navigation */}
      <nav className="px-6 space-y-2">
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link to={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-4 h-12 transition-all duration-300 hover-lift ${
                    isActive 
                      ? 'bg-gradient-primary/20 text-primary shadow-lg glow-primary border border-primary/30' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-card-hover/80'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'animate-bounce-subtle' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-auto px-6 pb-6"
      >
        <Link to="/settings">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-foreground hover:bg-card-hover/80 transition-all duration-300 hover-lift"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};