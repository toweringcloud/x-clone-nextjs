"use client";

import { ReactNode } from "react";

import Button from "@/components/Button";
import { cn } from "@/libs/utils";

export type ModalProps = {
	open?: boolean;
	mode?: "check" | "confirm" | "custom";
	modeOption?: string; //-mode: custom
	background?: string;
	title: string;
	description: string;
	children?: ReactNode;
	actionNames?: string[];
	onClose?: () => void;
	onProcess?: () => void;
};

export default function Modal({
	open = false,
	mode = "check",
	modeOption,
	background,
	title,
	description,
	children,
	actionNames,
	onClose,
	onProcess,
}: ModalProps) {
	if (!actionNames) {
		actionNames = ["취소", "확인"];
	}

	return (
		<div
			id="modal"
			className={cn(
				"fixed left-0 top-0 min-w-screen h-screen inset-0 z-50",
				"flex justify-center items-center outline-none focus:outline-none animated fadeIn faster",
				`${background && background.startsWith("https") ? "bg-no-repeat bg-center bg-cover bg-image: url(" + background + ")" : ""}`,
				`${open === false ? "invisible" : "visible"}`
			)}
		>
			<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
			<div
				className={cn(
					"relative w-full max-w-2xl p-10 mx-auto my-auto rounded-3xl shadow-lg bg-white",
					`${mode === "check" ? "w-[360px] h-[248px]" : mode === "confirm" ? "w-[468px] h-[274px]" : modeOption}`
				)}
			>
				<div className="flex flex-col justify-center items-center gap-5">
					<div className="typography-subtitle-1 font-semibold mb-3">
						{title}
					</div>
					<div className="flex-auto justify-center text-center">
						<div className="flex flex-col gap-y-0.5 items-center">
							{description
								?.split("|")
								.map((val: string, idx: number) => (
									<span key={idx}>{val}</span>
								))}
						</div>
					</div>
					{children}
					<div className="h-[80px] text-[22px] flex justify-center items-center gap-6">
						{mode === "check" ? (
							<Button
								className="w-[280px] h-[52px]"
								text={actionNames[0]}
								onClick={() => onClose!()}
							/>
						) : (
							<>
								<Button
									className="w-[192px] h-[52px]"
									text={actionNames[0]}
									onClick={() => onClose!()}
								/>
								<Button
									className="w-[192px] h-[52px]"
									text={actionNames[1]}
									onClick={() => onProcess!()}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
