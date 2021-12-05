/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */

export type Pig = {
	_id: string;
	name: string;
	img: string;
	birthDate: Date;
	breed: string;
	description: string;
	farmId: string;
};

export type Farm = {
	_id: string;
	name: string;
	users: [];
};

export type User = {
	email:         string,
	password:      string,
	isFarmOwner:   boolean,
	sessionId:     string,
}
