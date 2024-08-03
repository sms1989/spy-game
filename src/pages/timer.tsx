import { Data } from "@/data";
import Store from "@/helpers/store";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Button } from "@nextui-org/button";
import { Link, Navigate } from "react-router-dom";
import { initData } from ".";

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

  const isMinus = time < 0;
  const minutes = Math.abs(Math.floor(time / 60));
  const seconds = Math.abs(time % 60);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <Card>
          <CardBody className="p-10">
            {time > 0 ? <span dir="ltr" className={["text-3xl", isMinus ? "text-red-500" : ""].join(" ")}>
              {isMinus ? "-" : ""}
              {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </span> : <span className="text-3xl text-red-500">
              پایان
            </span>}
          </CardBody>
          <CardFooter className="justify-center">
            <Button as={Link} to="/">شروع از ابتدا</Button>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
}
