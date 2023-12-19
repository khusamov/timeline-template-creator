export const landscape = (pageSize: [number, number]): [number, number] => {
	return Array.from(pageSize).reverse() as [number, number]
}