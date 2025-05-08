import React, { useState, useRef, useEffect } from 'react';

const App = () => {
    const [activeTab, setActiveTab] = useState('reactie');
    const [acidVolume, setAcidVolume] = useState(5);
    const [baseVolume, setBaseVolume] = useState(5);
    const [isDropping, setIsDropping] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState("");
    const fileInputRef = useRef(null);
    const defaultPdfUrl = "./referat.pdf"; // Calea relativă corectă
    
    // La încărcarea componentei, setează PDF-ul predefinit
    useEffect(() => {
        // Vom afișa automat PDF-ul existent
        setPdfFile({ name: "referat.pdf", isDefault: true });
    }, []);
    
    // Definim reacțiile cu rapoartele stoichiometrice
    const reactions = [
        { 
            id: 1, 
            name: "HCl + NaOH", 
            formula: "HCl + NaOH → NaCl + H₂O",
            initialTemp: 22,
            finalTemp: 26,
            deltaT: 4,
            Q: 346.05,
            deltaH: -15043.32,
            ratio: 1, // raport 1:1 între acid și bază
            acidName: "HCl",
            baseName: "NaOH"
        },
        { 
            id: 2, 
            name: "H₂SO₄ + 2 NaOH", 
            formula: "H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O",
            initialTemp: 22,
            finalTemp: 27,
            deltaT: 5,
            Q: 470.87,
            deltaH: -18802.80,
            ratio: 0.5, // raport 1:2 între acid și bază (de două ori mai multă bază)
            acidName: "H₂SO₄",
            baseName: "NaOH"
        },
        { 
            id: 3, 
            name: "HCl + NH₄OH", 
            formula: "HCl + NH₄OH → NH₄Cl + H₂O",
            initialTemp: 22,
            finalTemp: 25,
            deltaT: 3,
            Q: 282.04,
            deltaH: -11283.60,
            ratio: 1, // raport 1:1 între acid și bază
            acidName: "HCl",
            baseName: "NH₄OH"
        }
    ];
    
    // Verifică dacă raportul dintre volumele de acid și bază este corect
    const isReactionBalanced = () => {
        if (!selectedReaction) return false;
        
        const reaction = reactions.find(r => r.id == selectedReaction);
        if (!reaction) return false;
        
        // Pentru o reacție echilibrată, acidVolume * ratio = baseVolume
        // Permitem o mică marjă de eroare (±0.5 ml)
        const expectedBaseVolume = acidVolume * (1/reaction.ratio);
        return Math.abs(expectedBaseVolume - baseVolume) <= 0.5;
    };
    
    // Date pentru tabel în funcție de reacția selectată
    const getExperimentData = () => {
        const selectedReactionObj = reactions.find(r => r.id == selectedReaction);
        if (!selectedReactionObj) return [];
        
        // Generează date pentru grafic bazate pe reacția selectată
        return [
            { id: 1, temperature: selectedReactionObj.initialTemp, time: 0, pH: 7.0 },
            { id: 2, temperature: selectedReactionObj.initialTemp + selectedReactionObj.deltaT * 0.2, time: 30, pH: 7.2 },
            { id: 3, temperature: selectedReactionObj.initialTemp + selectedReactionObj.deltaT * 0.5, time: 60, pH: 7.4 },
            { id: 4, temperature: selectedReactionObj.initialTemp + selectedReactionObj.deltaT * 0.8, time: 90, pH: 7.6 },
            { id: 5, temperature: selectedReactionObj.finalTemp, time: 120, pH: 7.0 }
        ];
    };
    
    const handleAddSolution = () => {
        if (!isReactionBalanced()) {
            alert("Volumele de acid și bază nu sunt în raportul corect pentru această reacție!");
            return;
        }
        
        setIsDropping(true);
        setTimeout(() => {
            setIsDropping(false);
            setActiveTab('date-experimentale');
        }, 2000);
    };
    
    const handleReactionChange = (e) => {
        const reactionId = e.target.value;
        setSelectedReaction(reactionId);
        
        // Resetăm volumele la valori implicite când se schimbă reacția
        setAcidVolume(5);
        setBaseVolume(5);
    };
    
    // Funcții pentru vizualizatorul PDF
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setPdfFile(selectedFile);
            setPdfError("");
        } else {
            setPdfFile(null);
            setPdfError("Selectați un fișier PDF valid!");
        }
    };
    
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    
    // Obține sursa pentru PDF (fie din fișierul încărcat, fie din cel predefinit)
    const getPdfSource = () => {
        if (!pdfFile) return null;
        if (pdfFile.isDefault) return defaultPdfUrl;
        return URL.createObjectURL(pdfFile);
    };
    
    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <h1 style={styles.title}>Izolare chimică</h1>
                <button style={styles.menuButton}>☰</button>
            </header>
            
            <div style={styles.content}>
                {/* Sidebar */}
                <div style={styles.sidebar}>
                    <div 
                        style={activeTab === 'reactie' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
                        onClick={() => setActiveTab('reactie')}
                    >
                        Reacție
                    </div>
                    <div 
                        style={activeTab === 'date-experimentale' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
                        onClick={() => setActiveTab('date-experimentale')}
                    >
                        Date Experimentale
                    </div>
                    <div 
                        style={activeTab === 'referat' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
                        onClick={() => setActiveTab('referat')}
                    >
                        Referat
                    </div>
                    <div 
                        style={activeTab === 'concluzii' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
                        onClick={() => setActiveTab('concluzii')}
                    >
                        Concluzii
                    </div>
                </div>
                
                {/* Main Content */}
                <div style={styles.main}>
                    {/* Reacție Tab */}
                    {activeTab === 'reactie' && (
                        <div style={styles.experimentContainer}>
                            <h2 style={styles.pageTitle}>Simulare Reacție Chimică</h2>
                            
                            {/* Experiment Area */}
                            <div style={styles.experimentArea}>
                                {/* Pipette */}
                                <div style={styles.pipette}>
                                    <div style={styles.pipetteHandle}></div>
                                    <div style={styles.pipetteBody}>
                                        <div style={{...styles.pipetteLiquid, height: `${acidVolume * 6}%`}}></div>
                                    </div>
                                    <div style={styles.pipetteTip}></div>
                                    {isDropping && <div style={styles.pipetteDrop}></div>}
                                </div>
                                
                                {/* Beakers */}
                                <div style={styles.beakerArea}>
                                    <div style={styles.petriDish}></div>
                                    <div style={styles.beaker}>
                                        <div style={{...styles.blueLiquid, height: `${baseVolume * 10}%`}}></div>
                                    </div>
                                </div>
                                
                                {/* Volume meters - îmbunătățite pentru aspect */}
                                <div style={styles.volumeMetersContainer}>
                                    {/* Acid Volume Meter */}
                                    <div style={styles.volumeMeter}>
                                        <div style={styles.volumeTube}>
                                            <div style={{...styles.volumeFill, backgroundColor: '#ff6b4a', height: `${acidVolume * 10}%`}}></div>
                                        </div>
                                        <div style={styles.volumeScaleContainer}>
                                            <div style={styles.volumeScale}>
                                                <span style={styles.scaleValue}>10</span>
                                                <span style={styles.scaleValue}>5</span>
                                                <span style={styles.scaleValue}>0</span>
                                            </div>
                                        </div>
                                        <div style={styles.volumeLabel}>Acid</div>
                                    </div>
                                    
                                    {/* Base Volume Meter */}
                                    <div style={styles.volumeMeter}>
                                        <div style={styles.volumeTube}>
                                            <div style={{...styles.volumeFill, backgroundColor: '#4e7df9', height: `${baseVolume * 10}%`}}></div>
                                        </div>
                                        <div style={styles.volumeScaleContainer}>
                                            <div style={styles.volumeScale}>
                                                <span style={styles.scaleValue}>10</span>
                                                <span style={styles.scaleValue}>5</span>
                                                <span style={styles.scaleValue}>0</span>
                                            </div>
                                        </div>
                                        <div style={styles.volumeLabel}>Bază</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Controls - Cu două slidere pentru volum */}
                            <div style={styles.controlsContainer}>
                                <div style={styles.controls}>
                                    <div style={styles.solutionSelect}>
                                        <label style={styles.label}>Reacție:</label>
                                        <select 
                                            style={styles.select}
                                            value={selectedReaction}
                                            onChange={handleReactionChange}
                                        >
                                            <option value="">Selectați o reacție</option>
                                            {reactions.map(reaction => (
                                                <option key={reaction.id} value={reaction.id}>
                                                    {reaction.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    {selectedReaction && (
                                        <>
                                            <div style={styles.volumesContainer}>
                                                <div style={styles.volumeControl}>
                                                    <label style={styles.label}>
                                                        {reactions.find(r => r.id == selectedReaction)?.acidName} (ml):
                                                    </label>
                                                    <input 
                                                        type="range"
                                                        min="0"
                                                        max="10"
                                                        step="0.5"
                                                        value={acidVolume}
                                                        onChange={(e) => setAcidVolume(parseFloat(e.target.value))}
                                                        style={styles.slider}
                                                    />
                                                    <span style={styles.volumeValue}>{acidVolume}</span>
                                                </div>
                                                
                                                <div style={styles.volumeControl}>
                                                    <label style={styles.label}>
                                                        {reactions.find(r => r.id == selectedReaction)?.baseName} (ml):
                                                    </label>
                                                    <input 
                                                        type="range"
                                                        min="0"
                                                        max="10"
                                                        step="0.5"
                                                        value={baseVolume}
                                                        onChange={(e) => setBaseVolume(parseFloat(e.target.value))}
                                                        style={styles.slider}
                                                    />
                                                    <span style={styles.volumeValue}>{baseVolume}</span>
                                                </div>
                                            </div>
                                            
                                            <div style={styles.balanceIndicator}>
                                                <div style={styles.indicatorLabel}>Raportul stoichiometric:</div>
                                                <div 
                                                    style={isReactionBalanced() ? 
                                                        styles.indicatorBalanced : 
                                                        styles.indicatorUnbalanced}
                                                >
                                                    {isReactionBalanced() ? "Corect" : "Incorect"}
                                                </div>
                                            </div>
                                            
                                            <div style={styles.balanceHint}>
                                                Reacția {reactions.find(r => r.id == selectedReaction)?.name} necesită un 
                                                raport de {reactions.find(r => r.id == selectedReaction)?.ratio === 1 ? 
                                                    "1:1" : 
                                                    reactions.find(r => r.id == selectedReaction)?.ratio === 0.5 ? 
                                                        "1:2" : 
                                                        `${reactions.find(r => r.id == selectedReaction)?.ratio}:1`
                                                } între acid și bază
                                            </div>
                                        </>
                                    )}
                                    
                                    <button 
                                        style={{
                                            ...styles.button,
                                            backgroundColor: !selectedReaction || !isReactionBalanced() ? '#aaa' : '#4e7df9'
                                        }}
                                        onClick={handleAddSolution}
                                        disabled={!selectedReaction || !isReactionBalanced()}
                                    >
                                        Adăugare probă
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Date Experimentale Tab */}
                    {activeTab === 'date-experimentale' && (
                        <div style={styles.dataSection}>
                            <h2 style={styles.sectionTitle}>Date Experimentale</h2>
                            <p>Rezultatele măsurătorilor efectuate pentru reacția {reactions.find(r => r.id == selectedReaction)?.name || "selectată"}</p>
                            
                            {/* Informații despre reacție */}
                            {selectedReaction && (
                                <div style={styles.reactionInfoBox}>
                                    <h3>Parametrii termochimici:</h3>
                                    <div style={styles.infoGrid}>
                                        <div style={styles.infoItem}>
                                            <span style={styles.infoLabel}>Temperatura inițială:</span>
                                            <span style={styles.infoValue}>{reactions.find(r => r.id == selectedReaction)?.initialTemp}°C</span>
                                        </div>
                                        <div style={styles.infoItem}>
                                            <span style={styles.infoLabel}>Temperatura finală:</span>
                                            <span style={styles.infoValue}>{reactions.find(r => r.id == selectedReaction)?.finalTemp}°C</span>
                                        </div>
                                        <div style={styles.infoItem}>
                                            <span style={styles.infoLabel}>ΔT:</span>
                                            <span style={styles.infoValue}>{reactions.find(r => r.id == selectedReaction)?.deltaT}°C</span>
                                        </div>
                                        <div style={styles.infoItem}>
                                            <span style={styles.infoLabel}>Q:</span>
                                            <span style={styles.infoValue}>{reactions.find(r => r.id == selectedReaction)?.Q} cal</span>
                                        </div>
                                        <div style={styles.infoItem}>
                                            <span style={styles.infoLabel}>ΔH:</span>
                                            <span style={styles.infoValue}>{reactions.find(r => r.id == selectedReaction)?.deltaH} cal</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Tabel */}
                            <div style={styles.tableContainer}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.tableHeader}>Timp (sec)</th>
                                            <th style={styles.tableHeader}>Temperatură (°C)</th>
                                            <th style={styles.tableHeader}>pH</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedReaction ? (
                                            getExperimentData().map(row => (
                                                <tr key={row.id}>
                                                    <td style={styles.tableCell}>{row.time}</td>
                                                    <td style={styles.tableCell}>{row.temperature}</td>
                                                    <td style={styles.tableCell}>{row.pH}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} style={styles.emptyTableMessage}>
                                                    Selectați o reacție pentru a vedea datele experimentale
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Grafic */}
                            {selectedReaction && (
                                <div style={styles.graphContainer}>
                                    <h3 style={styles.graphTitle}>Evoluția temperaturii în timp</h3>
                                    <div style={styles.graph}>
                                        <div style={styles.graphYaxis}>
                                            <span style={styles.graphLabel}>{reactions.find(r => r.id == selectedReaction)?.finalTemp + 1}°C</span>
                                            <span style={styles.graphLabel}>{reactions.find(r => r.id == selectedReaction)?.finalTemp}°C</span>
                                            <span style={styles.graphLabel}>{Math.round((reactions.find(r => r.id == selectedReaction)?.initialTemp + reactions.find(r => r.id == selectedReaction)?.finalTemp) / 2)}°C</span>
                                            <span style={styles.graphLabel}>{reactions.find(r => r.id == selectedReaction)?.initialTemp + 1}°C</span>
                                            <span style={styles.graphLabel}>{reactions.find(r => r.id == selectedReaction)?.initialTemp}°C</span>
                                        </div>
                                        <div style={styles.graphContent}>
                                            <div style={styles.plotLine}></div>
                                            <div style={{...styles.dataPoint, left: '0%', bottom: '0%'}}></div>
                                            <div style={{...styles.dataPoint, left: '25%', bottom: '20%'}}></div>
                                            <div style={{...styles.dataPoint, left: '50%', bottom: '50%'}}></div>
                                            <div style={{...styles.dataPoint, left: '75%', bottom: '80%'}}></div>
                                            <div style={{...styles.dataPoint, left: '100%', bottom: '100%'}}></div>
                                        </div>
                                        <div style={styles.graphXaxis}>
                                            <span style={styles.graphLabel}>0s</span>
                                            <span style={styles.graphLabel}>30s</span>
                                            <span style={styles.graphLabel}>60s</span>
                                            <span style={styles.graphLabel}>90s</span>
                                            <span style={styles.graphLabel}>120s</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Referat Section cu PDF Viewer */}
                    {activeTab === 'referat' && (
                        <div style={styles.referatSection}>
                            <h2 style={styles.sectionTitle}>Referat de Laborator</h2>
                            
                            <div style={styles.pdfUploadContainer}>
                                <h3>Referat PDF:</h3>
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="application/pdf"
                                    style={{ display: 'none' }}
                                />
                                <button 
                                    style={styles.pdfUploadButton} 
                                    onClick={handleUploadClick}
                                >
                                    Încarcă alt PDF
                                </button>
                                {pdfFile && (
                                    <div style={styles.pdfInfo}>
                                        <span style={styles.pdfFileName}>Fișier: {pdfFile.name}</span>
                                    </div>
                                )}
                                {pdfError && (
                                    <div style={styles.pdfError}>
                                        {pdfError}
                                    </div>
                                )}
                            </div>
                            
                            {pdfFile && (
                                <div style={styles.pdfViewerContainer}>
                                    <iframe 
                                        src={`${getPdfSource()}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH`}
                                        style={styles.pdfViewer}
                                        title="PDF Viewer"
                                        frameBorder="0"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Concluzii Section */}
                    {activeTab === 'concluzii' && (
                        <div style={styles.conclusionsSection}>
                            <h2 style={styles.sectionTitle}>Concluzii</h2>
                            <div style={styles.conclusionsContent}>
                                <p>Pe baza datelor experimentale colectate pentru reacția {reactions.find(r => r.id == selectedReaction)?.name || "[selectează o reacție]"}, se pot trage următoarele concluzii:</p>
                                <ul style={styles.list}>
                                    <li>Reacția este <strong>exotermă</strong>, după cum se observă din creșterea temperaturii.</li>
                                    <li>Valoarea pH-ului tinde spre neutru (pH 7) pe măsură ce reacția avansează.</li>
                                    <li>Viteza reacției este mai mare în primele 30 de secunde.</li>
                                    <li>Raportul stoichiometric între reactanți este esențial pentru desfășurarea corectă a reacției.</li>
                                </ul>
                                <div style={styles.conclusionBox}>
                                    <h4>Formula reacției:</h4>
                                    <p style={styles.formula}>{reactions.find(r => r.id == selectedReaction)?.formula || "Selectați o reacție pentru a vedea formula"}</p>
                                </div>
                                <div style={styles.conclusionBox}>
                                    <h4>Observații finale:</h4>
                                    <textarea 
                                        style={styles.textarea} 
                                        placeholder="Adaugă observațiile tale aici..."
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Stiluri îmbunătățite
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #eee',
    },
    title: {
        margin: 0,
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    },
    menuButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
    },
    content: {
        display: 'flex',
        flex: 1,
    },
    sidebar: {
        width: '200px',
        borderRight: '1px solid #eee',
        backgroundColor: '#f9f9f9',
    },
    sidebarItem: {
        padding: '15px 20px',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
    },
    activeItem: {
        backgroundColor: '#4e7df9',
        color: 'white',
        fontWeight: 'bold',
    },
    main: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
    },
    pageTitle: {
        fontSize: '22px',
        marginBottom: '20px',
        color: '#333',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
    experimentContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    experimentArea: {
        position: 'relative',
        height: '350px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    pipette: {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
    },
    pipetteHandle: {
        width: '80px',
        height: '20px',
        backgroundColor: '#888',
        borderRadius: '5px',
        margin: '0 auto',
    },
    pipetteBody: {
        width: '16px',
        height: '120px',
        backgroundColor: '#d0d0d0',
        margin: '0 auto',
        position: 'relative',
    },
    pipetteLiquid: {
        position: 'absolute',
        bottom: 0,
        width: '16px',
        backgroundColor: '#ff6b4a',
    },
    pipetteTip: {
        width: '8px',
        height: '30px',
        backgroundColor: '#d0d0d0',
        margin: '0 auto',
        clipPath: 'polygon(0 0, 100% 0, 75% 100%, 25% 100%)',
    },
    pipetteDrop: {
        width: '8px',
        height: '12px',
        backgroundColor: '#ff6b4a',
        borderRadius: '50%',
        position: 'absolute',
        bottom: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'dropFall 1s infinite',
    },
    beakerArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '80px',
    },
    petriDish: {
        width: '180px',
        height: '20px',
        border: '2px solid #ccc',
        borderRadius: '90px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    beaker: {
        width: '180px',
        height: '100px',
        borderLeft: '2px solid #ccc',
        borderRight: '2px solid #ccc',
        borderBottom: '2px solid #ccc',
        borderRadius: '0 0 10px 10px',
        position: 'relative',
        overflow: 'hidden',
    },
    blueLiquid: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#4e7df9',
    },
    volumeMetersContainer: {
        position: 'absolute',
        right: '50px',
        display: 'flex',
        gap: '40px',
    },
    volumeMeter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    volumeTube: {
        width: '20px',
        height: '200px',
        backgroundColor: 'white',
        border: '2px solid #999',
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden',
    },
    volumeFill: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        transition: 'height 0.3s',
    },
    // Stiluri noi pentru scala graduată îmbunătățită
    volumeScaleContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '200px',
    },
    volumeScale: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '200px',
        marginLeft: '5px',
        position: 'relative',
    },
    scaleValue: {
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: '14px',
        right: '-15px',
        transform: 'translateY(-50%)',
    },
    scaleValue: {
        '&:nth-child(1)': {
            top: '0%',
        },
        '&:nth-child(2)': {
            top: '50%',
        },
        '&:nth-child(3)': {
            top: '100%',
        },
    },
    volumeLabel: {
        marginTop: '10px',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
    },
    controlsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
    },
    controls: {
        maxWidth: '600px',
        width: '100%',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    volumesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '20px',
    },
    volumeControl: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        marginRight: '10px',
        minWidth: '100px',
        fontWeight: 'bold',
        color: '#555',
    },
    slider: {
        flex: 1,
        height: '10px',
        margin: '0 10px',
        appearance: 'none',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        outline: 'none',
    },
    volumeValue: {
        fontWeight: 'bold',
        minWidth: '30px',
        textAlign: 'right',
    },
    solutionSelect: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    select: {
        padding: '10px',
        flex: '1',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'pointer',
    },
    button: {
        padding: '12px 24px',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '100%',
        transition: 'background-color 0.3s',
    },
    balanceIndicator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
    },
    indicatorLabel: {
        fontWeight: 'bold',
    },
    indicatorBalanced: {
        fontWeight: 'bold',
        color: '#2ecc71',
    },
    indicatorUnbalanced: {
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    balanceHint: {
        fontSize: '13px',
        color: '#555',
        marginBottom: '20px',
        fontStyle: 'italic',
    },
    dataSection: {
        padding: '20px 0',
    },
    reactionInfoBox: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#555',
    },
    infoValue: {
        fontSize: '16px',
        color: '#333',
        marginTop: '5px',
    },
    tableContainer: {
        marginTop: '20px',
        marginBottom: '40px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    tableHeader: {
        padding: '12px 15px',
        backgroundColor: '#4e7df9',
        color: 'white',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: '10px 15px',
        borderBottom: '1px solid #eee',
    },
    emptyTableMessage: {
        padding: '20px',
        textAlign: 'center',
        color: '#777',
        fontStyle: 'italic',
    },
    graphContainer: {
        marginTop: '30px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    graphTitle: {
        fontSize: '16px',
        marginBottom: '15px',
        color: '#333',
    },
    graph: {
        display: 'flex',
        height: '300px',
        position: 'relative',
        border: '1px solid #ddd',
        padding: '20px',
        backgroundColor: '#fcfcfc',
    },
    graphYaxis: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: '10px',
        borderRight: '1px solid #999',
    },
    graphContent: {
        flex: 1,
        position: 'relative',
    },
    graphXaxis: {
        position: 'absolute',
        bottom: '-25px',
        left: '30px',
        right: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    graphLabel: {
        fontSize: '12px',
        color: '#555',
    },
    plotLine: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderBottom: '2px solid #999',
        background: 'linear-gradient(transparent, transparent), linear-gradient(to top right, transparent 0%, transparent calc(50% - 1px), #ccc 50%, transparent calc(50% + 1px), transparent 100%)',
    },
    dataPoint: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: '#ff6b4a',
        borderRadius: '50%',
        transform: 'translate(-50%, 50%)',
        transition: 'all 0.3s ease',
    },
    
    // Stiluri pentru Referat si PDF Viewer
    referatSection: {
        padding: '20px 0',
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
        borderBottom: '2px solid #4e7df9',
        paddingBottom: '8px',
    },
    referatContent: {
        lineHeight: '1.6',
    },
    list: {
        marginLeft: '20px',
        lineHeight: '1.8',
    },
    referatNotes: {
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderLeft: '4px solid #4e7df9',
    },
    pdfUploadContainer: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
    },
    pdfUploadButton: {
        padding: '10px 16px',
        backgroundColor: '#4e7df9',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    pdfInfo: {
        marginTop: '15px',
    },
    pdfFileName: {
        fontWeight: 'bold',
    },
    pdfError: {
        marginTop: '10px',
        color: '#e74c3c',
    },
    // Stiluri îmbunătățite pentru vizualizarea PDF
    pdfViewerContainer: {
        margin: '0',
        padding: '0',
        width: '100%',
        height: 'calc(100vh - 200px)',
        minHeight: '700px',
    },
    pdfViewer: {
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#fff',
    },
    
    // Stiluri pentru Concluzii
    conclusionsSection: {
        padding: '20px 0',
    },
    conclusionsContent: {
        lineHeight: '1.6',
    },
    conclusionBox: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    formula: {
        fontSize: '18px',
        fontFamily: 'monospace',
        padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        textAlign: 'center',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        resize: 'vertical',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
    },
};

// Adaugă stilul de animație pentru picătură și stil pentru scala volumetrică
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes dropFall {
    from { transform: translateX(-50%) translateY(0); opacity: 1; }
    to { transform: translateX(-50%) translateY(50px); opacity: 0; }
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4e7df9;
    cursor: pointer;
}

/* Styling pentru valorile numerice ale scalei volumetrice */
.volumeScale span:nth-child(1) {
    top: 0%;
}
.volumeScale span:nth-child(2) {
    top: 50%;
}
.volumeScale span:nth-child(3) {
    top: 100%;
}
`;
document.head.appendChild(styleSheet);

export default App;