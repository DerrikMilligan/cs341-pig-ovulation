/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */

export type Pig = {
	uid: string;
	name: string;
	img: string;
	birthDate: Date;
	breed: string;
	description: string;
	farmId: string;
};

export type Farm = {
	uid: string;
	name: string;
	users: [];
};
