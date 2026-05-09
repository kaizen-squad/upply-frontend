function FilePreview({ filePath, fileName }: { filePath: string; fileName: string }) {
  const ext = filePath.split('.').pop()?.toLowerCase();
  
  const getPreview = () => {
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <img 
            src={filePath} 
            alt={fileName}
            className="max-w-full h-auto rounded"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.png';
            }}
          />
        );
      
      case 'pdf':
        return (
          <embed
            src={filePath}
            type="application/pdf"
            width="100%"
            height="600px"
            className="border rounded"
          />
        );
      
      case 'mp4':
      case 'webm':
        return (
          <video controls className="max-w-full rounded">
            <source src={filePath} type={`video/${ext}`} />
          </video>
        );
      
      case 'mp3':
      case 'wav':
        return (
          <audio controls className="w-full">
            <source src={filePath} type={`audio/${ext}`} />
          </audio>
        );
      
      default:
        return (
          <div className="border rounded p-4 text-center">
            <p className="text-gray-600">Aperçu non disponible</p>
            <a 
              href={filePath} 
              download={fileName}
              className="text-blue-500 hover:underline"
            >
              Télécharger le fichier
            </a>
          </div>
        );
    }
  };
  
  return <div>{getPreview()}</div>;
}