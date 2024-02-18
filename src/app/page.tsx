import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
 

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Auntie's Kitchen!</h1>
        <p className="text-lg text-gray-600">Connecting students with experienced aunties who love to cook delicious meals.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/auntie-cooking.jpg"
            alt="Auntie cooking"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Auntie's Kitchen?</h2>
          <p className="text-lg mb-4">1. Authentic Homemade Meals: Enjoy delicious homemade meals cooked with love and care by experienced aunties.</p>
          <p className="text-lg mb-4">2. Convenience: No need to worry about cooking when you have Auntie's Kitchen. Just place your order and enjoy!</p>
          <p className="text-lg mb-4">3. Variety: Explore a wide range of cuisines and dishes offered by our talented aunties.</p>
          <p className="text-lg mb-4">4. Affordable: Delicious meals at affordable prices, perfect for students on a budget.</p>
          <Link href={"/login"} className="bg-blue-500 text-white rounded-md py-2 px-6 hover:bg-blue-600 transition duration-300">Get Started</Link>
        </div>
      </div>
    </main>
  );
}