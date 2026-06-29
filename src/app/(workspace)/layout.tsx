import React, { Suspense } from 'react';
import { DashboardProvider } from '@/context/DashboardContext';
import WorkspaceShellClient from './WorkspaceShellClient';
import { getCollections } from '@/lib/db/collections';

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const collections = await getCollections();

  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 font-mono">Loading workspace...</div>}>
      <DashboardProvider initialCollections={collections}>
        <WorkspaceShellClient>{children}</WorkspaceShellClient>
      </DashboardProvider>
    </Suspense>
  );
}

