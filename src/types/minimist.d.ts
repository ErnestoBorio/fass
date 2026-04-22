declare module "minimist" {
	export default function parseArgv(args: string[]): {
		_: string[];
		[key: string]: any;
	};
}
