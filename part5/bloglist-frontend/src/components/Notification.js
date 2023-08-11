const Notification = ({ message, isError }) => {
  if (message === null) return null;

  const notificationClass = isError ? "error" : "success";

  return <div className={notificationClass}>{message}</div>;
};

export default Notification;