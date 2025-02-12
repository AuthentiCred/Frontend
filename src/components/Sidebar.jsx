import React, { useEffect, useContext } from "react";
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
    RectangleGroupIcon,
    ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronDownIcon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import profile from '../assets/profile.png'
import { api } from "../services/api";
import { DataContext } from "../context/DataProvider";

export function Sidebar() {
    const [open, setOpen] = React.useState(0);
    const navigate = useNavigate();

    const {account, setAccount} = useContext(DataContext);

    useEffect(() => {
        const getUser = async () => {
            const url = '/auth/user'
            const response = await api.get(url);
            
            if(response.data.success){
                setAccount(response.data.user);
            }
        }

        getUser();
    }, [account]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin');
    }



    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const LIST_ITEM_STYLES =
        "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

    return (
        <Card className="flex-none h-[calc(100vh-2rem)] fixed w-full max-w-[20rem] mx-auto p-6 shadow-md">
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
                                src={profile}
                            />
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal text-inherit">
                            {account.name ? account.name : "USER"}
                        </Typography>
                    </ListItem>
                </Accordion>
                <hr className="my-2 border-gray-200" />
                <Accordion open={open === 2}>
                    <Link to="/">
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
                <Link to='/candidates' className="flex">
                    <ListItem className={LIST_ITEM_STYLES}>
                        <ListItemPrefix>
                            <UserGroupIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Candidates
                    </ListItem>
                </Link>
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
                <ListItem className={LIST_ITEM_STYLES} onClick={handleLogout}>
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
