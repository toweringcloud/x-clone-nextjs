"use client";

import { useFormState } from "react-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { logIn } from "./actions";

export default function LogIn() {
	const [state, dispatch] = useFormState(logIn, null);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6">
			<div className="text-7xl mb-5">
				{state && Object.keys(state.fieldErrors).length == 0
					? "💚"
					: "🖤"}
			</div>
			<form action={dispatch} className="flex flex-col gap-3">
				<FormInput
					name="email"
					type="email"
					placeholder="Email"
					required
				/>
				<FormInput
					name="username"
					type="string"
					placeholder="Username"
					required
				/>
				<FormInput
					name="password"
					type="password"
					placeholder="Password"
					required
					errors={state?.fieldErrors.password}
				/>
				<FormButton text="Log in" />
				{state && Object.keys(state.fieldErrors).length == 0 ? (
					<div className="bg-[#32BD6F] text-black font-semibold rounded-xl h-10 p-2 flex flex-row gap-3">
						<CheckBadgeIcon className="size-6" />
						Welcome back!
					</div>
				) : null}
			</form>
		</div>
	);
}
