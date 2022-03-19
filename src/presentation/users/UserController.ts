import { Response } from 'express';
import { Body, BodyParam, Controller, Post, Res, Session } from 'routing-controllers';
import { Service } from 'typedi';
import UserService from '../../application/UserService';
import UserRegisterDTO from './UserRegisterDTO';

@Service()
@Controller('/users')
export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * 회원가입
   *
   * @param userRegisterDTO -
   * @param session 회원가입 성공 시 세션에 바로 유저 객체를 담아 곧장 로그인시킨다.
   */
  @Post('/')
  async registerUser(
    @Body() userRegisterDTO: UserRegisterDTO,
    @Session() session: any,
    @Res() res,
  ) {
    try {
      const created = await this.userService.registerUser(userRegisterDTO);
      session.user = created;
      res.redirect('/feeds?msg=성공적으로 가입되었습니다.');
    } catch (e) {
      res.redirect('/signup?msg=회원가입에 실패했습니다.');
    }
  }

  /**
   * 로그인
   *
   * @param session query한 사용자가 존재하면 세션에 저장하기 위함
   * @param res Redirect를 조건별로 하기 위함
   * @param username -
   * @param password -
   */
  @Post('/login')
  async loginUser(
    @Session() session: any,
    @Res() res: Response,
    @BodyParam('username') username: string,
    @BodyParam('password') password: string,
  ) {
    try {
      const found = await this.userService.getUserByUsernameAndPassword(username, password);
      console.log('user found:', found);
      if (!found) throw Error('User not found');
      session.user = found;
      res.redirect('/feeds?msg=정상적으로 로그인되었습니다.');
    } catch (e) {
      res.redirect('/login?msg=등록된 사용자가 아닙니다.');
    }
  }
}
