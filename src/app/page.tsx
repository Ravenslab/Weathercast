import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  if (!userCookie) {
    redirect("/auth");
  } else {
    redirect("/home");
  }
}
