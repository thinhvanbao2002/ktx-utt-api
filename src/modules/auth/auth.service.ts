import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../user/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { phone, password } = dto;

    console.log('---- PASS ----',password);
    

    const findUser = await this.userRepository.findOne({
      where: { phone: phone },
    });

    if (!findUser) {
      throw new NotFoundException('Tài khoản không tồn tại!');
    }

    const checkPass = bcrypt.compareSync(password, findUser.password);

    if (!checkPass) {
      throw new NotFoundException('Mật khẩu không hợp lệ!');
    }

    const payload = {
      id: findUser.id,
      name: findUser.name,
      role: findUser.role,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.userRepository.update({ id: findUser.id }, { token: token });

    findUser.token = token;

    return findUser;
  }

  async register(dto: RegisterDto) {
    const { name, phone, email } = dto;

    const checkPhone = await this.userRepository.findOne({
      where: { phone: phone },
    });

    if (checkPhone) {
      throw new NotFoundException('Số điện thoại đã tồn tại!');
    }

    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (checkEmail) {
      throw new NotFoundException('Email đã tồn tại!');
    }

    const SALT = bcrypt.genSaltSync();

    const passwordHash = await bcrypt.hash(dto.password, SALT);

    const userData = {
      ...dto,
      password: passwordHash,
      role: UserRole.STUDENT
    };

    return await this.userRepository.save(userData);
  }

  async getUserInfo(user) {
    const { id, phone, role } = user;
    return await this.userRepository.findOne({ where: { id } });
  }
}
