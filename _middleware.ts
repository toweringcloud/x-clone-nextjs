import { NextRequest, NextResponse } from "next/server";
import getSession from "@/libs/session";

interface Routes {
	[key: string]: boolean;
}

const publicOnlyUrls: Routes = {
	"/": true,
	"/create-account": true,
	"/log-in": true,
	"/profile": true,
};
export async function middleware(request: NextRequest) {
	const currPath = request.nextUrl.pathname;
	const exists = publicOnlyUrls[currPath];
	if (!exists) return;
	console.log(currPath + " ^ " + exists);

	if (currPath === "/") {
		const session = await getSession();
		console.log(session);
		if (session.id) {
			return NextResponse.redirect(
				`${process.env.NEXT_PUBLIC_DOMAIN_URL}`
			);
		}
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_DOMAIN_URL}/log-in`
		);
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
