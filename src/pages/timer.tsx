import { Data } from "@/data";
import Store from "@/helpers/store";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Link, Navigate } from "react-router-dom";
import { initData } from ".";
import Card from "@/components/Card";
import { toPersianNumber } from "@/helpers/tools";

export default function TimerPage() {
  if (!Store.local.data) {
    return <Navigate to="/" />;
  }
  const { expiredAt: expiredAtString } = Store.local.data || initData as Data;
  const expiredAt = new Date(expiredAtString);
  const [time, setTime] = useState<number>(Math.floor((expiredAt.getTime() - Date.now()) / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Math.floor((expiredAt.getTime() - Date.now()) / 1000);
      if (time < -1) {
        setTime(0);
        clearInterval(interval);
      } else {
        setTime(time);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiredAt]);

  const lowerThan30Seconds = time < 30;
  const minutes = Math.abs(Math.floor(time / 60));
  const seconds = Math.abs(time % 60);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <Card className="text-white font-black">
          {time > 0 ? <span dir="ltr" className={["text-3xl transition-all", lowerThan30Seconds ? "text-warning-500" : ""].join(" ")}>
            {time < 0 ? "-" : ""}
            {toPersianNumber(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)}
          </span> : <span className="text-3xl text-warning-500">
            تموم شد!
          </span>}
        </Card>
        <Button className="cta" as={Link} to="/">شروع از اول</Button>

      </section>
    </DefaultLayout>
  );
}
