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
					errors={state?.fieldErrors.email}
				/>
				<FormInput
					name="username"
					type="string"
					placeholder="Username"
					required
					errors={state?.fieldErrors.username}
				/>
				<FormInput
					name="password"
					type="password"
					placeholder="Password"
					required
					errors={state?.fieldErrors.password}
				/>
				{state && Object.keys(state.fieldErrors).length == 0 ? (
					<>
						<FormButton text="Log in" mode="submit" />
						<FormButton text="Reset" mode="reset" />
						<div className="bg-[#32BD6F] text-black font-semibold rounded-xl h-10 p-2 flex flex-row gap-3">
							<CheckBadgeIcon className="size-6" />
							Welcome back!
						</div>
					</>
				) : (
					<FormButton text="Log in" mode="submit" />
				)}
			</form>
		</div>
	);
}
