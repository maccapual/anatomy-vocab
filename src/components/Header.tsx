import { useStore } from '../store/useStore';
import { bodySystems } from '../data/bones';

export default function Header() {
  const { currentSystem, setCurrentSystem, favorites, learnedBones } = useStore();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">AnatomyVocab</h1>
              <p className="text-xs text-slate-500">3D医学词汇学习</p>
            </div>
          </div>

          {/* System Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {bodySystems.slice(0, 4).map((system) => (
              <button
                key={system.id}
                onClick={() => setCurrentSystem(system.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentSystem === system.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="mr-2">{system.icon}</span>
                {system.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-slate-600">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{favorites.length}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{learnedBones.length}</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
