import Purchase from "@/components/purchase/Purchase";
import Payment from "@/database/payment.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import connectToDB from "@/lib/mongoose";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";

export default async function MyPurchase() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p>Please sign in to view your purchases.</p>
      </div>
    );
  }

  // Connect to database
  await connectToDB();

  const payment = await Payment.findOne({
    email: session.user.email,
    verified: true,
  });

  if (!payment) {
    return (
      <>
        <div className="max-w-2xl text-bold mx-auto p-6">
          <p className="text-4xl font-semibold text-center text-gray-700">
            No verified purchases found.
          </p>
        </div>
        <div className="w-full bg-black py-4 mt-16 overflow-hidden">
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee whitespace-nowrap flex">
              <span className="text-white font-semibold text-xl mx-4">
                Premium Business Solutions
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
              <span className="text-white font-semibold text-xl mx-4">
                Expert Support 24/7
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
              <span className="text-white font-semibold text-xl mx-4">
                Grow Your Business Today
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
              <span className="text-white font-semibold text-xl mx-4">
                Money Back Guarantee valid for 30 days only*
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex">
              <span className="text-white font-semibold text-xl mx-4">
                Premium Business Solutions
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
              <span className="text-white font-semibold text-xl mx-4">
                Expert Support 24/7
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
              <span className="text-white font-semibold text-xl mx-4">
                Grow Your Business Today
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
              <span className="text-white font-semibold text-xl mx-4">
                Money Back Guarantee valid for 30 days only*
              </span>
              <span className="text-white font-semibold text-xl mx-4">•</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Purchase payment={JSON.parse(JSON.stringify(payment))} />
      <div className="flex justify-center mt-8 mb-12">
        <Link href={ROUTES.home}>
          <Button className="bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/80 text-white dark:text-black px-8 py-6 font-medium rounded-full text-lg">
            Go Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
