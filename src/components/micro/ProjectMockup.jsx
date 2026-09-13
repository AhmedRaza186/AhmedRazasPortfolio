import React from 'react';

export const ProjectMockup = ({ slug }) => {
  if (slug === 'user-management-system') {
    return (
      <div className="w-full h-full bg-[#111] flex flex-col overflow-hidden text-left relative group-hover:scale-105 transition-transform duration-700 ease-out">
        {/* macOS Top Bar */}
        <div className="h-[15%] min-h-[12px] w-full bg-[#222] border-b border-[#333] flex items-center px-[4%] gap-[3%]">
          <div className="w-[3%] max-w-[8px] aspect-square rounded-full bg-red-500"></div>
          <div className="w-[3%] max-w-[8px] aspect-square rounded-full bg-yellow-500"></div>
          <div className="w-[3%] max-w-[8px] aspect-square rounded-full bg-green-500"></div>
        </div>
        {/* Dashboard Body */}
        <div className="flex-1 flex w-full">
          {/* Sidebar */}
          <div className="w-[20%] h-full border-r border-[#333] pt-[8%] flex flex-col items-center gap-[10%] bg-[#1a1a1a]">
            <div className="w-[50%] aspect-square rounded-full bg-[#333]"></div>
            <div className="w-[60%] h-[4%] rounded-sm bg-[#333]"></div>
            <div className="w-[60%] h-[4%] rounded-sm bg-[#333]"></div>
          </div>
          {/* Main Content */}
          <div className="flex-1 p-[6%] flex flex-col gap-[8%]">
            <div className="w-[40%] h-[8%] rounded-sm bg-[var(--color-accent)] opacity-80"></div>
            <div className="w-full h-[1px] bg-[#333]"></div>
            {/* Table Rows */}
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-[4%] w-full">
                <div className="w-[10%] aspect-square rounded-full bg-[#444]"></div>
                <div className="w-[35%] h-[6px] rounded-sm bg-[#444]"></div>
                <div className="w-[20%] h-[6px] rounded-sm bg-[#444]"></div>
                <div className="w-[15%] h-[6px] rounded-sm bg-green-500 opacity-60 ml-auto"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-[var(--color-canvas)] mix-blend-color opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center font-display text-3xl text-[var(--color-canvas)] opacity-50 bg-[var(--color-text-secondary)]">
      {slug.substring(0, 2).toUpperCase()}
    </div>
  );
};
