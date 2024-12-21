export default function BrandCard({ brandInfo }) {
  const { image, name, _id } = brandInfo;

  return (
    <>
      <div
        className="text-center col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-3
        shadow-lg rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
      >
        <img src={image} alt="" className="w-full h-60" />
        <h1 className="text-2xl font-semibold py-5 text-primary-950">{name}</h1>
      </div>
    </>
  );
}
