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
	notFound();
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
		<div className="flex flex-col gap-10 py-8 px-6 mx-[25%] min-w-[400px]">
			<div className="text-3xl text-center pt-[30vh]">💚 Profile 💚</div>
			<h1 className="text-center">
				<span>::::: Welcome, </span>
				<span className="text-blue-500 text-lg font-semibold">
					{user?.username}
				</span>
				<span> :::::</span>
			</h1>
			<form action={goHome} className="-mb-5">
				<Button text="Go to Home" />
			</form>
			<form action={logOut}>
				<Button text="Log out" />
			</form>
		</div>
	);
}
