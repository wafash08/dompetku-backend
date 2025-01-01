import type { User } from "@prisma/client";

export class UserDTO {
	private _user: User;

	constructor(user: User) {
		this._user = user;
	}

	fromEntity() {
		return {
			name: this._user.name,
			email: this._user.email,
			avatar: this._user.avatar,
		};
	}
}
