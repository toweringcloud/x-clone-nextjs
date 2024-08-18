import { notFound, redirect } from "next/navigation";

import Button from "@/components/Button";
import { db } from "@/libs/db";
import getSession from "@/libs/session";

async function getUser() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
		if (user) {
			return user;
		}
	}
	redirect("/log-in");
}

export default async function Profile() {
	const user = await getUser();
	console.log(user!.username);

	const goHome = async () => {
		"use server";
		redirect("/");
	};
	const logOut = async () => {
		"use server";
		const session = await getSession();
		session.destroy();
		redirect("/log-in");
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="flex flex-col gap-10 py-8 px-6 mx-[15%] min-w-[400px]">
				<div className="text-3xl text-center">💚 Profile 💚</div>
				<h1 className="text-center">
					<span>::::: Welcome, </span>
					<span className="text-blue-500 text-lg font-semibold">
						{user?.username}
					</span>
					<span> :::::</span>
				</h1>
				<div className="flex justify-center items-center text-gray-300 -mt-16 -mb-12">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="size-96"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</div>
				<form action={goHome} className="-mb-5">
					<Button text="Go to Home" />
				</form>
				<form action={logOut}>
					<Button text="Log out" color="R" />
				</form>
			</div>
		</div>
	);
}
