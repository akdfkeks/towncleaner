import expressLoader from "./expressLoader";
import depsInjectionLoader from "./depsInjectionLoader";

async function appLoader({ app }) {
	// 1. DI, IoC Object 초기화
	await depsInjectionLoader();

	// 2. Express 관련
	await expressLoader({ app });
}

export default appLoader;
