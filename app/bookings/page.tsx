import { Header } from "../_components/header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { BookingItem } from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: "asc",
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: "asc",
      },
    }),
  ]);

  return (
    <>
      <Header />
      <div className="px-5 py-6flex flex-col gap-3 mt-4 ">
        <h1 className="text-xl font-bold">Agendamentos</h1>
      </div>
      {confirmedBookings.length > 0 && (
        <>
          <div className="px-5 py-6 flex flex-col gap-3">
            <p className="text-gray-400 uppercase font-bold text-sm">
              Confirmados
            </p>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </>
      )}

      {finishedBookings.length > 0 && (
        <>
          <div className="px-5 py-6 flex flex-col gap-3">
            <p className="text-gray-400 uppercase font-bold text-sm">
              Finalizados
            </p>
            {finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default BookingsPage;
