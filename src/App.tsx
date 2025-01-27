import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useParams,
} from "react-router";

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

const ProductList = () => (
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

          <img src={product.img_url} alt={product.name} />
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Product not found!</div>;
  }

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <div className="mb-4 flex flex-row space-between gap-8">
        <img className="max-w-xl" src={product.img_url} alt={product.name} />
        <div>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>
          <button className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

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
      { path: "/", element: <ProductList /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
