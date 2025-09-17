"use server";

const BASE = "https://api.themoviedb.org/3";

export async function getRandomTitle(genreId: string | number, type: string) {
	if (!genreId) throw new Error("genreId is required");

	const params = new URLSearchParams({
		with_genres: String(genreId),
		include_adult: "false",
		language: "en-US",
		sort_by: "popularity.desc",
		page: "1",
		api_key: String(process.env.MOVIE_API_KEY),
	});

	// 1) Fetch first page
	const first = await fetch(`${BASE}/discover/${type}?${params}`, {
		cache: "no-store",
	});
	const firstJson = await first.json();
	if (!firstJson.total_results) throw new Error("No results");

	const maxPage = Math.min(firstJson.total_pages ?? 1, 500);
	const randomPage = Math.floor(Math.random() * maxPage) + 1;

	// 2) Fetch random page
	params.set("page", String(randomPage));
	const page = await fetch(`${BASE}/discover/${type}?${params}`, {
		cache: "no-store",
	}).then((r) => r.json());
	const results = page.results ?? [];
	if (!results.length) throw new Error("No results on page");

	// 3) Pick one title
	const pick = results[Math.floor(Math.random() * results.length)];

	// 4) Fetch details with videos
	const detailsUrl = `${BASE}/${type}/${pick.id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US&append_to_response=videos`;
	const details = await fetch(detailsUrl, { cache: "no-store" }).then((r) =>
		r.json()
	);

	return {
		id: pick.id,
		type,
		title: type === "tv" ? pick?.name : pick?.title,
		overview: pick.overview ?? "",
		posterUrl: pick?.poster_path
			? `https://image.tmdb.org/t/p/w500${pick.poster_path}`
			: null,
		backdropUrl: pick?.backdrop_path
			? `https://image.tmdb.org/t/p/w780${pick.backdrop_path}`
			: null,
		rating: pick.vote_average ?? null,
		date: type === "tv" ? pick?.first_air_date : pick?.release_date,
	};
}
