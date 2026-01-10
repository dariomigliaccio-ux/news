'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Loader2, Globe, FileText, Video, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import type { MonthItem } from '@prisma/client';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState({
    title: '',
    subtitle: '',
    highlightedText: '',
    buttonLink: ''
  });
  const [months, setMonths] = useState<MonthItem[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      setBanner(data.banner || {
        title: 'País do Mês e Newsletter',
        subtitle: 'Assembly of God Bethlehem Ministry',
        highlightedText: 'Missão urgente',
        buttonLink: '#'
      });
      setMonths(data.months);
      setLoading(false);
    } catch {
      console.error('Error fetching admin data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBannerSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banner)
      });
      alert('Banner atualizado com sucesso!');
    } catch {
      alert('Erro ao salvar banner');
    }
    setSaving(false);
  };

  const handleMonthSave = async (monthIndex: number) => {
    setSaving(true);
    const monthData = months.find(m => m.monthIndex === monthIndex);
    try {
      await fetch('/api/admin/months', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(monthData)
      });
      alert(`Mês de ${monthData?.monthName} atualizado!`);
    } catch {
      alert('Erro ao salvar mês');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="text-blue-600" /> Painel Administrativo
          </h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">Ver site →</Link>
        </header>

        {/* Banner Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Configuração do Banner</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input 
                type="text" 
                value={banner.title} 
                onChange={(e) => setBanner({...banner, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
              <input 
                type="text" 
                value={banner.subtitle}
                onChange={(e) => setBanner({...banner, subtitle: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Destaque (Tag)</label>
              <input 
                type="text" 
                value={banner.highlightedText}
                onChange={(e) => setBanner({...banner, highlightedText: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Link do Botão (Seta)</label>
              <input 
                type="text" 
                value={banner.buttonLink}
                onChange={(e) => setBanner({...banner, buttonLink: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
          <button 
            onClick={handleBannerSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" /> Salvar Banner
          </button>
        </section>

        {/* Months Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Listagem Mensal</h2>
          {months.map((month, idx) => (
            <div key={month.monthIndex} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{month.monthName}</h3>
                <button 
                  onClick={() => {
                    const newMonths = [...months];
                    newMonths[idx].isActive = !newMonths[idx].isActive;
                    setMonths(newMonths);
                  }}
                  className={`flex items-center gap-1 text-sm ${month.isActive ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {month.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {month.isActive ? 'Ativo' : 'Inativo'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">País ou Países</label>
                  <input 
                    type="text" 
                    value={month.countries}
                    onChange={(e) => {
                      const newMonths = [...months];
                      newMonths[idx].countries = e.target.value;
                      setMonths(newMonths);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Video className="w-3 h-3" /> Link do Vídeo
                  </label>
                  <input 
                    type="text" 
                    value={month.videoLink || ''}
                    onChange={(e) => {
                      const newMonths = [...months];
                      newMonths[idx].videoLink = e.target.value;
                      setMonths(newMonths);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Link do PDF (Newsletter)
                  </label>
                  <input 
                    type="text" 
                    value={month.newsletterLink || ''}
                    onChange={(e) => {
                      const newMonths = [...months];
                      newMonths[idx].newsletterLink = e.target.value;
                      setMonths(newMonths);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => handleMonthSave(month.monthIndex)}
                  disabled={saving}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Save className="w-4 h-4" /> Salvar {month.monthName}
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
