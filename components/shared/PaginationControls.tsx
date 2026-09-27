type PaginationControlsProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label: string;
};

export default function PaginationControls({ page, pageCount, onPageChange, label }: PaginationControlsProps) {
  if (pageCount <= 1) return null;

  const buttonClassName = 'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <nav aria-label={label} className="my-5 flex items-center justify-center gap-3">
      <button
        type="button"
        className={buttonClassName}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Précédent
      </button>
      <span aria-live="polite" aria-atomic="true" className="text-sm text-scarpa-flow-gray-34">
        Page {page} sur {pageCount}
      </span>
      <button
        type="button"
        className={buttonClassName}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Suivant
      </button>
    </nav>
  );
}
