import { useState, useEffect } from "react";
import ROUTES from "../routes/routes";
import axios from "axios";
import { BellRing, Check } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Switch } from "./ui/switch";

const initialNotifications = [
  {
    title: "Your login has been approved!",
    description: "few seconds ago",
    read: false,
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
    read: false,
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
    read: false,
  },
];

const Notifications = ({ className, ...props }) => {
  const token = localStorage.getItem("accessToken");
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() =>{
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${ROUTES.BE}/api/notifications`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setNotifications(response.data.notifications);
        console.log(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          You have {notifications.filter((n) => !n.read).length} unread
          messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              {!notification.read ? (
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              ) : (
                <span></span>
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={markAllAsRead}>
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Notifications;
