import { CalendarView } from '@/components/Calendar/CalendarView';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Calendar Component</h1>
        </div>
        <CalendarView />
      </div>
    </main>
  );
}
