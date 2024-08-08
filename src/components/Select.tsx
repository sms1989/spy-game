import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FC, useEffect, useState } from "react";
import clsx from "clsx";


interface SelectProps {
    items: {
        title: string;
        value: string;
    }[];
    title: string;
    value: string;
    onChange: (value: string) => void;
    buttonClassName?: string;
    postfix?: string;
}

const Select: FC<SelectProps> = ({ items, title, value, onChange, buttonClassName, postfix }) => {

    const [selectedKeys, setSelectedKeys] = useState(new Set([value]));

    useEffect(() => {
        setSelectedKeys(new Set([value]));
    }, [value, onChange]);

    return <Dropdown>
        <DropdownTrigger>
            <Button
                className={clsx("cta basis-1/2", buttonClassName)}
            >
                {`${title}: ${items.find((item) => item.value === value)?.title} ${postfix || ""}`}
            </Button>
        </DropdownTrigger><DropdownMenu
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys: any) => {
                debugger
                setSelectedKeys(keys);
                onChange([...keys][0]);
            }}
        >
            {
                items.map((item) => <DropdownItem
                    key={item.value}
                >
                    {`${item.title} ${postfix || ""}`}
                </DropdownItem>)
            }
        </DropdownMenu>
    </Dropdown>;
};

export default Select;
