export const get = async <TRes>(
	url: string,
	{ headers }: { headers?: HeadersInit },
) => {
	const res = await fetch(url, { headers });
	if (!res.ok) {
		throw new Error(`Failed to fetch ${url}, status: ${res.status}`);
	}
	const resData = await res.json();
	return resData as TRes;
};
