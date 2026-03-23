import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
  ],
  exports: [AuthService], // Export dể module khác xài Guard Auth
})
export class AuthModule {}
