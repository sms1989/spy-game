import { Data } from "@/data";
import Store, { StoreMode } from "@/helpers/store";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const store = new Store(StoreMode.LOCAL);
export default function viewWordPage() {
  const navigate = useNavigate();
  const data = store.get<Data>("data", { currentPlayer: 0, expiredAt: new Date(), players: 0, spiesLocation: [], timer: 0, word: { hint: [], word: "" } });
  const { currentPlayer, players, spiesLocation, timer, word } = data as Data;
  const [state, setState] = useState<"show" | "next">("next");

  const handleNext = () => {
    if (state === "next") {
      return setState("show");
    }
    setState("next");
    if (currentPlayer < players - 1) {
      store.set("data", {
        ...data,
        currentPlayer: currentPlayer + 1,
      });
    } else {
      store.set("data", {
        ...data,
        expiredAt: new Date(Date.now() + timer * 60 * 1000),
        currentPlayer: currentPlayer + 1,
      });
      navigate("/game/play")
    }
  }

  const renderContent = () => {
    if (state === "next" && currentPlayer === 0) {
      return <p className="text-xl w-full text-center text-green-700 font-bold">گوشی را به نفر اول بدهید</p>
    }
    if (state === "next") {
      return <CardBody>
        <p className="text-xl w-full text-center text-red-500 font-bold">گوشی را به نفر بعدی بدهید</p>
      </CardBody>
    }
    if (spiesLocation.includes(currentPlayer)) {
      const hint = word.hint.sort(() => Math.random() - 0.5)[0];
      return <>
        <p className="text-2xl text-center font-bold text-red-500">شما جاسوس هستید</p>
        <p className="text-center text-lg text-gray-500">راهنمایی: {hint}</p>
      </>
    }
    return <p className="text-2xl text-center font-bold text-green-700">{word.word}</p>
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card>
          <CardBody className="min-h-20 p-10 items-center">
            {renderContent()}
          </CardBody>
          <CardFooter className="justify-center">
            <Button onClick={handleNext}>
              {(currentPlayer === 0 && state === "next") ? "شروع" : currentPlayer === players - 1 ? "شروع بازی" : "بعدی"}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
}
