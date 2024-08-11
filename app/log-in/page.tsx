"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { logIn } from "./actions";

export default function LogIn() {
	const [state, dispatch] = useFormState(logIn, null);
	const params = useSearchParams();
	console.log(params);

	return (
		<div className="flex flex-col gap-10 py-8 px-6 mx-[25%] min-w-[400px]">
			<div className="text-3xl text-center pt-[30vh]">💜 Sign-in 💜</div>
			<form action={dispatch} className="flex flex-col gap-3">
				<Input
					name="email"
					type="email"
					placeholder="Email"
					required
					errors={state?.fieldErrors.email}
				/>
				<Input
					name="password"
					type="password"
					placeholder="Password"
					required
					errors={state?.fieldErrors.password}
				/>
				<Button text="Verify account" />
			</form>
			<hr className="-mt-5 -mb-5" />
			<Link href="/create-account">
				<Button text="Sign-up" />
			</Link>
		</div>
	);
}
