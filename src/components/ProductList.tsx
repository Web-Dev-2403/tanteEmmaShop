import { useEffect, useState } from "react";
import { Link } from "react-router";
import supabase from "../utils/setupSupabase";

export type Product = {
	id: number;
	name: string;
	description: string;
	in_stock: boolean;
	img_url: string;
	price: number;
};
const ProductList = () => {

	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {

		async function getProducts() {
			const { data, error } = await supabase.from('products').select('*')
			setProducts(data)
		}
		getProducts()
	}, [])

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Products</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<Link
						key={product.id}
						to={`/product/${product.id}`}
						className="block p-4 border rounded-lg shadow hover:shadow-lg transition"
					>
						<h2 className="text-xl font-semibold mb-2">{product.name}</h2>

						<img src={product.img_url ? product.img_url : '/placeholder-image.jpg'} alt={product.name} />
						<p className="text-gray-600">${product.price.toFixed(2)}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default ProductList;