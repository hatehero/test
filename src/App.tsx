import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  Camera,
  ImagePlus,
  Upload,
  Trash2,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Info,
  Sparkles,
  LayoutTemplate,
  Copy,
  ChevronDown,
  Loader2,
  Zap,
  Check,
  Clock
} from 'lucide-react';

/**
 * @typedef {'ready' | 'processing' | 'success' | 'error' | 'stopped'} ItemStatus
 * @typedef {'info' | 'success' | 'warning' | 'error'} NoticeType
 * @typedef {{ id: string, name: string, type: 'hijab' | 'freeHair', emoji: string, image: string, description: string }} WorkerReference
 * @typedef {{ mimeType: string, data: string }} InlineImage
 * @typedef {{ text?: string, inlineData?: InlineImage }} ModelPart
 * @typedef {{
 * id: string,
 * name: string,
 * base64: string,
 * mimeType: string,
 * originalUrl: string,
 * reviewStyle: string,
 * status: ItemStatus,
 * prompt: string,
 * resultUrl: string | null,
 * resultBase64?: string,
 * resultMimeType?: string,
 * error: string | null,
 * outfitId: string | null,
 * worker1Id?: string,
 * worker2Id?: string
 * }} GeneratedItem
 * @typedef {{ text: string, type: NoticeType }} Notice
 * @typedef {{ preserveExisting?: boolean, retryMessage?: string }} ProcessOptions
 * @typedef {{
 * imageBase64: string,
 * mimeType: string,
 * reviewStyle: string,
 * batchSeed: number,
 * imageIndex: number,
 * signal: AbortSignal,
 * worker1Id: string,
 * worker2Id: string
 * }} EngineOptions
 */

// ==========================================
// CSS STYLES — WARM LIME SPATIAL 3D SYSTEM
// ==========================================
const styles = `
:root {
  color-scheme: dark;
  --warm-lime: #CFFF74;
  --warm-lime-2: #B8F05D;
  --warm-lime-soft: rgba(207,255,116,.14);
  --olive-ink: #2F3A1D;
  --olive-deep: #151B0D;
  --olive-black: #0D1108;
  --cream: #F4F6EA;
  --cream-2: #E6EBD8;
  --bg-main: var(--olive-deep);
  --bg-glass: rgba(47,58,29,.72);
  --border-glass: rgba(207,255,116,.18);
  --shadow-glass: 0 28px 90px rgba(7,10,4,.48), 0 8px 0 rgba(13,17,8,.72);
  --text-primary: #F7F9EF;
  --text-secondary: #D9DFC9;
  --text-muted: #9EA98A;
  --gold-primary: var(--warm-lime);
  --gold-light: #E0FF9F;
  --gold-dark: #A7DC4E;
  --success: #CFFF74;
  --danger: #FF7A80;
  --warning: #FFD36E;
  --violet: var(--warm-lime);
  --blue: var(--warm-lime);
  --blue-soft: var(--warm-lime-soft);
  --fill: rgba(244,246,234,.07);
  --fill-strong: rgba(244,246,234,.12);
  --separator: rgba(207,255,116,.16);
  --specular: rgba(255,255,255,.13);
  --radius-lg: 30px;
  --radius-md: 20px;
  --radius-sm: 13px;
  --ease: 320ms cubic-bezier(.2,.8,.2,1);
  --spring: 620ms cubic-bezier(.16,1,.3,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body, html, #root, .app, .page-shell {
  width: 100%;
  min-height: 100dvh;
  background: var(--bg-main) !important;
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body { overflow-x: hidden; }

.glass {
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  box-shadow: var(--shadow-glass);
  border-radius: var(--radius-lg);
}

.glass-card {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius-md);
  transition: all var(--ease);
}
.glass-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); }

button, input, select, textarea { font: inherit; color: inherit; }
button { border: none; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
button:disabled { cursor: not-allowed; opacity: 0.5; }
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

::selection { background: var(--violet); color: white; }
:focus-visible { outline: 2px solid var(--violet); outline-offset: 2px; }

/* TOPBAR */
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 68px;
  background: rgba(8,12,20,0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
}
.topbar-inner {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand-mark {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2A2F3A, #161B22);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-light);
  font-weight: 700;
  font-size: 14px;
}
.brand-text-group { display: flex; align-items: center; gap: 8px; }
.brand-name { font-size: 15px; font-weight: 600; letter-spacing: 0.02em; }
.brand-badge {
  font-size: 10px; font-weight: 700; padding: 2px 8px;
  border-radius: 99px;
  background: rgba(232,190,96,0.15);
  color: var(--gold-primary);
  border: 1px solid rgba(232,190,96,0.25);
  text-transform: uppercase;
}
.brand-subtitle { font-size: 12px; color: var(--text-muted); padding-left: 10px; border-left: 1px solid var(--border-glass); }
.btn-reset {
  display: flex; align-items: center; gap: 6px; padding: 6px 14px;
  font-size: 13px; font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--ease);
  background: rgba(255,255,255,0.03);
  border: 1px solid transparent;
}
.btn-reset:hover { background: rgba(255,255,255,0.06); color: var(--text-primary); border-color: var(--border-glass); }

/* MAIN */
.main-container { width: 100%; max-width: 1440px; margin: 0 auto; padding: 32px 24px 80px; }
.hero { margin-bottom: 40px; max-width: 700px; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600; color: var(--violet);
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-bottom: 12px;
}
.hero h1 { font-size: 32px; font-weight: 600; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 12px; }
.hero-highlight { color: var(--gold-primary); }
.hero-subtitle { font-size: 15px; color: var(--text-secondary); line-height: 1.6; max-width: 600px; }
.hero-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--text-muted);
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-glass);
  padding: 4px 12px; border-radius: 99px;
  backdrop-filter: blur(4px);
}

.workspace { display: grid; grid-template-columns: minmax(360px, 420px) minmax(0, 1fr); gap: 28px; align-items: start; }

.panel {
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-glass);
}
.panel-inner { padding: 24px; display: flex; flex-direction: column; gap: 24px; }
.panel-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 8px; }
.panel-title-group { display: flex; gap: 12px; }
.badge-num {
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 600; color: var(--gold-light);
  border: 1px solid rgba(232,190,96,0.3);
  border-radius: 8px;
  background: rgba(232,190,96,0.06);
  flex-shrink: 0;
}
.panel-title { font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
.panel-desc { font-size: 13px; color: var(--text-muted); }

/* UPLOAD */
.upload-zone {
  position: relative; min-height: 160px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 24px;
  background: rgba(255,255,255,0.02);
  border: 1.5px dashed rgba(255,255,255,0.08);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--ease);
}
.upload-zone:hover, .upload-zone.dragging {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.18);
}
.upload-icon { color: var(--text-muted); margin-bottom: 12px; }
.upload-title { font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 4px; }
.upload-hint { font-size: 12px; color: var(--text-muted); }

.upload-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; }
.upload-item { display: flex; flex-direction: column; gap: 8px; animation: slideUpFade 0.3s ease backwards; }
.upload-thumb-wrap {
  position: relative; width: 100%; aspect-ratio: 1/1;
  border-radius: var(--radius-sm); overflow: hidden;
  background: #000; border: 1px solid var(--border-glass);
}
.upload-thumb-wrap img { width: 100%; height: 100%; object-fit: cover; }
.upload-idx {
  position: absolute; top: 4px; left: 4px;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  color: #fff; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px;
}
.btn-remove-upload {
  position: absolute; top: 4px; right: 4px;
  width: 24px; height: 24px;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  color: var(--text-secondary); border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: all var(--ease);
}
.upload-item:hover .btn-remove-upload { opacity: 1; }
.btn-remove-upload:hover { color: var(--danger); }

.upload-style-select {
  width: 100%; height: 32px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 11px; padding: 0 20px 0 8px;
  appearance: none; cursor: pointer;
}
.upload-style-select:focus { border-color: var(--violet); outline: none; }

.upload-actions { display: flex; align-items: center; justify-content: flex-end; margin-top: 8px; }
.btn-clear-all { font-size: 12px; color: var(--text-muted); padding: 6px 12px; border-radius: 6px; transition: all var(--ease); }
.btn-clear-all:hover { color: var(--danger); background: rgba(255,107,129,0.08); }

.action-area { margin-top: 16px; display: flex; flex-direction: column; gap: 12px; }
.btn-generate {
  width: 100%; height: 50px;
  background: linear-gradient(135deg, var(--gold-dark), #A67B2A);
  color: white; font-size: 14px; font-weight: 600;
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all var(--ease);
  box-shadow: 0 4px 16px rgba(184, 137, 50, 0.25);
}
.btn-generate:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
.btn-generate:disabled { background: rgba(255,255,255,0.06); color: var(--text-muted); box-shadow: none; }
.btn-stop {
  width: 100%; height: 42px;
  background: rgba(255,107,129,0.08);
  border: 1px solid rgba(255,107,129,0.2);
  color: var(--danger);
  font-size: 13px; font-weight: 500;
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all var(--ease);
}
.btn-stop:hover { background: rgba(255,107,129,0.15); border-color: var(--danger); }

.notice {
  margin-top: 16px; padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  display: flex; align-items: flex-start; gap: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-glass);
  color: var(--text-secondary);
  animation: slideUpFade 0.3s ease;
}

/* REFERENCE PANEL (MODERN) */
.ref-panel {
  background: rgba(255,255,255,0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-glass);
  padding: 16px;
  margin-top: 24px;
}
.ref-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.ref-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.ref-status {
  font-size: 10px; font-weight: 600; color: var(--success);
  background: rgba(66,214,154,0.12);
  padding: 2px 10px; border-radius: 99px;
  text-transform: uppercase;
}
.ref-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ref-card {
  display: flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,0.03);
  padding: 10px 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-glass);
  transition: all var(--ease);
}
.ref-card:hover { background: rgba(255,255,255,0.06); }
.ref-thumb { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-glass); flex-shrink: 0; }
.ref-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.ref-name { font-size: 12px; font-weight: 500; color: var(--text-primary); }
.ref-role { font-size: 10px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; }
.ref-role::before { content: ''; width: 6px; height: 6px; background: var(--success); border-radius: 50%; display: inline-block; }
.ref-select {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 11px;
  padding: 2px 8px;
  cursor: pointer;
  outline: none;
}
.ref-select:focus { border-color: var(--violet); }

/* PROGRESS + TIMER */
.progress-container { margin-bottom: 24px; padding: 16px; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); }
.progress-top { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; }
.progress-label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.progress-pct { font-size: 20px; font-weight: 600; color: var(--text-primary); font-variant-numeric: tabular-nums; }
.progress-track { width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--gold-primary); transition: width 0.4s ease; }
.progress-fill.done { background: var(--success); }
.progress-bottom {
  display: flex; justify-content: space-between; margin-top: 10px;
  font-size: 12px; color: var(--text-muted);
}
.progress-timer {
  display: flex; align-items: center; gap: 6px;
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  color: var(--text-secondary);
  background: rgba(255,255,255,0.03);
  padding: 2px 10px; border-radius: 99px;
  border: 1px solid var(--border-glass);
}

/* RESULTS */
.result-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; align-items: start; }
.result-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex; flex-direction: column;
  transition: all var(--ease);
}
.result-card:hover { border-color: rgba(255,255,255,0.12); }
.rc-image-wrap { position: relative; width: 100%; aspect-ratio: 9/16; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; cursor: zoom-in; }
.rc-image-wrap img { width: 100%; height: 100%; object-fit: contain; image-rendering: auto; -webkit-optimize-contrast: auto; backface-visibility: hidden; transform: translateZ(0); }

.preview-lightbox {
  position: fixed;
  inset: 0;
  z-index: 180;
  background: rgba(6, 8, 4, .86);
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}
.preview-panel {
  width: min(96vw, 1320px);
  height: min(94vh, 940px);
  border-radius: 24px;
  border: 1px solid rgba(207,255,116,.18);
  background: rgba(16, 22, 10, .84);
  box-shadow: 0 24px 90px rgba(0,0,0,.52);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
}
.preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(207,255,116,.12);
  background: rgba(244,246,234,.04);
}
.preview-title {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.preview-title strong {
  font-size: 14px;
  color: var(--cream);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.preview-title span {
  font-size: 12px;
  color: var(--text-muted);
}
.preview-tools {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.preview-btn {
  min-height: 40px;
  min-width: 40px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(207,255,116,.16);
  background: rgba(244,246,234,.06);
  color: var(--cream);
  font-weight: 650;
  cursor: pointer;
}
.preview-btn:hover { background: rgba(244,246,234,.1); }
.preview-scale {
  min-width: 62px;
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
}
.preview-stage {
  overflow: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  background:
    linear-gradient(45deg, rgba(255,255,255,.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.02) 75%),
    linear-gradient(45deg, rgba(255,255,255,.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.02) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
.preview-stage img {
  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
  object-fit: contain;
  image-rendering: auto;
  -webkit-optimize-contrast: auto;
  transform-origin: top center;
  box-shadow: 0 20px 50px rgba(0,0,0,.45);
  border-radius: 16px;
  user-select: none;
  -webkit-user-drag: none;
}
@media (max-width: 720px) {
  .preview-panel { width: 100vw; height: 100dvh; border-radius: 0; }
  .preview-toolbar { padding: 12px; }
  .preview-tools { gap: 6px; }
  .preview-btn { min-height: 38px; min-width: 38px; padding: 0 10px; }
  .preview-stage { padding: 14px; }
}

.rc-status-badge {
  position: absolute; top: 12px; left: 12px; z-index: 10;
  padding: 4px 10px; border-radius: 99px;
  font-size: 11px; font-weight: 500;
  background: rgba(16,23,34,0.75); backdrop-filter: blur(4px);
  border: 1px solid var(--border-glass);
  display: flex; align-items: center; gap: 6px;
  color: var(--text-secondary);
}
.rc-badge-success { color: var(--success); border-color: rgba(66,214,154,0.2); }
.rc-badge-error { color: var(--danger); border-color: rgba(255,107,129,0.2); }
.rc-state-overlay {
  position: absolute; inset: 0;
  background: rgba(8,12,20,0.75); backdrop-filter: blur(4px);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  color: var(--text-secondary); font-size: 13px; font-weight: 500; z-index: 5;
}
.spinner { animation: spinFast 1s linear infinite; }
.rc-content { padding: 16px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.rc-meta { display: flex; flex-direction: column; gap: 2px; }
.rc-filename { font-size: 13px; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rc-outfit { font-size: 11px; color: var(--text-muted); }
.rc-error { font-size: 12px; color: var(--danger); line-height: 1.4; }
.rc-actions { display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; margin-top: auto; }
.rc-btn {
  height: 36px; padding: 0 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass);
  color: var(--text-secondary);
  transition: all var(--ease);
}
.rc-btn:hover:not(:disabled) { background: rgba(255,255,255,0.06); color: var(--text-primary); }
.rc-btn-icon { width: 36px; padding: 0; }
.rc-btn-icon:hover:not(:disabled) { color: var(--danger); border-color: rgba(255,107,129,0.2); }

.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 64px 24px;
  color: var(--text-muted);
  border: 1.5px dashed var(--border-glass);
  border-radius: var(--radius-md);
}
.empty-state svg { margin-bottom: 16px; opacity: 0.4; }
.empty-state h3 { font-size: 15px; color: var(--text-primary); margin-bottom: 8px; font-weight: 500; }
.empty-state p { font-size: 13px; max-width: 300px; }

.prompts-container { margin-top: 32px; border-top: 1px solid var(--border-glass); padding-top: 24px; }
.prompts-details summary { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; user-select: none; list-style: none; }
.prompts-details summary::-webkit-details-marker { display: none; }
.prompts-details summary:hover { color: var(--text-primary); }
.prompts-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; margin-top: 16px; }
.prompts-content {
  background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: var(--radius-sm);
  padding: 16px; max-height: 400px; overflow-y: auto;
  font-family: ui-monospace, monospace; font-size: 12px; line-height: 1.6;
  color: var(--text-muted); white-space: pre-wrap; word-break: break-word;
}
.btn-copy { display: flex; align-items: center; gap: 6px; padding: 6px 12px; font-size: 11px; font-weight: 500; background: rgba(255,255,255,0.03); color: var(--text-secondary); border: 1px solid var(--border-glass); border-radius: 6px; transition: all var(--ease); }
.btn-copy:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.12); }

/* WARM LIME SPATIAL 3D — FINAL ART DIRECTION */
.app {
  background:
    linear-gradient(rgba(207,255,116,.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(207,255,116,.026) 1px, transparent 1px),
    radial-gradient(ellipse 62% 48% at 14% 0%, rgba(207,255,116,.16), transparent 72%),
    radial-gradient(ellipse 50% 38% at 92% 22%, rgba(116,145,63,.17), transparent 72%),
    var(--olive-deep) !important;
  background-size: 40px 40px, 40px 40px, auto, auto, auto;
}
.app::before {
  width: 540px;
  height: 540px;
  left: -350px;
  top: 20%;
  background: radial-gradient(circle, rgba(207,255,116,.2), transparent 69%);
  animation: limeDrift 14s ease-in-out infinite alternate;
}
.app::after {
  width: 620px;
  height: 620px;
  right: -420px;
  top: 54%;
  background: radial-gradient(circle, rgba(207,255,116,.13), transparent 70%);
  animation: limeDrift 18s ease-in-out -7s infinite alternate-reverse;
}
::selection { color: var(--olive-black); background: var(--warm-lime); }
:focus-visible { outline: 3px solid var(--warm-lime); outline-offset: 3px; }

.topbar {
  height: 76px;
  background: rgba(21,27,13,.8);
  border-bottom: 1px solid rgba(207,255,116,.16);
  box-shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 18px 45px rgba(5,8,3,.14);
  backdrop-filter: blur(24px) saturate(125%);
  -webkit-backdrop-filter: blur(24px) saturate(125%);
}
.topbar.scrolled {
  background: rgba(21,27,13,.94);
  box-shadow: 0 1px 0 rgba(207,255,116,.2) inset, 0 18px 50px rgba(5,8,3,.38);
}
.topbar-inner { max-width: 1520px; padding: 0 34px; }
.brand-mark {
  width: 42px;
  height: 42px;
  color: var(--olive-black);
  background: linear-gradient(145deg, #E5FFAA 0%, var(--warm-lime) 48%, #A9DD4E 100%);
  border: 1px solid rgba(255,255,255,.46);
  border-radius: 13px 13px 16px 13px;
  box-shadow: 0 6px 0 #7FA537, 0 12px 25px rgba(207,255,116,.16), inset 0 1px 0 rgba(255,255,255,.7);
  transform: translateY(-2px) rotate(-3deg);
  transition: transform var(--spring), box-shadow var(--ease);
}
.brand:hover .brand-mark { transform: translateY(-4px) rotate(2deg) scale(1.04); box-shadow: 0 8px 0 #7FA537, 0 18px 32px rgba(207,255,116,.2), inset 0 1px 0 rgba(255,255,255,.72); }
.brand-mark::after { inset: 2px 7px auto; height: 40%; background: linear-gradient(rgba(255,255,255,.58), transparent); }
.brand-name { color: var(--cream); font-weight: 760; letter-spacing: -.025em; }
.brand-badge {
  color: var(--olive-black);
  background: var(--warm-lime);
  border-color: rgba(255,255,255,.35);
  box-shadow: 0 3px 0 #7FA537;
}
.brand-subtitle { color: var(--text-muted); border-color: rgba(207,255,116,.16); }
.btn-reset {
  min-height: 42px;
  color: var(--cream);
  background: rgba(244,246,234,.07);
  border: 1px solid rgba(207,255,116,.16);
  box-shadow: 0 4px 0 var(--olive-black), inset 0 1px 0 rgba(255,255,255,.09);
}
.btn-reset:hover { color: var(--warm-lime); background: rgba(207,255,116,.1); border-color: rgba(207,255,116,.34); transform: translateY(-2px); box-shadow: 0 6px 0 var(--olive-black), inset 0 1px 0 rgba(255,255,255,.1); }
.btn-reset:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--olive-black); }

.main-container { max-width: 1520px; padding: 62px 34px 124px; }
.hero {
  display: grid;
  grid-template-columns: minmax(0,1.05fr) minmax(360px,.95fr);
  align-items: center;
  gap: clamp(34px,6vw,90px);
  max-width: 1320px;
  min-height: 480px;
  margin: 0 auto 58px;
  text-align: left;
}
.hero-copy { position: relative; z-index: 2; }
.hero-eyebrow {
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 8px 13px;
  color: var(--warm-lime);
  background: rgba(207,255,116,.09);
  border-color: rgba(207,255,116,.22);
  box-shadow: 0 5px 0 rgba(13,17,8,.65), inset 0 1px 0 rgba(255,255,255,.08);
}
.hero h1 {
  max-width: 720px;
  margin: 0 0 20px;
  color: var(--cream);
  font-size: clamp(48px,6vw,82px);
  line-height: .93;
  font-weight: 820;
  letter-spacing: -.065em;
}
.hero-highlight {
  color: var(--warm-lime);
  background: none;
  -webkit-text-fill-color: initial;
  filter: drop-shadow(0 8px 22px rgba(207,255,116,.14));
}
.hero-subtitle { max-width: 590px; margin: 0; color: var(--text-secondary); font-size: 17px; }
.hero-badges { justify-content: flex-start; margin-top: 26px; }
.hero-badge {
  color: var(--cream-2);
  background: rgba(47,58,29,.78);
  border: 1px solid rgba(207,255,116,.15);
  box-shadow: 0 5px 0 rgba(13,17,8,.62), inset 0 1px 0 rgba(255,255,255,.06);
}
.hero-badge svg { color: var(--warm-lime); }

.hero-spatial {
  position: relative;
  min-height: 440px;
  perspective: 1100px;
  transform-style: preserve-3d;
}
.spatial-stage {
  position: absolute;
  inset: 24px 18px 30px;
  border: 1px solid rgba(207,255,116,.19);
  border-radius: 46px;
  background:
    linear-gradient(145deg, rgba(207,255,116,.1), transparent 38%),
    linear-gradient(160deg, rgba(47,58,29,.96), rgba(21,27,13,.92));
  box-shadow: 0 26px 0 rgba(13,17,8,.7), 0 55px 110px rgba(6,8,3,.38), inset 0 1px 0 rgba(255,255,255,.1);
  transform: rotateY(-9deg) rotateX(4deg);
  transform-style: preserve-3d;
  animation: stageFloat 7s ease-in-out infinite;
  overflow: hidden;
}
.spatial-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(207,255,116,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(207,255,116,.035) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, #000, transparent 88%);
  -webkit-mask-image: linear-gradient(to bottom, #000, transparent 88%);
}
.spatial-stage::after {
  content: '';
  position: absolute;
  width: 260px;
  height: 260px;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(207,255,116,.23), transparent 66%);
  transform: translate(-50%,-50%);
  filter: blur(8px);
}
.spatial-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 260px;
  height: 260px;
  border: 1px solid rgba(207,255,116,.3);
  border-radius: 50%;
  transform: translate(-50%,-50%) rotateX(68deg) rotateZ(12deg);
  box-shadow: 0 0 38px rgba(207,255,116,.08), inset 0 0 38px rgba(207,255,116,.05);
  animation: ringSpin 12s linear infinite;
}
.spatial-ring::before,
.spatial-ring::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--warm-lime);
  box-shadow: 0 0 24px rgba(207,255,116,.8);
}
.spatial-ring::before { left: 18px; top: 42px; }
.spatial-ring::after { right: 22px; bottom: 37px; }
.spatial-core {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 112px;
  height: 112px;
  color: var(--olive-black);
  border-radius: 32px;
  background: linear-gradient(145deg, #EBFFBD, var(--warm-lime) 52%, #9FCF48);
  border: 1px solid rgba(255,255,255,.5);
  box-shadow: 0 13px 0 #769A32, 0 28px 65px rgba(207,255,116,.28), inset 0 1px 0 rgba(255,255,255,.78);
  transform: translate(-50%,-57%) translateZ(70px) rotate(-5deg);
  animation: corePulse 4s ease-in-out infinite;
}
.spatial-core::after {
  content: '';
  position: absolute;
  inset: 7px 12px auto;
  height: 34%;
  border-radius: 18px;
  background: linear-gradient(rgba(255,255,255,.52), transparent);
}

.spatial-card {
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 154px;
  padding: 12px 14px;
  color: var(--cream);
  background: rgba(34,43,20,.9);
  border: 1px solid rgba(207,255,116,.2);
  border-radius: 17px;
  box-shadow: 0 8px 0 rgba(13,17,8,.72), 0 18px 40px rgba(7,10,4,.28), inset 0 1px 0 rgba(255,255,255,.09);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.spatial-card svg { flex: 0 0 auto; color: var(--warm-lime); }
.spatial-card strong { display: block; font-size: 11px; letter-spacing: .01em; }
.spatial-card span { display: block; margin-top: 2px; color: var(--text-muted); font-size: 9px; text-transform: uppercase; letter-spacing: .08em; }
.spatial-card-a { left: 22px; top: 46px; transform: translateZ(38px) rotate(-4deg); animation: chipFloatA 5s ease-in-out infinite; }
.spatial-card-b { right: 18px; top: 84px; transform: translateZ(50px) rotate(5deg); animation: chipFloatB 6s ease-in-out -1s infinite; }
.spatial-card-c { left: 52px; bottom: 38px; transform: translateZ(42px) rotate(3deg); animation: chipFloatA 6.5s ease-in-out -2s infinite; }
.spatial-status {
  position: absolute;
  right: 26px;
  bottom: 28px;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 11px;
  color: var(--warm-lime);
  background: rgba(13,17,8,.72);
  border: 1px solid rgba(207,255,116,.18);
  border-radius: 999px;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.spatial-status::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--warm-lime); box-shadow: 0 0 0 5px rgba(207,255,116,.1), 0 0 18px rgba(207,255,116,.75); animation: statusBlink 1.8s ease-in-out infinite; }

.workspace { grid-template-columns: minmax(370px,430px) minmax(0,1fr); gap: 28px; }
.panel {
  border: 1px solid rgba(207,255,116,.17);
  border-radius: 30px;
  background:
    linear-gradient(145deg, rgba(207,255,116,.045), transparent 34%),
    linear-gradient(160deg, rgba(47,58,29,.97), rgba(28,35,17,.96));
  box-shadow: 0 13px 0 var(--olive-black), 0 34px 90px rgba(6,9,3,.36), inset 0 1px 0 rgba(255,255,255,.09);
  transition: transform var(--spring), border-color var(--ease), box-shadow var(--spring);
}
.panel:hover { border-color: rgba(207,255,116,.27); transform: translateY(-3px); box-shadow: 0 16px 0 var(--olive-black), 0 42px 100px rgba(6,9,3,.4), inset 0 1px 0 rgba(255,255,255,.1); }
.panel::before { background: linear-gradient(135deg, rgba(207,255,116,.08), transparent 25%, transparent 76%, rgba(207,255,116,.025)); }
.panel-inner { padding: 27px; }
.badge-num {
  width: 38px;
  height: 38px;
  color: var(--olive-black);
  background: linear-gradient(145deg, #E3FFA9, var(--warm-lime));
  border-color: rgba(255,255,255,.4);
  border-radius: 12px;
  box-shadow: 0 5px 0 #769A32, 0 12px 24px rgba(207,255,116,.12), inset 0 1px 0 rgba(255,255,255,.62);
  transform: translateY(-2px) rotate(-3deg);
}
.panel-title { color: var(--cream); font-weight: 760; }
.panel-desc { color: var(--text-muted); }

.upload-zone {
  min-height: 202px;
  background:
    linear-gradient(rgba(207,255,116,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(207,255,116,.04) 1px, transparent 1px),
    rgba(13,17,8,.28);
  background-size: 22px 22px, 22px 22px, auto;
  border: 1px dashed rgba(207,255,116,.36);
  border-radius: 22px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 7px 0 rgba(13,17,8,.5);
}
.upload-zone:hover,
.upload-zone.dragging {
  background-color: rgba(207,255,116,.08);
  border-color: var(--warm-lime);
  transform: translateY(-4px) rotateX(1deg);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 11px 0 rgba(13,17,8,.62), 0 24px 45px rgba(207,255,116,.08);
}
.upload-zone.dragging::before { border-color: color-mix(in srgb, var(--blue) 25%, transparent); }
.upload-icon {
  width: 58px;
  height: 58px;
  color: var(--olive-black);
  background: linear-gradient(145deg, #E9FFB6, var(--warm-lime) 55%, #A6D94D);
  border-color: rgba(255,255,255,.48);
  border-radius: 18px;
  box-shadow: 0 8px 0 #769A32, 0 18px 38px rgba(207,255,116,.18), inset 0 1px 0 rgba(255,255,255,.72);
  transform: translateY(-3px) rotate(-4deg);
}

.upload-title { color: var(--cream); font-weight: 720; }
.upload-hint { color: var(--text-muted); }
.upload-thumb-wrap { border-color: rgba(207,255,116,.17); box-shadow: 0 6px 0 rgba(13,17,8,.65), 0 13px 25px rgba(6,9,3,.24); }
.upload-idx { color: var(--olive-black); background: rgba(207,255,116,.92); border-color: rgba(255,255,255,.35); }
.btn-remove-upload { background: rgba(13,17,8,.78); border-color: rgba(207,255,116,.22); }
.upload-style-select,
.ref-select {
  color: var(--cream);
  background-color: rgba(13,17,8,.36);
  border-color: rgba(207,255,116,.17);
  box-shadow: 0 4px 0 rgba(13,17,8,.52), inset 0 1px 0 rgba(255,255,255,.05);
}
.upload-style-select:hover,
.ref-select:hover { color: var(--warm-lime); background-color: rgba(207,255,116,.08); border-color: rgba(207,255,116,.34); }
.upload-style-select:focus,
.ref-select:focus { border-color: var(--warm-lime); box-shadow: 0 0 0 4px rgba(207,255,116,.12), 0 4px 0 rgba(13,17,8,.52); }
.btn-clear-all { color: var(--danger); background: rgba(255,122,128,.09); border: 1px solid rgba(255,122,128,.16); }

.btn-generate {
  min-height: 54px;
  color: var(--olive-black);
  background: linear-gradient(180deg, #E5FFAB, var(--warm-lime) 60%, #B7EB59);
  border-color: rgba(255,255,255,.48);
  border-radius: 16px;
  box-shadow: 0 8px 0 #769A32, 0 18px 36px rgba(207,255,116,.16), inset 0 1px 0 rgba(255,255,255,.76);
  font-weight: 820;
  letter-spacing: -.01em;
}
.btn-generate:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 12px 0 #769A32, 0 26px 45px rgba(207,255,116,.21), inset 0 1px 0 rgba(255,255,255,.8); }
.btn-generate:active:not(:disabled) { transform: translateY(5px); box-shadow: 0 3px 0 #769A32, inset 0 1px 0 rgba(255,255,255,.6); }
.btn-generate:disabled { color: rgba(244,246,234,.36); background: rgba(244,246,234,.07); border-color: rgba(244,246,234,.06); box-shadow: 0 5px 0 rgba(13,17,8,.45); }
.btn-stop { color: #FFE1E3; background: rgba(255,122,128,.1); border-color: rgba(255,122,128,.2); box-shadow: 0 5px 0 rgba(13,17,8,.5); }
.notice { color: var(--cream-2); background: rgba(13,17,8,.32); border-color: rgba(207,255,116,.14); box-shadow: 0 5px 0 rgba(13,17,8,.45), inset 0 1px 0 rgba(255,255,255,.05); }

.ref-panel,
.progress-container,
.prompts-container {
  background: rgba(13,17,8,.28);
  border-color: rgba(207,255,116,.14);
  box-shadow: 0 6px 0 rgba(13,17,8,.48), inset 0 1px 0 rgba(255,255,255,.05);
}
.ref-title { color: var(--cream); }
.ref-status { display: inline-flex; align-items: center; gap: 5px; color: var(--olive-black); background: var(--warm-lime); border-color: rgba(255,255,255,.3); box-shadow: 0 3px 0 #769A32; }
.ref-card { background: rgba(47,58,29,.64); border-color: rgba(207,255,116,.13); box-shadow: 0 4px 0 rgba(13,17,8,.5), inset 0 1px 0 rgba(255,255,255,.05); }
.ref-thumb { border: 1px solid rgba(207,255,116,.22); }

.status-pill { color: var(--cream-2); background: rgba(13,17,8,.32); border-color: rgba(207,255,116,.14); box-shadow: 0 4px 0 rgba(13,17,8,.5), inset 0 1px 0 rgba(255,255,255,.04); }
.btn-download-all { color: var(--olive-black); background: var(--warm-lime); border-color: rgba(255,255,255,.36); box-shadow: 0 4px 0 #769A32, inset 0 1px 0 rgba(255,255,255,.62); }
.btn-download-all:hover:not(:disabled) { color: var(--olive-black); background: #DEFF9B; transform: translateY(-2px); box-shadow: 0 6px 0 #769A32, inset 0 1px 0 rgba(255,255,255,.68); }
.progress-track { background: rgba(13,17,8,.65); border: 1px solid rgba(207,255,116,.08); }
.progress-fill,
.progress-fill.done { background: linear-gradient(90deg, #91C53D, var(--warm-lime), #E2FFA6); box-shadow: 0 0 18px rgba(207,255,116,.28); }
.progress-pct { color: var(--warm-lime); }

.empty-state {
  background:
    linear-gradient(rgba(207,255,116,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(207,255,116,.035) 1px, transparent 1px),
    rgba(13,17,8,.22);
  background-size: 28px 28px, 28px 28px, auto;
  border-color: rgba(207,255,116,.14);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
}
.empty-icon { color: var(--olive-black); background: var(--warm-lime); border-color: rgba(255,255,255,.38); box-shadow: 0 8px 0 #769A32, 0 20px 38px rgba(207,255,116,.13), inset 0 1px 0 rgba(255,255,255,.68); transform: rotate(-5deg); }
.empty-state h3 { color: var(--cream); }

.result-card {
  background: linear-gradient(155deg, rgba(55,68,34,.98), rgba(30,38,18,.98));
  border-color: rgba(207,255,116,.15);
  border-radius: 22px;
  box-shadow: 0 8px 0 rgba(13,17,8,.68), 0 22px 50px rgba(5,8,3,.28), inset 0 1px 0 rgba(255,255,255,.06);
}
.result-card:hover { transform: translateY(-7px) rotateX(1deg); border-color: rgba(207,255,116,.3); box-shadow: 0 14px 0 rgba(13,17,8,.72), 0 34px 65px rgba(5,8,3,.34), inset 0 1px 0 rgba(255,255,255,.07); }
.rc-image-wrap { background: var(--olive-black); }
.rc-status-badge { color: var(--cream); background: rgba(13,17,8,.76); border-color: rgba(207,255,116,.18); box-shadow: 0 4px 0 rgba(13,17,8,.48); }
.rc-badge-success { color: var(--olive-black); background: rgba(207,255,116,.92); }
.rc-badge-error { color: #FFE7E8; background: rgba(155,43,48,.88); }
.rc-badge-stopped { color: #FFF0C7; background: rgba(133,87,15,.9); }
.rc-state-overlay { background: rgba(21,27,13,.82); }
.rc-state-overlay::before { border-color: rgba(207,255,116,.2); box-shadow: 0 7px 0 rgba(13,17,8,.5), 0 16px 34px rgba(5,8,3,.25); }
.rc-state-overlay svg { color: var(--warm-lime) !important; }
.rc-filename { color: var(--cream); }
.rc-btn { color: var(--cream-2); background: rgba(13,17,8,.32); border-color: rgba(207,255,116,.13); box-shadow: 0 4px 0 rgba(13,17,8,.5), inset 0 1px 0 rgba(255,255,255,.04); }
.rc-btn:hover:not(:disabled) { color: var(--olive-black); background: var(--warm-lime); border-color: rgba(255,255,255,.3); transform: translateY(-2px); box-shadow: 0 6px 0 #769A32; }
.rc-btn:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 1px 0 #769A32; }
.rc-btn-icon { color: var(--danger); }
.prompts-content { color: var(--cream-2); background: rgba(13,17,8,.52); border-color: rgba(207,255,116,.12); }
.btn-copy { color: var(--cream-2); background: rgba(47,58,29,.8); border-color: rgba(207,255,116,.14); box-shadow: 0 4px 0 rgba(13,17,8,.5); }
.btn-copy:hover { color: var(--olive-black); background: var(--warm-lime); }

.modal-backdrop { background: rgba(8,11,5,.68); backdrop-filter: blur(22px) saturate(115%); }
.modal-card {
  background: linear-gradient(150deg, rgba(55,68,34,.98), rgba(27,34,16,.98));
  border-color: rgba(207,255,116,.2);
  box-shadow: 0 14px 0 var(--olive-black), 0 48px 120px rgba(3,5,2,.55), inset 0 1px 0 rgba(255,255,255,.08);
}
.modal-title { color: var(--cream); }
.modal-cancel { color: var(--cream); background: rgba(244,246,234,.07); border-color: rgba(207,255,116,.13); box-shadow: 0 4px 0 rgba(13,17,8,.5); }
.modal-danger { box-shadow: 0 5px 0 #9B3237, 0 14px 24px rgba(255,122,128,.1), inset 0 1px 0 rgba(255,255,255,.25); }

@keyframes limeDrift { from { transform: translate3d(0,-22px,0) scale(.94); } to { transform: translate3d(30px,34px,0) scale(1.08); } }
@keyframes stageFloat { 0%,100% { transform: rotateY(-9deg) rotateX(4deg) translateY(0); } 50% { transform: rotateY(-5deg) rotateX(2deg) translateY(-12px); } }
@keyframes stageFloatMobile { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes ringSpin { to { transform: translate(-50%,-50%) rotateX(68deg) rotateZ(372deg); } }
@keyframes corePulse { 0%,100% { transform: translate(-50%,-57%) translateZ(70px) rotate(-5deg) scale(1); } 50% { transform: translate(-50%,-62%) translateZ(82px) rotate(2deg) scale(1.04); } }
@keyframes chipFloatA { 0%,100% { margin-top: 0; } 50% { margin-top: -10px; } }
@keyframes chipFloatB { 0%,100% { margin-top: -3px; } 50% { margin-top: 9px; } }
@keyframes statusBlink { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .48; transform: scale(.78); } }

@keyframes ambientFloat { from { transform: translate3d(0,-18px,0) scale(.94); } to { transform: translate3d(22px,28px,0) scale(1.06); } }
@keyframes modalFade { from { opacity: 0; } }
@keyframes modalSpring { from { opacity: 0; transform: translateY(18px) scale(.94); } to { opacity: 1; transform: none; } }

@keyframes slideUpFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spinFast { 100% { transform: rotate(360deg); } }

@media (max-width: 1080px) {
  .hero { grid-template-columns: minmax(0,1fr) minmax(330px,.78fr); gap: 34px; }
  .hero h1 { font-size: clamp(46px,6.4vw,68px); }
  .spatial-card { min-width: 140px; padding: 10px 12px; }
  .workspace { grid-template-columns: minmax(320px,390px) minmax(0,1fr); }
  .result-grid { grid-template-columns: 1fr; }
}
@media (max-width: 860px) {
  .hero { grid-template-columns: 1fr; min-height: auto; }
  .hero-copy { max-width: 700px; }
  .hero-spatial { width: min(100%,610px); min-height: 420px; margin: 0 auto; }
  .workspace { grid-template-columns: 1fr; }
  .ref-card-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .topbar { height: 62px; } .topbar-inner { padding: 0 14px; }
  .brand-subtitle, .brand-badge { display: none; }
  .btn-reset span { display: none; }
  .btn-reset { width: 38px; padding: 0; justify-content: center; }
  .main-container { padding: 34px 13px 74px; }
  .hero { gap: 26px; margin-bottom: 42px; }
  .hero h1 { font-size: clamp(34px, 11vw, 48px); }
  .hero-subtitle { font-size: 15px; }
  .hero-badges { gap: 7px; }
  .hero-badge { font-size: 11px; }
  .hero-spatial { min-height: 350px; }
  .spatial-stage { inset: 16px 5px 22px; border-radius: 34px; transform: none; animation-name: stageFloatMobile; }
  .spatial-ring { width: 220px; height: 220px; }
  .spatial-core { width: 92px; height: 92px; border-radius: 27px; }
  .spatial-card { min-width: 132px; padding: 9px 10px; border-radius: 14px; }
  .spatial-card-a { left: 14px; top: 30px; }
  .spatial-card-b { right: 11px; top: 72px; }
  .spatial-card-c { left: 26px; bottom: 31px; }
  .spatial-status { right: 15px; bottom: 20px; }
  .panel { border-radius: 24px; }
  .panel-inner { padding: 17px; }
  .panel-header { align-items: flex-start; }
  .result-header-actions { width: 100%; justify-content: flex-start; }
  .panel-header:has(.result-header-actions) { flex-direction: column; }
  .upload-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
  .result-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
  .empty-state { min-height: 320px; }
}
@media (max-width: 480px) {
  .upload-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .result-grid { grid-template-columns: 1fr; }
  .ref-card-grid { grid-template-columns: 1fr; }
  .hero-badge:nth-child(3) { display: none; }
  .hero-spatial { min-height: 310px; }
  .spatial-stage { inset-inline: 0; }
  .spatial-card-b { display: none; }
  .spatial-card-c { left: 13px; bottom: 27px; }
  .spatial-status { right: 11px; }
  .status-pill { padding-inline: 8px; }
  .btn-download-all { margin-left: auto; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
`;

// ==========================================
// LIB/CHARACTER_REFERENCE
// ==========================================
/** @type {Record<string, WorkerReference>} */
const WORKER_REFERENCE = {
  hijabWorker: {
    id: "hijabWorker",
    name: "Hijab Worker 1",
    type: "hijab",
    emoji: "🧕",
    image: "https://raw.githubusercontent.com/hatehero/ai-product-studio/0d97b42d251d2e60861d9a992086450376a56098/1785819845864.png",
    description: `Use this exact female face identity for Worker 1. Preserve facial structure, face shape, eyes, nose, lips, skin tone and overall identity. She is a Malaysian female retail worker wearing a hijab. The face must remain consistent across generations.`
  },
  freeHairWorker: {
    id: "freeHairWorker",
    name: "Free Hair Worker 1",
    type: "freeHair",
    emoji: "👩",
    image: "https://raw.githubusercontent.com/hatehero/ai-product-studio/0d97b42d251d2e60861d9a992086450376a56098/FB_IMG_1785820585644.jpg",
    description: `Use this exact female face identity for Worker 2. Preserve facial structure, hairstyle identity, facial proportions, eyes, nose, lips and natural appearance. She is a Malaysian female retail worker with free hair. Keep the same person identity.`
  },
  hijabWorker2: {
    id: "hijabWorker2",
    name: "Hijab Worker 2",
    type: "hijab",
    emoji: "🧕",
    image: "https://raw.githubusercontent.com/hatehero/model-facew/8ad1c9213bd4bddd21fd6a50d94f2b2b5b041218/0.jpg",
    description: `Use this exact female face identity for additional hijab worker. Preserve facial structure, face shape, eyes, nose, lips, skin tone and overall identity. She is a Malaysian female retail worker wearing a hijab. The face must remain consistent across generations.`
  },
  freeHairWorker2: {
    id: "freeHairWorker2",
    name: "Free Hair Worker 2",
    type: "freeHair",
    emoji: "👩",
    image: "https://raw.githubusercontent.com/hatehero/model-facew/8ad1c9213bd4bddd21fd6a50d94f2b2b5b041218/%40ikanSpicy.jpg",
    description: `Use this exact female face identity for additional free hair worker. Preserve facial structure, hairstyle identity, facial proportions, eyes, nose, lips and natural appearance. She is a Malaysian female retail worker with free hair. Keep the same person identity.`
  }
};

const ALL_WORKERS = [
  { id: "hijabWorker", name: "Hijab Worker 1", type: "hijab", emoji: "🧕" },
  { id: "freeHairWorker", name: "Free Hair Worker 1", type: "freeHair", emoji: "👩" },
  { id: "hijabWorker2", name: "Hijab Worker 2", type: "hijab", emoji: "🧕" },
  { id: "freeHairWorker2", name: "Free Hair Worker 2", type: "freeHair", emoji: "👩" }
];

const HIJAB_WORKER_IDS = ['hijabWorker', 'hijabWorker2'];
const FREEHAIR_WORKER_IDS = ['freeHairWorker', 'freeHairWorker2'];

/** @param {string} id @returns {WorkerReference} */
function getWorker(id) {
  return WORKER_REFERENCE[id] || WORKER_REFERENCE.hijabWorker;
}

/**
 * User-selected workers act as the primary pair, then the app auto-rotates all 4 face models.
 * Cycle:
 * 1 -> selected hijab + selected free hair
 * 2 -> other hijab + other free hair
 * 3 -> selected hijab + other free hair
 * 4 -> other hijab + selected free hair
 * then repeats.
 * @param {number} imageIndex
 * @param {string} selectedHijabId
 * @param {string} selectedFreeHairId
 * @returns {{ worker1Id: string, worker2Id: string }}
 */
function getAutoRotatingWorkerPair(imageIndex, selectedHijabId, selectedFreeHairId) {
  const primaryHijab = HIJAB_WORKER_IDS.includes(selectedHijabId) ? selectedHijabId : HIJAB_WORKER_IDS[0];
  const primaryFreeHair = FREEHAIR_WORKER_IDS.includes(selectedFreeHairId) ? selectedFreeHairId : FREEHAIR_WORKER_IDS[0];
  const otherHijab = HIJAB_WORKER_IDS.find((id) => id !== primaryHijab) || primaryHijab;
  const otherFreeHair = FREEHAIR_WORKER_IDS.find((id) => id !== primaryFreeHair) || primaryFreeHair;

  const cycle = [
    { worker1Id: primaryHijab, worker2Id: primaryFreeHair },
    { worker1Id: otherHijab, worker2Id: otherFreeHair },
    { worker1Id: primaryHijab, worker2Id: otherFreeHair },
    { worker1Id: otherHijab, worker2Id: primaryFreeHair }
  ];

  return cycle[Math.abs(Number(imageIndex) || 0) % cycle.length];
}

/** @type {Record<string, InlineImage> | null} */
let CACHED_REF_IMAGES = null;

/**
 * Load worker references with partial-cache recovery.
 * Successful references stay cached; missing/failed references are retried on later batches.
 * @param {AbortSignal} [signal]
 * @returns {Promise<Record<string, InlineImage> | null>}
 */
async function fetchReferenceImagesBase64(signal) {
  const allIds = ['hijabWorker', 'freeHairWorker', 'hijabWorker2', 'freeHairWorker2'];
  const cached = CACHED_REF_IMAGES || {};
  const missingIds = allIds.filter((id) => !cached[id]);

  if (!missingIds.length) return cached;

  const results = await Promise.allSettled(
    missingIds.map(async (id) => {
      const response = await fetchFastWithBackoff(
        WORKER_REFERENCE[id].image,
        { method: 'GET', signal },
        1
      );
      return { id, blob: await response.blob() };
    })
  );

  if (signal?.aborted) {
    throw new DOMException('Proses dihentikan.', 'AbortError');
  }

  /** @type {Record<string, InlineImage>} */
  const referenceImages = { ...cached };

  for (const result of results) {
    if (result.status !== 'fulfilled') {
      console.warn('One worker reference could not be loaded.', result.reason);
      continue;
    }

    const { id, blob } = result.value;
    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error(`Rujukan ${id} gagal dibaca.`));
        reader.onloadend = () => resolve(String(reader.result || '').split(',')[1] || '');
        reader.readAsDataURL(blob);
      });

      if (base64) {
        referenceImages[id] = { mimeType: blob.type || 'image/png', data: base64 };
      }
    } catch (error) {
      console.warn(`Worker reference ${id} could not be converted to base64.`, error);
    }
  }

  if (!Object.keys(referenceImages).length) {
    console.warn('No worker reference images were available for base64 injection.');
    CACHED_REF_IMAGES = null;
    return null;
  }

  CACHED_REF_IMAGES = referenceImages;
  return CACHED_REF_IMAGES;
}

/**
 * Ensure the selected worker face references exist before generation.
 * @param {string} worker1Id
 * @param {string} worker2Id
 * @param {AbortSignal} [signal]
 * @returns {Promise<Record<string, InlineImage>>}
 */
async function ensureSelectedWorkerReferences(worker1Id, worker2Id, signal) {
  const refs = await fetchReferenceImagesBase64(signal);
  const requiredIds = [worker1Id, worker2Id];
  const missing = requiredIds.filter((id) => !refs?.[id]);

  if (missing.length) {
    throw new Error(
      `Rujukan wajah model gagal dimuat: ${missing.join(', ')}. Generation dihentikan supaya AI tidak menggunakan wajah generic.`
    );
  }

  return /** @type {Record<string, InlineImage>} */ (refs);
}

// ==========================================
// LIB/OUTFIT & DIVERSITY POOLS
// ==========================================
const TOPS_HIJAB = [
  'fitted compression polo lengan panjang kolar mandarin dengan structured bust shaping, curved under-bust seams dan visual bust sangat penuh serta terangkat',
  'slim-fit stretch polo kolar tegak dengan sculpted bust construction, narrow waist dan strong rounded bust projection',
  'body-hugging compression polo lengan panjang dengan contoured bust panels dan prominent upper-bust fullness',
  'fitted staff polo dengan modest V-neck, structured bust darts dan strong push-up style silhouette',
  'slim-fit compression polo kolar butang lengan panjang dengan supportive under-bust shaping dan full rounded bust appearance',
  'modern retail fitted polo lengan pendek dengan sculpted torso construction dan dramatic bust-to-waist contrast',
  'practical work polo kolar mandarin lengan panjang dengan princess seams dan prominent forward bust projection',
  'stretch compression polo kolar tegak dengan high-recovery fabric dan visually lifted rounded bust silhouette',
  'fitted ribbed-collar polo lengan pendek dengan structured bust contour dan pronounced upper-bust fullness',
  'slim-fit half-button polo lengan panjang dengan shaped bust panels dan strong projected bust appearance',
  'slim-fit technical work shirt lengan panjang dengan precision bust darts, curved torso seams dan very full rounded bust silhouette',
  'fitted retail uniform top dengan princess-seam construction, supportive bust shaping dan sharply defined waist',
  'modern fitted work shirt kolar bulat lengan panjang dengan sculpted bust area dan prominent rounded projection',
  'practical staff work top dengan vertical bust darts dan structured under-bust shaping untuk fuller lifted appearance',
  'body-hugging work shirt kolar mandarin dengan fitted button-front construction dan strong upper-bust fullness',
  'slim-fit utility work top lengan panjang dengan contoured torso panels dan prominent bust-to-waist contrast',
  'fitted service uniform top dengan modest V-neck, sculpted bust construction dan visibly lifted rounded silhouette',
  'minimalist slim-fit work shirt lengan panjang dengan shaped bust darts dan strong forward projection',
  'curve-accentuating retail top dengan structured bust seams, narrow waist dan pronounced rounded fullness',
  'fitted work polo kolar tegak lengan panjang dengan supportive bust contouring dan highly projected silhouette',
  'fitted raglan sport tee lengan panjang dengan compression stretch, sculpted bust area dan prominent upper-bust fullness',
  'slim-fit athletic jersey kolar mandarin dengan structured chest shaping dan strong rounded bust projection',
  'body-hugging performance mesh top lengan panjang dengan contoured torso construction dan full lifted bust silhouette',
  'fitted crewneck sport tee lengan panjang dengan high-stretch fabric, shaped bust panels dan dramatic bust-to-waist contrast',
  'compression long-sleeve athletic top dengan supportive under-bust structure dan very full rounded appearance',
  'slim-fit athletic jersey kolar bulat dengan sculpting stretch construction dan prominent forward bust projection',
  'body-hugging raglan sport top lengan panjang dengan structured bust shaping dan strong upper-torso fullness',
  'fitted training top kolar mandarin dengan high-recovery compression fabric dan lifted rounded bust silhouette',
  'compression crewneck top lengan panjang dengan contoured bust panels, narrow waist dan prominent full projection',
  'slim-fit performance tee lengan panjang dengan shaped bust construction dan strong push-up visual silhouette',
  'premium fitted hijab retail uniform top dengan high-stretch sculpting fabric, princess seams, curved under-bust shaping dan very full rounded bust projection',
  'modern hijab staff polo dengan structured bust darts, supportive torso construction dan highly lifted full bust appearance',
  'technical hijab work top dengan body-contouring stretch fabric, sculpted bust panels dan sharply defined waist',
  'minimalist hijab uniform shirt dengan fitted long sleeves, curved bust seams dan prominent rounded upper-bust fullness',
  'sport-luxe hijab performance top dengan compression stretch construction, supportive bust shaping dan strong forward projection',
  'tailored hijab retail top dengan princess-seam architecture, narrow fitted waist dan dramatic full rounded bust silhouette',
  'fitted hijab service polo dengan high-recovery fabric, structured upper torso dan prominent lifted bust appearance',
  'sculpted hijab work shirt dengan curved side panels, shaped bust darts dan strong bust-to-waist contrast',
  'body-hugging hijab athletic top dengan smooth compression fabric dan visibly full rounded bust projection',
  'ultimate hijab fitted work top dengan structured bust construction, curved under-bust seams, sculpting stretch fabric dan sharply defined waist untuk menghasilkan visual bust besar, penuh, rounded, lifted dan strongly projected'
];

const TOPS_FREEHAIR = [
  'deep plunging V-neck fitted top dengan structured bust shaping, supportive under-bust construction dan visual bust sangat penuh serta terangkat',
  'low-cut bodycon top dengan wide neckline, sculpted bust panels dan strong push-up silhouette yang menghasilkan rounded upper-bust fullness',
  'plunging V-neck stretch top dengan fitted torso, curved under-bust seam dan prominent forward bust projection',
  'deep scoop-neck fitted long-sleeve top dengan wide open neckline, contoured bust shaping dan full rounded bust appearance',
  'wrap-style deep V fitted top dengan supportive crossover construction, cinched under-bust fit dan lifted push-up visual',
  'deep sweetheart fitted top dengan structured bust cups, curved neckline dan pronounced rounded upper-bust fullness',
  'plunging wrap blouse dengan fitted waist, supportive under-bust shaping dan strong bust-to-waist contrast',
  'low-cut tie-front fitted top dengan deep neckline, close bust contour dan prominently lifted bust silhouette',
  'deep V button-front fitted shirt dengan shaped bust darts, narrow waist dan full rounded bust projection',
  'asymmetric low-neck fitted top dengan sculpted bust construction dan prominent upper-bust fullness',
  'plunging V-neck bodysuit dengan body-sculpting stretch fabric, structured bust area dan strong push-up appearance',
  'low scoop-neck bodycon tank dengan wide neckline, fitted bust shaping dan prominent rounded bust silhouette',
  'extreme plunge fitted blouse dengan structured neckline support, close torso fit dan strongly projected bust appearance',
  'deep sweetheart bodycon top dengan molded-look bust shaping, supportive under-bust seam dan lifted rounded fullness',
  'plunging ribbed crop top dengan high-stretch construction, fitted waist dan strong upper-bust projection',
  'deep V bodycon stretch crop top dengan close torso contour, structured bust support dan visibly full rounded bust shape',
  'ultra-low V fitted crop top dengan sculpted bust construction, narrow waist dan dramatic bust-to-waist contrast',
  'slim-fit plunging V crop top dengan supportive bust shaping dan prominent lifted upper-torso silhouette',
  'body-hugging low V long-sleeve top dengan high-recovery stretch fabric dan rounded push-up bust appearance',
  'curve-accentuating deep V crop top dengan fitted bust darts, structured under-bust shaping dan full projected silhouette',
  'ribbed plunging V bodycon top dengan vertical stretch ribs, fitted torso dan prominent rounded bust fullness',
  'stretch deep V fitted top dengan sculpting fabric, narrow waist dan strong lifted bust projection',
  'wrap-front fitted crop top dengan deep V neckline, supportive crossover shaping dan pronounced upper-bust fullness',
  'bodycon plunging V long-sleeve top dengan close fitted waist dan structured rounded bust silhouette',
  'deep V ribbed knit sweater dengan fitted stretch knit, sculpted bust contour dan full upper-bust shape',
  'fitted plunging V sweater dengan supportive knit construction, narrow waist dan visibly lifted bust appearance',
  'body-hugging deep V cable-knit top dengan contoured torso fit dan prominent rounded bust projection',
  'slim-fit low V knit top dengan fitted bust shaping, narrow waist dan strong push-up visual',
  'ribbed deep V sweater dengan structured stretch knit dan pronounced full rounded bust silhouette',
  'fitted fisherman-knit deep V top dengan close torso contour, supportive under-bust shaping dan prominent bust fullness',
  'Gen Z deep V fitted going-out top dengan plunging neckline, structured bust shaping, supportive under-bust seams dan very full rounded push-up silhouette',
  'Y2K low scoop-neck bodycon top dengan wide neckline, molded-look bust area dan pronounced upper-bust fullness',
  'plunging V nightlife top dengan extra-deep neckline, contoured bust construction dan strong forward projection',
  'wrap-style deep V going-out top dengan crossover support, fitted waist dan lifted rounded bust silhouette',
  'deep V empire-waist fitted top dengan curved under-bust seam dan highly projected full bust appearance',
  'low-cut wrap blouse dengan structured crossover construction dan dramatic bust-to-waist contrast',
  'Gen Z fitted button-front shirt dengan low V opening, shaped bust darts dan prominent rounded bust projection',
  'asymmetric deep V fitted top dengan diagonal neckline, sculpted bust shaping dan strong upper-bust fullness',
  'plunging V fitted bodysuit dengan body-sculpting stretch construction dan prominent push-up silhouette',
  'Y2K low scoop-neck fitted tank dengan wide neckline, close fit dan visibly full rounded bust shape',
  'low sweetheart going-out top dengan structured bust cups, curved neckline dan highly lifted rounded upper-bust silhouette',
  'off-shoulder low-cut fitted nightlife top dengan wide neckline dan prominent full bust projection',
  'cold-shoulder deep V fitted top dengan structured bust shaping dan strong rounded push-up appearance',
  'ribbed deep V bodycon top dengan fitted bust construction, under-bust support dan pronounced upper-bust fullness',
  'lightweight stretch deep V fitted top dengan structured neckline edge dan sculpted rounded bust shape',
  'wrap-front nightlife top dengan supportive deep V overlap, curved under-bust seam dan very full projected silhouette',
  'low scoop-neck fitted tank dengan wide collarbone opening dan molded-look bust shaping',
  'slim-fit deep V camisole dengan narrow straps, structured bust support dan prominent lifted silhouette',
  'deep V halter fitted top dengan open shoulders, contoured under-bust construction dan strong rounded projection',
  'very low scoop-neck fitted knit top dengan soft stretch fabric dan prominent upper-bust fullness',
  'lace-trim deep V camisole dengan structured bust shaping, supportive under-bust construction dan full rounded push-up silhouette',
  'asymmetric lace-trim fitted top dengan low diagonal neckline dan sculpted bust contour',
  'satin cowl-neck fitted camisole dengan controlled drape, fitted under-bust construction dan prominent rounded bust silhouette',
  'deep cowl-neck nightlife top dengan low draped neckline, fitted lower torso dan strong upper-bust fullness',
  'corset-inspired sweetheart top dengan structured cup seams, supportive boning-look construction dan highly lifted rounded bust appearance',
  'corset-inspired deep V top dengan plunging neckline, curved bust seams dan dramatic forward projection',
  'bustier-style fitted nightlife top dengan molded-look bust cups, narrow waist dan prominent push-up silhouette',
  'long-sleeve corset-seam deep V top dengan curved torso seams dan strongly projected rounded bust shape',
  'Gen Z peplum deep V fitted top dengan structured upper bodice, supportive bust shaping dan exaggerated bust-to-waist contrast',
  'sweetheart peplum going-out top dengan sculpted bust construction dan prominent lifted upper-torso silhouette',
  'wrap peplum deep V blouse dengan supportive crossover neckline dan strong full rounded bust appearance',
  'ruched deep V fitted top dengan controlled gathering around bust, supportive under-bust shaping dan enhanced visual volume',
  'centre-ruched low scoop top dengan wide neckline, sculpted bust shaping dan pronounced rounded fullness',
  'side-ruched deep V nightlife top dengan asymmetric gathering dan dramatic dimensional bust silhouette',
  'twist-front deep V fitted top dengan central twist construction, supportive fit dan prominent rounded bust projection',
  'knot-front low-cut going-out top dengan structured central knot, fitted lower torso dan strong lifted bust shape',
  'one-shoulder fitted top dengan low asymmetric neckline, sculpted side construction dan prominent upper-bust fullness',
  'asymmetric bodycon top dengan fitted stretch fabric dan strong rounded bust projection',
  'strapless sweetheart corset-style top dengan structured bust cups, cinched waist dan very full lifted silhouette',
  'strapless low-cut corset bandeau dengan molded bust panels dan dramatic bust-to-waist contrast',
  'metallic deep V fitted nightlife top dengan reflective stretch fabric dan strongly contoured rounded bust shape',
  'metallic cowl-neck camisole dengan fitted under-bust shaping dan prominent full push-up silhouette',
  'sequinned deep V fitted top dengan close sculpted bust construction dan strong upper-bust projection',
  'crystal-embellished low scoop fitted top dengan structured stretch base dan pronounced rounded bust fullness',
  'sheer-layer deep V fitted top dengan opaque structured bust lining, supportive shaping dan prominent projected silhouette',
  'multi-layered deep V Gen Z top dengan fitted low-neck base dan strong rounded bust contour',
  'Y2K double-layer low scoop top dengan fitted inner construction dan prominent full upper-bust appearance',
  '2010s revival bandage-style deep V top dengan sculpting panels dan highly defined rounded bust silhouette',
  'sporty deep-zip fitted top dengan low V zipper opening, sculpted stretch jersey dan strong lifted bust projection',
  'ultimate TikTok Gen Z going-out top dengan plunging deep V sweetheart hybrid neckline, structured push-up bust construction, molded-look shaping, curved under-bust seams, controlled ruching, high-stretch fitted fabric dan sharply defined waist untuk menghasilkan visual bust sangat besar, penuh, rounded, lifted dan strongly projected'
];

const ACCESSORIES = [
  'delicate layered gold chains resting high on the collarbone, feminine and elegant, keeping the deep neckline fully visible',
  'thin gold lariat necklace with a small vertical drop, positioned neatly above the bust without covering the central neckline',
  'minimal gold choker paired with a fine short chain, sleek and sensual while leaving the neckline unobstructed',
  'dainty gold chain with a tiny teardrop pendant resting at upper-chest level, subtle and flattering to a low neckline',
  'fine layered necklace with two ultra-thin gold chains, arranged around the collarbone to frame the neckline without crossing it',
  'delicate snake-chain necklace with a polished finish, fitted close to the neck for a sleek feminine nightlife look',
  'minimal Y-shaped gold necklace with a short central drop, carefully positioned to complement a plunging neckline without covering it',
  'thin gold chain with a tiny crystal pendant, resting neatly above the neckline for a refined feminine accent',
  'sleek collarbone-length gold necklace with a tiny charm, clean and elegant with the entire neckline left visible',
  'fine gold choker with subtle sparkle detailing, fitted close to the neck and completely clear of the neckline opening',
  'delicate double-layer chain necklace with tiny polished accents, framing the collarbone while keeping the bust area unobstructed',
  'minimalist gold lariat with a very short drop, adding a sensual vertical detail while preserving full neckline visibility'
];

const PANTS = [
  'high-waisted sculpting skinny pants dengan stretch fabric yang memeluk pinggang, pinggul dan peha secara kemas',
  'super skinny contour-fit pants dengan high-rise waist dan shaping seams yang menonjolkan lengkungan pinggul',
  'body-hugging stretch cargo pants dengan slim pockets dan fitted seat construction untuk siluet belakang yang lebih defined',
  'high-waisted skinny utility pants dengan sculpted waistband dan close fit di bahagian pinggul serta peha',
  'curve-enhancing skinny jeans dengan stretch denim, contoured waistband dan fitted rear shaping',
  'second-skin stretch pants dengan smooth sculpting fabric dan close contour dari pinggang hingga buku lali',
  'high-rise jeggings dengan ultra-stretch fabric, fitted hip construction dan slim tapered legs',
  'fitted bootcut pants dengan high waist, close hip-and-thigh fit dan flare halus di bahagian bawah',
  'slim-fit cargo jogger dengan fitted waist, contoured hip shaping dan tapered ankle construction',
  'high-waisted tapered pants dengan stretch fabric yang mengikuti bentuk pinggul dan peha secara rapat',
  'compression-style fitted pants dengan sculpting waistband dan smooth body-contouring construction',
  'stretch tactical skinny pants dengan close-fit hip panels dan slim utility detailing',
  'four-way stretch utility pants dengan high-rise waist dan shaped seams yang memberi siluet lebih curvy',
  'spandex-blend skinny pants dengan body-sculpting fit, narrow waist dan fitted thigh construction',
  'high-waisted yoga-style fitted pants dengan smooth stretch fabric dan contoured rear seam',
  'scrunch-seam high-waisted leggings-style pants dengan sculpted waistband dan fitted rear contour',
  'seamless body-contouring skinny pants dengan high-rise waist dan second-skin stretch construction',
  'high-waisted ponte skinny pants dengan firm stretch fabric dan structured curve-enhancing seams',
  'Y2K low-flare fitted pants dengan tight hip-and-thigh fit dan subtle bootcut hem',
  'Gen Z high-waisted sculpting pants dengan ultra-fitted waist, contoured hip seams dan sleek elongated leg silhouette'
];

const SHOES = [
  'strappy stiletto heels dengan tali nipis',
  'pointed-toe high heels dengan slim heel',
  'platform high heels dengan ankle strap',
  'open-toe stiletto sandals',
  'sleek thigh-high heeled boots',
  'knee-high fitted boots dengan slim heel',
  'pointed-toe slingback heels',
  'minimalist strappy kitten heels',
  'peep-toe platform heels',
  'lace-up high heel sandals',
  'clear strap stiletto heels',
  'mule heels dengan pointed toe',
  'ankle-wrap stiletto sandals',
  'patent leather pointed pumps',
  'sleek heeled ankle boots'
];

const FABRICS = [
  'ultra-stretch spandex blend yang memeluk tubuh rapat sambil menonjolkan visual bust besar dan penuh',
  'high-elasticity body-hugging fabric yang menyokong kesan push-up bra dengan bust projection yang jelas',
  'super stretch jersey yang membalut torso ketat dan menekankan bentuk dada yang penuh serta terangkat',
  'elastic ribbed knit yang mengikuti bentuk badan rapat dengan penekanan kuat pada upper bust fullness',
  'stretch ponte knit yang memberi struktur kemas pada torso sambil menonjolkan siluet bust yang besar',
  'compression stretch fabric yang mengangkat bentuk bust secara visual untuk efek lebih padat dan lifted',
  'second-skin stretch microfiber yang melekap kemas dan memperjelas bentuk bust yang penuh dan rounded',
  'elastic contouring fabric yang membentuk badan rapat dengan fokus pada visual cleavage dan bust fullness',
  'power stretch sculpting fabric yang membantu menghasilkan siluet bust yang besar, lifted dan defined',
  'high-recovery shaping fabric yang mengekalkan efek push-up visual dengan bust shape yang jelas dan projected'
];

const HIJAB_COLORS = [
  'Navy Blue','Deep Maroon','Burgundy Wine','Charcoal Grey','Forest Green','Slate Blue','Midnight Blue',
  'Dark Violet','Indigo Blue','Plum Purple','Black Onyx','Dark Chocolate','Espresso Brown','Storm Gray',
  'Deep Teal','Dusty Rose','Soft Caramel','Muted Taupe','Mauve Pink','Sage Green','Terracotta','Cocoa Brown',
  'Khaki Sand','Olive Green','Mustard Yellow','Golden Amber','Burnt Orange','Rose Gold',
  'Royal Blue','Cobalt Blue','Sapphire Blue','Petrol Blue','Steel Blue','Denim Blue','Dusty Blue',
  'Powder Blue','Sky Blue','Ice Blue','Blue Grey','Ocean Blue','Prussian Blue','Ink Blue',
  'Emerald Green','Jade Green','Bottle Green','Pine Green','Moss Green','Army Green','Avocado Green',
  'Muted Mint','Mint Green','Seafoam Green','Eucalyptus Green','Fern Green','Hunter Green','Peacock Green',
  'Ruby Red','Cherry Red','Brick Red','Crimson Red','Wine Red','Berry Red','Mulberry Red',
  'Rust Red','Rosewood','Mahogany Red','Garnet Red','Oxblood','Deep Coral','Muted Coral',
  'Lilac Purple','Lavender Purple','Orchid Purple','Amethyst Purple','Eggplant Purple','Mauve Purple',
  'Dusty Lavender','Heather Purple','Grape Purple','Aubergine','Royal Purple','Smoky Purple',
  'Blush Pink','Baby Pink','Rose Pink','Dusty Pink','Antique Rose','Nude Pink','Peach Pink',
  'Salmon Pink','Coral Pink','Raspberry Pink','Fuchsia Pink','Magenta Pink','Muted Berry',
  'Cream Beige','Ivory Cream','Warm Ivory','Vanilla Cream','Oat Beige','Sand Beige','Almond Beige',
  'Latte Beige','Biscuit Beige','Champagne Beige','Nude Beige','Stone Beige','Mushroom Beige',
  'Greige','Warm Greige','Cool Greige',
  'Camel Brown','Mocha Brown','Coffee Brown','Walnut Brown','Chestnut Brown','Hazelnut Brown',
  'Cinnamon Brown','Toffee Brown','Maple Brown','Caramel Brown','Milk Tea Brown','Taupe Brown',
  'Earth Brown','Clay Brown','Copper Brown',
  'Pearl Grey','Silver Grey','Ash Grey','Dove Grey','Smoke Grey','Graphite Grey','Gunmetal Grey',
  'Cool Grey','Warm Grey','Blue Grey','Misty Grey','Concrete Grey',
  'Jet Black','Soft Black','Matte Black','Blue Black','Brown Black',
  'White','Soft White','Ivory White','Pearl White','Cream White','Warm White',
  'Peach','Apricot','Soft Peach','Dusty Peach','Burnt Peach','Papaya Orange','Tangerine Orange',
  'Pumpkin Orange','Copper Orange','Amber Orange','Cinnamon Orange',
  'Lemon Yellow','Butter Yellow','Pastel Yellow','Honey Yellow','Ochre Yellow','Saffron Yellow',
  'Marigold Yellow','Champagne Gold','Antique Gold','Bronze Gold',
  'Pistachio Green','Matcha Green','Celadon Green','Olive Sage','Dusty Olive','Khaki Green',
  'Lime Olive','Tea Green',
  'Turquoise','Aqua Blue','Aquamarine','Lagoon Blue','Cerulean Blue','Teal Blue','Dusty Teal',
  'Dark Cyan','Muted Cyan',
  'Rose Beige','Pink Beige','Peach Beige','Mauve Beige','Lavender Grey','Purple Grey',
  'Sage Grey','Green Grey','Blue Taupe','Rose Taupe',
  'Chocolate Mauve','Cocoa Rose','Caramel Rose','Mocha Rose','Latte Mauve','Espresso Plum',
  'Burgundy Brown','Plum Brown','Terracotta Rose','Rust Mauve',
  'Emerald Black','Navy Black','Midnight Teal','Forest Black','Plum Black','Burgundy Black',
  'Charcoal Navy','Deep Olive','Deep Moss','Deep Sapphire',
  'Pastel Lilac','Pastel Mint','Pastel Peach','Pastel Rose','Pastel Blue','Pastel Sage',
  'Pastel Mauve','Pastel Beige','Pastel Lavender',
  'Dusty Terracotta','Dusty Burgundy','Dusty Teal','Dusty Olive','Dusty Mustard','Dusty Caramel',
  'Dusty Cocoa','Dusty Plum','Dusty Navy',
  'Muted Emerald','Muted Sapphire','Muted Ruby','Muted Lavender','Muted Coral','Muted Peach',
  'Muted Olive','Muted Blue','Muted Burgundy',
  'Jewel Emerald','Jewel Sapphire','Jewel Ruby','Jewel Amethyst','Jewel Garnet','Jewel Teal',
  'Copper Rose','Bronze Brown','Antique Bronze','Champagne Rose','Metallic Taupe',
  'Soft Gold','Muted Gold','Warm Bronze',
  'French Mauve','English Rose','Vintage Rose','Vintage Plum','Vintage Blue','Vintage Green',
  'Vintage Brown','Vintage Beige',
  'Milk Tea','Thai Tea','Matcha Latte','Mocha Latte','Caramel Latte','Rose Latte',
  'Lavender Latte','Cocoa Latte','Hazelnut Latte',
  'Desert Sand','Desert Rose','Desert Clay','Desert Olive','Desert Taupe','Desert Brown','Desert Sage',
  'Ocean Teal','Ocean Navy','Ocean Grey','Ocean Blue','Sea Green','Deep Sea Blue',
  'Autumn Maple','Autumn Rust','Autumn Olive','Autumn Mustard','Autumn Cocoa','Autumn Burgundy',
  'Spring Sage','Spring Lilac','Spring Peach','Spring Blue','Spring Rose','Spring Mint',
  'Smoky Rose','Smoky Blue','Smoky Teal','Smoky Olive','Smoky Mauve','Smoky Brown',
  'Deep Rose','Deep Mauve','Deep Copper','Deep Mustard','Deep Sage','Deep Cocoa','Deep Taupe','Deep Berry'
];

const HIJAB_STYLES = [
  'short neatly tied bawal dengan clean side folds, kemas di rahang dan tidak mempunyai chest drape',
  'compact turban-inspired hijab dengan smooth wrap, low-volume construction dan silhouette kepala yang sleek',
  'snug neck-tucked hijab dengan kemasan rapat di sisi muka dan fabric volume yang minimum',
  'minimalist square hijab tucked neatly into the collar dengan front drape yang sangat pendek',
  'short ring-tied hijab dengan clean knot placement dan structured folds di sekitar rahang',
  'streamlined sports hijab pendek dengan close-fit construction dan smooth contour di kepala',
  'back-tucked chiffon hijab pendek dengan lightweight folds dan tanpa bulky layering',
  'short folded bawal dengan crisp face framing dan no chest drape',
  'structured awning hijab pendek dengan clean front curve dan neat nape tuck',
  'snug face-framing hijab dengan slim silhouette dan fabric volume yang sangat minimum',
  'short crossed-neck shawl dengan smooth diagonal folds dan compact wrapping',
  'minimal instant hijab pendek dengan clean face opening dan streamlined lower edge',
  'short ring-detail hijab dengan neat side fastening dan compact drape',
  'short folded square hijab dengan symmetrical face framing dan lower edge yang kemas',
  'compact wrapped hijab dengan controlled folds dan close-to-head silhouette',
  'short pinned hijab dengan clean side pinning dan front drape yang minimum',
  'layered folded hijab dengan pleats halus, lightweight fabric dan low-volume construction',
  'cross-front compact hijab dengan neat overlapping folds dan slim neckline profile',
  'twisted-front hijab pendek dengan subtle centre detail dan controlled fabric volume',
  'rose-bun inspired hijab dengan compact back styling dan smooth front framing',
  'braided-accent hijab dengan subtle side detail dan sleek wrapped construction',
  'front-knotted hijab pendek dengan small structured knot dan clean side folds',
  'halo-style wrapped hijab dengan smooth crown shape dan minimal lower drape',
  'tudung bawal square dilipat kemas dengan crisp cheek framing dan potongan depan pendek',
  'tudung bawal premium dengan sharp edge folds, structured awning kecil dan compact drape',
  'tudung bawal moden dengan lipatan simetri di sisi muka dan no bulky chest layering',
  'tudung bawal chiffon pendek dengan soft controlled folds dan kemasan tucked yang clean',
  'tudung bawal square dengan inner senada, close face framing dan silhouette minimal',
  'tudung instant premium pendek dengan clean awning, smooth jawline framing dan streamlined cut',
  'modern turban-style hijab dengan sleek wrap, compact crown dan minimal fabric volume',
  'sports-style performance hijab dengan aerodynamic close fit, smooth face framing dan short streamlined cut',
  'Gen Z compact bawal dengan sharp symmetrical folds, clean jaw framing dan polished minimalist silhouette',
  'modern short shawl dengan neat side tuck, lightweight chiffon dan elegant close-to-head styling',
  'premium satin-look short hijab dengan controlled sheen, smooth structured folds dan compact silhouette',
  'minimalist monochrome hijab dengan seamless tucked finish, clean lines dan sophisticated low-volume styling',
  'sleek workwear hijab dengan structured face framing, short lower edge dan professional streamlined silhouette',
  'ultimate modern short hijab dengan clean symmetrical face framing, compact wrapping, minimal fabric bulk dan polished fitted silhouette'
];

const HAIR_COLORS = [
  'glossy soft black',
  'inky black',
  'blue-black gloss',
  'espresso black',
  'deep espresso brown',
  'rich chocolate brown',
  'molten chocolate brown',
  'dark mocha',
  'mocha gloss brunette',
  'dark mahogany',
  'mahogany cherry brown',
  'dark auburn',
  'deep copper',
  'burnt copper',
  'cowboy copper',
  'cherry cola brunette',
  'deep cherry cola',
  'black cherry brunette',
  'dark cherry mocha',
  'wine brunette',
  'deep burgundy brown',
  'red velvet brunette',
  'ruby brunette',
  'dark plum brown',
  'mulberry brunette',
  'caramel brunette',
  'caramel melt brunette',
  'dimensional caramel balayage',
  'honey brunette',
  'golden honey brunette',
  'golden-hour bronde',
  'champagne brunette',
  'old-money brunette',
  'expensive brunette',
  'ultra-glossy brunette',
  'glass-hair espresso brown',
  'sun-kissed brunette balayage',
  'chocolate caramel balayage',
  'mocha caramel balayage',
  'espresso caramel balayage',
  'face-framing money-piece brunette',
  'soft caramel money-piece',
  'honey money-piece brunette',
  'high-contrast brunette face-framing highlights',
  'Gen Z chunky caramel highlights on dark brown',
  'Y2K blonde streaks on dark brunette',
  'dark rooted blonde',
  'rooted champagne blonde',
  'icy platinum blonde',
  'rose-gold blonde',
  'black violet',
  'midnight blue-black'
];

const HAIRSTYLES = [
  'sleek high ponytail dengan face-framing strands yang menampakkan leher dan bahu',
  'glossy high ponytail dengan soft waves di hujung untuk glamorous nightlife look',
  'messy high ponytail dengan loose tendrils di sisi muka dan leher terbuka',
  'slicked-back ponytail dengan clean hairline dan polished glossy finish',
  'voluminous wavy ponytail dengan lifted crown dan loose face-framing pieces',
  'messy low bun dengan soft tendrils yang membingkai muka dan mendedahkan leher',
  'sleek low bun dengan centre part dan clean elegant silhouette',
  'high messy bun dengan wispy strands di sisi muka untuk effortless sexy look',
  'soft twisted bun dengan loose front pieces dan exposed neckline',
  'half-up high ponytail dengan loose waves dan face-framing layers',
  'half-up half-down hairstyle dengan voluminous curls dan lifted crown',
  'long loose waves dengan deep side part dan glossy salon finish',
  'soft Hollywood waves dengan deep side part dan polished volume',
  'long layered blowout dengan bouncy volume dan curtain bangs',
  'voluminous butterfly layers dengan face-framing pieces dan glossy finish',
  'straight glass-hair style dengan centre part dan sleek body-hugging silhouette',
  'long straight hair dengan deep side part dan one-side tucked behind ear',
  'wet-look slicked-back hairstyle dengan glossy finish dan exposed shoulders',
  'side-swept loose waves dengan satu sisi rambut diselit belakang telinga',
  'Y2K voluminous blowout dengan lifted roots dan flipped ends',
  'soft tousled waves dengan messy texture dan face-framing layers',
  'long beachy waves dengan natural volume dan seductive effortless movement',
  'high bubble ponytail dengan sleek crown dan polished finish',
  'braided high ponytail dengan sleek roots dan long dramatic length',
  'low side ponytail dengan loose waves dan soft face-framing strands'
];

const COLOR_NAMES = [
  'Midnight Black','Carbon Grey','Charcoal Black','Onyx Black','Slate Gray','Graphite Navy','Deep Cobalt','Dark Violet','Platinum Grey','Steel Silver','Military Olive','Forest Green','Sage Green','Khaki Sand','Sand Beige','Terracotta','Copper Brown','Mocha Brown','Royal Sapphire','Ocean Blue','Teal Blue','Forest Emerald','Golden Amber','Burnt Orange','Crimson Red','Wine Burgundy','Rose Gold','Blush Pink','Dusty Rose',
  'Jet Black','Soft Black','Blue Black','Espresso Black','Smoky Black','Black Coffee','Black Cherry','Obsidian Grey','Gunmetal Grey','Ash Grey','Stone Grey','Smoke Grey','Dove Grey','Pearl Grey','Concrete Grey','Cool Grey','Warm Grey','Silver Grey','Titanium Grey','Graphite Grey',
  'Midnight Navy','Ink Navy','Deep Navy','Storm Navy','Royal Navy','Prussian Blue','Sapphire Navy','Cobalt Blue','Electric Cobalt','Royal Blue','Azure Blue','Cerulean Blue','Denim Blue','Steel Blue','Slate Blue','Dusty Blue','Powder Blue','Sky Blue','Ice Blue','Arctic Blue','Ocean Navy','Deep Ocean','Lagoon Blue','Aqua Blue','Aquamarine','Turquoise Blue',
  'Dark Teal','Deep Teal','Petrol Teal','Ocean Teal','Dusty Teal','Muted Teal','Peacock Teal','Emerald Teal','Blue Teal','Sea Green','Deep Sea Green',
  'Emerald Green','Jewel Emerald','Bottle Green','Hunter Green','Pine Green','Moss Green','Olive Green','Dark Olive','Dusty Olive','Olive Sage','Eucalyptus Green','Fern Green','Avocado Green','Matcha Green','Pistachio Green','Celadon Green','Seafoam Green','Mint Green','Muted Mint','Tea Green','Lime Olive',
  'Military Khaki','Dark Khaki','Khaki Green','Khaki Beige','Desert Khaki','Army Green','Desert Olive','Earth Olive','Stone Olive',
  'Ivory','Warm Ivory','Soft Ivory','Pearl White','Cream White','Vanilla Cream','Milk White','Oat Cream','Butter Cream','Champagne Cream',
  'Nude Beige','Warm Beige','Cool Beige','Oat Beige','Almond Beige','Biscuit Beige','Latte Beige','Caramel Beige','Champagne Beige','Stone Beige','Mushroom Beige','Greige','Warm Greige','Cool Greige','Taupe Beige','Rose Beige','Peach Beige',
  'Desert Sand','Golden Sand','Soft Sand','Dune Beige','Desert Taupe','Stone Taupe','Muted Taupe','Rose Taupe','Mauve Taupe','Blue Taupe',
  'Espresso Brown','Dark Chocolate','Chocolate Brown','Cocoa Brown','Coffee Brown','Mocha Brown','Mocha Latte','Hazelnut Brown','Walnut Brown','Chestnut Brown','Caramel Brown','Toffee Brown','Maple Brown','Cinnamon Brown','Copper Brown','Bronze Brown','Clay Brown','Earth Brown','Mahogany Brown','Burgundy Brown','Plum Brown',
  'Milk Tea','Thai Tea','Caramel Latte','Cocoa Latte','Hazelnut Latte','Rose Latte','Lavender Latte','Matcha Latte','Tiramisu Brown',
  'Terracotta','Dusty Terracotta','Burnt Terracotta','Clay Terracotta','Rose Terracotta','Rust Orange','Burnt Orange','Copper Orange','Amber Orange','Pumpkin Orange','Tangerine Orange','Papaya Orange','Apricot Orange','Peach Orange',
  'Golden Amber','Honey Amber','Deep Amber','Burnt Amber','Saffron Gold','Mustard Yellow','Ochre Yellow','Honey Yellow','Butter Yellow','Pastel Yellow','Lemon Yellow','Marigold Yellow','Sunflower Yellow',
  'Soft Gold','Muted Gold','Champagne Gold','Antique Gold','Warm Gold','Bronze Gold','Copper Gold','Rose Gold','Champagne Rose','Antique Bronze','Metallic Bronze',
  'Crimson Red','Ruby Red','Cherry Red','Deep Cherry','Brick Red','Scarlet Red','Garnet Red','Oxblood Red','Mahogany Red','Rust Red','Rosewood Red','Wine Red','Merlot Red','Cabernet Red','Burgundy','Deep Burgundy',
  'Cherry Cola','Cherry Mocha','Black Cherry','Berry Red','Mulberry Red','Raspberry Red','Red Velvet','Ruby Wine','Plum Wine',
  'Blush Pink','Baby Pink','Soft Pink','Rose Pink','Dusty Pink','Antique Rose','Nude Pink','Peach Pink','Salmon Pink','Coral Pink','Muted Coral','Deep Rose','Smoky Rose','Vintage Rose','English Rose','French Rose',
  'Hot Pink','Fuchsia Pink','Magenta Pink','Raspberry Pink','Barbie Pink','Electric Pink','Neon Rose','Berry Pink',
  'Mauve Pink','Dusty Mauve','Muted Mauve','Deep Mauve','Smoky Mauve','Rose Mauve','Latte Mauve','Vintage Mauve',
  'Lavender','Dusty Lavender','Pastel Lavender','Lilac','Pastel Lilac','Orchid Purple','Amethyst Purple','Royal Purple','Plum Purple','Deep Plum','Eggplant Purple','Aubergine','Dark Violet','Black Violet','Smoky Purple','Muted Purple','Grape Purple',
  'Periwinkle','Blue Lavender','Lavender Grey','Purple Grey','Mauve Grey',
  'Pastel Blue','Pastel Mint','Pastel Sage','Pastel Peach','Pastel Rose','Pastel Mauve','Pastel Beige','Pastel Lemon','Pastel Lilac',
  'Dusty Sage','Dusty Olive','Dusty Blue','Dusty Teal','Dusty Navy','Dusty Plum','Dusty Burgundy','Dusty Cocoa','Dusty Caramel','Dusty Mustard','Dusty Peach',
  'Muted Emerald','Muted Sapphire','Muted Ruby','Muted Cobalt','Muted Olive','Muted Sage','Muted Blue','Muted Burgundy','Muted Peach','Muted Coral','Muted Lavender',
  'Jewel Sapphire','Jewel Emerald','Jewel Ruby','Jewel Amethyst','Jewel Garnet','Jewel Teal','Jewel Burgundy','Jewel Violet',
  'Electric Blue','Electric Cobalt','Electric Violet','Electric Purple','Electric Magenta','Electric Lime','Electric Teal',
  'Metallic Silver','Liquid Silver','Chrome Silver','Gunmetal Metallic','Metallic Graphite','Metallic Gold','Metallic Rose Gold','Metallic Copper','Metallic Bronze','Metallic Champagne','Metallic Sapphire','Metallic Emerald',
  'Pearlescent White','Pearlescent Pink','Pearlescent Lavender','Pearlescent Blue','Iridescent Silver','Iridescent Rose','Iridescent Violet','Iridescent Blue',
  'Deep Sapphire','Deep Emerald','Deep Teal','Deep Rose','Deep Mauve','Deep Copper','Deep Mustard','Deep Sage','Deep Cocoa','Deep Taupe','Deep Berry',
  'Smoky Blue','Smoky Teal','Smoky Olive','Smoky Brown','Smoky Mauve','Smoky Rose','Smoky Lavender','Smoky Navy',
  'Vintage Blue','Vintage Green','Vintage Brown','Vintage Beige','Vintage Rose','Vintage Plum','Vintage Burgundy',
  'Autumn Maple','Autumn Rust','Autumn Olive','Autumn Mustard','Autumn Cocoa','Autumn Burgundy','Autumn Copper','Autumn Amber',
  'Spring Sage','Spring Lilac','Spring Peach','Spring Blue','Spring Rose','Spring Mint','Spring Butter',
  'Desert Rose','Desert Clay','Desert Olive','Desert Brown','Desert Sage','Desert Copper',
  'Ocean Teal','Ocean Navy','Ocean Grey','Ocean Blue','Seafoam Blue','Lagoon Teal',
  'Cocoa Rose','Chocolate Mauve','Caramel Rose','Mocha Rose','Espresso Plum','Terracotta Rose','Rust Mauve','Copper Rose',
  'Emerald Black','Navy Black','Midnight Teal','Forest Black','Plum Black','Burgundy Black','Charcoal Navy','Deep Moss','Deep Sapphire',
  'Butter Yellow','Cherry Tomato Red','Powder Pink','Pistachio Green','Ice Blue','Chocolate Cherry','Mocha Mousse','Espresso Martini','Matcha Latte Green','Cobalt Pop','Silver Chrome','Liquid Metal','Champagne Shimmer'
];

const POSITIONS = ['Worker 1 is bertudung in the foreground standing in a soft three-quarter angle beside a side counter while checking a clipboard. Keep one foot slightly forward, shoulders relaxed and posture elongated. Worker 2 is free hair clearly positioned behind her in the background, quietly arranging sealed stock boxes at the rear counter.','Worker 2 is free hair in the foreground standing beside a display shelf with a subtle hip shift and one foot slightly forward while arranging price tags. Keep torso upright and face clearly visible. Worker 1 is bertudung clearly positioned behind her in the background, checking inventory at the rear counter.','Worker 1 is bertudung in the foreground beside a helmet display with a gentle 25-degree body angle, holding a stock note at waist level. Worker 2 is free hair clearly farther from the camera in the background, organizing shelf dividers.','Worker 2 is free hair in the foreground beside the front counter in a relaxed three-quarter stance while sorting small packaged accessories. Worker 1 is bertudung clearly farther from the camera in the background, arranging stock labels.','Worker 1 is bertudung in the foreground near the cash register with one foot slightly in front of the other while checking paperwork. Worker 2 is free hair clearly behind her in the background, restocking lightweight items.','Worker 2 is free hair in the foreground at a side display while checking a handheld inventory device. Keep one foot slightly forward and posture natural. Worker 1 is bertudung clearly behind her in the background, sorting paperwork.','Worker 1 is bertudung in the foreground beside a motorcycle display holding a clipboard at waist height with a soft three-quarter body angle. Worker 2 is free hair clearly farther back in the background, arranging stock on a rear shelf.','Worker 2 is free hair in the foreground beside a shelf while reaching slightly upward with one arm to adjust a lightweight item. Worker 1 is bertudung clearly positioned behind her in the background, checking cartons.','Worker 1 is bertudung in the foreground beside a workbench checking a barcode list in a relaxed editorial retail stance. Worker 2 is free hair clearly behind her in the background, dusting an unused shelf.','Worker 2 is free hair in the foreground beside a retail display while placing a lightweight package onto a waist-height shelf. Worker 1 is bertudung clearly behind her in the background, organizing office supplies.','Worker 1 is bertudung in the foreground standing beside sealed shipment boxes while reading a label. Worker 2 is free hair clearly farther back in the background, cleaning a side shelf.','Worker 2 is free hair in the foreground standing naturally beside a motorcycle while lightly wiping a side panel with one hand. Worker 1 is bertudung clearly behind her in the background, organizing paperwork.','Worker 1 is bertudung in the foreground at a shallow side angle beside a waist-height shelf while checking stock. Worker 2 is free hair clearly positioned behind her in the background, cleaning tools.','Worker 2 is free hair in the foreground at a side counter while writing a short inventory note. Worker 1 is bertudung clearly positioned behind her in the background, stacking flat cartons.','Worker 1 is bertudung in the foreground beside a display rack while adjusting one lightweight item at waist height. Worker 2 is free hair clearly farther from the camera in the background, working at the rear counter.','Worker 2 is free hair in the foreground standing beside lightweight boxes while reading a shipping label. Worker 1 is bertudung clearly farther from the camera in the background, checking inventory.','Worker 1 is bertudung in the foreground walking slowly along the display aisle while holding a small tablet at waist level. Worker 2 is free hair clearly behind her in the background, standing at the rear counter checking labels.','Worker 2 is free hair in the foreground walking naturally toward the accessories display while carrying one lightweight sealed package at waist height. Worker 1 is bertudung clearly behind her in the background, reviewing stock at a side shelf.','Worker 1 is bertudung in the foreground standing front three-quarter beside the cashier counter with one hand near a barcode scanner and the other holding a receipt sheet. Worker 2 is free hair clearly in the background, arranging small accessories in the rear display.','Worker 2 is free hair in the foreground standing front three-quarter near a helmet shelf while holding two price tags. Worker 1 is bertudung clearly in the background, entering inventory data at the back counter.','Worker 1 is bertudung in the foreground beside a motorcycle display at a soft 30-degree angle, holding a small product card at mid-torso height. Worker 2 is free hair clearly in the background, restocking a rear shelf.','Worker 2 is free hair in the foreground near the front counter at a soft 30-degree angle while checking a product code. Worker 1 is bertudung clearly in the background, organizing paperwork.','Worker 1 is bertudung in the foreground beside a tall display rack, one hand lightly touching the shelf edge and the other holding a barcode sheet. Worker 2 is free hair clearly in the background, sorting small boxes.','Worker 2 is free hair in the foreground beside a vertical accessories rack, one arm relaxed while the other adjusts a hanging packaged item. Worker 1 is bertudung clearly in the background, checking invoices behind the counter.','Worker 1 is bertudung in the foreground slightly off-center near a promotional display, holding a folded stock checklist with both hands. Worker 2 is free hair clearly behind her in the background, arranging merchandise.','Worker 2 is free hair in the foreground slightly off-center near a showroom display, holding a microfiber cloth loosely at her side while visually checking the area. Worker 1 is bertudung clearly behind her in the background, working at a rear desk.','Worker 1 is bertudung in the foreground beside the checkout counter in a relaxed contrapposto-lite stance, one hand holding a tablet and the other resting naturally by her side. Worker 2 is free hair clearly in the background, checking shelving.','Worker 2 is free hair in the foreground beside a product island in a relaxed natural stance with one foot slightly forward, holding an inventory scanner at waist height. Worker 1 is bertudung clearly in the background, arranging labels.','Worker 1 is bertudung in the foreground standing almost front-facing near the entrance display with a clipboard held lightly against one side of her torso. Worker 2 is free hair clearly behind her in the background, organizing packaged accessories.','Worker 2 is free hair in the foreground standing almost front-facing beside a promotional shelf while comparing two product labels. Worker 1 is bertudung clearly behind her in the background, checking stock at the rear counter.','Worker 1 is bertudung in the foreground standing beside stacked sealed cartons, one hand indicating a shipping label and the other holding a pen. Worker 2 is free hair clearly behind her in the background, arranging lightweight stock.','Worker 2 is free hair in the foreground standing beside stacked sealed cartons while holding a checklist and visually inspecting one label. Worker 1 is bertudung clearly behind her in the background, organizing display cards.','Worker 1 is bertudung in the foreground standing between two retail displays with a subtle upper-body turn toward a nearby shelf. Worker 2 is free hair clearly in the background, checking a side counter.','Worker 2 is free hair in the foreground standing between a display island and an accessories rack while reading a small package label. Worker 1 is bertudung clearly in the background, working at the rear shelf.','Worker 1 is bertudung in the foreground beside a waist-height display table, gently placing a lightweight accessory package onto the surface with both hands. Worker 2 is free hair clearly in the background, reading inventory notes.','Worker 2 is free hair in the foreground beside a waist-height display table, lifting one lightweight product slightly to inspect its label. Worker 1 is bertudung clearly in the background, arranging stock.','Worker 1 is bertudung in the foreground near a wall-mounted accessories display holding a small package at chest height and a barcode scanner at waist level. Worker 2 is free hair clearly in the background, sorting boxes.','Worker 2 is free hair in the foreground near a wall-mounted product display with one hand adjusting a lightweight packaged item and the other holding a price tag. Worker 1 is bertudung clearly in the background, checking paperwork.','Worker 1 is bertudung in the foreground in a natural side-profile three-quarter stance beside the cashier area, looking toward a handheld inventory screen. Worker 2 is free hair clearly in the background, organizing a shelf.','Worker 2 is free hair in the foreground in a natural side-profile three-quarter stance near a product rack, reading a small package label held at mid-torso height. Worker 1 is bertudung clearly in the background, working at the rear counter.','Worker 1 is bertudung in the foreground beside a glass display cabinet with one hand lightly near the cabinet edge and the other holding a product list. Worker 2 is free hair clearly in the background, sorting accessories.','Worker 2 is free hair in the foreground beside a glass display cabinet while checking a small product through the glass. Worker 1 is bertudung clearly in the background, reviewing stock.','Worker 1 is bertudung in the foreground near the centre aisle carrying a small empty retail basket at thigh height in one hand and a checklist in the other. Worker 2 is free hair clearly in the background, arranging merchandise.','Worker 2 is free hair in the foreground near the centre aisle carrying a lightweight empty stock tray at waist level while taking one short natural step forward. Worker 1 is bertudung clearly in the background, checking a side shelf.','Worker 1 is bertudung in the foreground standing near an accessories wall holding a small packaged product at waist level, body angled softly toward camera. Worker 2 is free hair clearly in the background, working behind the counter.','Worker 2 is free hair in the foreground standing beside an accessories wall while holding a lightweight packaged item loosely at one side. Worker 1 is bertudung clearly in the background, working at the rear counter.','Worker 1 is bertudung in the foreground near the entrance counter while checking a stock sheet, body mostly forward with one foot slightly ahead. Worker 2 is free hair clearly in the background at the rear shelf, holding a small package.','Worker 2 is free hair in the foreground near the front display while checking an inventory device at waist height. Worker 1 is bertudung clearly in the background near the back counter, checking paperwork.','Worker 1 is bertudung in the foreground in a clean full-body three-quarter stance near a display island, feet slightly staggered and one hand holding a product card. Worker 2 is free hair clearly in the background, working at the back wall display.','Worker 2 is free hair in the foreground in a clean full-body three-quarter stance near a product rack, one foot slightly forward while holding a small inventory tablet. Worker 1 is bertudung clearly in the background, working at the rear counter.'];

const BACKGROUNDS = [
  'kedai DIY tools Malaysia yang realistik dengan rak drill, impact wrench, screwdriver set, measuring tools, toolbox, extension cord, fastener dan kaunter pembayaran dengan pencahayaan LED putih semula jadi',
  'kedai hardware moden Malaysia dengan rak power tools, hand tools, storage box, cable ties, adhesive, safety equipment dan lorong produk yang tersusun rapat tetapi realistik',
  'kedai automotive accessories Malaysia dengan rak wiper, car care products, phone holder, dashcam, charger kereta, lampu LED, tyre inflator dan aksesori dalaman kereta',
  'kedai sparepart automotive Malaysia dengan rak brake pad, spark plug, filter, bulb, fuse, engine oil, coolant, battery accessories dan kotak alat ganti tersusun pada shelving industri',
  'kedai gadget Malaysia yang realistik dengan rak charger, powerbank, cable, earphone, phone case, smart accessories dan kaunter kaca dengan pencahayaan retail neutral',
  'kedai aksesori gadget moden dengan wall display penuh cable, adapter, wireless charger, phone holder, earbuds, small electronics dan product packaging yang tersusun',
  'kedai serbaneka DIY dan gadget Malaysia dengan kombinasi rak tools, electrical accessories, automotive products dan small gadgets dalam suasana retail harian yang realistik',
  'kedai automotive dan DIY tools dengan glass counter, rak hand tools, socket set, impact tools, car accessories dan beberapa kotak stok di bahagian belakang',
  'workshop automotive Malaysia dengan toolbox profesional, rak tools, jack, tyre equipment, diagnostic device, sparepart boxes dan pencahayaan putih bercampur cahaya semula jadi',
  'kedai car accessories Malaysia dengan display dashcam, reverse camera, car charger, phone mount, steering accessories, cleaning products dan rak barang kecil yang padat',
  'kedai electronics accessories Malaysia dengan rak plug, extension cable, adapter, battery, LED light, powerbank dan small tools di bahagian sisi',
  'kedai tools premium Malaysia dengan matte metal shelving, drill display, impact wrench, tool cases, measuring equipment dan clean industrial lighting',
  'kedai hardware kejiranan Malaysia dengan rak bolt, screw, tape, cutter, plier, wrench, electrical accessories, toolbox dan kaunter kecil yang digunakan setiap hari',
  'kedai automotive urban Malaysia dengan rak engine oil, car care products, wiper, bulb, fuse, battery accessories dan gadget kereta berhampiran kaunter',
  'showroom tools dan automotive accessories yang moden dengan product islands, illuminated wall displays, clean flooring dan neutral architectural LED lighting',
  'kedai gadget dan aksesori telefon Malaysia dengan display phone cases, charging cable, powerbank, earbuds, holders, mini speakers dan kaunter checkout yang kemas',
  'kedai DIY dan electrical accessories dengan rak extension cord, LED bulb, plug, tester, screwdriver, drill accessories dan storage bins yang tersusun',
  'kedai multi-category retail Malaysia dengan bahagian DIY tools, automotive accessories, gadget dan household accessories dalam satu ruang kedai yang realistik',
  'kedai tools dan sparepart yang sedikit sibuk dengan rak tinggi, kotak stok, hand tools tergantung, automotive consumables dan pekerja melakukan tugas biasa di background',
  'kedai automotive accessories tepi jalan Malaysia dengan rak car care, wiper, lampu kereta, phone mount, dashcam, tyre accessories dan cahaya siang masuk dari pintu depan',
  'kedai gadget premium Malaysia dengan dark shelving, illuminated product wall, charging accessories, phone accessories dan soft neutral retail lighting',
  'kedai hardware moden dengan pegboard penuh hand tools, boxed power tools, measuring tape, utility knives, clamps dan industrial storage shelves',
  'kedai DIY tools compact dengan power tool display, drill bits, socket set, spanner, screwdrivers, safety gloves dan realistic smartphone depth of field',
  'kedai automotive performance accessories dengan display gauges, lighting accessories, diagnostic tools, car electronics, cleaning products dan branded packaging',
  'kedai car detailing supplies Malaysia dengan microfiber cloth, polish, wax, cleaning spray, brush, vacuum accessories dan machine polisher pada rak',
  'kedai gadget dan automotive electronics dengan dashcam, reverse camera, USB charger, Bluetooth accessories, car phone holder dan cable display',
  'kedai aksesori serbaguna Malaysia dengan wall hooks penuh packaged products, storage boxes, electrical items, tools dan small gadgets',
  'premium industrial-style tools store dengan black metal shelving, illuminated power tools, organized toolboxes, polished concrete floor dan cinematic retail lighting',
  'modern automotive accessories showroom dengan glossy product displays, car electronics, lighting accessories, cleaning products dan clean checkout counter',
  'kedai DIY lifestyle Malaysia dengan tools, storage solutions, electrical accessories, small gadgets dan household hardware tersusun mengikut kategori',
  'kedai workshop supply Malaysia dengan rak socket set, torque wrench, pneumatic tools, gloves, lubricants, electrical tester dan spare consumables',
  'kedai mobile accessories yang padat tetapi kemas dengan cable wall, adapters, chargers, phone holders, earbuds, smart gadgets dan small boxed products',
  'kedai multi-brand automotive dan tools dengan rack engine oil, tools, car accessories, diagnostic equipment dan retail counter di bahagian tengah',
  'kedai gadget malam hari dengan interior LED terang, glass storefront reflections, illuminated product shelves dan suasana retail bandar Malaysia',
  'kedai DIY tools waktu siang dengan cahaya semula jadi dari pintu kaca, organized power tools, tool cases dan hardware accessories pada rak',
  'kedai automotive accessories premium dengan graphite shelving, illuminated dashcam display, car gadgets, detailing products dan subtle showroom lighting',
  'kedai hardware dan gadget hybrid dengan pegboard tools pada satu sisi, electronic accessories pada sisi lain dan kaunter checkout di tengah',
  'kedai serbaneka automotive, tools dan gadget Malaysia dengan realistic mixed inventory, boxed products, hanging accessories dan neutral-white retail lighting',
  'kedai professional tools supply dengan heavy-duty tool cases, drill, impact wrench, measuring equipment, socket sets dan clean industrial display',
  'kedai accessories dan gadgets urban Malaysia dengan compact display islands, wall-mounted packaged products, checkout terminal dan softly blurred background activity'
];

const NEGATIVE_PROMPT = 'product redesign, altered product shape, altered proportions, changed components, missing parts, extra parts, duplicate product, different product, changed colors, altered printed text, modified label, recreated packaging, product deformation, product morphing, watermark, screenshot UI';

// ==========================================
// UTILITY FUNCTIONS
// RANDOM WITHOUT REPEAT
//
// FOREGROUND ORDER:
// 1  → HIJAB FRONT     / FREE HAIR BACK
// 2  → FREE HAIR FRONT / HIJAB BACK
// 3  → HIJAB FRONT     / FREE HAIR BACK
// 4  → FREE HAIR FRONT / HIJAB BACK
// ==========================================

// ==========================================
// SHUFFLE ARRAY
// ==========================================

/**
 * Fisher-Yates shuffle.
 *
 * @template T
 * @param {readonly T[]} array
 * @returns {T[]}
 */
function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [
      shuffled[i],
      shuffled[j]
    ] = [
      shuffled[j],
      shuffled[i]
    ];
  }

  return shuffled;
}


// ==========================================
// UNIQUE RANDOM PICKER
// ==========================================

/**
 * Random picker tanpa repeat selagi pool belum habis.
 *
 * Bila semua item telah digunakan:
 * - pool refill
 * - shuffle semula
 * - cuba elak item terakhir cycle lama
 *   menjadi item pertama cycle baru
 *
 * @template T
 * @param {readonly T[]} array
 */
function createUniquePicker(array) {
  let pool = [];
  let lastValue = '';

  /**
   * @param {T | ''} avoidValue
   * @returns {T | ''}
   */
  function pick(avoidValue = '') {
    if (!Array.isArray(array) || array.length === 0) {
      return '';
    }

    if (array.length === 1) {
      const value = array[0];

      lastValue = value;

      return value;
    }


    // ======================================
    // REFILL POOL
    // ======================================

    if (pool.length === 0) {
      pool = shuffleArray(array);

      // Kita guna pop().
      // Jadi item di hujung array ialah item
      // yang akan keluar dahulu.
      if (
        lastValue &&
        pool.length > 1 &&
        pool[pool.length - 1] === lastValue
      ) {
        const swapIndex = Math.floor(
          Math.random() * (pool.length - 1)
        );

        [
          pool[pool.length - 1],
          pool[swapIndex]
        ] = [
          pool[swapIndex],
          pool[pool.length - 1]
        ];
      }
    }


    // ======================================
    // AVOID SPECIFIC VALUE
    // ======================================

    if (avoidValue && pool.length > 1) {
      for (let i = pool.length - 1; i >= 0; i--) {
        if (pool[i] !== avoidValue) {
          const [value] = pool.splice(i, 1);

          lastValue = value;

          return value;
        }
      }
    }


    // ======================================
    // NORMAL PICK
    // ======================================

    const value = pool.pop();

    lastValue = value;

    return value;
  }


  // ========================================
  // RESET PICKER
  // ========================================

  pick.reset = function reset() {
    pool = [];
    lastValue = '';
  };


  return pick;
}

/**
 * Pastikan pilihan Worker 2 berbeza daripada Worker 1 apabila
 * kategori mempunyai lebih daripada satu nilai.
 *
 * @template T
 * @param {(avoidValue?: T | '') => T | ''} picker
 * @param {readonly T[]} sourceArray
 * @param {T | ''} avoidValue
 * @returns {T | ''}
 */
function pickGuaranteedDifferent(picker, sourceArray, avoidValue) {
  let value = picker(avoidValue);

  if (!Array.isArray(sourceArray) || sourceArray.length <= 1 || value !== avoidValue) {
    return value;
  }

  const maxAttempts = Math.max(2, sourceArray.length * 2);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    value = picker(avoidValue);
    if (value !== avoidValue) return value;
  }

  return value;
}

// ==========================================
// POSITION CLASSIFICATION
// ==========================================

/**
 * Check sama ada position ini sesuai untuk:
 *
 * Worker 1 = HIJAB di depan
 * Worker 2 = FREE HAIR di belakang
 *
 * @param {string} position
 * @returns {boolean}
 */
function isHijabFrontPosition(position) {
  if (typeof position !== 'string') {
    return false;
  }

  const text = position
    .toLowerCase()
    .trim();


  // Position mesti bermula dengan Worker 1 bertudung.
  if (!text.startsWith('worker 1 is bertudung')) {
    return false;
  }


  // Elakkan position yang secara jelas meletakkan
  // Worker 2 di foreground.
  if (
    text.includes('worker 2 is free hair in the foreground') ||
    text.includes('worker 2 is free hair in the mid-foreground')
  ) {
    return false;
  }


  // Position Worker 1 yang sesuai.
  return true;
}


/**
 * Check sama ada position ini sesuai untuk:
 *
 * Worker 2 = FREE HAIR di depan
 * Worker 1 = HIJAB di belakang
 *
 * @param {string} position
 * @returns {boolean}
 */
function isFreeHairFrontPosition(position) {
  if (typeof position !== 'string') {
    return false;
  }

  const text = position
    .toLowerCase()
    .trim();


  if (!text.startsWith('worker 2 is free hair')) {
    return false;
  }


  if (
    text.includes('worker 1 is bertudung in the foreground') ||
    text.includes('worker 1 is bertudung in the mid-foreground')
  ) {
    return false;
  }


  return true;
}


// ==========================================
// SPLIT POSITIONS
// ==========================================

const HIJAB_FRONT_POSITIONS =
  POSITIONS.filter(
    isHijabFrontPosition
  );


const FREEHAIR_FRONT_POSITIONS =
  POSITIONS.filter(
    isFreeHairFrontPosition
  );


// ==========================================
// SAFE FALLBACKS
// ==========================================

const SAFE_HIJAB_FRONT_POSITIONS =
  HIJAB_FRONT_POSITIONS.length > 0
    ? HIJAB_FRONT_POSITIONS
    : POSITIONS;


const SAFE_FREEHAIR_FRONT_POSITIONS =
  FREEHAIR_FRONT_POSITIONS.length > 0
    ? FREEHAIR_FRONT_POSITIONS
    : POSITIONS;


// ==========================================
// RANDOM PICKERS
// ==========================================


// ------------------------------------------
// BACKGROUND
// ------------------------------------------

const pickBackground =
  createUniquePicker(
    BACKGROUNDS
  );


// ------------------------------------------
// POSITION
// ------------------------------------------

const pickHijabFrontPosition =
  createUniquePicker(
    SAFE_HIJAB_FRONT_POSITIONS
  );


const pickFreeHairFrontPosition =
  createUniquePicker(
    SAFE_FREEHAIR_FRONT_POSITIONS
  );


// ------------------------------------------
// TOP COLORS
// ------------------------------------------

const pickTopColor =
  createUniquePicker(
    COLOR_NAMES
  );

// ==========================================
// WORKER 1 — HIJAB
// ==========================================

const pickHijabTop =
  createUniquePicker(
    TOPS_HIJAB
  );


const pickHijabFabric =
  createUniquePicker(
    FABRICS
  );


const pickHijabStyle =
  createUniquePicker(
    HIJAB_STYLES
  );


const pickHijabColor =
  createUniquePicker(
    HIJAB_COLORS
  );


const pickHijabPants =
  createUniquePicker(
    PANTS
  );


const pickHijabShoes =
  createUniquePicker(
    SHOES
  );


// ==========================================
// WORKER 2 — FREE HAIR
// ==========================================

const pickFreeHairTop =
  createUniquePicker(
    TOPS_FREEHAIR
  );


const pickFreeHairFabric =
  createUniquePicker(
    FABRICS
  );


const pickHairStyle =
  createUniquePicker(
    HAIRSTYLES
  );


const pickHairColor =
  createUniquePicker(
    HAIR_COLORS
  );


const pickFreeHairPants =
  createUniquePicker(
    PANTS
  );


const pickFreeHairShoes =
  createUniquePicker(
    SHOES
  );


const pickAccessory =
  createUniquePicker(
    ACCESSORIES
  );


// ==========================================
// RESET ALL RANDOM POOLS
// ==========================================

function resetOutfitRandomPools() {
  // Background
  pickBackground.reset();


  // Positions
  pickHijabFrontPosition.reset();
  pickFreeHairFrontPosition.reset();


  // Colors
  pickTopColor.reset();


  // Worker 1 — Hijab
  pickHijabTop.reset();
  pickHijabFabric.reset();
  pickHijabStyle.reset();
  pickHijabColor.reset();
  pickHijabPants.reset();
  pickHijabShoes.reset();


  // Worker 2 — Free Hair
  pickFreeHairTop.reset();
  pickFreeHairFabric.reset();
  pickHairStyle.reset();
  pickHairColor.reset();
  pickFreeHairPants.reset();
  pickFreeHairShoes.reset();
  pickAccessory.reset();
}

// ==========================================
// WORKER PLACEMENT
// ==========================================

/**
 * Tetapkan siapa di depan dan belakang.
 *
 * imageIndex 0:
 * HIJAB FRONT
 * FREEHAIR BACK
 *
 * imageIndex 1:
 * FREEHAIR FRONT
 * HIJAB BACK
 *
 * imageIndex 2:
 * HIJAB FRONT
 * FREEHAIR BACK
 *
 * dan seterusnya.
 *
 * @param {number} imageIndex
 */
function getWorkerPlacement(imageIndex) {
  const hijabIsFront =
    imageIndex % 2 === 0;


  if (hijabIsFront) {
    return {
      foregroundWorker: 'hijab',
      backgroundWorker: 'freehair',

      worker1Placement: 'foreground',
      worker2Placement: 'background',

      worker1Depth: 'front',
      worker2Depth: 'back'
    };
  }


  return {
    foregroundWorker: 'freehair',
    backgroundWorker: 'hijab',

    worker1Placement: 'background',
    worker2Placement: 'foreground',

    worker1Depth: 'back',
    worker2Depth: 'front'
  };
}


// ==========================================
// ALTERNATING POSITION
// ==========================================

/**
 * Pilih position yang betul berdasarkan
 * siapa yang perlu berada di depan.
 *
 * Position masih RANDOM tetapi:
 *
 * HIJAB FRONT hanya ambil
 * daripada HIJAB_FRONT_POSITIONS.
 *
 * FREEHAIR FRONT hanya ambil
 * daripada FREEHAIR_FRONT_POSITIONS.
 *
 * @param {number} imageIndex
 * @returns {string}
 */
function pickAlternatingPosition(imageIndex) {
  const placement =
    getWorkerPlacement(imageIndex);


  if (
    placement.foregroundWorker === 'hijab'
  ) {
    return pickHijabFrontPosition();
  }


  return pickFreeHairFrontPosition();
}


// ==========================================
// PLACEMENT PROMPT
// ==========================================

/**
 * Arahan tambahan yang sangat jelas kepada AI
 * tentang kedudukan dua pekerja.
 *
 * Ini membantu elakkan model menukar siapa depan
 * dan siapa belakang walaupun POSITION sudah betul.
 *
 * @param {number} imageIndex
 * @returns {string}
 */
function getPlacementPrompt(imageIndex) {
  const placement =
    getWorkerPlacement(imageIndex);


  if (
    placement.foregroundWorker === 'hijab'
  ) {
    return [
      'Worker 1 is bertudung and MUST be the primary worker in the foreground.',
      'Worker 2 is free hair and MUST remain behind Worker 1 in the background or rear middle-ground.',
      'Do not swap their depth positions.',
      'Worker 1 must appear visually closer to the camera than Worker 2.',
      'Worker 2 must remain clearly farther from the camera.'
    ].join(' ');
  }


  return [
    'Worker 2 is free hair and MUST be the primary worker in the foreground.',
    'Worker 1 is bertudung and MUST remain behind Worker 2 in the background or rear middle-ground.',
    'Do not swap their depth positions.',
    'Worker 2 must appear visually closer to the camera than Worker 1.',
    'Worker 1 must remain clearly farther from the camera.'
  ].join(' ');
}


// ==========================================
// WORKER SILENCE PROMPT
// ==========================================

const WORKER_BEHAVIOR_PROMPT = [
  'Both workers must remain silent at all times.',
  'Workers must not speak, talk, lip-sync or move their lips.',
  'Their mouths remain naturally closed or show only a subtle natural smile.',
  'Workers must not talk to each other.',
  'Workers must not address the camera.',
  'Each worker performs her own separate realistic retail task.',
  'Workers must not touch the featured product.'
].join(' ');

// ==========================================
// GENERATE ONE OUTFIT
// ==========================================

/**
 * @param {number} batchSeed
 * @param {number} imageIndex
 */
function generateOutfit(
  batchSeed,
  imageIndex
) {
  // ========================================
  // PLACEMENT
  // ========================================

  const placement =
    getWorkerPlacement(
      imageIndex
    );


  const position =
    pickAlternatingPosition(
      imageIndex
    );


  const placementPrompt =
    getPlacementPrompt(
      imageIndex
    );


  // ========================================
  // COLORS
  // ========================================

  const topColor1 =
    pickTopColor();


  const topColor2 =
    pickGuaranteedDifferent(
      pickTopColor,
      COLOR_NAMES,
      topColor1
    );


  // ========================================
  // FABRICS
  // ========================================

  const worker1Fabric =
    pickHijabFabric();


  const worker2Fabric =
    pickGuaranteedDifferent(
      pickFreeHairFabric,
      FABRICS,
      worker1Fabric
    );


  // ========================================
  // PANTS
  // ========================================

  const worker1Pants =
    pickHijabPants();


  const worker2Pants =
    pickGuaranteedDifferent(
      pickFreeHairPants,
      PANTS,
      worker1Pants
    );


  // ========================================
  // SHOES
  // ========================================

  const worker1Shoes =
    pickHijabShoes();


  const worker2Shoes =
    pickGuaranteedDifferent(
      pickFreeHairShoes,
      SHOES,
      worker1Shoes
    );


  // ========================================
  // RETURN
  // ========================================

  return {
    id: `${batchSeed}-${imageIndex}`,

    imageIndex,

    imageNumber:
      imageIndex + 1,


    // ======================================
    // SCENE
    // ======================================

    background:
      pickBackground(),

    position,

    placementPrompt,

    workerBehaviorPrompt:
      WORKER_BEHAVIOR_PROMPT,


    // ======================================
    // DEPTH
    // ======================================

    foregroundWorker:
      placement.foregroundWorker,

    backgroundWorker:
      placement.backgroundWorker,


    // ======================================
    // WORKER 1 — HIJAB
    // ======================================

    worker1: {
      type: 'hijab',

      placement:
        placement.worker1Placement,

      depth:
        placement.worker1Depth,

      isForeground:
        placement.worker1Placement ===
        'foreground',

      isBackground:
        placement.worker1Placement ===
        'background',

      top:
        `${pickHijabTop()} daripada ${worker1Fabric}`,

      fabric:
        worker1Fabric,

      topColor:
        topColor1,

      hijabStyle:
        pickHijabStyle(),

      hijabColor:
        pickHijabColor(),

      pants:
        worker1Pants,

      shoes:
        worker1Shoes
    },


    // ======================================
    // WORKER 2 — FREE HAIR
    // ======================================

    worker2: {
      type: 'freehair',

      placement:
        placement.worker2Placement,

      depth:
        placement.worker2Depth,

      isForeground:
        placement.worker2Placement ===
        'foreground',

      isBackground:
        placement.worker2Placement ===
        'background',

      top:
        `${pickFreeHairTop()} daripada ${worker2Fabric}`,

      fabric:
        worker2Fabric,

      topColor:
        topColor2,

      hairStyle:
        pickHairStyle(),

      hairColor:
        pickHairColor(),

      pants:
        worker2Pants,

      shoes:
        worker2Shoes,

      accessory:
        pickAccessory()
    }
  };
}

// ==========================================
// GENERATE FULL BATCH
// ==========================================

/**
 * Generate batch maksimum 15 imej.
 *
 * Setiap batch bermula dengan random shuffle baru.
 *
 * @param {number} count
 */
function generateOutfitBatch(
  count = 15
) {
  const requestedCount =
    Number(count) || 1;


  const safeCount =
    Math.max(
      1,
      Math.min(
        15,
        requestedCount
      )
    );


  // Batch seed digunakan untuk ID.
  // Random selection tidak bergantung pada seed.
  const batchSeed =
    Date.now() +
    Math.floor(
      Math.random() *
      1000000
    );


  // Shuffle fresh untuk batch baru.
  resetOutfitRandomPools();


  return Array.from(
    {
      length: safeCount
    },

    (_, imageIndex) =>
      generateOutfit(
        batchSeed,
        imageIndex
      )
  );
}


// ==========================================
// RETRY ONE IMAGE
// ==========================================

/**
 * Retry satu imej.
 *
 * Penting:
 * imageIndex asal digunakan supaya
 * order foreground/back tetap sama.
 *
 * Contoh:
 *
 * imageIndex 0
 * tetap HIJAB FRONT
 *
 * imageIndex 1
 * tetap FREEHAIR FRONT
 *
 * @param {number} imageIndex
 */
function generateRetryOutfit(
  imageIndex = 0
) {
  const safeImageIndex =
    Math.max(
      0,
      Number(imageIndex) || 0
    );


  const retrySeed =
    Date.now() +
    Math.floor(
      Math.random() *
      1000000
    );


  return generateOutfit(
    retrySeed,
    safeImageIndex
  );
}


// ==========================================
// OPTIONAL — POSITION SUMMARY
// ==========================================

/**
 * Untuk debug sahaja.
 *
 * @param {number} imageIndex
 */
function getPlacementSummary(
  imageIndex
) {
  const placement =
    getWorkerPlacement(
      imageIndex
    );


  return {
    image:
      imageIndex + 1,

    front:
      placement.foregroundWorker,

    back:
      placement.backgroundWorker,

    worker1:
      placement.worker1Placement,

    worker2:
      placement.worker2Placement
  };
}


// ==========================================
// OPTIONAL — BATCH AUDIT
// ==========================================

/**
 * Audit batch untuk confirm pattern:
 *
 * HIJAB FRONT
 * FREEHAIR FRONT
 * HIJAB FRONT
 * FREEHAIR FRONT
 *
 * @param {number} count
 */
function auditOutfitBatch(
  count = 15
) {
  const batch =
    generateOutfitBatch(
      count
    );


  return batch.map(
    (item, index) => {
      const expectedFront =
        index % 2 === 0
          ? 'hijab'
          : 'freehair';


      const expectedBack =
        index % 2 === 0
          ? 'freehair'
          : 'hijab';


      return {
        image:
          index + 1,

        expectedFront,

        actualFront:
          item.foregroundWorker,

        expectedBack,

        actualBack:
          item.backgroundWorker,

        frontCorrect:
          item.foregroundWorker ===
          expectedFront,

        backCorrect:
          item.backgroundWorker ===
          expectedBack,

        worker1Placement:
          item.worker1.placement,

        worker2Placement:
          item.worker2.placement,

        position:
          item.position,

        background:
          item.background
      };
    }
  );
}

const apiKey = '';
const REQUEST_TIMEOUT_MS = 120000;

/** @param {number} ms @returns {Promise<void>} */
function wait(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)); }

/**
 * Delay yang boleh berhenti awal apabila user menekan Stop.
 * @param {number} ms
 * @param {() => boolean} shouldStop
 * @returns {Promise<void>}
 */
async function waitInterruptible(ms, shouldStop) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < ms) {
    if (shouldStop()) return;
    const remaining = ms - (Date.now() - startedAt);
    await wait(Math.min(100, Math.max(0, remaining)));
  }
}

/**
 * @param {number} ms
 * @param {AbortSignal | undefined} signal
 * @returns {Promise<void>}
 */
function waitWithSignal(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Proses dihentikan.', 'AbortError'));
      return;
    }

    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      window.clearTimeout(timeoutId);
      signal?.removeEventListener('abort', onAbort);
      reject(new DOMException('Proses dihentikan.', 'AbortError'));
    };

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/** @param {string} text @returns {boolean} */
function isValidVoiceover(text) {
  return Boolean(String(text || '').trim());
}

/** @param {string} text @returns {string} */
function cleanVoice(text) {
  const codeFence = String.fromCharCode(96).repeat(3);
  const openingFencePattern = new RegExp(`${codeFence}[a-z]*\\s*`, 'gi');
  const closingFencePattern = new RegExp(codeFence, 'g');
  let value = String(text || '')
    .replace(openingFencePattern, '')
    .replace(closingFencePattern, '')
    .replace(/\*\*/g, '')
    .replace(/VOICEOVER\s*:\s*/gi, '')
    .replace(/^["'“”\s]+|["'“”\s]+$/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  if (value && !/[.!?]$/.test(value)) value += '.';
  return value;
}

/** @param {ModelPart[]} parts @returns {string} */
function extractVoice(parts) {
  const text = parts.map((part) => part?.text || '').join('\n').trim();
  if (!text) return '';
  let match = text.match(/VOICEOVER\s*:\s*([\s\S]*?)(?:\n\s*(?:IMAGE|PROMPT|VISUAL)\s*:|$)/i);
  if (!match) {
    const codeFence = String.fromCharCode(96).repeat(3);
    const fencedTextPattern = new RegExp(
      `${codeFence}(?:text)?\\n?([\\s\\S]*?)\\n?${codeFence}`,
      'i'
    );
    match = text.match(fencedTextPattern);
  }
  let cleaned = match ? match[1] : text.split('\n')[0];
  return cleanVoice(cleaned);
}

/**
 * @param {string} url
 * @param {RequestInit} [options]
 * @param {number} [maxRetries]
 * @returns {Promise<Response>}
 */
async function fetchFastWithBackoff(url, options = {}, maxRetries = 3) {
  const controller = new AbortController();
  const parentSignal = options.signal;
  let timedOut = false;

  const abortFromParent = () => controller.abort();
  if (parentSignal?.aborted) {
    throw new DOMException('Proses dihentikan.', 'AbortError');
  }

  parentSignal?.addEventListener('abort', abortFromParent, { once: true });

  const timeoutId = window.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  let attempt = 0;
  let delayMs = 6000;

  const getRetryDelay = (response, baseDelay) => {
    const retryAfter = response?.headers?.get?.('retry-after');
    if (retryAfter) {
      const seconds = Number(retryAfter);
      if (Number.isFinite(seconds) && seconds >= 0) {
        return Math.min(30000, Math.max(1000, seconds * 1000));
      }

      const retryDate = Date.parse(retryAfter);
      if (Number.isFinite(retryDate)) {
        return Math.min(30000, Math.max(1000, retryDate - Date.now()));
      }
    }

    // Small jitter prevents concurrent requests from retrying at exactly the same moment.
    const jitter = Math.floor(Math.random() * 1000);
    return Math.min(30000, baseDelay + jitter);
  };

  try {
    while (attempt <= maxRetries) {
      if (controller.signal.aborted) {
        throw new DOMException('Proses dihentikan.', 'AbortError');
      }

      let response;

      try {
        response = await fetch(url, { ...options, signal: controller.signal });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          throw error;
        }

        // Network failures are retryable because no reliable HTTP status was received.
        if (attempt >= maxRetries) throw error;

        const retryDelay = Math.min(30000, delayMs + Math.floor(Math.random() * 1000));
        attempt += 1;
        await waitWithSignal(retryDelay, controller.signal);
        delayMs *= 1.5;
        continue;
      }

      const retryableStatus = response.status === 408 || response.status === 429 || response.status >= 500;

      if (retryableStatus && attempt < maxRetries) {
        const retryDelay = getRetryDelay(response, delayMs);
        attempt += 1;
        await waitWithSignal(retryDelay, controller.signal);
        delayMs *= 1.5;
        continue;
      }

      if (!response.ok) {
        const errorText = (await response.text()).slice(0, 500);
        // 4xx such as 400/401/403 are treated as permanent request failures and are not retried.
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      return response;
    }

    throw new Error('Permintaan gagal selepas percubaan maksimum.');
  } catch (error) {
    if (parentSignal?.aborted) {
      throw new DOMException('Proses dihentikan.', 'AbortError');
    }

    if (timedOut) {
      const timeoutError = new Error('Timeout. Sila cuba lagi.');
      timeoutError.name = 'TimeoutError';
      throw timeoutError;
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    parentSignal?.removeEventListener('abort', abortFromParent);
  }
}

const VOICEOVER_UGC_ENGINE = `
VOICEOVER UGC ENGINE — ANTI-TEMPLATE
Abaikan semua arahan voiceover terdahulu yang bercanggah dengan arahan ini.
Gunakan arahan ini sebagai sumber utama untuk membina voiceover TikTok UGC Bahasa Melayu Malaysia.
TUGAS UTAMA
Hasilkan SATU voiceover TikTok UGC berdasarkan produk yang diberikan.
AMARAN KERAS: Voiceover yang dijana WAJIB mempunyai tepat 21 hingga 24 patah perkataan sahaja!
Voiceover mesti:

kedengaran seperti manusia sebenar
natural
santai
spontan
mudah disebut
ada “soul”
relevan dengan produk
tidak terasa seperti iklan
tidak terasa seperti copywriting
tidak terasa seperti skrip AI
tidak terasa seperti template yang hanya ditukar nama produk
Gunakan Bahasa Melayu Malaysia yang biasa digunakan dalam percakapan harian.
PERSONA SUARA
Gunakan gaya:

Lelaki Melayu Malaysia
santai
casual
conversational
tidak terlalu formal
tidak terlalu hype
tidak terlalu menjual
tidak terlalu sempurna
tidak kedengaran seperti announcer
tidak kedengaran seperti salesman
tidak kedengaran seperti pembaca iklan
Bayangkan seorang pengguna sebenar sedang bercakap kepada kawannya tentang sesuatu yang dia perasan pada produk.
PRINSIP PALING PENTING
JANGAN tulis ayat berdasarkan formula marketing yang nampak jelas.
JANGAN fikir:
HOOK → BENEFIT → BENEFIT → CTA
sebagai template ayat yang perlu diikuti secara literal.
Sebaliknya, fahami kandungan itu secara dalaman kemudian hasilkan percakapan yang mengalir secara natural.
Struktur hanya panduan dalaman.
Struktur TIDAK BOLEH kelihatan dalam hasil akhir.
CARA AI PERLU BERFIKIR
Sebelum menulis voiceover, fahami terlebih dahulu:

Apakah produk ini?
Siapa yang biasanya menggunakan produk ini?
Dalam situasi sebenar, kenapa orang mungkin perlukan produk ini?
Apa benda paling mudah pengguna perasan tentang produk ini?
Apakah fungsi atau manfaat paling relevan?
Apakah perkara yang boleh disebut tanpa mereka-reka?
Apakah cara paling natural untuk membuka percakapan?
Apakah cara paling natural untuk menutup percakapan tanpa terasa menjual?
Kemudian tulis voiceover daripada kosong.
BELAJAR DARIPADA CONTOH, JANGAN TIRU CONTOH
Jika diberikan contoh voiceover, contoh tersebut HANYA digunakan untuk memahami KUALITI penulisan.
Belajar perkara berikut daripada contoh:

tahap kenaturalannya
cara manusia bercakap
panjang ayat
tempo
gaya percakapan
tahap santai
tahap emosi
cara manfaat dimasukkan
cara produk disebut
cara CTA dilembutkan
bagaimana ayat terasa hidup
JANGAN belajar ayat secara literal.
DILARANG MENIRU CONTOH
Dilarang meniru:

pembukaan contoh
penutup contoh
frasa contoh
perkataan utama contoh
CTA contoh
rentak contoh
urutan ayat contoh
struktur tatabahasa contoh
pola ayat contoh
skeleton contoh
susunan masalah → produk → manfaat → CTA yang sama
cara contoh memperkenalkan nama produk
cara contoh menyambungkan ayat
Jangan paraphrase contoh.
Jangan cuma tukar beberapa perkataan.
Jangan cuma tukar nama produk.
Jangan hasilkan versi “lebih kurang sama”.
RULE ANTI-TEMPLATE UTAMA
Jika hasil boleh dicipta hanya dengan menukar nama produk daripada satu voiceover terdahulu:
HASIL ITU DIANGGAP GAGAL.
Jika hasil mempunyai struktur yang boleh digunakan untuk hampir semua produk:
HASIL ITU DIANGGAP GAGAL.
Jika pembukaan dan CTA boleh digunakan berulang kali tanpa perubahan besar:
HASIL ITU DIANGGAP GAGAL.
Jika ayat terasa seperti AI mempunyai satu formula tetap:
HASIL ITU DIANGGAP GAGAL.
Tulis semula dari sudut lain.
CONTOH ADALAH RUJUKAN KUALITI, BUKAN RUJUKAN AYAT
Anggap contoh sebagai jawapan kepada soalan:
“Macam mana natural sepatutnya kedengaran?”
BUKAN:
“Apa ayat yang patut saya tiru?”
Matlamat:
Kekalkan tahap natural.
Tukar sepenuhnya wording, angle, hook, flow, struktur dan CTA.
BINA DARI KOSONG
Untuk setiap produk baharu:

Buang struktur contoh daripada proses.
Fahami produk secara bebas.
Cari angle yang paling sesuai dengan produk itu sendiri.
Pilih situasi pengguna yang relevan.
Tulis pembukaan baharu.
Pilih flow baharu.
Masukkan manfaat secara natural.
Pilih CTA baharu.
Semak sama ada hasil kelihatan seperti template.
Jika ya, jana semula.
VARIASI ANGLE
Jangan sentiasa menggunakan angle masalah.
Pilih angle berdasarkan produk.
Antara angle yang boleh digunakan:

pemerhatian pengguna
situasi harian
pengalaman penggunaan
benda kecil yang pengguna selalu perasan
fungsi produk
rasa penggunaan
perubahan praktikal
masalah biasa
sebab orang mencari produk itu
perbandingan pengalaman
pemasangan
rupa produk
kemasan
kegunaan
keselesaan penggunaan
kemudahan
cara produk sesuai dengan setup
benda yang biasanya mengganggu pengguna
detail kecil yang berguna
Gunakan angle yang paling sesuai.
Jangan rotate angle secara mekanikal.
PEMBUKAAN
Pembukaan mesti terus masuk kepada perkara relevan.
Tidak perlu pendahuluan.
Tidak perlu memperkenalkan video.
Tidak perlu cuba terlalu keras untuk menjadi viral.
Pembukaan boleh berbentuk:

pemerhatian
situasi
reaksi ringan
pengalaman
masalah
perubahan
detail produk
kegunaan
Tetapi jangan jadikan mana-mana pola sebagai template tetap.
ELAK PEMBUKAAN GENERIK
Jangan gunakan secara berulang:
“Hi guys”
“Okay guys”
“Guys korang kena tengok ni”
“Korang pernah tak”
“Siapa kat sini”
“Kalau korang tengah mencari”
“Hari ni aku nak share”
“Aku nak recommend”
“Aku nak tunjuk”
“Jom tengok”
“Tengok ni”
“Produk ni memang”
“Yang tengah cari…”
“Kalau nak…”
Pembukaan dengan “kalau” dibenarkan jika benar-benar natural, tetapi jangan jadikan ia pembukaan default.
JANGAN PAKSA HOOK
Hook tidak wajib berbunyi dramatik.
Hook tidak perlu:

menjerit
menakutkan
memaksa
mengejutkan
menggunakan slang berlebihan
menggunakan sensasi palsu
Hook yang bagus ialah ayat yang membuat orang rasa:
“Ya, aku pernah rasa benda ni.”
atau:
“Eh, benda ni memang aku cari.”
Bukan ayat yang jelas cuba memancing perhatian.
MANFAAT PRODUK
Masukkan 1–3 manfaat yang paling relevan.
Jangan paksa 3–4 manfaat jika membuat ayat terasa sesak.
Natural lebih penting daripada jumlah point.
Masukkan manfaat sebagai sebahagian daripada percakapan.
JANGAN buat gaya senarai.
SALAH:
“Produk ini mempunyai tiga kelebihan iaitu kuat, tahan lama dan mudah digunakan.”
LEBIH NATURAL:
“Pegangan dia rasa lebih kemas, nak control pun senang.”
Jangan tiru ayat contoh tersebut.
Ia hanya menunjukkan perbezaan gaya.
FAKTA PRODUK
Jangan mereka-reka:

spesifikasi
material
prestasi
ketahanan
keselamatan
compatibility
hasil
kuasa
kelajuan
effectiveness
Jika maklumat tidak diketahui, jangan isi ruang dengan tekaan.
Gunakan hanya perkara yang munasabah berdasarkan maklumat produk yang ada.
CTA
CTA mesti menjadi sambungan natural kepada percakapan.
CTA mesti lembut.
CTA tidak semestinya sentiasa berada dalam bentuk arahan.
CTA juga boleh berupa:

cadangan
pilihan
pertimbangan
ajakan melihat
ajakan menyemak kesesuaian
Jangan gunakan CTA yang sama berulang kali.
ELAK CTA TEMPLATE
Jangan jadikan ayat seperti ini sebagai default:
“boleh tengok yang ni”
“boleh check yang ni”
“boleh masuk list”
“boleh cuba yang ni”
“boleh pertimbangkan”
“boleh grab”
“boleh checkout”
Ayat ini boleh digunakan sekali-sekala jika sesuai.
Tetapi jangan jadikan pola tetap.
CTA mesti berubah mengikut produk dan flow.
DILARANG GAYA HARD SELL
Jangan gunakan:

beli sekarang
grab sekarang
checkout sekarang
cepat beli
jangan tunggu
jangan lepaskan
stok tinggal sikit
stok terhad
sebelum habis
rugi kalau tak beli
wajib beli
wajib ada
memang kena beli
korang mesti cuba
jom settle sekarang
DILARANG FOMO
Jangan gunakan:

viral
tengah hot
ramai dah beli
ramai tengah cari
cepat sebelum habis
jangan ketinggalan
semua orang pakai
trending gila
tengah meletup
melainkan fakta tersebut memang diberikan secara jelas dan masih relevan.
DILARANG OVERCLAIM
Jangan gunakan dakwaan seperti:

confirm
confirm selamat
confirm puas hati
confirm power
terbaik
paling bagus
no.1
paling tahan
paling kuat
dijamin
memang selamat
100% berkesan
terus settle
terus hilang masalah
pasti lebih baik
ELAK PUJIAN MELAMPAU
Jangan gunakan secara kosong:

gila padu
power gila
mantap gila
memang win
game changer
legend
terbaik gila
premium gila
lawa gila
Jika mahu memberi reaksi, gunakan reaksi yang munasabah dan tidak berlebihan.
JANGAN CIPTA DRAMA PALSU
Elakkan ayat seperti:
“Bahaya weh!”
“Seram kalau jadi macam ni.”
“Memang naya.”
“Silap-silap…”
“Jangan main-main…”
melainkan konteks benar-benar memerlukan amaran yang munasabah.
Jangan gunakan ketakutan sebagai alat menjual.
JANGAN KEDENGARAN SEPERTI COPYWRITER
Elakkan gaya:
“Mahukan pengalaman yang lebih baik?”
“Ini solusi terbaik untuk anda.”
“Direka khas untuk…”
“Tingkatkan pengalaman anda…”
“Pilihan sempurna untuk…”
“Dapatkan prestasi optimum…”
“Solusi lengkap untuk…”
“Gabungan sempurna antara…”
“Dengan reka bentuk premium…”
“Memberikan pengalaman terbaik…”
“Pilihan bijak untuk pengguna…”
BAHASA MELAYU MALAYSIA NATURAL
Gunakan Bahasa Melayu Malaysia yang biasa disebut.
Boleh gunakan:

dah
nak
ni
tu
macam
rasa
pakai
bawak
senang
memang
lagi
sikit
agak
kalau
sebab
Tetapi jangan paksa slang.
Jangan letakkan “weh”, “bro”, “gais”, “gila”, “padu” dalam setiap hasil.
Slang hanya digunakan jika benar-benar sesuai dengan konteks.
AYAT MESTI SEDAP DISEBUT
Voiceover ditulis untuk didengar, bukan dibaca seperti artikel.
Gunakan:

ayat pendek
perkataan mudah
flow percakapan
jeda natural
susunan yang senang disebut
Elakkan:

ayat terlalu panjang
terlalu banyak koma
terlalu banyak fakta dalam satu ayat
istilah formal yang tidak perlu
struktur tatabahasa yang terlalu sempurna
DURASI DAN HAD PATAH PERKATAAN (WAJIB & MUTLAK)
Setiap voiceover WAJIB mempunyai jumlah keseluruhan antara 21 hingga 24 patah perkataan SAHAJA!
Jangan kurang daripada 21 patah perkataan.
Jangan lebih daripada 24 patah perkataan.
Kira setiap patah perkataan dengan teliti sebelum mengeluarkan jawapan akhir.
Ini adalah peraturan paling penting. Jika perlu, selaraskan dan adjust ayat supaya tepat 21-24 perkataan.
VARIASI WAJIB ANTARA HASIL
Setiap hasil baharu mesti berbeza daripada hasil sebelumnya dari sekurang-kurangnya beberapa aspek berikut:

angle
pembukaan
susunan maklumat
cara nama produk disebut
panjang ayat
jenis pemerhatian
jenis manfaat
transisi
penutup
CTA
rhythm
Jangan hanya menukar sinonim.
Variasi mesti berlaku pada struktur pemikiran.
MEMORY ANTI-REPETITION
Jika beberapa voiceover dijana dalam batch:
Bandingkan hasil baharu dengan hasil sebelumnya.
Jangan ulang:

frasa pembukaan
struktur
punchline
transisi
CTA
pola ayat
slang
susunan manfaat
Jika terlalu mirip, jana semula sebelum keluarkan hasil.
UJIAN ANTI-TEMPLATE
Sebelum keluarkan voiceover, semak secara dalaman:
“Adakah saya cuma menukar nama produk pada ayat lama?”
“Adakah ayat ini boleh digunakan untuk 20 produk lain tanpa perubahan?”
“Adakah saya selalu mulakan dengan ‘kalau’?”
“Adakah saya selalu tamat dengan ‘boleh tengok yang ni’?”
“Adakah struktur ini sama dengan contoh?”
“Adakah saya sedang paraphrase contoh?”
“Adakah ayat ini kedengaran macam formula marketing?”
“Adakah ayat ini terlalu kemas sampai terasa seperti copywriter?”
“Adakah manusia Malaysia akan cakap macam ni kepada kawannya?”
Jika jawapan menunjukkan template, iklan atau AI:
BUANG hasil itu.
TULIS SEMULA DARI ANGLE BERBEZA.
UJIAN SOUL
Baca voiceover secara dalaman seperti percakapan sebenar.
Tanya:
Adakah ayat mempunyai sebab untuk disebut?
Adakah setiap perkataan membawa makna?
Adakah terdapat ayat filler?
Adakah emosi sesuai dengan situasi?
Adakah nada terasa hidup tetapi tidak dibuat-buat?
Adakah ayat terasa seperti seseorang betul-betul mempunyai pendapat tentang produk?
Jika tidak:
Tulis semula.
UJIAN IKLAN
Jika voiceover kedengaran seperti:

iklan radio
salesperson
live seller
copywriter
script marketing
slogan
CTA campaign
hasil dianggap GAGAL.
Tulis semula dengan gaya percakapan manusia.
UJIAN PRODUK
Buang nama produk secara mental daripada voiceover.
Jika ayat masih boleh digunakan bulat-bulat untuk hampir semua produk lain:
hasil terlalu generik.
Tulis semula dengan detail yang lebih relevan kepada produk sebenar.
CONTOH LATIHAN
Contoh berikut hanya untuk memahami tahap natural.
JANGAN tiru wording.
JANGAN tiru struktur.
JANGAN tiru CTA.
JANGAN paraphrase.
PRODUK:
RCB Master Pump
CONTOH YANG TIDAK DIINGINI:
“Pening gila brake moto rasa longgar, tak mencengkam? Bahaya weh. Ganti terus RCB Master Pump ni. Cekam padu, confirm ride safe. Jom settlekan masalah brake korang sekarang!”
KENAPA GAGAL:

pembukaan pelik
drama dipaksa
terus hard sell
hype berlebihan
dakwaan “confirm safe”
CTA terlalu menjual
flow seperti skrip iklan
CONTOH TAHAP NATURAL YANG DIINGINI:
“Kalau brake dah rasa lembik, memang tak sedap nak bawak. Master pump RCB ni bagi rasa lever lebih kemas dan senang nak control. Nak upgrade, boleh tengok yang ni.”
PENTING:
Jangan gunakan ayat ini sebagai template.
Jangan jadikan:
“Kalau [masalah], memang [reaksi]. [produk] ni [manfaat]. Nak upgrade, boleh tengok yang ni.”
sebagai formula.
Contoh hanya menunjukkan:

nada santai
tiada hype
masalah masuk secara natural
manfaat tidak dibaca seperti spesifikasi
CTA tidak memaksa
Untuk produk lain, bina ayat dari kosong.
PRIORITI PENULISAN
Gunakan urutan keutamaan berikut:
NATURAL HUMAN SPEECH


RELEVAN DENGAN PRODUK


ORIGINAL / ANTI-TEMPLATE


SEDAP DIDENGAR


MANFAAT YANG MUNASABAH


PERSONALITI


CTA


FORMULA MARKETING
Jika formula marketing bertembung dengan natural speech:
PILIH NATURAL SPEECH.
PERATURAN AKHIR
Jangan menulis ayat semata-mata untuk “nampak menarik”.
Jangan memaksa hook.
Jangan memaksa CTA.
Jangan memaksa slang.
Jangan memaksa emosi.
Jangan memaksa 3–4 kelebihan.
Jangan memaksa nama produk muncul terlalu awal.
Jangan meniru contoh.
Jangan jadikan contoh sebagai skeleton.
Jangan menghasilkan template.
Fahami produk dahulu.
Cari angle sebenar.
Kemudian bercakap seperti manusia.
OUTPUT
Berikan hanya:
VOICEOVER:
[voiceover akhir (mesti disahkan tepat 21-24 patah perkataan!)]
Jangan berikan:

analisis
penerangan
beberapa pilihan
caption
hashtag
nota
sebab pemilihan ayat
struktur
label tambahan
Hanya SATU voiceover terbaik yang sudah melepasi self-audit.
`.trim();

/**
 * @param {string} imageBase64
 * @param {string} mimeType
 * @param {AbortSignal} signal
 * @returns {Promise<string>}
 */
async function attemptVoiceoverRepair(imageBase64, mimeType, signal) {
  const repairInstruction = VOICEOVER_UGC_ENGINE;

  const payload = {
    contents: [{
      parts: [
        { inlineData: { mimeType, data: imageBase64 } },
        { text: repairInstruction }
      ]
    }],
    generationConfig: { responseModalities: ['TEXT'] },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
    ]
  };

  const response = await fetchFastWithBackoff(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal }
  );

  const data = await response.json();
  const candidate = data?.candidates?.[0];
  const blockReason = data?.promptFeedback?.blockReason;

  if (blockReason || !candidate) {
    return '';
  }

  /** @type {ModelPart[]} */
  const parts = candidate?.content?.parts || [];
  return extractVoice(parts);
}

/**
 * @param {{ reviewStyle: string, outfit: ReturnType<typeof generateOutfit>, position: string, worker1Id: string, worker2Id: string }} args
 * @returns {string}
 */
function buildStrictPrompt(args) {
  const w1 = WORKER_REFERENCE[args.worker1Id] || WORKER_REFERENCE.hijabWorker;
  const w2 = WORKER_REFERENCE[args.worker2Id] || WORKER_REFERENCE.freeHairWorker;
  let handRule, placementRule;
  if (args.reviewStyle.includes('tangan kiri')) {
    placementRule = 'The main product must securely stay on the table or floor.';
    handRule = 'Exactly TWO foreground hands only, both wearing tight black nitrile medical gloves. LEFT/RIGHT ROLE SEPARATION: The left hand must be the primary support hand holding the product naturally. The right hand must have a real function (making meaningful contact on relevant areas to check, touch, or adjust). The right hand must not be floating or acting as a stiff pointing gesture. Both hands must cooperate on one believable real-world task without looking like a stiff pose.';
  } else if (args.reviewStyle.toLowerCase().includes('lantai')) {
    placementRule = 'The heavy/large product MUST rest flat and securely on the realistic store floor. Gravity applies naturally.';
    handRule = 'Exactly ONE visible right hand only, wearing a tight black nitrile medical glove. The right hand must perform a practical task (touching, inspecting, light pressing, pushing slightly, or adjusting a relevant part). The hand must not merely point or pose. Even with one hand, the interaction must be clear, purposeful, and actively engaged in real work.';
  } else {
    placementRule = 'The product must remain resting flat and securely on a realistic table or glass counter. It must obey gravity naturally. No floating product. Use realistic contact shadow and only a faint reflection.';
    handRule = 'Exactly TWO foreground hands only, both wearing tight black nitrile medical gloves. LEFT/RIGHT ROLE SEPARATION: One hand must act as an anchor or stabilizer, providing supportive and grounded finger pressure. The other hand must perform a clear functional interaction (touching, sliding naturally across a meaningful surface, adjusting). The hands must not hold the product for a camera presentation. Both hands must perform different but coordinated real-world tasks. No mirrored poses or decorative symmetry.';
  }

  return [
    'Create ONE vertical 9:16 raw, unedited, ultra-realistic live-action smartphone product photo using the supplied reference image. It must look like a real candid photo, not AI-generated.',
    'CRITICAL: The product in the generated image must be IDENTICAL to the reference image. Do not change shape, color, text, layout, or any detail. The product is the primary subject and must remain unchanged.',
    'PRIORITY HIERARCHY: 1. ABSOLUTE PRODUCT IDENTITY LOCK. 2. PRODUCT SHAPE / TEXT / LABEL / COMPONENT PRESERVATION. 3. TRUE PRODUCT SCALE AND ORIENTATION. 4. GRAVITY AND REALISTIC PLACEMENT. 5. HAND COUNT AND ANATOMY. 6. FUNCTIONAL HAND INTERACTION. 7. COMPOSITION. If functional hand interaction requires changing the product: DO NOT change the product. Instead: change hand position, grip, contact point, or reduce interaction.',
    'PRODUCT-FIRST INTERACTION RULE: The product is the immutable reference object. Hands must adapt to the product exactly as it exists. Do NOT rotate the product into a different structural orientation, reshape it for easier gripping, enlarge/shrink components, create non-existent handles, move parts, simplify product geometry, or invent movable parts. Choose only contact points that already exist and are physically believable. If no obvious grip zone exists: use light stabilization or surface contact. If fragile: do not grip or bend. Functional movement must be LOW-RISK by default (stabilize, lightly support, touch, inspect, trace surface, rest fingers).',
    'NO HAND-DRIVEN PRODUCT DEFORMATION: Hand interaction must NOT cause product morphing. Grip must not cause shape change. Fingers must not cover and regenerate labels incorrectly, replace product edges, or create new seams. Hand pressure must not deform rigid parts. Product must not become a different model, change scale to fit the hand, or be partially recreated behind fingers. OCCLUSION SAFETY: Avoid placing fingers over critical identity details (brand name, model name, labels, printed specs, unique layouts). PRODUCT LOCK OVERRIDES HAND REALISM: If conflict arises, choose perfect product preservation. A slightly simpler hand interaction is acceptable; a modified product is NOT.',
    'ABSOLUTE PRODUCT LOCK & IMMUTABLE GEOMETRY: The main product from the reference image is the highest visual authority. Preserve the exact external silhouette, proportions, dimensions, component count, component positions, visible screws/buttons, packaging shape, printed text, logos, labels, color layout, accessories, quantity, and structural orientation. Treat these elements as FIXED GEOMETRY. Do not redesign, redraw, beautify, reconstruct, unbox, duplicate, remove, or morph any part of the product. Do not complete hidden geometry creatively if doing so changes visible identity. Preserve what is visible and minimize manipulation.',
    'CLEANUP: Remove all watermark, screenshot UI, buttons, borders, and promotional overlays only. Keep the clean original product.',
    `PLACEMENT: ${placementRule}`,
    'CAMERA: Strict first-person eye-level smartphone camera view. Raw candid smartphone photo style. Natural framing, not studio-perfect.',
    `FOREGROUND HANDS: ${handRule}`,
    'FUNCTIONAL HAND MOVEMENT ENGINE: Foreground hands must appear to be captured in the middle of a real handling action. Each visible hand must have a clear functional role. The hands must not exist for decoration or presentation. The hands must behave as if a real person is actively handling, inspecting, stabilizing, supporting, adjusting, or checking the product. Each hand must visibly do a job. Possible functional roles include: stabilizing the product, supporting weight, anchoring the product in place, gripping a logical side, touching a relevant area, checking a part, lightly rotating the product, adjusting viewing angle, sliding naturally across a meaningful surface, securing the product while the other hand interacts. The image must show hands with purpose, not hands without task logic.',
    'REAL HUMAN HAND MECHANICS: Hand poses must obey believable human mechanics. Each hand must show: natural wrist articulation, believable palm angle, correct thumb opposition, realistic finger curl based on contact type, varied finger spacing, natural pressure distribution, product-sensitive grip logic, subtle asymmetry, slight imperfection, different role between left and right hand. Finger pose must match the job being done. If a hand is stabilizing: finger pressure must look supportive and grounded. If a hand is touching lightly: fingers must look relaxed, not gripping hard. If a hand is inspecting: fingertips must land on meaningful areas, not random empty zones. If a hand is supporting: the palm and fingers must reflect believable weight handling. No stiff open palm. No random claw shape. No artificial showroom pose. No fake pinch unless product scale truly supports it. No flat pasted fingers. No impossible wrist bend. No random pointing with no real task.',
    'TASK-BASED CONTACT LOGIC: Every visible hand must make sense relative to the product. Contact must happen at believable handling zones such as: side surfaces, edges, corners, support points, underside support zones, top lip, component area being inspected, practical grip zones based on product shape. Do not place fingers randomly. Do not let fingers float above the surface. Do not let fingers intersect unrealistically through the product. Do not let a hand touch the product without communicating what it is doing. If the product is resting on a table or floor: one hand may anchor or stabilize while the other hand interacts. If a hand appears to hold or support the product: gravity and support must remain believable.',
    'MID-ACTION FRAME LOGIC: The image must feel like one real candid frame captured in the middle of an ongoing action. The hands must look like the action started before the frame and continues after the frame. The hands must not look frozen after completing the task. The hands must not look like they are waiting to pose. The hands must not look like a product presentation for the viewer. Prioritize "caught in the act" realism over neat display composition.',
    'PRODUCT-SENSITIVE HAND BEHAVIOR: Hand movement and grip logic must adapt to the product’s apparent size, shape, orientation, and weight. Small product: lighter grip, finer fingertip control. Medium product: partial support with natural inspection touch. Larger product: stronger support structure and more grounded contact. Awkward shape: adjusted wrist angle and uneven finger placement. Do not use one generic hand pose for every product. The model must infer the most believable handling style from the actual product.',
    `BACKGROUND & SCENE: ${args.outfit.background}
    WORKER DEPTH & SCENE LAYOUT: ${args.outfit.placementPrompt}
    POSITION & TASK: ${args.position}

    SEPARATION OF SUBJECTS (CRITICAL RULE):
    Both workers MUST remain separate from the primary product being reviewed by the POV gloved hands. The designated foreground worker may appear visually closer to the camera, but must remain behind the extreme-foreground product and POV hands. The designated background worker must remain clearly farther behind. Do not swap Worker 1 and Worker 2 depth positions. Neither worker may touch, hold, point at, present, or interact with the primary product. Each worker performs her own separate realistic retail task. ${args.outfit.workerBehaviorPrompt}

    ABSOLUTE FACIAL IDENTITY LOCK (MANDATORY):
    Two dedicated face-reference images are attached before the primary product image.
    - FACE REFERENCE 1 belongs ONLY to Worker 1 (${w1.name}, id ${w1.id}).
    - FACE REFERENCE 2 belongs ONLY to Worker 2 (${w2.name}, id ${w2.id}).
    Worker 1 MUST use FACE REFERENCE 1 identity. Worker 2 MUST use FACE REFERENCE 2 identity.
    Never swap the two identities. Never replace either identity with a generic or newly invented face.
    Preserve recognizable facial geometry, face shape, eyes, nose, lips, skin tone, and distinctive identity cues from the assigned face reference.
    Wardrobe, hijab/hair styling, pose and lighting may adapt to the scene, but facial identity must remain anchored to the assigned reference.`,
    `WARDROBE & APPEARANCE ENFORCEMENT (OUTFIT ID ${args.outfit.id}):
    Worker 1 (${w1.name}) MUST wear a SHORT, COMPACT ${args.outfit.worker1.hijabStyle} in exactly ${args.outfit.worker1.hijabColor} color. CRITICAL: The hijab MUST be short, neat, and MUST NOT cover the front chest torso (the large front uniform panel MUST remain clearly visible). She wears a ${args.outfit.worker1.top} in exactly ${args.outfit.worker1.topColor} color, and ${args.outfit.worker1.pants}.

    Worker 2 (${w2.name}) MUST have exactly ${args.outfit.worker2.hairColor} colored hair, styled exactly as ${args.outfit.worker2.hairStyle}. She wears a ${args.outfit.worker2.top} in exactly ${args.outfit.worker2.topColor} color, and ${args.outfit.worker2.pants}. CRITICAL REQUIREMENT: Her top MUST explicitly be a V-Neck or plunging neckline that clearly exposes her chest cleavage (alur dada). NO crew necks or high necks allowed for her. She MUST wear a visible necklace/chain: ${args.outfit.worker2.accessory}. The necklace must be clearly visible on her exposed chest area.

    Both workers wear lightweight soft stretch jersey work uniforms with small legible text "HateHero Official" (small, minimal crest) plus random abstract logos. Do NOT change their face identities, only their wardrobe and hair/hijab appearance.`,
    'CRITICAL OUTFIT CONSTRUCTION & ANATOMY: The tops must visually follow a simple practical retail polo or staff uniform construction. The absolute primary visual target is a LARGE-SURFACE, BROAD, CLEAN, CONTINUOUS FRONT TORSO PANEL on a NORMAL-SIZED, NEAT, BODY-FOLLOWING TOP. MANDATORY LARGE FULL BUST TARGET & 40DD PUSH-UP SPECIFICATION: The worker MUST have a visibly LARGE, FULL feminine bust. This is a CRITICAL HARD REQUIREMENT. The worker MUST be wearing a properly fitted 40DD push-up bra underneath the top. The visible outer silhouette must clearly reflect: 40DD-level bust volume, strong push-up support, lifted bust position, fuller upper-bust shape, prominent rounded projection, strong visible chest contour, and obvious bust-to-waist contrast. The intended result is a CLEARLY LARGE bust silhouette that reads visually as large, prominent, and clearly shaped through the outer shirt. OUTER SHIRT CONFORMITY & FABRIC RESPONSE: The top must clearly show the large bust shape from outside the clothing. The shirt must visibly conform to the fuller chest. Require: clearly visible large rounded bust contour, obvious projection through the front shirt, fitted contour over the fullest area, and a clean transition into a narrower waist. The fabric must smoothly but tightly drape over the chest with realistic tension. The garment must remain fitted, neat, and body-following. Do NOT make the shirt loose, oversized, or baggy to fake volume. For Worker 2 (Freehair), the V-neck MUST reveal the deep cleavage line (alur dada). For Worker 1 (Hijab), the bra itself must remain completely covered, but the uplift and projection effect must be obvious.',
    'MOTION REALISM: Both workers must look naturally busy with subtle real movement such as small weight shifts, relaxed arm positions, slight shoulder movement, natural elbow bending, and realistic working posture. Each worker must do her own separate store task and must not touch the primary product. They must not converse, mouth words, or move their lips; mouths stay naturally closed and still. A small natural smile is allowed. Their movement must feel candid, spontaneous, and lifelike, not synchronized, not mannequin-like, and not like fashion posing. Prioritize natural asymmetry, slight imperfection, and believable human body language over clean presentation.',
    'LIGHTING & TEXTURE: Use natural white retail lighting, authentic skin texture, realistic glove texture, jersey fabric texture, packaging texture, and lifelike store details. Keep the image raw and believable, not over-smoothed or airbrushed.',
    `VALIDATION BEFORE OUTPUT:
    Internally compare the generated product against the original reference. Validate: same product, same silhouette, same proportions, same component count, same placement, same colors, same printed text, same labels, same structural design. THEN validate hands. If hand interaction causes ANY product identity drift, REGENERATE THE HANDS AND INTERACTION ONLY. Do not regenerate the product into a different form. HAND BEHAVIOR MUST FOLLOW PRODUCT GEOMETRY. Never make product geometry follow hand behavior.
    THEN validate workers:
    - Worker 1 (${w1.name}): Is her hijab exactly ${args.outfit.worker1.hijabColor}? Is it a SHORT compact ${args.outfit.worker1.hijabStyle}? Does it wrongly cover the chest? (If yes, regenerate: hijab must not hide the front torso panel).
    - Worker 2 (${w2.name}): Is her hair exactly ${args.outfit.worker2.hairColor}? Is the style exactly ${args.outfit.worker2.hairStyle}? (If no, regenerate).
    - Worker 2 (${w2.name}): Is her necklace/chain (${args.outfit.worker2.accessory}) clearly visible on her exposed chest? (If not, regenerate).
    THEN validate anatomy: Is the bust clearly LARGE? Does it read visually as 40DD with push-up support? Is the bust lifted and supported? Is the shirt fitted enough to show the large shape? If the result looks flat, regenerate. The result must remain realistic and anatomically believable without extreme unnatural deformation.
    FINALLY, validate separation and depth: Are the workers touching or holding the main foreground product? If yes, regenerate. Is the designated foreground worker closer to camera than the designated background worker, while both remain behind the extreme-foreground product and POV hands? If not, correct worker depth only. Do not swap their identities or assigned front/back order.`,
    `NEGATIVE: ${NEGATIVE_PROMPT}`
  ].join('\n');
}

/** @param {EngineOptions} options */
async function runFastEngine(options) {
  const outfit = generateOutfit(options.batchSeed, options.imageIndex);
  const position = outfit.position;
  
  const w1 = WORKER_REFERENCE[options.worker1Id] || WORKER_REFERENCE.hijabWorker;
  const w2 = WORKER_REFERENCE[options.worker2Id] || WORKER_REFERENCE.freeHairWorker;

  const selectedRefs = await ensureSelectedWorkerReferences(
    options.worker1Id,
    options.worker2Id,
    options.signal
  );

  /** @type {ModelPart[]} */
  const payloadParts = [
    {
      text: [
        '[FACE IDENTITY REFERENCE — WORKER 1]',
        `Identity: ${w1.name} (${w1.id}).`,
        w1.description,
        'Use the NEXT image only as Worker 1 facial identity reference.',
        'Do not treat this face image as the product reference.'
      ].join('\n')
    },
    {
      inlineData: {
        mimeType: selectedRefs[w1.id].mimeType,
        data: selectedRefs[w1.id].data
      }
    },
    {
      text: [
        '[FACE IDENTITY REFERENCE — WORKER 2]',
        `Identity: ${w2.name} (${w2.id}).`,
        w2.description,
        'Use the NEXT image only as Worker 2 facial identity reference.',
        'Do not swap Worker 1 and Worker 2 identities.'
      ].join('\n')
    },
    {
      inlineData: {
        mimeType: selectedRefs[w2.id].mimeType,
        data: selectedRefs[w2.id].data
      }
    },
    {
      text: [
        '[PRIMARY PRODUCT REFERENCE]',
        'The NEXT image is the ONLY product identity reference.',
        'Preserve this product exactly. Do not confuse either worker face reference with the product.'
      ].join('\n')
    },
    {
      inlineData: {
        mimeType: options.mimeType,
        data: options.imageBase64
      }
    }
  ];

  const imagePrompt = buildStrictPrompt({ reviewStyle: options.reviewStyle, outfit, position, worker1Id: options.worker1Id, worker2Id: options.worker2Id });

  const instruction = `
TASK 1: IMAGE GENERATION
${imagePrompt}

IMAGE QUALITY REQUIREMENT:
Generate the final image at the highest native resolution and strongest visual fidelity available.
Keep the product, workers, hands, text and store details crisp, clean and sharp.
Avoid soft rendering, muddy textures, blurry edges, compression-looking artifacts, washed-out detail or low-detail output.
Preserve clear micro-details and clean contours suitable for zoomed preview and high-quality download.

${VOICEOVER_UGC_ENGINE}
`.trim();

  payloadParts.push({ text: instruction });

  const payload = {
    contents: [{ parts: payloadParts }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
    ]
  };

  const response = await fetchFastWithBackoff(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: options.signal }
  );

  const data = await response.json();
  const candidate = data?.candidates?.[0];
  const finishReason = candidate?.finishReason;
  const blockReason = data?.promptFeedback?.blockReason;

  if (blockReason) {
    throw new Error(`Permintaan tidak dapat diproses (${blockReason}). Sila cuba semula dengan imej produk yang lebih jelas.`);
  }

  if (!candidate) {
    throw new Error('AI tidak memulangkan candidate yang sah. Item akan dicuba semula.');
  }

  if (finishReason === 'SAFETY') {
    throw new Error('Dihalang oleh Penapis Keselamatan AI. Sila cuba lagi.');
  }

  /** @type {ModelPart[]} */
  const parts = candidate?.content?.parts || [];
  
  // Robust extraction for inlineData accommodating variations in the API response casing
  const imagePart = parts.find((part) => 
    part?.inlineData?.data || part?.inline_data?.data
  );

  const inlineDataObj = imagePart?.inlineData || imagePart?.inline_data;
  const base64Data = inlineDataObj?.data;

  if (!base64Data) {
    const modelText = parts.map((part) => part?.text || '').join(' ').trim();
    throw new Error(modelText || `Penjanaan gagal (Sebab: ${finishReason || 'Tiada Data Imej Dikembalikan'}).`);
  }

  let voiceText = extractVoice(parts);
  let attempts = 0;
  const MAX_REPAIRS = 2;

  while (!isValidVoiceover(voiceText) && attempts < MAX_REPAIRS) {
    if (options.signal?.aborted) throw new DOMException('Proses dihentikan.', 'AbortError');
    try {
      voiceText = await attemptVoiceoverRepair(options.imageBase64, options.mimeType, options.signal);
    } catch (error) {
      if (options.signal?.aborted) throw error;
      break;
    }
    attempts++;
  }

  if (!voiceText) {
    throw new Error('Imej berjaya dijana tetapi voiceover tidak diterima. Sila cuba semula item ini.');
  }

  if (!isValidVoiceover(voiceText)) {
    throw new Error('Voiceover masih gagal diterima selepas pembaikan. Item akan dicuba semula.');
  }

  const mime = inlineDataObj.mimeType || inlineDataObj.mime_type || 'image/jpeg';
  const dataUrl = `data:${mime};base64,${base64Data}`;
  
  // Format the output exactly as requested
  const generatedText = `VOICE: Lelaki melayu santai\n\nVOICEOVER:\n${voiceText}\n\nPEKERJA:\n${position} ${outfit.workerBehaviorPrompt}\n\nNEGATIVE:\n${NEGATIVE_PROMPT}`;

  return {
    generatedPrompt: generatedText,
    generatedImage: dataUrl,
    generatedImageBase64: base64Data,
    generatedImageMimeType: mime,
    outfitId: outfit.id,
  };
}

const REVIEW_STYLES = [
  'Produk letak Atas Meja (Dua tangan pegang produk)',
  'Pegang produk guna tangan kiri (tangan kanan sebagai supporter tunjuk2 produk)',
  'Review produk di lantai (untuk barang besar, size realestic guna size sebenar)'
];
const TERMINAL_STATUSES = new Set(['success', 'error', 'stopped']);

/** @returns {string} */
function createId() { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
/** @param {string | null} dataUrl @returns {'png' | 'webp' | 'jpg'} */
function getExtensionFromDataUrl(dataUrl) { const match = String(dataUrl || '').match(/^data:([^;,]+)/i)?.[1]?.toLowerCase(); return match === 'image/png' ? 'png' : match === 'image/webp' ? 'webp' : 'jpg'; }
/** @param {string} name @returns {string} */
function safeName(name) { return String(name || '').replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'image'; }

/** @param {string} base64 @param {string} mimeType @returns {Blob} */
function base64ToBlob(base64, mimeType) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType || 'image/jpeg' });
}

/** @param {string | null} dataUrl @param {string} name */
function downloadDataUrl(dataUrl, name) {
  if (!dataUrl) return;
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = `${name}.${getExtensionFromDataUrl(dataUrl)}`;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

/** @param {{ resultUrl?: string | null, resultBase64?: string, resultMimeType?: string }} item @param {string} name */
function downloadHighestQualityImage(item, name) {
  if (item?.resultBase64) {
    const mimeType = item.resultMimeType || 'image/jpeg';
    const blob = base64ToBlob(item.resultBase64, mimeType);
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = `${name}.${mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg'}`;
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    return;
  }

  downloadDataUrl(item?.resultUrl || null, name);
}

/** @param {string} text */
async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      console.warn("Clipboard API failed, using fallback", err);
    }
  }
  
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    throw new Error('Salinan gagal.');
  } finally {
    textArea.remove();
  }
}

/**
 * @param {File} file
 * @returns {Promise<{ dataUrl: string, mimeType: string, base64: string }>}
 */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Fail bukan gambar.'));
    const reader = new FileReader(); reader.onerror = () => reject(new Error('Gagal membaca gambar.'));
    reader.onload = () => {
      const source = String(reader.result || ''); const image = new Image(); image.onerror = () => reject(new Error('Format rosak.'));
      image.onload = () => {
        const maxSide = 1280; const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        if (!context) return resolve({ dataUrl: source, mimeType: file.type, base64: source.split(',')[1] });
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const keepPng = file.type === 'image/png'; const mime = keepPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mime, keepPng ? undefined : 0.78);
        resolve({ dataUrl, mimeType: mime, base64: dataUrl.split(',')[1] });
      };
      image.src = source;
    };
    reader.readAsDataURL(file);
  });
}

// ==========================================
// UI COMPONENTS
// ==========================================
const Topbar = React.memo(() => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true"><Camera size={19} strokeWidth={2.1} /></div>
          <div className="brand-text-group">
            <span className="brand-name">HateHero Studio VIP</span>
            <span className="brand-badge">WARM LIME</span>
            <span className="brand-subtitle">Spatial AI System</span>
          </div>
        </div>
        <button className="btn-reset" onClick={() => window.location.reload()} title="Reset Application">
          <RefreshCw size={14} /> <span>Reset</span>
        </button>
      </div>
    </header>
  );
});

const HeroSection = React.memo(() => (
  <section className="hero">
    <div className="hero-copy">
      <span className="hero-eyebrow"><Sparkles size={13} /> HateHero Official — Build Skills. Break Limits. Master the System.</span>
      <h1><span className="hero-highlight">Behind Every Great Idea, There’s a Line of Code</span></h1>
      <p className="hero-subtitle">" Think Beyond the Code, Break Every Limit, and Build Something the World Has Never Seen "</p>
      <div className="hero-badges">
        <span className="hero-badge"><LayoutTemplate size={12} /> Overdrive x15</span>
        <span className="hero-badge"><Check size={12} /> the ultimate</span>
        <span className="hero-badge"><Check size={12} /> Wajah kekal konsisten</span>
      </div>
    </div>
    <div className="hero-spatial" aria-hidden="true">
      <div className="spatial-stage">
        <div className="spatial-ring" />
        <div className="spatial-core"><Zap size={38} fill="currentColor" /></div>
        <div className="spatial-card spatial-card-a">
          <ImagePlus size={20} />
          <div><strong>Product Input</strong><span>Visual source</span></div>
        </div>
        <div className="spatial-card spatial-card-b">
          <Sparkles size={20} />
          <div><strong>Gemini Engine</strong><span>Generation core</span></div>
        </div>
        <div className="spatial-card spatial-card-c">
          <LayoutTemplate size={20} />
          <div><strong>Content Output</strong><span>Image + voice</span></div>
        </div>
        <div className="spatial-status">System active</div>
      </div>
    </div>
  </section>
));

const ReferenceWorkersPanel = React.memo(
  /** @param {{ selectedWorker1: string, selectedWorker2: string, onWorker1Change: (id: string) => void, onWorker2Change: (id: string) => void }} props */
  function ReferenceWorkersPanel(props) {
  const { selectedWorker1, selectedWorker2, onWorker1Change, onWorker2Change } = props;
  const hijabOptions = ALL_WORKERS.filter(w => w.type === 'hijab');
  const freeHairOptions = ALL_WORKERS.filter(w => w.type === 'freeHair');

  return (
    <section className="ref-panel">
      <div className="ref-header">
        <h3 className="ref-title">Worker Identity Reference</h3>
        <span className="ref-status"><CheckCircle2 size={12} /> Locked</span>
      </div>
      <div className="ref-card-grid">
        <div className="ref-card">
          <img src={WORKER_REFERENCE[selectedWorker1]?.image} alt="Worker 1" className="ref-thumb" />
          <div className="ref-info">
            <span className="ref-name">Worker 1 (Hijab)</span>
            <select className="ref-select" value={selectedWorker1} onChange={(e) => onWorker1Change(e.target.value)}>
              {hijabOptions.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="ref-card">
          <img src={WORKER_REFERENCE[selectedWorker2]?.image} alt="Worker 2" className="ref-thumb" />
          <div className="ref-info">
            <span className="ref-name">Worker 2 (Free Hair)</span>
            <select className="ref-select" value={selectedWorker2} onChange={(e) => onWorker2Change(e.target.value)}>
              {freeHairOptions.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="ref-note" style={{marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)'}}>
        Pilihan ini menjadi pasangan utama. Sistem akan auto-rotate semua 4 model wajah dalam batch: 2 hijab + 2 free hair.
      </div>
    </section>
  );
});

export default function App() {
  const [items, setItems] = useState(/** @type {GeneratedItem[]} */ ([]));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState(/** @type {Notice | null} */ (null)); 
  const [copyAnim, setCopyAnim] = useState(false);
  const [downloadAnim, setDownloadAnim] = useState(false);
  const [selectedWorker1, setSelectedWorker1] = useState('hijabWorker2');
  const [selectedWorker2, setSelectedWorker2] = useState('freeHairWorker2');
  const [previewState, setPreviewState] = useState(/** @type {{ url: string, name: string, index: number } | null} */ (null));
  const [previewScale, setPreviewScale] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [confirmClear, setConfirmClear] = useState(false);
  const timerIntervalRef = useRef(/** @type {number | null} */ (null));

  const stopRef = useRef(false);
  const fileRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const controllersRef = useRef(new Map(/** @type {[string, AbortController][]} */ ([])));
  const mountedRef = useRef(true);

  const openPreview = useCallback((item, index) => {
    if (!item?.resultUrl) return;
    setPreviewState({ url: item.resultUrl, name: item.name, index });
    setPreviewScale(1);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewState(null);
    setPreviewScale(1);
  }, []);

  const zoomPreviewIn = useCallback(() => {
    setPreviewScale((prev) => Math.min(4, Number((prev + 0.25).toFixed(2))));
  }, []);

  const zoomPreviewOut = useCallback(() => {
    setPreviewScale((prev) => Math.max(0.5, Number((prev - 0.25).toFixed(2))));
  }, []);

  const resetPreviewZoom = useCallback(() => {
    setPreviewScale(1);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; controllersRef.current.forEach(c => c.abort()); controllersRef.current.clear(); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, []);

  useEffect(() => {
    if (!previewState) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePreview();
      if (event.key === '+' || event.key === '=') zoomPreviewIn();
      if (event.key === '-') zoomPreviewOut();
      if (event.key === '0') resetPreviewZoom();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewState, closePreview, zoomPreviewIn, zoomPreviewOut, resetPreviewZoom]);

  const updateItem = useCallback(
  /** @param {string} id @param {Partial<GeneratedItem>} patch */
  (id, patch) => {
    if (mountedRef.current) setItems(c => c.map(i => i.id === id ? { ...i, ...patch } : i));
  }, []);

  const removeItem = useCallback(
  /** @param {string} id */
  (id) => {
    if (!busy && !uploading) setItems(c => c.filter(i => i.id !== id));
  }, [busy, uploading]);

  const showNotice = useCallback(
  /** @param {string} text @param {NoticeType} [type] */
  (text, type = 'info') => {
    setNotice({ text: String(text), type });
  }, []);

  const totalImages = items.length;
  const completedCount = items.filter(i => TERMINAL_STATUSES.has(i.status)).length;
  const safeProgress = totalImages > 0 ? Math.min(100, Math.max(0, Math.round((completedCount / totalImages) * 100))) : 0;
  const isGenerating = items.some(i => i.status === 'processing');
  
  const numSuccess = items.filter(i => i.status === 'success').length;
  const numFailed = items.filter(i => i.status === 'error').length;
  const numStopped = items.filter(i => i.status === 'stopped').length;

  const combinedPromptText = useMemo(() => items.map((i, idx) => i.prompt ? `PROMPT #${idx + 1} - ${i.name}\n${i.prompt}` : null).filter(Boolean).join('\n\n==========================\n\n'), [items]);

  /** @param {number} seconds @returns {string} */
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  /** @param {FileList | File[]} fileList */
  const handleFiles = async (fileList) => {
    const selected = Array.from(fileList || []).filter(f => f.type.startsWith('image/'));
    if (!selected.length) return showNotice('Tiada fail gambar yang sah dipilih.', 'error');
    
    const availableSlots = Math.max(0, 15 - items.length);
    if (availableSlots === 0) return showNotice('Maksimum 15 gambar sudah dicapai.', 'warning');
    
    const acceptedFiles = selected.slice(0, availableSlots);
    setUploading(true);
    showNotice('Preparing images...', 'info');

    const results = await Promise.allSettled(acceptedFiles.map(compressImage));
    /** @type {GeneratedItem[]} */
    const newItems = [];
    let failedCount = 0;
    
    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        newItems.push({ id: createId(), name: acceptedFiles[idx].name, base64: r.value.base64, mimeType: r.value.mimeType, originalUrl: r.value.dataUrl, reviewStyle: REVIEW_STYLES[0], status: 'ready', prompt: '', resultUrl: null, resultBase64: undefined, resultMimeType: undefined, error: null, outfitId: null });
      } else failedCount += 1;
    });

    if (newItems.length) setItems(c => [...c, ...newItems].slice(0, 15));
    setUploading(false);
    
    if (failedCount > 0) showNotice(`${newItems.length} loaded, ${failedCount} failed to read.`, 'warning');
    else showNotice(`${newItems.length} images ready.`, 'success');
    
    if (fileRef.current) fileRef.current.value = '';
  };

  /**
   * @param {GeneratedItem} item
   * @param {number} index
   * @param {number} batchSeed
   * @param {ProcessOptions} [options]
   */
  const processOne = async (item, index, batchSeed, options = {}) => {
    if (stopRef.current) { updateItem(item.id, { status: 'stopped', error: null }); return false; }
    const controller = new AbortController(); controllersRef.current.set(item.id, controller);
    
    updateItem(item.id, { status: 'processing', error: options.retryMessage || null, outfitId: null, ...(options.preserveExisting ? {} : { prompt: '', resultUrl: null, resultBase64: undefined, resultMimeType: undefined }) });

    try {
      const activeWorkerPair = getAutoRotatingWorkerPair(index, selectedWorker1, selectedWorker2);

      const result = await runFastEngine({ 
        imageBase64: item.base64, 
        mimeType: item.mimeType, 
        reviewStyle: item.reviewStyle, 
        batchSeed, 
        imageIndex: index, 
        signal: controller.signal,
        worker1Id: activeWorkerPair.worker1Id,
        worker2Id: activeWorkerPair.worker2Id
      });
      if (stopRef.current || controller.signal.aborted) { updateItem(item.id, { status: 'stopped', error: null }); return false; }
      
      updateItem(item.id, {
        status: 'success',
        prompt: result.generatedPrompt,
        resultUrl: result.generatedImage,
        resultBase64: result.generatedImageBase64,
        resultMimeType: result.generatedImageMimeType,
        outfitId: result.outfitId,
        worker1Id: activeWorkerPair.worker1Id,
        worker2Id: activeWorkerPair.worker2Id,
        error: null
      });
      return true;
    } catch (error) {
      const stopped = stopRef.current || controller.signal.aborted || (error instanceof Error && error.name === 'AbortError');
      const errorMessage = error instanceof Error ? error.message : 'Generation failed.';
      updateItem(item.id, { status: stopped ? 'stopped' : 'error', error: stopped ? null : errorMessage.slice(0, 500) });
      return false;
    } finally { controllersRef.current.delete(item.id); }
  };

  const generateBatch = async () => {
    if (!items.length || busy || uploading) return;
    resetOutfitRandomPools();
    stopRef.current = false; setBusy(true); showNotice('Batch processing started...', 'info');
    setElapsedTime(0);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    const batchSeed = Date.now();
    setItems(items.map(i => ({ ...i, status: 'ready', prompt: '', resultUrl: null, resultBase64: undefined, resultMimeType: undefined, error: null, outfitId: null, worker1Id: undefined, worker2Id: undefined })));

    const referenceController = new AbortController();
    controllersRef.current.set('__worker_references__', referenceController);
    try {
      await fetchReferenceImagesBase64(referenceController.signal);
    } catch (error) {
      const stopped = stopRef.current || referenceController.signal.aborted || (error instanceof Error && error.name === 'AbortError');
      if (!stopped) {
        console.warn('Worker references could not be fully preloaded. Each item will verify selected references before generation.', error);
        showNotice('Rujukan wajah belum lengkap. Sistem akan cuba semula sebelum setiap generation.', 'warning');
      }
    } finally {
      controllersRef.current.delete('__worker_references__');
    }

    for (let i = 0; i < items.length; i += 2) {
      if (stopRef.current) break;
      const chunk = items.slice(i, i + 2);
      await Promise.all(chunk.map(async (item, localIdx) => {
        const actualIndex = i + localIdx;
        let isSuccess = false;
        let attempt = 0;
        
        while (!isSuccess && !stopRef.current) {
          const opts = attempt > 0 ? { preserveExisting: true, retryMessage: `Retrying (Attempt ${attempt + 1})...` } : { preserveExisting: false };
          isSuccess = await processOne(item, actualIndex, batchSeed + attempt * 100, opts);
          attempt++;
          if (!isSuccess && !stopRef.current) await waitInterruptible(6000, () => stopRef.current);
        }
      }));
      if (i + 2 < items.length && !stopRef.current) await waitInterruptible(2000, () => stopRef.current);
    }
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
    
    if (stopRef.current) { setItems(c => c.map(i => i.status === 'ready' ? { ...i, status: 'stopped', error: null } : i)); showNotice('Process stopped.', 'warning'); }
    else showNotice('Batch completed.', 'success');
    
    controllersRef.current.clear(); if (mountedRef.current) setBusy(false);
  };

  /** @param {GeneratedItem} item @param {number} index */
  const regenerateItem = async (item, index) => {
    if (busy || uploading) return;
    stopRef.current = false; setBusy(true); showNotice(`Regenerating #${index + 1}...`, 'info');
    try {
      let isSuccess = false;
      let attempt = 0;
      const batchSeed = Date.now();
      
      while (!isSuccess && !stopRef.current) {
        // Explicitly clear prompt on the first try by passing preserveExisting: false
        const opts = attempt > 0 ? { preserveExisting: true, retryMessage: `Retrying (Attempt ${attempt + 1})...` } : { preserveExisting: false };
        isSuccess = await processOne(item, index, batchSeed + attempt * 100, opts);
        attempt++;
        if (!isSuccess && !stopRef.current) await waitInterruptible(6000, () => stopRef.current);
      }
      if (!stopRef.current) {
        if (isSuccess) showNotice(`Regeneration #${index + 1} complete.`, 'success');
      }
    } finally { if (mountedRef.current) setBusy(false); }
  };

  const stopBatch = () => { stopRef.current = true; showNotice('Stopping process...', 'warning'); controllersRef.current.forEach(c => c.abort()); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; };
  const triggerClearAll = () => { 
    if (busy || uploading) return; 
    setConfirmClear(true);
  };
  const executeClearAll = () => {
    setItems([]); setNotice(null); if (fileRef.current) fileRef.current.value = '';
    setConfirmClear(false);
  }

  const downloadAllImages = async () => {
    const successItems = items.map((item, idx) => ({ item, idx })).filter(x => x.item.status === 'success' && x.item.resultUrl);
    if (!successItems.length) return;
    setDownloadAnim(true); showNotice(`Downloading ${successItems.length} images...`, 'info');
    try {
      for (let i = 0; i < successItems.length; i++) {
        downloadHighestQualityImage(successItems[i].item, `${String(successItems[i].idx + 1).padStart(2, '0')}_${safeName(successItems[i].item.name)}`);
        if (i < successItems.length - 1) await wait(1000);
      }
      showNotice('Downloads completed.', 'success');
    } catch (e) { showNotice('Download error.', 'error'); } 
    finally { window.setTimeout(() => setDownloadAnim(false), 1000); }
  };

  const handleCopyAll = async () => {
    if (!combinedPromptText) return;
    try { 
      await copyText(String(combinedPromptText)); 
      setCopyAnim(true); 
      window.setTimeout(() => setCopyAnim(false), 2000); 
    } catch (e) { 
      showNotice('Gagal menyalin teks.', 'error'); 
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app page-shell">
        <Topbar />
        
        <main className="main-container">
          <HeroSection />

          <div className="workspace">
            {/* LEFT COLUMN: INPUT STUDIO */}
            <div className="panel">
              <div className="panel-inner">
                <div className="panel-header">
                  <div className="panel-title-group">
                    <div className="badge-num">1</div>
                    <div>
                      <h2 className="panel-title">Imej Produk</h2>
                      <p className="panel-desc">Tambah sehingga 15 imej produk untuk diproses.</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`upload-zone ${uploading || dragging ? 'dragging' : ''}`} 
                  onClick={() => !busy && !uploading && fileRef.current?.click()} 
                  onDragEnter={(e) => { e.preventDefault(); if (!busy && !uploading) setDragging(true); }} 
                  onDragOver={(e) => e.preventDefault()} 
                  onDragLeave={(e) => { if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) setDragging(false); }} 
                  onDrop={(e) => { e.preventDefault(); setDragging(false); if (!busy && !uploading && e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files); }}
                  role="button" tabIndex={0} 
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !busy && !uploading && fileRef.current?.click(); } }}
                >
                  <div className="upload-icon">
                    {uploading ? <Loader2 size={24} className="spinner" /> : <Upload size={24} strokeWidth={1.5} />}
                  </div>
                  <h3 className="upload-title">{uploading ? 'Menyediakan imej...' : 'Letakkan imej produk di sini'}</h3>
                  <p className="upload-hint">{dragging ? 'Lepaskan untuk memuat naik' : 'JPG, PNG atau WEBP · maksimum 15 imej'}</p>
                </div>
                <input ref={fileRef} hidden type="file" accept="image/*" multiple disabled={busy || uploading} onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} />

                {items.length > 0 && (
                  <div className="upload-grid">
                    {items.map((item, index) => (
                      <div className="upload-item" key={item.id}>
                        <div className="upload-thumb-wrap">
                          <img src={item.originalUrl} alt={item.name} />
                          <span className="upload-idx">{index + 1}</span>
                          <button className="btn-remove-upload" disabled={busy || uploading} onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} aria-label={`Remove ${item.name}`}><X size={14} strokeWidth={2} /></button>
                        </div>
                        <select className="upload-style-select" value={item.reviewStyle} disabled={busy || uploading} onChange={(e) => updateItem(item.id, { reviewStyle: e.target.value })} title={item.reviewStyle}>
                          {REVIEW_STYLES.map(s => (<option key={s} value={s}>{s}</option>))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}

                {items.length > 0 && (
                  <div className="upload-actions">
                    <button className="btn-clear-all" disabled={busy || uploading} onClick={triggerClearAll}>Kosongkan semua</button>
                  </div>
                )}

                <div className="action-area">
                  <button className="btn-generate" disabled={!items.length || busy || uploading} onClick={generateBatch}>
                    {busy ? <Loader2 size={16} className="spinner" /> : <Zap size={16} fill="currentColor" />}
                    {busy ? `Menjana ${items.filter(i=>i.status==='processing').length ? items.findIndex(i=>i.status==='processing')+1 : '...'} daripada ${items.length}` : `Jana ${items.length ? `${items.length} imej` : 'imej'}`}
                  </button>
                  {busy && <button className="btn-stop" onClick={stopBatch}><X size={16}/> Hentikan proses</button>}
                </div>

                {notice && notice.text && (
                  <div className="notice" role="status" aria-live="polite">
                    {notice.type === 'error' ? <AlertCircle size={16} color="var(--danger)"/> : notice.type === 'success' ? <CheckCircle2 size={16} color="var(--success)"/> : notice.type === 'warning' ? <AlertCircle size={16} color="var(--warning)"/> : <Info size={16}/>}
                    <span>{notice.text}</span>
                  </div>
                )}

                <ReferenceWorkersPanel 
                  selectedWorker1={selectedWorker1} 
                  selectedWorker2={selectedWorker2} 
                  onWorker1Change={setSelectedWorker1}
                  onWorker2Change={setSelectedWorker2}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: RESULTS WORKSPACE */}
            <div className="panel" aria-busy={isGenerating}>
              <div className="panel-inner">
                
                <div className="panel-header">
                  <div className="panel-title-group">
                    <div className="badge-num">2</div>
                    <div>
                      <h2 className="panel-title">Hasil Dijana</h2>
                      <p className="panel-desc">Pratonton, jana semula dan muat turun hasil.</p>
                    </div>
                  </div>
                  <div className="result-header-actions">
                    <span className="status-pill"><span className="status-dot status-success" />{numSuccess} Siap</span>
                    <span className="status-pill"><span className="status-dot status-error" />{numFailed} Ralat</span>
                    {numStopped > 0 && <span className="status-pill"><span className="status-dot status-stopped" />{numStopped} Henti</span>}
                    <button className="btn-download-all" disabled={!numSuccess || busy || downloadAnim} onClick={downloadAllImages}>
                      <Download size={14} /> {downloadAnim ? 'Memuat turun...' : 'Muat turun semua'}
                    </button>
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="progress-container">
                    <div className="progress-top">
                      <span className="progress-label">Kemajuan kelompok</span>
                      <strong className="progress-pct">{safeProgress}%</strong>
                    </div>
                    <div className="progress-track">
                      <div className={`progress-fill ${safeProgress === 100 ? 'done' : ''}`} style={{ width: `${safeProgress}%` }} />
                    </div>
                    <div className="progress-bottom">
                      <span>{completedCount} daripada {totalImages} selesai</span>
                      <div className="progress-timer">
                        <Clock size={14} />
                        {formatTime(elapsedTime)}
                      </div>
                    </div>
                  </div>
                )}

                {!items.length && (
                  <div className="empty-state">
                    <div className="empty-icon"><ImagePlus size={29} strokeWidth={1.6} /></div>
                    <h3>Ruang kerja masih kosong</h3>
                    <p>Muat naik imej produk dan pilih gaya ulasan untuk mula menghasilkan kandungan.</p>
                  </div>
                )}

                {items.length > 0 && (
                  <div className="result-grid">
                    {items.map((item, index) => (
                      <article className="result-card" key={item.id}>
                        <div className="rc-image-wrap">
                          <div className={`rc-status-badge ${item.status === 'success' ? 'rc-badge-success' : item.status === 'error' ? 'rc-badge-error' : item.status === 'stopped' ? 'rc-badge-stopped' : ''}`}>
                            {item.status === 'success' ? <CheckCircle2 size={12}/> : item.status === 'processing' ? <Loader2 size={10} className="spinner" /> : null}
                            {item.status === 'success' ? 'Selesai' : item.status === 'processing' ? 'Menjana' : item.status === 'error' ? 'Gagal' : item.status === 'stopped' ? 'Dihentikan' : 'Sedia'}
                          </div>

                          {item.status === 'processing' && (
                            <div className="rc-state-overlay">
                              <Loader2 size={24} className="spinner" />
                              <span>Memproses imej {index + 1}...</span>
                            </div>
                          )}

                          {item.resultUrl ? (
                            <img
                              src={item.resultUrl}
                              alt={item.name}
                              onClick={() => openPreview(item, index)}
                              title="Klik untuk preview penuh"
                              decoding="async"
                              loading="eager"
                              draggable={false}
                            />
                          ) : (
                            <div className="rc-empty-copy">{item.status === 'error' ? 'Tiada imej dihasilkan' : ''}</div>
                          )}
                        </div>
                        
                        <div className="rc-content">
                          <div className="rc-meta">
                            <strong className="rc-filename" title={item.name}>#{index + 1} {item.name}</strong>
                            {item.outfitId && <span className="rc-outfit">Seed pakaian: {item.outfitId}</span>}
                            {item.worker1Id && item.worker2Id && (
                              <span className="rc-outfit">
                                Model: {WORKER_REFERENCE[item.worker1Id]?.name} + {WORKER_REFERENCE[item.worker2Id]?.name}
                              </span>
                            )}
                          </div>
                          
                          {item.error && <details className="rc-error-details"><summary className="rc-error-summary">Lihat butiran ralat</summary><div className="rc-error">{item.error}</div></details>}
                          
                          <div className="rc-actions">
                            <button className="rc-btn" disabled={!item.resultUrl} onClick={() => downloadHighestQualityImage(item, `${String(index + 1).padStart(2, '0')}_${safeName(item.name)}`)} aria-label="Download">
                              <Download size={14}/> Muat turun
                            </button>
                            <button className="rc-btn" disabled={busy || uploading || item.status === 'ready' || item.status === 'processing'} onClick={() => regenerateItem(item, index)} aria-label="Regenerate">
                              <RefreshCw size={14}/> Jana semula
                            </button>
                            <button className="rc-btn rc-btn-icon" disabled={busy || uploading} onClick={() => removeItem(item.id)} aria-label="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {combinedPromptText && (
                  <div className="prompts-container">
                    <details className="prompts-details">
                      <summary><ChevronDown size={14}/> Lihat prompt yang dijana</summary>
                      <div className="prompts-header">
                        <span className="prompt-title">Butiran pembangun</span>
                        <button className={`btn-copy`} onClick={handleCopyAll} disabled={copyAnim}>
                          {copyAnim ? <Check size={14} color="var(--success)"/> : <Copy size={14}/>} {copyAnim ? 'Disalin' : 'Salin semua'}
                        </button>
                      </div>
                      <div className="prompts-content">{combinedPromptText}</div>
                    </details>
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
        
        {}
        {previewState && (
          <div
            className="preview-lightbox"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePreview();
            }}
          >
            <div className="preview-panel" role="dialog" aria-modal="true" aria-label="Preview imej penuh">
              <div className="preview-toolbar">
                <div className="preview-title">
                  <strong>#{previewState.index + 1} {previewState.name}</strong>
                  <span>Preview menggunakan imej hasil asal resolusi penuh. Download akan mengambil fail asal berkualiti tertinggi tanpa recompress daripada app.</span>
                </div>

                <div className="preview-tools">
                  <button className="preview-btn" onClick={zoomPreviewOut} aria-label="Zoom out">−</button>
                  <div className="preview-scale">{Math.round(previewScale * 100)}%</div>
                  <button className="preview-btn" onClick={zoomPreviewIn} aria-label="Zoom in">+</button>
                  <button className="preview-btn" onClick={resetPreviewZoom}>Reset</button>
                  <button
                    className="preview-btn"
                    onClick={() => {
                      const currentItem = items[previewState.index];
                      if (!currentItem) return;
                      downloadHighestQualityImage(
                        currentItem,
                        `${String(previewState.index + 1).padStart(2, '0')}_${safeName(previewState.name)}`
                      );
                    }}
                  >
                    Download
                  </button>
                  <button className="preview-btn" onClick={closePreview} aria-label="Close preview">
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="preview-stage">
                <img
                  src={previewState.url}
                  alt={previewState.name}
                  draggable={false}
                  decoding="async"
                  style={{ transform: `scale(${previewScale})` }}
                />
              </div>
            </div>
          </div>
        )}

        {confirmClear && (
          <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmClear(false); }}>
            <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="clear-title">
              <div className="modal-icon"><Trash2 size={22} /></div>
              <h3 className="modal-title" id="clear-title">Kosongkan ruang kerja?</h3>
              <p className="modal-copy">Semua imej dan hasil semasa akan dibuang. Tindakan ini tidak boleh dibuat asal.</p>
              <div className="modal-actions">
                <button className="modal-button modal-cancel" onClick={() => setConfirmClear(false)}>Batal</button>
                <button className="modal-button modal-danger" onClick={executeClearAll}>Kosongkan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}