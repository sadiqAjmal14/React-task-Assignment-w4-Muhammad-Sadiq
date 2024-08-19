const LoadingModal = () => {
    return <div className="fixed inset-0 flex items-center justify-center bg-dark-bg bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-col items-center">
                <div className="inline-block h-24 w-24 animate-spin rounded-full border-4 border-t-4 border-t-transparent border-gradient-start opacity-75" role="status">
                    <span className="absolute m-px h-px w-px overflow-hidden border-0 p-0 clip-rect">Loading...</span>
                </div>
                <h2 className="text-white text-xl font-semibold mt-4">Loading...</h2>
            </div>
        </div>
};

export default LoadingModal;
