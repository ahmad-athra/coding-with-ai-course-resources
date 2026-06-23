'use client';

import React from 'react';
import { Search, Plus, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardPage() {
  return (
    <div className="dark bg-background text-foreground min-h-screen flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white shadow-md shadow-blue-500/10">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              DevStash
            </h1>
            <span className="text-[10px] text-zinc-500 font-mono block leading-none mt-0.5">
              Workspace
            </span>
          </div>
        </div>

        {/* Center Mock Search Box */}
        <div className="relative w-full max-w-md hidden sm:block mx-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search stash..." 
            className="pl-9 bg-muted/40 border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
            readOnly
          />
        </div>

        {/* Right Action Button */}
        <div className="flex items-center gap-3">
          {/* Mobile search icon button when search box is hidden */}
          <button className="sm:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors">
            <Search className="h-5 w-5" />
          </button>
          
          <Button className="bg-primary hover:bg-primary/95 text-primary-foreground font-medium rounded-lg flex items-center gap-2 cursor-pointer shadow-sm shadow-blue-500/5">
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">New Item</span>
          </Button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Placeholder Panel */}
        <aside className="hidden md:flex w-64 border-r border-border bg-card/30 p-6 flex-col gap-4 shrink-0">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
            Sidebar
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Placeholder for collections navigation, quick filters, and mock user profile metrics.
          </p>
        </aside>

        {/* Main Content Area Placeholder */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background/50">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Main
              </h2>
              <p className="text-sm text-muted-foreground">
                Welcome to your dashboard main workspace area.
              </p>
            </div>

            {/* Premium feature grid placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="border border-border/80 bg-card/40 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                <div className="h-2 w-12 bg-blue-500 rounded-full mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Stash Management
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Easily browse, update, tag, and copy items. Future phases will integrate the grid display of notes, prompts, snippets, files, images, and links here.
                </p>
              </div>

              <div className="border border-border/80 bg-card/40 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
                <div className="h-2 w-12 bg-purple-500 rounded-full mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Observability & DevTools
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Monitor logs, cache entries, dynamic theme parameters, and tenant identifiers. SRE-first dashboard integrations will be configured in this section.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
