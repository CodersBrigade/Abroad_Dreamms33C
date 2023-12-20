import { useSelector } from "../redux/store";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAvatar({ className, ...other }: Props) {
  const { selectedUser } = useSelector((state) => state.user);

  return (
    <div
      {...other}
      className={`user-avatar${className ? " " + className : ""}`}
    >
      {selectedUser?.name?.trim()[0].toUpperCase()}
    </div>
  );
}
