import { Data } from "@/data";
import Store from "@/helpers/store";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function viewWordPage() {
  if (!Store.local.data) {
    return <Navigate to="/" />;
  }
  const navigate = useNavigate();
  const data = Store.local.data as Data;
  const { currentPlayer, players, spiesLocation, timer, word, hasHint } = data;
  const [state, setState] = useState<"show" | "next">("next");

  const handleNext = () => {
    if (state === "next") {
      return setState("show");
    }
    setState("next");
    if (currentPlayer < players - 1) {
      Store.local.data = {
        ...data,
        currentPlayer: currentPlayer + 1,
      }
    } else {
      Store.local.data = {
        ...data,
        expiredAt: new Date(Date.now() + timer * 60 * 1000),
        currentPlayer: currentPlayer + 1,
      }
      navigate("/game/play")
    }
  }

  const renderContent = () => {
    if (state === "next" && currentPlayer === 0) {
      return <p className="text-xl w-full text-center text-green-700 font-bold">گوشی را به نفر اول بدهید</p>
    }
    if (state === "next") {
      return <p className="text-xl w-full text-center text-red-500 font-bold">گوشی را به نفر بعدی بدهید</p>

    }
    if (spiesLocation.includes(currentPlayer)) {
      const hint = word.hint.sort(() => Math.random() - 0.5)[0];
      return <>
        <p className="text-2xl text-center font-bold text-red-500">شما جاسوس هستید</p>
        {hasHint && <p className="text-center text-lg text-gray-500">راهنمایی: {hint}</p>}
      </>
    }
    return <p className="text-2xl text-center font-bold text-green-700">{word.word}</p>
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <Card>
          <CardBody className="min-h-20 p-10 items-center w-[80vw]">
            {renderContent()}
          </CardBody>
          <CardFooter className="justify-center">
            <Button onClick={handleNext}>
              {(currentPlayer === 0 && state === "next") ? "شروع" : ((currentPlayer === players - 1) && state === "next") ? "شروع بازی" : "بعدی"}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
}
