import { useEffect, useState } from "react";
import { Product } from "../components/ProductList";
import { getUserSession } from "../utils/auth";
import { supabase } from "../utils/setupSupaBase";

const Cart = () => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function getCart() {
			try {
				const session = await getUserSession();
				if (!session) {
					return;
				}
				const { data, error } = await supabase
					.from('cart')
					.select('*, products(*)')
					.eq('user_id', session.user.id)
					.single();

				if (data && data.products) {
					setProducts(Array.isArray(data.products) ? data.products : [data.products]);
				}
			} catch (error) {
				console.log(error);
			}
		}
		getCart();
	}, []);

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-3xl font-bold mb-6">Your Cart</h1>

			{products.length === 0 ? (
				<p className="text-gray-500">Your cart is currently empty.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<div
							key={product.id}
							className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
						>
							<img
								src={product.img_url}
								alt={product.name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h2 className="text-xl font-semibold mb-2">{product.name}</h2>
								<p className="text-gray-600 mb-2">{product.description}</p>
								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-green-600">
										${product.price.toFixed(2)}
									</span>
									<button
										onClick={() => {/* Add remove from cart functionality */ }}
										className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Cart;