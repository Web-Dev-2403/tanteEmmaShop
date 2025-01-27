import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Link,
	useParams,
} from "react-router";
import LandingPage from "./pages/LandingPage";
import ProductDetail from "./pages/ProductDetail";

// Mock Data
const products = [
	{
		id: 1,
		name: "Product A",
		description: "Description for Product A",
		inStock: true,
		img_url: "/ssd.png",
		price: 10.99,
	},
	{
		id: 2,
		name: "Product B",
		description: "Description for Product B",
		inStock: true,
		img_url: "/placeholder-image.jpg",
		price: 14.99,
	},
	{
		id: 3,
		name: "Product C",
		description: "Description for Product C",
		inStock: true,
		img_url: "/placeholder-image.jpg",
		price: 7.99,
	},
	{
		id: 4,
		name: "Product D",
		description: "Description for Product D",
		inStock: true,
		img_url: "/placeholder-image.jpg",
		price: 7.99,
	},
	{
		id: 5,
		name: "Product E",
		description: "Description for Product E",
		inStock: true,
		img_url: "/placeholder-image.jpg",
		price: 7.99,
	},
	{
		id: 6,
		name: "Product F",
		description: "Description for Product F",
		inStock: true,
		img_url: "/placeholder-image.jpg",
		price: 7.99,
	},
];

// Components
const Layout = () => (
	<div className="min-h-screen flex flex-col">
		<header className="bg-teal-500 text-white py-4 shadow">
			<div className="container mx-auto flex justify-between items-center px-4">
				<Link to="/" className="text-2xl font-bold">
					Tante Emma geht Online
				</Link>
				<Link
					to="/cart"
					className="bg-white text-teal-500 px-4 py-2 rounded shadow"
				>
					Cart
				</Link>
			</div>
		</header>
		<main className="flex-grow container mx-auto px-4 py-6">
			<Outlet />
		</main>
		<footer className="bg-gray-800 text-white py-4 text-center">
			<p>&copy; 2025 Tante Emma geht Online</p>
		</footer>
	</div>
);





const Cart = () => (
	<div>
		<h1 className="text-3xl font-bold mb-6">Your Cart</h1>
		<p>Your cart is currently empty.</p>
	</div>
);

// Router Configuration
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "/", element: <LandingPage /> },
			{ path: "/product/:id", element: <ProductDetail /> },
			{ path: "/cart", element: <Cart /> },
		],
	},
]);

const App = () => <RouterProvider router={router} />;

export default App;
