import { useState, useRef } from 'react'
import GlassCard from '../components/Layout/GlassCard'
import useGameStore from '../store/useGameStore'

export default function Vault() {
  const vaultFiles = useGameStore(s => s.vaultFiles)
  const uploadFile = useGameStore(s => s.uploadFile)
  const deleteFile = useGameStore(s => s.deleteFile)
  const phaseColor = useGameStore(s => s.getPhaseColor())
  const [dragOver, setDragOver] = useState(false)
  const [viewFile, setViewFile] = useState(null)
  const fileRef = useRef(null)

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { alert('Max 10MB per file'); return }
      if (vaultFiles.length >= 50) { alert('Max 50 files'); return }
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadFile({ name: file.name, type: file.type, size: file.size, data: e.target.result })
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true) }

  const getIcon = (type) => {
    if (type?.includes('pdf')) return '📄'
    if (type?.includes('image')) return '🖼️'
    return '📎'
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="page-bg" style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Health Vault 🔒</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>End-to-end encrypted storage for medical records</p>
        </div>
        <div style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)', fontSize: 11, fontWeight: 600, color: '#00ff88', display: 'flex', alignItems: 'center', gap: 6 }}>
          🛡️ E2EE Protected
        </div>
      </div>

      {/* Upload Zone */}
      <div onClick={() => fileRef.current?.click()} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={() => setDragOver(false)}
        style={{ padding: 40, borderRadius: 16, border: `2px dashed ${dragOver ? phaseColor : 'rgba(255,255,255,0.12)'}`, background: dragOver ? `${phaseColor}08` : 'rgba(255,255,255,0.02)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: 24 }}
        role="button" aria-label="Upload files">
        <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Drop files here or click to upload</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>PDF, JPG, PNG • Max 10MB • {vaultFiles.length}/50 files</div>
        <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
      </div>

      {/* File Grid */}
      {vaultFiles.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {vaultFiles.map(file => (
            <GlassCard key={file.id} className="glass-card-hover" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{getIcon(file.type)}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(file.type?.includes('image') || file.type?.includes('pdf')) && (
                    <button onClick={() => setViewFile(file)} aria-label="View file" style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👁</button>
                  )}
                  <button onClick={() => { if (confirm('Delete this file?')) deleteFile(file.id) }} aria-label="Delete file" style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,83,51,0.08)', border: '1px solid rgba(255,83,51,0.2)', color: '#ff5533', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                <span>{formatSize(file.size)}</span>
                <span style={{ color: '#00ff88' }}>🔒 Encrypted</span>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.25)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗄️</div>
          <p>No files yet. Upload medical records, prescriptions, or diet plans.</p>
        </div>
      )}

      {/* Viewer Modal */}
      {viewFile && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setViewFile(null)}>
          <div style={{ maxWidth: 800, maxHeight: '85vh', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setViewFile(null)} style={{ position: 'absolute', top: -40, right: 0, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 18, width: 36, height: 36, borderRadius: 10, cursor: 'pointer' }}>✕</button>
            {viewFile.type?.includes('image') && <img src={viewFile.data} alt={viewFile.name} style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12 }} />}
            {viewFile.type?.includes('pdf') && <iframe src={viewFile.data} title={viewFile.name} style={{ width: 700, height: '80vh', borderRadius: 12, border: 'none' }} />}
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{viewFile.name}</div>
          </div>
        </div>
      )}
    </div>
  )
}
