import Link from "next/link";

import Button from "@/components/Button";
import ModifyUser from "@/components/ModifyUser";

import { getUser, modifyUser } from "./actions";

export default async function Edit({ params }) {
	const user = await getUser();
	console.log(user.username);

	const userName = params.username;
	console.log(userName);

	return (
		<div className="h-screen flex justify-center items-start">
			<div className="mx-[10%] min-w-[500px] py-10 px-6 flex flex-col gap-8">
				<div className="text-3xl text-center">🖤 User Edit 🖤</div>
				<div className="grid grid-cols-2 gap-2">
					<span>
						<Link href="/">
							<Button text="Go to Home" />
						</Link>
					</span>
					<span>
						<Link href={`/users/${userName}`}>
							<Button text="User Info" />
						</Link>
					</span>
				</div>

				<ModifyUser
					action={modifyUser}
					id={user.id}
					name={user!.username}
					email={user!.email!}
				/>
			</div>
		</div>
	);
}
