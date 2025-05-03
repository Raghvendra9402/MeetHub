import { ThemeToggleButton } from "@/components/shared/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();
  return (
    <div>
      Welcome {user?.fullName}
      <div>
        <UserButton />
        <ThemeToggleButton />
      </div>
    </div>
  );
}
