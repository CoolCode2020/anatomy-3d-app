// frontend/src/pages/Quiz1.jsx
import { useRef, useEffect, useState } from 'react';
import { useBoneModel } from '../models/boneModel.js';
import { ViewerCanvas } from '../components/ViewerCanvas.jsx';
import QuestionboxMultipleChoice from '../components/QuestionboxMultipleChoice.jsx';

export default function Quiz1() {
  const sceneRef = useRef();

  const {
    setSelectedBone,
    selectedMesh,
    setSelectedMesh,
  } = useBoneModel();

  // --- Inline quiz state ---
  const [options, setOptions] = useState([]);
  const [correctBone, setCorrectBone] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  // Intro overlay state
  const [showIntro, setShowIntro] = useState(true);
  const [started, setStarted] = useState(false);

  const loadQuiz = async () => {
    setIsLoading(true);
    setError(null);
    setSelectedMesh(null);
    setSelectedBone(null);
    try {
      const res = await fetch('http://localhost:8080/bones/4randomQuiz', {
        headers: { Accept: 'application/json' },
      });

      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}: ${text.slice(0, 200)}`);
      }
      if (!contentType.includes('application/json')) {
        throw new Error(`Expected JSON but got '${contentType}'. Body: ${text.slice(0, 200)}`);
      }

      const data = JSON.parse(text);
      if (!Array.isArray(data.options) || typeof data.correctBone !== 'string') {
        throw new Error(`Malformed payload: ${text.slice(0, 200)}`);
      }

      setOptions(data.options);
      setCorrectBone(data.correctBone);
    setSelectedAnswer(null);
    
    // Find and highlight the correct bone by mesh name (case-insensitive)
    (function resolveAndHighlight() {
      const root = sceneRef.current?.scene || sceneRef.current;
      if (!root) {
        console.warn('[Quiz1] scene root not ready yet; retrying…');
        return setTimeout(resolveAndHighlight, 100);
      }

      // Prefer fast name lookup when available
      let target = typeof root.getObjectByName === 'function'
        ? root.getObjectByName(data.correctBone, true)
        : null;

      // Fallback: traverse and match case-insensitively
      if (!target && typeof root.traverse === 'function') {
        const want = String(data.correctBone).toLowerCase();
        root.traverse((child) => {
          if (!target && child?.isMesh && typeof child.name === 'string' && child.name.toLowerCase() === want) {
            target = child;
          }
        });
      }

      if (target) {
        console.log('[Quiz1] highlight →', target.name);
        setSelectedBone(target.name);
        setSelectedMesh(target);
      } else {
        console.warn(`[Quiz1] Mesh for bone "${data.correctBone}" not found; retrying…`);
        setTimeout(resolveAndHighlight, 150);
      }
    })();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  // initial load only after user starts
  useEffect(() => {
    if (started) {
      loadQuiz();
    }
  }, [started]);


  const answer = (ans) => {
    setSelectedAnswer(ans);
    if (ans === correctBone) setCorrectCount((c) => c + 1);
    else setWrongCount((w) => w + 1);

    // brief feedback window, then load a new quiz
    setTimeout(loadQuiz, 1000);
  };


  // Helper to make bone names nicer for display
  function formatBoneName(name) {
    if (!name) return '';
    return name
      .replace(/_/g, ' ') // replace underscores with spaces
      .replace(/\b\w/g, c => c.toUpperCase()); // capitalize words
  }

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* Left column: Quiz UI */}
      <div className="w-1/3 p-4 bg-white flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Counters */}
          <div className="mb-3 p-2 text-xs rounded border border-gray-200 bg-gray-50 flex items-center justify-between">
            <span>✅ Richtig: <strong>{correctCount}</strong></span>
            <span>❌ Falsch: <strong>{wrongCount}</strong></span>
          </div>

          {/* Inline banners */}
          {isLoading && (
            <div className="mb-3 p-2 text-xs rounded bg-blue-50 border border-blue-200">
              Lädt Quiz…
            </div>
          )}
          {error && (
            <div className="mb-3 p-2 text-xs rounded bg-red-50 border border-red-200">
              Fehler: {String(error.message || error)}
            </div>
          )}

          {/* Multiple choice box */}
          <QuestionboxMultipleChoice
            question="Welcher Knochen leuchtet?"
            answers={options.map(formatBoneName)}
            onAnswerSelected={(ans) => answer(options[options.map(formatBoneName).indexOf(ans)])}
            selectedAnswer={formatBoneName(selectedAnswer)}
            correctAnswer={formatBoneName(correctBone)}
          />
        </div>
      </div>

      {/* Right column: 3D Canvas (clicks disabled during quiz) */}
      <div className="w-2/3 h-full">
        <ViewerCanvas
          onBoneClick={() => { /* disabled for this quiz */ }}
          selectedMesh={selectedMesh}
          sceneRef={sceneRef}
          setSelectedBone={setSelectedBone}
          setSelectedMesh={setSelectedMesh}
          lockHighlight
        />
      </div>
      {showIntro && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-[90%] p-6">
            <h2 className="text-xl font-semibold mb-2">Knochen‑Quiz</h2>
            <p className="text-sm text-gray-700 mb-4">
              Ziel: Finde heraus, welcher Knochen im Modell hervorgehoben ist. Wähle die richtige Antwort aus vier Optionen.
            </p>
            <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
              <li>Der richtige Knochen leuchtet im 3D‑Skelett.</li>
              <li>Wähle in der Box links die korrekte Bezeichnung.</li>
              <li>Nach jeder Antwort startet automatisch die nächste Runde.</li>
            </ul>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => { setShowIntro(false); setStarted(true); }}
              >
                Los geht’s
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}