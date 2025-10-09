export interface PickedMedia {
	title: string;
	type: string;
	date: string;
	rating: number;
	url: string;
}

export const MediaCard = ({ title, type, date, rating, url }: PickedMedia) => {
	return (
		<div className="border rounded-2xl p-4 min-h-[200px] w-[400px] flex flex-col justify-center items-center">
			<div className="flex flex-col">
				<h1 className="font-bold text-2xl text-center">{title}</h1>
				<p className="text-center">
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</p>
				<p className="text-center font-semibold">Release Date: {date}</p>
				<p className="text-center font-semibold">Rating:{rating}/10</p>
			</div>
			<div className="mt-4">
				{url ? (
					<img className="w-96 h-[480px] rounded-2xl" src={url} />
				) : (
					<p className="text-center">No Image Available</p>
				)}
			</div>
		</div>
	);
};

export default MediaCard;
