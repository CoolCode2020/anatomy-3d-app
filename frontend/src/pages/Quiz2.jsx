import { useRef, useState, useEffect } from 'react';
import { useBoneModel } from '../models/boneModel';
import { handleBoneClick } from '../controllers/boneController';
import { ViewerCanvas } from '../components/ViewerCanvas';
import QuestionBox from '../components/QuestionBox';

export default function Quiz2Page() {
    const sceneRef = useRef();

    const {
        selectedBone,
        setSelectedBone,
        selectedMesh,
        setSelectedMesh
    } = useBoneModel();

    // ===== Visibility management state & helpers =====
    // Bones managed in the left tray: { id, name, hidden }
    const [managedBones, setManagedBones] = useState([]);

    // Cache for id -> THREE.Mesh to avoid repeated traversals
    const meshCacheRef = useRef(new Map());

    function getMeshById(id) {
        const cache = meshCacheRef.current;
        if (cache.has(id)) return cache.get(id);
        const root = sceneRef.current?.scene || sceneRef.current;
        if (!root) return null;
        let found = null;
        if (typeof root.getObjectByName === 'function') {
            found = root.getObjectByName(id, true);
        }
        if (!found && typeof root.traverse === 'function') {
            root.traverse((child) => {
                if (!found && child?.isMesh && child.name === id) found = child;
            });
        }
        if (found) cache.set(id, found);
        return found;
    }

    function setMeshVisibleById(id, visible) {
        const mesh = getMeshById(id);
        if (!mesh) return false;
        // If a bone is a Group with multiple meshes, switch to traversing children here.
        mesh.visible = visible;
        return true;
    }

    // ===== Isolation mode (hide everything not in the list) =====
    const [isIsolationOn, setIsIsolationOn] = useState(false);

    function forEachMesh(cb) {
        const root = sceneRef.current?.scene || sceneRef.current;
        if (!root) return;
        if (typeof root.traverse === 'function') {
            root.traverse((child) => {
                if (child?.isMesh) cb(child);
            });
        }
    }

    function restoreVisibilityFromState() {
        // Bones in the list follow their hidden flag; others visible
        const map = new Map(managedBones.map(b => [b.id, b.hidden]));
        forEachMesh((mesh) => {
            const hidden = map.get(mesh.name);
            mesh.visible = hidden === undefined ? true : !hidden;
        });
    }

    function isolateManaged() {
        // Only show bones that are in the list (respect hidden flag); hide all others
        const map = new Map(managedBones.map(b => [b.id, b.hidden]));
        forEachMesh((mesh) => {
            if (map.has(mesh.name)) {
                const hidden = map.get(mesh.name);
                mesh.visible = !hidden;
            } else {
                mesh.visible = false;
            }
        });
    }

    // Keep scene visibility in sync when list or isolation changes
    useEffect(() => {
        if (isIsolationOn) isolateManaged();
        else restoreVisibilityFromState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [managedBones, isIsolationOn]);

    // Popup state for bone info
    const [info, setInfo] = useState(null); // { id, name, latin_name, description }
    const [isOpen, setIsOpen] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [infoError, setInfoError] = useState(null);

    // Wrap selection click to also fetch info from backend by id (mesh name)
    const handleClickWithInfo = async (name, mesh) => {
        // keep existing selection/highlight
        handleBoneClick(name, setSelectedBone, mesh, setSelectedMesh);

        setLoadingInfo(true);
        setInfoError(null);
        try {
            const res = await fetch(`http://localhost:8080/bones/${encodeURIComponent(name)}`, {
                headers: { Accept: 'application/json' },
            });
            const text = await res.text();
            if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}: ${text.slice(0,200)}`);
            const data = JSON.parse(text);
            setInfo(data);
            setIsOpen(true);
        } catch (e) {
            setInfoError(e instanceof Error ? e : new Error(String(e)));
            setIsOpen(true); // show popup with error
        } finally {
            setLoadingInfo(false);
        }
    };

    return (
        <div className="w-full h-[calc(100vh-6rem)] relative">
            <ViewerCanvas
                onBoneClick={handleClickWithInfo}
                selectedMesh={selectedMesh}
                sceneRef={sceneRef}
                setSelectedBone={setSelectedBone}
                setSelectedMesh={setSelectedMesh}
            />
            {/* Left visibility tray */}
            <div className="absolute left-4 top-4 z-50 w-64 max-h-[80vh] overflow-auto bg-white/95 backdrop-blur border border-gray-200 shadow rounded">
                <div className="p-3 border-b flex items-center justify-between gap-2">
                    <span className="font-semibold">Sichtbarkeit</span>
                    <div className="flex items-center gap-2">
                        {isIsolationOn ? (
                            <button
                                className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                title="Alle anzeigen (Isolation aus)"
                                onClick={() => setIsIsolationOn(false)}
                            >
                                Alle anzeigen
                            </button>
                        ) : (
                            <button
                                className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                title="Nur Liste anzeigen (Isolation ein)"
                                onClick={() => setIsIsolationOn(true)}
                            >
                                Nur Liste anzeigen
                            </button>
                        )}
                    </div>
                </div>
                {managedBones.length === 0 ? (
                    <div className="p-3 text-sm text-gray-500">Mit ➕ im Popup Knochen hinzufügen.</div>
                ) : (
                    <ul className="divide-y">
                        {managedBones.map((b) => (
                            <li key={b.id} className="p-2 flex items-center gap-2">
                                <button
                                    className="w-8 h-8 rounded border hover:bg-gray-50"
                                    title={b.hidden ? 'Einblenden' : 'Ausblenden'}
                                    onClick={() => {
                                        const newHidden = !b.hidden;
                                        setManagedBones(prev => prev.map(x => x.id === b.id ? { ...x, hidden: newHidden } : x));
                                        setMeshVisibleById(b.id, !newHidden);
                                    }}
                                >
                                    {b.hidden ? '👁️‍🗨️' : '👁️'}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm truncate">{b.name || b.id}</div>
                                    <div className="text-[11px] text-gray-500 truncate">{b.id}</div>
                                </div>
                                <button
                                    className="w-8 h-8 rounded border hover:bg-gray-50"
                                    title="Aus Liste entfernen"
                                    onClick={() => {
                                        setManagedBones(prev => prev.filter(x => x.id !== b.id));
                                        setMeshVisibleById(b.id, true); // restore visibility when removed
                                    }}
                                >
                                    −
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {isOpen && (
                <div className="absolute top-4 right-4 max-w-md bg-white border border-gray-200 shadow-lg rounded p-4 z-50">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <div className="text-xs text-gray-500">Knochen</div>
                            <div className="font-semibold text-gray-900 mb-2 truncate">{info?.name || selectedBone || '—'}</div>
                            <div className="flex gap-2 mt-1">
                                <button
                                    className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                    onClick={() => {
                                        const id = (info?.id || selectedBone);
                                        const name = (info?.name || selectedBone);
                                        if (!id) return;
                                        setManagedBones((prev) => {
                                            if (prev.some(b => b.id === id)) return prev;
                                            return [...prev, { id, name, hidden: false }];
                                        });
                                    }}
                                >
                                    ➕ zur Liste
                                </button>
                                <button
                                    className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                    onClick={() => {
                                        const id = (info?.id || selectedBone);
                                        if (!id) return;
                                        setManagedBones((prev) => prev.filter(b => b.id !== id));
                                        setMeshVisibleById(id, true); // ensure visible when removed from list
                                    }}
                                >
                                    ➖ aus Liste
                                </button>
                            </div>
                            {loadingInfo && (
                                <div className="text-xs text-blue-600">Lade Informationen…</div>
                            )}
                            {infoError && (
                                <div className="text-xs text-red-600 break-words">Fehler: {String(infoError.message || infoError)}</div>
                            )}
                            {info && (
                                <>
                                    <div className="text-xs text-gray-500">Latein</div>
                                    <div className="mb-2 text-sm break-words">{info.latin_name || '—'}</div>
                                    <div className="text-xs text-gray-500">Beschreibung</div>
                                    <div className="text-sm leading-snug whitespace-pre-line break-words">
                                        {info.description && info.description.trim() !== '' ? info.description : '—'}
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            className="ml-auto text-gray-500 hover:text-gray-800"
                            onClick={() => setIsOpen(false)}
                            aria-label="Popup schließen"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
