import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-6">
        <div className="col-span-8 ">
          <swiper-container style={{ height: "100%" }} loop={true}>
            <swiper-slide style={{ height: "100%" }}>
              <img src={img3} alt="" className="w-full h-full object-cover" />
            </swiper-slide>
            <swiper-slide style={{ height: "100%" }}>
              <img src={img3} alt="" className="w-full h-full object-cover" />
            </swiper-slide>
          </swiper-container>
        </div>

        <div className="col-span-4">
          <div className="h-1/2">
            <img src={img2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2">
            <img src={img1} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}
