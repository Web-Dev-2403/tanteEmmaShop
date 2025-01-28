import { useParams } from "react-router";
import { Product } from "../components/ProductList";
import { useEffect, useState } from "react";
import supabase from "../utils/setupSupabase";
import { anonSignUp, getUserSession } from "../utils/auth";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		async function getProduct() {
			const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
			setProduct(data)
		}
		getProduct()
	}, [])

	if (!product) {
		return <div>Loading...</div>;
	}
	async function addToCart(): Promise<void> {

		try {
			let session = await getUserSession()
			if (!session) {
				session = await anonSignUp()
			}
			const { data: cart, error } = await supabase.from('cart').select().eq('user_id', session?.user.id).single()
			if (error) throw new Error(error.message)
			if (cart) {
				await supabase.from('cart_product').insert({ cart_id: cart.id, product_id: product.id })
			}
		} catch (error) {
			console.log(error)
		}
		// const { data, error } = await supabase.auth.getSession()
		// if (error) {
		// 	console.log(error)
		// 	return
		// }
		// if (!data.session) {
		// 	const { data: userData, error } = await supabase.auth.signInAnonymously();
		// 	console.log(data, error)

		// 	if (userData) {
		// 		const { data, error } = await supabase.from('cart').select().eq('user_id', userData.user?.id).single()
		// 		console.log('cart', data, error)
		// 		await supabase.from('cart_product').insert({ cart_id: data.id, product_id: product.id })
		// 	}

		// }

		// console.log(data, error)
	}

	return (
		<div>
			<h1 className="text-3xl font-bold mb-4">{product.name}</h1>

			<div className="mb-4 flex flex-row space-between gap-8">

				<img className="max-w-xl" src={product.img_url ? product.img_url : '/placeholder-image.jpg'} alt={product.name} />
				<div>
					<p className="text-lg text-gray-700 mb-4">{product.description}</p>
					<p className="text-2xl font-semibold mb-6">
						${product.price.toFixed(2)}
					</p>
					<button onClick={addToCart} className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition">
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;