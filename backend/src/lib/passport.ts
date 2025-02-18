import { type Express, type Request, type Response, type NextFunction } from 'express'
import { Passport } from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { type AppContext } from './ctx'
import { env } from 'process'

export const applyPassportToExpressApp = (expressApp: Express, ctx: AppContext): void => {
  const passport = new Passport()

  const jwtSecret = env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      },
      (jwtPayload: string, done) => {
        ctx.prisma.user
          .findUnique({
            where: { id: jwtPayload },
          })
          .then((user) => {
            if (!user) {
              console.info('User not found for JWT payload:', jwtPayload)
              done(null, false)
              return
            }
            done(null, user)
          })
          .catch((error) => {
            console.error('Error finding user:', error)
            done(error, false)
          })
      }
    )
  )

  expressApp.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Authorization header:', req.headers.authorization) // Логируем заголовки
    if (!req.headers.authorization) {
      next()
      return
    }
    passport.authenticate('jwt', { session: false }, (...args: unknown[]) => {
      req.user = args[1] || undefined
      next()
    })(req, res, next)
  })
}
