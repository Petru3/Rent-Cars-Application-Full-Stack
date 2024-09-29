import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignInCredentials } from './dto/signin-credentials.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,

        private jwtService: JwtService
    ) {}

    async signUp(authCredentials: AuthCredentials): Promise<void> {
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(signInCredentials: SignInCredentials): Promise<{ accessToken: string }> {
        const user = await this.userRepository.ValidateUserPassword(signInCredentials);
    
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        // Adăugăm userId în payload
        const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.sign(payload);
    
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
    
        return { accessToken };
    }
}
