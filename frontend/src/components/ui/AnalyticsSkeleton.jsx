
const AnalyticsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col gap-8 animate-pulse">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-6 shadow-md flex flex-col justify-center"
          >
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>

      {/* Chart Area Skeleton */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-md">
        {/* <div className="h-6 bg-gray-700 rounded w-1/4 mb-6"></div> */}
        <div className="h-64 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;
