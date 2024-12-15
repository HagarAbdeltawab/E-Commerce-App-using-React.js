import amazonLogo from "../../assets/images/amazon-pay.png";
import americanLogo from "../../assets/images/American-Express-Color.png";
import masterLogo from "../../assets/images/mastercard.webp";
import paypalLogo from "../../assets/images/paypal.png";

import appStoreLogo from "../../assets/images/get-apple-store.png";
import googlePlayLogo from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8">
        <div className="container space-y-4">
          <header>
            <h2 className="text-xl font-semibold text-slate-800">
              Get the FreshCart app
            </h2>
            <p className="text-slate-400">
              We will spend you a link, open it on your phone to download the
              app.
            </p>
          </header>

          <div className="flex gap-2">
            <input
              className="form-control grow"
              type="email"
              placeholder="Email Address"
            />
            <button className="btn uppercase text-sm font-semibold">
              Share App Link
            </button>
          </div>

          <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
            <div className="payment-partners flex gap-3 items-center">
              <h3>Payment Partners</h3>
              <img className="w-24" src={amazonLogo} alt="" />
              <img className="w-24" src={americanLogo} alt="" />
              <img className="w-20" src={masterLogo} alt="" />
              <img className="w-24" src={paypalLogo} alt="" />
            </div>
            <div className="download flex gap-3 items-center">
              <h3>Get deliveries with FreshCart</h3>
              <img className="w-24" src={appStoreLogo} alt="" />
              <img className="w-28" src={googlePlayLogo} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
