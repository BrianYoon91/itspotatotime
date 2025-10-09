"use client";
import React, { useState } from "react";
import { movieGenres, showGenres } from "./constant";
import { OptionSelector } from "./components/OptionSelector";
import { getRandomTitle } from "./actions/getRandomTitle";
import MediaCard from "./components/MediaCard";
import { PickedMedia } from "./components/MediaCard";

export default function Home() {
	const [pickedMedia, setPickedMedia] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [genreId, setGenreId] = useState<string | number>("");
	const [genre, setGenre] = useState<string>("");

	const handlePick = async (genreId: string | number, type: string) => {
		try {
			setLoading(true);
			setGenreId(genreId);
			const genre = movieGenres.find((g) => g.id == genreId)?.name;
			if (genre) {
				setGenre(genre);
			}
			const result = await getRandomTitle(genreId, type);
			setPickedMedia(result);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="flex justify-center items-center min-h-screen">
				<div className="flex flex-col gap-4">
					<header>
						<h1 className="text-center text-4xl m-2">🍟 Potato Time</h1>
						<p className="text-center">I know you are bored.</p>
					</header>

					<div className="flex justify-center items-center gap-7">
						<OptionSelector
							text="Pick A Movie Genre"
							optionData={movieGenres}
							type="movie"
							onPick={handlePick}
						/>
						<OptionSelector
							text="Pick A Show Genre"
							optionData={showGenres}
							type="tv"
							onPick={handlePick}
						/>
					</div>

					{loading && <p className="text-center text-4xl mt-10">Loading...</p>}

					{pickedMedia && !loading && (
						<div className="flex flex-col justify-center items-center mt-2">
							{genre && (
								<button
									className="border my-5 rounded-2xl p-2 cursor-pointer   border-neutral-700 hover:border-red-400 
									hover:shadow-[0_0_8px_rgba(255,0,0,0.4)] 
									transition-all duration-200"
									onClick={() => handlePick(genreId, pickedMedia.type)}
								>
									Get Another {genre} Genre
								</button>
							)}
							<MediaCard
								title={pickedMedia.title}
								type={pickedMedia.type}
								date={pickedMedia.date}
								rating={pickedMedia.rating}
								url={pickedMedia.posterUrl}
							/>
						</div>
					)}

					<footer className="text-center mt-10">
						<h3>Made for Boredom</h3>
					</footer>
				</div>
			</div>
		</>
	);
}
