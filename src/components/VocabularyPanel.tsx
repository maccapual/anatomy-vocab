import { useStore } from '../store/useStore';

export default function VocabularyPanel() {
  const { selectedBone, isPanelOpen, setIsPanelOpen, favorites, toggleFavorite, markAsLearned } = useStore();

  if (!selectedBone || !isPanelOpen) return null;

  const isFavorite = favorites.includes(selectedBone.id);

  const handleFavorite = () => {
    toggleFavorite(selectedBone.id);
  };

  const handleLearn = () => {
    markAsLearned(selectedBone.id);
  };

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(selectedBone.english);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider opacity-80">骨骼系统</span>
            <h2 className="text-2xl font-bold mt-1">{selectedBone.chinese}</h2>
          </div>
          <button
            onClick={() => setIsPanelOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6">
        {/* English & Pronunciation */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800">{selectedBone.english}</h3>
            <button
              onClick={playPronunciation}
              className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <p className="text-slate-500 font-mono text-sm">{selectedBone.pronunciation}</p>
        </div>

        {/* Roots Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            词根解析
          </h3>
          <div className="space-y-3">
            {selectedBone.roots.map((root, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    {root.root}
                  </span>
                  <span className="text-green-700 font-medium">= {root.meaning}</span>
                </div>
                {root.suffix && (
                  <p className="text-xs text-green-600 mt-1">
                    后缀: {root.suffix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Word Breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            词汇拆分
          </h3>
          <div className="bg-slate-800 text-white rounded-xl p-4 font-mono text-lg">
            {selectedBone.english.split('-').map((part, idx) => (
              <span key={idx}>
                <span className="text-yellow-400">
                  {part.match(/[a-zA-Z]+/)?.[0] || part}
                </span>
                {idx < selectedBone.english.split('-').length - 1 && (
                  <span className="text-pink-400">-</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Related Terms */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            相关词汇
          </h3>
          <div className="space-y-2">
            {selectedBone.relatedTerms.map((term, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span className="font-medium text-slate-800">{term.english}</span>
                <span className="text-slate-500 text-sm">{term.chinese}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
        <div className="flex gap-3">
          <button
            onClick={handleFavorite}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {isFavorite ? '已收藏' : '收藏'}
          </button>
          <button
            onClick={handleLearn}
            className="flex-1 py-3 px-4 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            已学会
          </button>
        </div>
      </div>
    </div>
  );
}
