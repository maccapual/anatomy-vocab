import Header from './components/Header';
import Skeleton3D from './components/Skeleton3D';
import VocabularyPanel from './components/VocabularyPanel';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="h-[calc(100vh-64px)]">
        <Skeleton3D />
      </main>
      <VocabularyPanel />
    </div>
  );
}

export default App;
