
import Store from "@/helpers/store";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import words from '@/words.json'
import { Checkbox } from '@nextui-org/checkbox'
import { Data } from "@/data";


export type Category = keyof typeof words | "all";

const categories = [{
  label: 'مکان',
  key: 'places',
}, {
  label: "خوردنی",
  key: "foods",
},
{ label: "اشیا", key: "things", },
{
  label: "شغل",
  key: "jobs",
}, {
  label: "همه",
  key: "all",
}] as {
  label: string;
  key: Category;
}[];

const times = [
  3, 5, 10, 15
]

export const initData = {
  players: "8",
  spiesLocation: [],
  timer: "5",
  word: {
    word: "",
    hint: []
  },
  currentPlayer: 0,
  hasHint: true
} as unknown as Data;
// todo: use react hook form

export default function IndexPage() {
  const data = (Store.local.data || initData) as Data;
  const navigate = useNavigate();
  const [players, setPlayers] = useState(data.players.toString());
  const [hasHint, setHasHint] = useState(data.hasHint);
  const [spies, setSpies] = useState((data.spiesLocation.length || 1).toString());
  const [timer, setTimer] = useState(data.timer.toString());
  const [category, setCategory] = useState<Category>((data.category || "all") as Category);



  const startGame = () => {

    if (!category) {
      return;
    }
    const wordsOfCategory = category === "all" ? Object.values(words).flat() : words[category as keyof typeof words];

    const word = wordsOfCategory[Math.floor(Math.random() * wordsOfCategory.length)];
    const spiesLocation = Array.from({ length: +players }, (_, i) => i).sort(() => Math.random() - 0.5).slice(0, +spies);


    Store.local.data = {
      players,
      spiesLocation,
      timer,
      word,
      currentPlayer: 0,
      hasHint
    } as unknown as Data;
    navigate("/game")
  }

  const handleChange = (min: number, max?: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return "";
    }
    const value = +event.target.value;

    if (isNaN(value)) {
      return "";
    }

    if (value < min) {
      return min.toString();
    }
    if (max && value > max) {
      return max.toString();
    }
    return event.target.value;
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <h1 className="text-4xl font-bold text-center">بازی جاسوس</h1>
        <Input type="number" value={players} min="2" onChange={(event) => setPlayers(handleChange(3)(event))} label="تعداد بازیکنان" placeholder="تعداد بازیکنان" />
        <Input type="number" value={spies} min="1" max={+players - 1} onChange={(event) => setSpies(handleChange(1, +players - 1)(event))} label="تعداد جاسوس" placeholder="تعداد جاسوس" />
        <Select label="دسته بندی" selectedKeys={[category]} onChange={(event) => {
          setCategory(event.target.value as Category);
        }}>
          {categories.map((category) => (
            <SelectItem key={category.key}>
              {category.label}
            </SelectItem>
          ))}
        </Select>
        <Select label="زمان" selectedKeys={[timer]} onChange={(event) => {
          setTimer(event.target.value);
        }}>
          {times.map((time) => (
            <SelectItem key={time.toString()}>
              {time.toString()}
            </SelectItem>
          ))}
        </Select>
        <Checkbox defaultSelected checked={hasHint} onValueChange={(hasHint) => setHasHint(hasHint)}>فعال بودن راهنمایی</Checkbox>

        <Button onClick={startGame}>
          شروع بازی
        </Button>
      </section>
    </DefaultLayout>
  );
}
