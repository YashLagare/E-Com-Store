
const LoadingState = ({ message = "Processing your payment..." }) => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300 text-center'>
			{/* Your spinner */}
			<div className='relative mb-6'>
				<div className='w-20 h-20 border-emerald-200 border-2 rounded-full' />
				<div className='w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0' />
				<div className='sr-only'>Loading</div>
			</div>

			{/* Message below spinner */}
			<p className='text-lg font-medium'>
				{message} 🫂😍
			</p>
		</div>
	);
};

export default LoadingState;
