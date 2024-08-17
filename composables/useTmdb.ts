const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3`;

export const getTmdbInfo = async (params: any) => {
	try {
        params.type = params.type === 'Movie' ? 'movie' : 'tv';
		let url = `${BASE_URL}/search/${params.type.toLowerCase()}?api_key=${API_KEY}&query=${
			params.name
		}`;
		let res = await $fetch(url);
		// @ts-ignore
		return res?.results || [];
	} catch (error) {
        console.log("getTmdb error", error)
    }
};