import { useAppSelector } from "../../../Redux Toolkit/Store";
import WishlistProductCard from "./WishlistProductCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const { wishlist } = useAppSelector((store) => store);
  const wishlistProducts = wishlist?.wishlist?.products || [];

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="bottom-right" autoClose={3000} />

      <h1 className="text-2xl sm:text-3xl text-center font-bold text-gray-800 pb-5 uppercase">
        My Wishlist ({wishlistProducts.length} items)
      </h1>

      <div className="border-b border-gray-300 mb-6"></div>

      {wishlistProducts.length > 0 ? (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-6">
          {wishlistProducts.map((item) => (
            <div key={item.id} className="w-full">
              <WishlistProductCard item={item} />
            </div>
          ))}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center h-[67vh] border rounded-lg bg-gray-50 mt-6">
          <img
            className="w-40 sm:w-60"
            src="https://cdn.pixabay.com/photo/2022/05/28/10/45/oops-7227010_960_720.png"
            alt="Not Found"
          />
          <h1 className="font-bold text-lg sm:text-xl text-center mt-4 text-gray-700">
            No Wishlist Items Found
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Add products to your wishlist to see them here.
          </p>
        </section>
      )}
    </div>
  );
};

export default Wishlist;
