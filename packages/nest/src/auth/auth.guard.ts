import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { PrismaService } from '../prisma/prisma.service'
import { JwtPayload } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(execCtx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(execCtx).getContext()
    const request = context.req as FastifyRequest
    const { authorization } = request.headers

    if (!authorization) throw new UnauthorizedException()

    const [type, jwtString] = authorization.split(' ')
    if (type !== 'Bearer') throw new UnauthorizedException()

    try {
      const { sub: userId, sid } =
        await this.jwtService.verifyAsync<JwtPayload>(jwtString)
      context.session = await this.prisma.userSession.findUniqueOrThrow({
        where: {
          userId: userId,
          id: sid,
          expiresAt: { gt: new Date() },
          revokedAt: null,
        },
        include: {
          user: true,
        },
      })
      context.user = context.session.user

      // update session expiry
      await this.prisma.userSession.update({
        where: {
          id: sid,
        },
        data: {
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      })
    } catch (e) {
      throw new UnauthorizedException()
    }

    return true
  }
}

@Injectable()
export class SuperuserGuard implements CanActivate {
  async canActivate(execCtx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(execCtx).getContext()

    const user: User = context.session.user

    if (!user.isSuperuser) throw new UnauthorizedException()

    return true
  }
}

@Injectable()
export class ScraperGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(execCtx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(execCtx).getContext()

    if (!context.req.connectionParams && !context.req.headers) {
      throw new UnauthorizedException()
    }

    const headersLike = context.req.connectionParams || context.req.headers

    // const connectionParams = (context.request || context.req) as FastifyRequest
    const authorization = headersLike.authorization || headersLike.Authorization

    if (!authorization) throw new UnauthorizedException()

    const [type, jwtString] = authorization.split(' ')
    if (type !== 'Bearer') throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string
        scraper: boolean
      }>(jwtString)

      context.scraper = await this.prisma.scraper.findUniqueOrThrow({
        where: {
          id: payload.sub,
        },
        include: {
          owner: true,
        },
      })
    } catch (e) {
      throw new UnauthorizedException()
    }

    return true
  }
}
