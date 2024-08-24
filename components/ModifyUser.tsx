"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";

interface ModifyUserProps {
	action: any;
	id: number;
	name: string;
	email: string;
}

export default function ModifyUser({
	action,
	id,
	name,
	email,
}: ModifyUserProps) {
	const [state, dispatch] = useFormState(action, null);
	const [userName, setUserName] = useState(name);
	const [userEmail, setUserEmail] = useState(email);

	return (
		<>
			<form action={dispatch} className="flex flex-col gap-3">
				<div className="flex flex-col gap-5">
					<div className="flex justify-start items-center gap-5 -mt-12 -mb-12">
						<span className="w-[120px]">User Avatar</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-96 text-gray-300"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
							/>
						</svg>
					</div>
					<div className="flex justify-start items-center gap-5">
						<span className="w-[120px]">User Name</span>
						<Input
							type="text"
							name="username"
							value={userName}
							required
							placeholder="Modify user's name"
							errors={state?.fieldErrors.username}
							onChange={(event) =>
								setUserName(event.target.value)
							}
						/>
					</div>
					<div className="flex justify-start items-center gap-5 mb-5">
						<span className="w-[120px]">User Email</span>
						<Input
							type="text"
							name="email"
							value={userEmail}
							required
							placeholder="Modify user's email"
							errors={state?.fieldErrors.email}
							onChange={(event) =>
								setUserEmail(event.target.value)
							}
						/>
					</div>
					<input name="id" value={id} required type="hidden" />
					<Button text="Update User Info" />
				</div>
			</form>
			<div className="-mt-5">
				<Button text="Change Password" color="R" mode="button" />
			</div>
		</>
	);
}
