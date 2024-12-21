export default function CategoryCard({ categoryInfo }) {
  const { image, name, _id } = categoryInfo;

  return (
    <>
      <div
        className="text-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 
      shadow-lg rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
      >
        <img src={image} alt="" className="w-full h-80" />
        <h1 className="text-2xl font-semibold py-5 text-primary-950">{name}</h1>
      </div>
    </>
  );
}
