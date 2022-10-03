import passport from "passport";
import Joi from "joi";
import passportJWT from "passport-jwt";

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const JWTConfig = {
	//jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	//jwtFromRequest: cookieExtractor,
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

async function JWTVerify(jwtPayload, done) {
	done(null, jwtPayload);
	// try {
	// 	const user = await prisma.user.findUnique({ where: { userId: jwtPayload.userId } });
	// 	if (!user) {
	// 		return fin(null, false, { message: "Inaccurate Token" });
	// 	}
	// 	const resUser = {
	// 		name: user.name,
	// 		userId: user.userId,
	// 	};
	// 	return fin(null, jwtPayload);
	// } catch (err) {
	// 	return fin(null, { Error: err });
	// }
}

export default function passportConfig() {
	passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
}
