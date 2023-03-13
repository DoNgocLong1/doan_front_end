import React, { useMemo } from "react";
import { notification, Space } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
interface INotification {
  button: React.ReactNode;
  messageType: string;
  messageContent: string;
}
const Notification = ({
  button,
  messageType,
  messageContent,
}: INotification) => {
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `${messageType}`,
      description: messageContent,
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: "long" }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Space onClick={() => openNotification("topRight")}>{button}</Space>
    </Context.Provider>
  );
};

export default Notification;
