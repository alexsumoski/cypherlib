const WaveLoader: React.FC = () => {
  return (
    <div className="flex justify-center py-12">
      <div className="space-x-1 flex">
        <div className="w-2 h-2 bg-white rounded-full animate-wave"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-wave animation-delay-200"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-wave animation-delay-400"></div>
      </div>
    </div>
  );
};

export default WaveLoader;
