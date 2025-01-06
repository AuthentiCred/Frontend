import React from "react";
import {
    List,
    Card,
    Avatar,
    ListItem,
    Accordion,
    Typography,
    AccordionBody,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    TicketIcon,
    UserGroupIcon,
    Square2StackIcon,
    RectangleGroupIcon,
    ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronDownIcon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Sidebar() {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const LIST_ITEM_STYLES =
        "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

    return (
        <Card className="flex-none h-[calc(100vh-2rem)] w-full max-w-[20rem] mx-auto p-6 shadow-md">
            <div className="mb-2 flex items-center gap-4 p-4">
                <img
                    src="https://www.material-tailwind.com/logos/mt-logo.png"
                    alt="brand"
                    className="h-9 w-9"
                />
                <Typography color="blue-gray" className="text-lg font-bold">
                    AuthentiCred
                </Typography>
            </div>
            <hr className="my-2 border-gray-200" />
            <List>
                <Accordion open={open === 1}>
                    <ListItem
                        selected={open === 1}
                        data-selected={open === 1}
                        onClick={() => handleOpen(1)}
                        className="p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
                    >
                        <ListItemPrefix>
                            <Avatar
                                size="sm"
                                src="https://www.material-tailwind.com/img/avatar1.jpg"
                            />
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal text-inherit">
                            John Doe
                        </Typography>
                        <ChevronDownIcon
                            strokeWidth={3}
                            className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                                My Profile
                            </ListItem>
                            <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                                Settings
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <hr className="my-2 border-gray-200" />
                <Accordion open={open === 2}>
                    <Link to = "/">
                        <ListItem
                            selected={open === 2}
                            data-selected={open === 2}
                            className="px-3 py-[9px] select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
                        >
                            <ListItemPrefix>
                                <RectangleGroupIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-normal text-inherit">
                                Dashboard
                            </Typography>

                        </ListItem>
                    </Link>
                </Accordion>
                <ListItem className={LIST_ITEM_STYLES}>
                    <ListItemPrefix>
                        <Square2StackIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Products
                </ListItem>
                <ListItem className={LIST_ITEM_STYLES}>
                    <ListItemPrefix>
                        <TicketIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Orders
                </ListItem>
                <ListItem className={LIST_ITEM_STYLES}>
                    <ListItemPrefix>
                        <UserGroupIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Customers
                </ListItem>
            </List>
            <hr className="my-2 border-gray-200" />
            <List>
                <ListItem className={LIST_ITEM_STYLES}>
                    <ListItemPrefix>
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Help & Support
                </ListItem>
                <ListItem className={LIST_ITEM_STYLES}>
                    <ListItemPrefix>
                        <ArrowLeftStartOnRectangleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5"
                        />
                    </ListItemPrefix>
                    Sign Out
                </ListItem>
            </List>
        </Card>
    );
}
