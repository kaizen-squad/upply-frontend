// TaskSkeleton.tsx pour l'état de chargement
export const TaskSkeleton = () => (
    <div className="bg-white-solid border-2 border-gray-200 shadow-2xs w-full rounded-sm animate-pulse">
        <div className="p-5">
            <div className="flex">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded my-3"></div>
            <div className="mt-5 space-y-2 mb-10">
                <div className="w-[75%] h-4 bg-gray-200 rounded"></div>
                <div className="w-[85%] h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
        <div className="py-4 bg-gray-100 rounded-b-xs">
            <div className="w-[40%] h-4 bg-gray-200 rounded ml-5"></div>
        </div>
    </div>
);