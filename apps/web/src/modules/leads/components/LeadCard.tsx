import React from 'react';
import { LeadModel } from '../types';
import { getStatusColorMap } from '../utils';

interface LeadCardProps {
  lead: LeadModel;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, isActive, onClick }) => {
  return (
    <div 
      onClick={() => onClick(lead.id)}
      className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-50 border-indigo-200 shadow-sm ring-1 ring-indigo-500' 
          : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-slate-800">{lead.name}</h4>
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${getStatusColorMap(lead.status)}`}>
          {lead.status}
        </span>
      </div>
      <div className="text-sm text-slate-600 font-medium mb-1">📞 {lead.phone}</div>
      <div className="flex justify-between items-center text-xs text-slate-400 mt-3 border-t border-slate-50 pt-2">
        <span>🕒 {new Date(lead.createdAt).toLocaleDateString()}</span>
        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">{lead.source}</span>
      </div>
    </div>
  );
};
