export const metadata = {
	title: "Loading...",
};

export default function Loading() {
	return (
		<div className="w-full h-screen">
			<div className="h-full flex justify-center items-center">
				<span className="flex flex-col items-center text-4xl">
					Loading...
				</span>
			</div>
		</div>
	);
}
