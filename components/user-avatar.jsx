import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ user }) => {
  // Ensure user data is safe to use
  const safeUser = user ? {
    id: user.id,
    name: user.name || 'Unknown',
    imageUrl: user.imageUrl || null,
    clerkUserId: user.clerkUserId
  } : null;

  return (
    <div className="flex items-center space-x-2 w-full">
      <Avatar className="h-6 w-6">
        <AvatarImage src={safeUser?.imageUrl} alt={safeUser?.name} />
        <AvatarFallback className="capitalize">
          {safeUser ? safeUser.name : "?"}
        </AvatarFallback>
      </Avatar>
      <span className="text-xs text-gray-500">
        {safeUser ? safeUser.name : "Unassigned"}
      </span>
    </div>
  );
};

export default UserAvatar;
