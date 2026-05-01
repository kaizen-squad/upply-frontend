// components/ui/FileInput.tsx
'use client';

import { useRef, useState, DragEvent, ChangeEvent, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { 
  Upload, 
  File, 
  FileImage, 
  FileText, 
  FileSpreadsheet, 
  FileArchive, 
  X,
  Eye,
  Image as ImageIcon,
  FileCode, 
  Music,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import useNotificationManager from '../Notification/hooks/useNotificationManager';

interface FileItem {
  file: File;
  id: string;
  previewUrl?: string;
}

export interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  /** Icône principale (zone de dépôt) */
  icon?: React.ReactNode;
  /** Texte principal */
  label?: string;
  /** Texte secondaire */
  hint?: string;
  /** Callback appelée à chaque sélection de fichier(s) */
  onFileSelect: (files: FileList | null) => void;
  /** Afficher la prévisualisation des fichiers sélectionnés */
  showPreview?: boolean;
  /** Nombre max de fichiers (si multiple) */
  maxFiles?: number;
  /** Taille max par fichier en Mo */
  maxSizeMB?: number;
  /** Classes CSS additionnelles pour la zone de drop */
  dropzoneClassName?: string;
}

// Mapping icône par extension / type MIME
const getFileIcon = (file: File) => {
  const type = file.type;
  const ext = file.name.split('.').pop()?.toLowerCase();
  
  if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-blue-500" />;
  if (type === 'application/pdf') return <FileText className="w-8 h-8 text-red-500" />;
  if (type.includes('word') || ext === 'docx' || ext === 'doc') return <FileText className="w-8 h-8 text-blue-600" />;
  if (type.includes('excel') || ext === 'xlsx' || ext === 'xls') return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
  if (type.includes('zip') || type.includes('rar') || ext === 'zip') return <FileArchive className="w-8 h-8 text-yellow-600" />;
  if (type.includes('video')) return <Video className="w-8 h-8 text-purple-500" />;
  if (type.includes('audio')) return <Music className="w-8 h-8 text-pink-500" />;
  if (type.includes('json') || ext === 'json') return <FileCode className="w-8 h-8 text-gray-500" />;
  return <File className="w-8 h-8 text-gray-400" />;
};

// Formater la taille en Mo / Ko
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function FileInput({
  icon = <Upload className="h-10 w-10" />,
  label = "Glissez-déposez votre fichier ici",
  hint = "PNG, JPG, PDF jusqu'à 10MB",
  onFileSelect,
  accept,
  multiple = false,
  disabled = false,
  showPreview = true,
  maxFiles = 5,
  maxSizeMB = 10,
  className,
  ...props
}: FileInputProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const {notify} = useNotificationManager();
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const validateFile = (file: File): boolean => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      notify(`Le fichier ${file.name} dépasse ${maxSizeMB} Mo`, 'error');
      return false;
    }
    return true;
  };

  const processFiles = (files: FileList) => {
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) validFiles.push(files[i]);
    }
    if (validFiles.length === 0) return;

    let newFiles = [...fileItems];
    for (const file of validFiles) {
      if (multiple && newFiles.length >= maxFiles) {
        notify(`Nombre maximum de fichiers atteint (${maxFiles})`, 'warning');
        break;
      }
      const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      newFiles.push({
        file,
        id: `${file.name}-${Date.now()}`,
        previewUrl,
      });
    }
    setFileItems(newFiles);
    
    // Retourner la liste des fichiers bruts
    const dataTransfer = new DataTransfer();
    newFiles.forEach(item => dataTransfer.items.add(item.file));
    onFileSelect(dataTransfer.files);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files && files.length) processFiles(files);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) processFiles(files);
  };

  const removeFile = (id: string) => {
    setFileItems(prev => {
      const newItems = prev.filter(item => item.id !== id);
      const dataTransfer = new DataTransfer();
      newItems.forEach(item => dataTransfer.items.add(item.file));
      onFileSelect(dataTransfer.files);
      return newItems;
    });
  };

  const openFileDialog = () => {
    if (!disabled && inputRef.current) inputRef.current.click();
  };

  const PreviewModal = ({ file, onClose }: { file: File; onClose: () => void }) => {
    const fileUrl = URL.createObjectURL(file);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
        <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
          <button type="button" onClick={onClose} className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-700 z-10">
            <X size={20} />
          </button>
          {file.type.startsWith('image/') && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fileUrl} alt="preview" className="w-full h-auto max-h-[85vh] object-contain" />
          )}
          {file.type === 'application/pdf' && (
            <iframe src={fileUrl} className="w-full h-[85vh]" title="PDF preview" />
          )}
          {file.type.includes('word') && (
            <div className="p-6 text-center">
              <FileText className="w-16 h-16 mx-auto text-blue-500" />
              <p className="mt-4">Aperçu non disponible pour les documents Word.</p>
              <a href={fileUrl} download={file.name} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Télécharger</a>
            </div>
          )}
          {/* Autres types : message simple */}
          {!file.type.startsWith('image/') && file.type !== 'application/pdf' && !file.type.includes('word') && (
            <div className="p-6 text-center">
              {getFileIcon(file)}
              <p className="mt-4">Aucun aperçu disponible pour ce type de fichier.</p>
              <a href={fileUrl} download={file.name} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Télécharger</a>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
        <p className="text-md font-semibold mb-3">{label}</p>
      <div
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-gray-50 p-6 transition-colors cursor-pointer',
          isDragOver && 'border-blue-500 bg-blue-50',
          disabled && 'cursor-not-allowed opacity-60',
          !isDragOver && 'border-gray-300',
          className
        )}
      >
        <div className="text-gray-500">{icon}</div>
        <p className='text-center font-semibold'>Joindre un fichier</p>
        {hint && <p className="text-xs text-gray-400 text-center">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          className="hidden"
          {...props}
        />
      </div>

      {showPreview && fileItems.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">Fichier(s) sélectionné(s) :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fileItems.map(({ file, id, previewUrl }) => (
              <div key={id} className="flex items-center gap-3 bg-white border rounded-lg p-2 shadow-sm">
                {previewUrl ? (
                  <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="thumb" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="flex-shrink-0">{getFileIcon(file)}</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                    title="Prévisualiser"
                    type="button"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => removeFile(id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                    title="Retirer"
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {previewFile && (
        <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  );
}